import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { Learner } from '../learners/schemas/learner.schema';
import { Task } from '../tasks/schemas/task.schema';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<any>,
    @InjectModel(Learner.name) private learnerModel: Model<any>,
    @InjectModel(Task.name) private taskModel: Model<any>,
  ) {}

  async getSystemStats() {
    const [
      totalUsers,
      usersByRole,
      totalLearners,
      totalTasks,
      tasksByStatus,
      activeUsers,
    ] = await Promise.all([
      this.userModel.countDocuments(),
      this.userModel.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } },
      ]),
      this.learnerModel.countDocuments(),
      this.taskModel.countDocuments(),
      this.taskModel.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      this.userModel.countDocuments({ isActive: true }),
    ]);

    return {
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      usersByRole: usersByRole.reduce((acc: any, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      totalLearners,
      totalTasks,
      tasksByStatus: tasksByStatus.reduce((acc: any, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
    };
  }

  async bulkAssignTrainer(learnerIds: string[], trainerId: string) {
    const result = await this.learnerModel.updateMany(
      { userId: { $in: learnerIds.map((id) => new Types.ObjectId(id)) } },
      { trainerId: new Types.ObjectId(trainerId) },
    );
    return { updated: result.modifiedCount };
  }

  async bulkAssignProgramme(learnerIds: string[], programmeId: string) {
    const result = await this.learnerModel.updateMany(
      { userId: { $in: learnerIds.map((id) => new Types.ObjectId(id)) } },
      { programmeId: new Types.ObjectId(programmeId) },
    );
    return { updated: result.modifiedCount };
  }

  async listUsers(pagination: PaginationDto, role?: string, search?: string) {
    const { page = 1, pageSize = 20 } = pagination;
    const filter: any = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.userModel
        .find(filter)
        .select('-password -refreshToken')
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .lean(),
      this.userModel.countDocuments(filter),
    ]);
    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async toggleUserActive(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) return null;
    return this.userModel.findByIdAndUpdate(
      userId,
      { isActive: !user.isActive },
      { new: true },
    ).select('-password -refreshToken').lean();
  }
}
