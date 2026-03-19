import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Evidence, EvidenceDocument } from './schemas/evidence.schema';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class EvidenceService {
  constructor(@InjectModel(Evidence.name) private evidenceModel: Model<EvidenceDocument>) {}

  async create(dto: CreateEvidenceDto, learnerId: string) {
    return this.evidenceModel.create({ ...dto, learnerId });
  }

  async findAll(pagination: PaginationDto, learnerId?: string, status?: string) {
    const { page = 1, pageSize = 20 } = pagination;
    const filter: any = {};
    if (learnerId) filter.learnerId = new Types.ObjectId(learnerId);
    if (status) filter.status = status;

    const [data, total] = await Promise.all([
      this.evidenceModel
        .find(filter)
        .populate('learnerId', 'firstName lastName email')
        .populate('taskId', 'title')
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .lean(),
      this.evidenceModel.countDocuments(filter),
    ]);
    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async findById(id: string) {
    const ev = await this.evidenceModel
      .findById(id)
      .populate('learnerId', 'firstName lastName email')
      .populate('taskId', 'title')
      .lean();
    if (!ev) throw new NotFoundException('Evidence not found');
    return ev;
  }

  async update(id: string, data: Partial<CreateEvidenceDto>, userId: string, role: string) {
    const ev = await this.evidenceModel.findById(id);
    if (!ev) throw new NotFoundException('Evidence not found');
    if (role === 'learner' && ev.learnerId.toString() !== userId) {
      throw new ForbiddenException('Cannot update another learner\'s evidence');
    }
    return this.evidenceModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async submit(id: string, userId: string) {
    const ev = await this.evidenceModel.findById(id);
    if (!ev) throw new NotFoundException('Evidence not found');
    if (ev.learnerId.toString() !== userId) throw new ForbiddenException('Not your evidence');
    return this.evidenceModel.findByIdAndUpdate(
      id, { status: 'submitted' }, { new: true },
    ).lean();
  }

  async review(id: string, reviewerId: string, approved: boolean, notes?: string) {
    return this.evidenceModel.findByIdAndUpdate(
      id,
      {
        status: approved ? 'approved' : 'rejected',
        reviewedBy: reviewerId,
        reviewedAt: new Date(),
        reviewNotes: notes,
      },
      { new: true },
    ).lean();
  }

  async getMyEvidence(userId: string, pagination: PaginationDto, status?: string) {
    return this.findAll(pagination, userId, status);
  }
}
