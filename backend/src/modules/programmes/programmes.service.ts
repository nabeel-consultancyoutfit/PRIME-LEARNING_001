import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Programme, ProgrammeDocument } from './schemas/programme.schema';
import { CreateProgrammeDto } from './dto/create-programme.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class ProgrammesService {
  constructor(@InjectModel(Programme.name) private programmeModel: Model<ProgrammeDocument>) {}

  async create(dto: CreateProgrammeDto, userId: string) {
    return this.programmeModel.create({ ...dto, createdBy: userId });
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, pageSize = 20 } = pagination;
    const [data, total] = await Promise.all([
      this.programmeModel
        .find({ status: 'active' })
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .lean(),
      this.programmeModel.countDocuments({ status: 'active' }),
    ]);
    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async findById(id: string) {
    const prog = await this.programmeModel.findById(id).lean();
    if (!prog) throw new NotFoundException('Programme not found');
    return prog;
  }

  async update(id: string, dto: Partial<CreateProgrammeDto>) {
    const prog = await this.programmeModel.findByIdAndUpdate(id, dto, { new: true }).lean();
    if (!prog) throw new NotFoundException('Programme not found');
    return prog;
  }

  async archive(id: string) {
    return this.programmeModel.findByIdAndUpdate(id, { status: 'archived' }, { new: true }).lean();
  }
}
