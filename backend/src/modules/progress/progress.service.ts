import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Progress, ProgressDocument } from './schemas/progress.schema';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class ProgressService {
  constructor(@InjectModel(Progress.name) private progressModel: Model<ProgressDocument>) {}

  async getMyProgress(userId: string) {
    let progress = await this.progressModel
      .findOne({ learnerId: new Types.ObjectId(userId) })
      .populate('programmeId', 'title ksbs')
      .lean();
    if (!progress) {
      // Create empty progress record for new learner
      progress = await this.progressModel.create({
        learnerId: userId,
        lastUpdated: new Date(),
      });
    }
    return progress;
  }

  async getProgressByLearnerId(learnerId: string) {
    const progress = await this.progressModel
      .findOne({ learnerId: new Types.ObjectId(learnerId) })
      .populate('learnerId', 'firstName lastName email')
      .populate('programmeId', 'title')
      .lean();
    if (!progress) throw new NotFoundException('Progress record not found');
    return progress;
  }

  async findAll(pagination: PaginationDto, trainerId?: string) {
    const { page = 1, pageSize = 20 } = pagination;
    const [data, total] = await Promise.all([
      this.progressModel
        .find()
        .populate('learnerId', 'firstName lastName email avatar')
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .lean(),
      this.progressModel.countDocuments(),
    ]);
    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async updateProgress(
    learnerId: string,
    update: Partial<Pick<Progress, 'tasksCompleted' | 'tasksTotal' | 'evidenceApproved' |
      'journalsPublished' | 'otjHoursLogged' | 'otjHoursTarget' | 'ksbProgress' | 'overallPercentage'>>,
  ) {
    return this.progressModel.findOneAndUpdate(
      { learnerId: new Types.ObjectId(learnerId) },
      { ...update, lastUpdated: new Date() },
      { new: true, upsert: true },
    ).lean();
  }

  async markKSBComplete(learnerId: string, ksbCode: string) {
    return this.progressModel.findOneAndUpdate(
      { learnerId: new Types.ObjectId(learnerId), 'ksbProgress.ksbCode': ksbCode },
      { $set: { 'ksbProgress.$.completed': true, 'ksbProgress.$.completedAt': new Date() } },
      { new: true },
    ).lean();
  }
}
