import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Journal, JournalDocument } from './schemas/journal.schema';
import { CreateJournalDto } from './dto/create-journal.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class JournalsService {
  constructor(@InjectModel(Journal.name) private journalModel: Model<JournalDocument>) {}

  async create(dto: CreateJournalDto, learnerId: string) {
    const journal = await this.journalModel.create({ ...dto, learnerId });
    if (dto.status === 'published') {
      await this.journalModel.findByIdAndUpdate(journal._id, { publishedAt: new Date() });
    }
    return journal;
  }

  async findAll(pagination: PaginationDto, learnerId?: string, status?: string) {
    const { page = 1, pageSize = 20 } = pagination;
    const filter: any = {};
    if (learnerId) filter.learnerId = new Types.ObjectId(learnerId);
    if (status) filter.status = status;

    const [data, total] = await Promise.all([
      this.journalModel
        .find(filter)
        .populate('learnerId', 'firstName lastName email')
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .lean(),
      this.journalModel.countDocuments(filter),
    ]);
    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async findById(id: string) {
    const journal = await this.journalModel
      .findById(id)
      .populate('learnerId', 'firstName lastName email')
      .lean();
    if (!journal) throw new NotFoundException('Journal not found');
    return journal;
  }

  async update(id: string, dto: Partial<CreateJournalDto>, userId: string, role: string) {
    const journal = await this.journalModel.findById(id);
    if (!journal) throw new NotFoundException('Journal not found');
    if (role === 'learner' && journal.learnerId.toString() !== userId) {
      throw new ForbiddenException('Cannot edit another learner\'s journal');
    }
    const update: any = { ...dto };
    if (dto.status === 'published' && journal.status !== 'published') {
      update.publishedAt = new Date();
    }
    return this.journalModel.findByIdAndUpdate(id, update, { new: true }).lean();
  }

  async delete(id: string, userId: string, role: string) {
    const journal = await this.journalModel.findById(id);
    if (!journal) throw new NotFoundException('Journal not found');
    if (role === 'learner' && journal.learnerId.toString() !== userId) {
      throw new ForbiddenException('Cannot delete another learner\'s journal');
    }
    await this.journalModel.findByIdAndDelete(id);
    return { message: 'Journal deleted' };
  }

  async getMyJournals(userId: string, pagination: PaginationDto, status?: string) {
    return this.findAll(pagination, userId, status);
  }
}
