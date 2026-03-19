import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from '../tasks/schemas/task.schema';
import { Evidence } from '../evidence/schemas/evidence.schema';
import { Journal } from '../journals/schemas/journal.schema';
import { Progress } from '../progress/schemas/progress.schema';
import { Learner } from '../learners/schemas/learner.schema';
import { Notification } from '../notifications/schemas/notification.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<any>,
    @InjectModel(Evidence.name) private evidenceModel: Model<any>,
    @InjectModel(Journal.name) private journalModel: Model<any>,
    @InjectModel(Progress.name) private progressModel: Model<any>,
    @InjectModel(Learner.name) private learnerModel: Model<any>,
    @InjectModel(Notification.name) private notificationModel: Model<any>,
  ) {}

  async getLearnerDashboard(userId: string) {
    const uid = new Types.ObjectId(userId);

    const [
      taskStats,
      evidenceStats,
      journalCount,
      progress,
      notifications,
      pendingTasks,
    ] = await Promise.all([
      // Task breakdown by status
      this.taskModel.aggregate([
        { $match: { learnerId: uid } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      // Evidence breakdown
      this.evidenceModel.aggregate([
        { $match: { learnerId: uid } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      // Journal count
      this.journalModel.countDocuments({ learnerId: uid, status: 'published' }),
      // Progress record
      this.progressModel.findOne({ learnerId: uid }).lean(),
      // Recent notifications (5)
      this.notificationModel
        .find({ userId: uid, isRead: false })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      // Upcoming/pending tasks
      this.taskModel
        .find({ learnerId: uid, status: { $in: ['Pending', 'In Progress'] } })
        .sort({ dateDue: 1 })
        .limit(5)
        .select('title status dateDue primaryMethod')
        .lean(),
    ]);

    const taskSummary = taskStats.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {} as Record<string, number>);

    const evidenceSummary = evidenceStats.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {} as Record<string, number>);

    return {
      taskSummary: {
        total: Object.values(taskSummary).reduce((a: any, b: any) => a + b, 0),
        inProgress: taskSummary['In Progress'] || 0,
        complete: taskSummary['Complete'] || 0,
        approved: taskSummary['Approved'] || 0,
        pending: taskSummary['Pending'] || 0,
        rejected: taskSummary['Rejected'] || 0,
      },
      evidenceSummary: {
        total: Object.values(evidenceSummary).reduce((a: any, b: any) => a + b, 0),
        draft: evidenceSummary['draft'] || 0,
        submitted: evidenceSummary['submitted'] || 0,
        approved: evidenceSummary['approved'] || 0,
        rejected: evidenceSummary['rejected'] || 0,
      },
      journalCount,
      progress: progress || {
        overallPercentage: 0,
        otjHoursLogged: 0,
        otjHoursTarget: 0,
      },
      notifications,
      pendingTasks,
    };
  }

  async getTrainerDashboard(userId: string) {
    const uid = new Types.ObjectId(userId);

    const [
      learnerCount,
      pendingReviews,
      recentActivity,
    ] = await Promise.all([
      this.learnerModel.countDocuments({ trainerId: uid }),
      this.taskModel.countDocuments({ trainerId: uid, status: 'Complete' }),
      this.taskModel
        .find({ trainerId: uid })
        .sort({ updatedAt: -1 })
        .limit(10)
        .populate('learnerId', 'firstName lastName email')
        .select('title status updatedAt learnerId')
        .lean(),
    ]);

    // Learner progress overview
    const learnerProgressData = await this.progressModel
      .find({})
      .populate({
        path: 'learnerId',
        match: { _id: { $in: await this.learnerModel.find({ trainerId: uid }).distinct('userId') } },
        select: 'firstName lastName email',
      })
      .lean();

    return {
      learnerCount,
      pendingReviews,
      recentActivity,
      learnerProgressOverview: learnerProgressData
        .filter((p) => p.learnerId != null)
        .map((p) => ({
          learner: p.learnerId,
          overallPercentage: p.overallPercentage,
          otjHoursLogged: p.otjHoursLogged,
          otjHoursTarget: p.otjHoursTarget,
        })),
    };
  }

  async getAdminDashboard() {
    const [
      totalLearners,
      totalTrainers,
      totalTasks,
      tasksByStatus,
      recentUsers,
    ] = await Promise.all([
      this.learnerModel.countDocuments(),
      this.taskModel.distinct('trainerId').then((ids) => ids.length),
      this.taskModel.countDocuments(),
      this.taskModel.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      this.learnerModel
        .find()
        .populate('userId', 'firstName lastName email createdAt')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

    return {
      totalLearners,
      totalTrainers,
      totalTasks,
      tasksByStatus: tasksByStatus.reduce((acc: any, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      recentUsers,
    };
  }
}
