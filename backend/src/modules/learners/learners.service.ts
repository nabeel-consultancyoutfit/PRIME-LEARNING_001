import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Learner, LearnerDocument } from './schemas/learner.schema';
import { CreateLearnerDto } from './dto/create-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class LearnersService {
  constructor(@InjectModel(Learner.name) private learnerModel: Model<LearnerDocument>) {}

  async create(dto: CreateLearnerDto) {
    return this.learnerModel.create(dto);
  }

  async findAll(pagination: PaginationDto, trainerId?: string) {
    const { page = 1, pageSize = 20 } = pagination;
    const filter: any = {};
    if (trainerId) filter.trainerId = new Types.ObjectId(trainerId);

    const [data, total] = await Promise.all([
      this.learnerModel
        .find(filter)
        .populate('userId', 'firstName lastName email avatar')
        .populate('trainerId', 'firstName lastName email')
        .populate('programmeId', 'title')
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .lean(),
      this.learnerModel.countDocuments(filter),
    ]);

    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async findByUserId(userId: string) {
    const learner = await this.learnerModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate('userId', 'firstName lastName email avatar phone address')
      .populate('trainerId', 'firstName lastName email avatar')
      .populate('programmeId', 'title description')
      .lean();
    if (!learner) throw new NotFoundException('Learner profile not found');
    return learner;
  }

  async findById(id: string) {
    const learner = await this.learnerModel
      .findById(id)
      .populate('userId', 'firstName lastName email avatar')
      .populate('trainerId', 'firstName lastName email')
      .populate('programmeId', 'title')
      .lean();
    if (!learner) throw new NotFoundException('Learner not found');
    return learner;
  }

  async update(id: string, dto: UpdateLearnerDto, requestingUser: any) {
    // Trainers can only update their own learners
    if (requestingUser.role === 'trainer') {
      const learner = await this.learnerModel.findById(id);
      if (!learner) throw new NotFoundException('Learner not found');
      if (learner.trainerId?.toString() !== requestingUser._id) {
        throw new ForbiddenException('You can only update your own learners');
      }
    }
    const updated = await this.learnerModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean();
    if (!updated) throw new NotFoundException('Learner not found');
    return updated;
  }

  async getMyProfile(userId: string) {
    return this.findByUserId(userId);
  }

  async updateOtjHours(learnerId: string, hoursToAdd: number) {
    return this.learnerModel.findByIdAndUpdate(
      learnerId,
      { $inc: { otjHoursLogged: hoursToAdd } },
      { new: true },
    ).lean();
  }
}
