import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(dto: CreateTaskDto) {
    return this.taskModel.create(dto);
  }

  async findAll(pagination: PaginationDto, filters: {
    learnerId?: string;
    trainerId?: string;
    status?: string;
    programmeId?: string;
  } = {}) {
    const { page = 1, pageSize = 20 } = pagination;
    const filter: any = {};
    if (filters.learnerId) filter.learnerId = new Types.ObjectId(filters.learnerId);
    if (filters.trainerId) filter.trainerId = new Types.ObjectId(filters.trainerId);
    if (filters.status) filter.status = filters.status;
    if (filters.programmeId) filter.programmeId = new Types.ObjectId(filters.programmeId);

    const [data, total] = await Promise.all([
      this.taskModel
        .find(filter)
        .populate('learnerId', 'firstName lastName email')
        .populate('trainerId', 'firstName lastName email')
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .lean(),
      this.taskModel.countDocuments(filter),
    ]);

    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async findById(id: string) {
    const task = await this.taskModel
      .findById(id)
      .populate('learnerId', 'firstName lastName email avatar')
      .populate('trainerId', 'firstName lastName email avatar')
      .lean();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, dto: UpdateTaskDto, requestingUser: any) {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');

    // Learners can only update their own tasks (evidence, declaration)
    if (requestingUser.role === 'learner') {
      if (task.learnerId.toString() !== requestingUser._id) {
        throw new ForbiddenException('Cannot update another learner\'s task');
      }
      // Learners cannot change status to Approved/Rejected
      if (dto.status && ['Approved', 'Rejected'].includes(dto.status)) {
        throw new ForbiddenException('Learners cannot set Approved or Rejected status');
      }
    }

    // Trainers can only update their own learners' tasks
    if (requestingUser.role === 'trainer') {
      if (task.trainerId?.toString() !== requestingUser._id) {
        throw new ForbiddenException('Cannot update tasks for learners not in your cohort');
      }
    }

    const updated = await this.taskModel.findByIdAndUpdate(id, dto, { new: true }).lean();
    return updated;
  }

  async submitForReview(id: string, userId: string) {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    if (task.learnerId.toString() !== userId) throw new ForbiddenException('Not your task');

    return this.taskModel.findByIdAndUpdate(
      id,
      { status: 'Complete', dateCompleted: new Date() },
      { new: true },
    ).lean();
  }

  async approve(id: string, trainerId: string) {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return this.taskModel.findByIdAndUpdate(
      id,
      { status: 'Approved' },
      { new: true },
    ).lean();
  }

  async reject(id: string, trainerId: string, reason: string) {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return this.taskModel.findByIdAndUpdate(
      id,
      { status: 'Rejected', rejectionReason: reason },
      { new: true },
    ).lean();
  }

  async getMyTasks(userId: string, pagination: PaginationDto, status?: string) {
    return this.findAll(pagination, { learnerId: userId, ...(status ? { status } : {}) });
  }

  async getTasksForTrainer(trainerId: string, pagination: PaginationDto, status?: string) {
    return this.findAll(pagination, { trainerId, ...(status ? { status } : {}) });
  }
}
