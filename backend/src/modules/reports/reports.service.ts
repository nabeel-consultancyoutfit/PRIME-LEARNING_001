import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from '../tasks/schemas/task.schema';
import { Evidence } from '../evidence/schemas/evidence.schema';
import { Progress } from '../progress/schemas/progress.schema';
import { Learner } from '../learners/schemas/learner.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<any>,
    @InjectModel(Evidence.name) private evidenceModel: Model<any>,
    @InjectModel(Progress.name) private progressModel: Model<any>,
    @InjectModel(Learner.name) private learnerModel: Model<any>,
  ) {}

  async getLearnerReport(learnerId: string) {
    const lid = new Types.ObjectId(learnerId);
    const [tasks, evidence, progress, learner] = await Promise.all([
      this.taskModel.find({ learnerId: lid }).sort({ createdAt: -1 }).lean(),
      this.evidenceModel.find({ learnerId: lid }).sort({ createdAt: -1 }).lean(),
      this.progressModel.findOne({ learnerId: lid }).lean() as Promise<any>,
      this.learnerModel.findOne({ userId: lid })
        .populate('userId', 'firstName lastName email')
        .populate('programmeId', 'title')
        .lean(),
    ]);

    const taskBreakdown = tasks.reduce((acc: any, t: any) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {});

    return {
      learner,
      summary: {
        totalTasks: tasks.length,
        taskBreakdown,
        totalEvidence: evidence.length,
        approvedEvidence: evidence.filter((e: any) => e.status === 'approved').length,
        otjHoursLogged: progress?.otjHoursLogged || 0,
        otjHoursTarget: progress?.otjHoursTarget || 0,
        overallProgress: progress?.overallPercentage || 0,
      },
      tasks,
      evidence,
      progress,
    };
  }

  async getCohortReport(trainerId: string) {
    const trainerLearners = await this.learnerModel
      .find({ trainerId: new Types.ObjectId(trainerId) })
      .populate('userId', 'firstName lastName email')
      .populate('programmeId', 'title')
      .lean();

    const learnerIds = trainerLearners.map((l: any) => l.userId?._id || l.userId);

    const [taskStats, progressRecords] = await Promise.all([
      this.taskModel.aggregate([
        { $match: { learnerId: { $in: learnerIds.map((id: any) => new Types.ObjectId(id)) } } },
        { $group: { _id: { learnerId: '$learnerId', status: '$status' }, count: { $sum: 1 } } },
      ]),
      this.progressModel
        .find({ learnerId: { $in: learnerIds.map((id: any) => new Types.ObjectId(id)) } })
        .lean(),
    ]);

    return {
      cohortSize: trainerLearners.length,
      learners: trainerLearners,
      taskStats,
      progressRecords,
    };
  }

  async getOTJReport(learnerId?: string) {
    const filter: any = {};
    if (learnerId) filter.learnerId = new Types.ObjectId(learnerId);

    const records = await this.progressModel
      .find(filter)
      .populate('learnerId', 'firstName lastName email')
      .lean();

    return records.map((r: any) => ({
      learner: r.learnerId,
      otjHoursLogged: r.otjHoursLogged,
      otjHoursTarget: r.otjHoursTarget,
      percentage: r.otjHoursTarget > 0
        ? Math.round((r.otjHoursLogged / r.otjHoursTarget) * 100)
        : 0,
    }));
  }
}
