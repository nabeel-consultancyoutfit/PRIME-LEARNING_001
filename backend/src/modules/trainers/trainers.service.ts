import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Trainer, TrainerDocument } from './schemas/trainer.schema';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class TrainersService {
  constructor(@InjectModel(Trainer.name) private trainerModel: Model<TrainerDocument>) {}

  async findAll(pagination: PaginationDto) {
    const { page = 1, pageSize = 20 } = pagination;
    const [data, total] = await Promise.all([
      this.trainerModel
        .find()
        .populate('userId', 'firstName lastName email avatar')
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .lean(),
      this.trainerModel.countDocuments(),
    ]);
    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async findByUserId(userId: string) {
    const trainer = await this.trainerModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate('userId', 'firstName lastName email avatar phone')
      .lean();
    if (!trainer) throw new NotFoundException('Trainer profile not found');
    return trainer;
  }

  async findById(id: string) {
    const trainer = await this.trainerModel
      .findById(id)
      .populate('userId', 'firstName lastName email avatar')
      .lean();
    if (!trainer) throw new NotFoundException('Trainer not found');
    return trainer;
  }

  async update(id: string, data: Partial<Trainer>) {
    const trainer = await this.trainerModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean();
    if (!trainer) throw new NotFoundException('Trainer not found');
    return trainer;
  }

  async getMyProfile(userId: string) {
    return this.findByUserId(userId);
  }

  async getMyLearners(userId: string, pagination: PaginationDto) {
    const trainer = await this.trainerModel.findOne({ userId: new Types.ObjectId(userId) });
    if (!trainer) throw new NotFoundException('Trainer profile not found');
    return {
      success: true,
      data: trainer.learnerIds,
      meta: buildPaginationMeta(trainer.learnerIds.length, pagination.page || 1, pagination.pageSize || 20),
    };
  }
}
