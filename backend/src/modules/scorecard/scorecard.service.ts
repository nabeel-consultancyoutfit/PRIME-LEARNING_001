import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Scorecard, ScorecardDocument } from './schemas/scorecard.schema';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class ScorecardService {
  constructor(@InjectModel(Scorecard.name) private scorecardModel: Model<ScorecardDocument>) {}

  async getMyScorecard(userId: string) {
    let sc = await this.scorecardModel
      .findOne({ learnerId: new Types.ObjectId(userId) })
      .populate('programmeId', 'title ksbs')
      .lean();
    if (!sc) {
      sc = await this.scorecardModel.create({ learnerId: userId });
    }
    return sc;
  }

  async getBylearnerId(learnerId: string) {
    const sc = await this.scorecardModel
      .findOne({ learnerId: new Types.ObjectId(learnerId) })
      .populate('learnerId', 'firstName lastName email')
      .populate('programmeId', 'title')
      .lean();
    if (!sc) throw new NotFoundException('Scorecard not found');
    return sc;
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, pageSize = 20 } = pagination;
    const [data, total] = await Promise.all([
      this.scorecardModel
        .find()
        .populate('learnerId', 'firstName lastName email')
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .lean(),
      this.scorecardModel.countDocuments(),
    ]);
    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async updateEntry(learnerId: string, ksbCode: string, data: any, reviewerId: string) {
    return this.scorecardModel.findOneAndUpdate(
      { learnerId: new Types.ObjectId(learnerId), 'entries.ksbCode': ksbCode },
      {
        $set: {
          'entries.$': { ...data, ksbCode, lastUpdated: new Date() },
          lastReviewDate: new Date(),
          lastReviewedBy: reviewerId,
        },
      },
      { new: true },
    ).lean();
  }

  async updateSelfAssessment(learnerId: string, entries: any[]) {
    return this.scorecardModel.findOneAndUpdate(
      { learnerId: new Types.ObjectId(learnerId) },
      {
        $set: {
          entries: entries.map((e) => ({ ...e, lastUpdated: new Date() })),
        },
      },
      { new: true, upsert: true },
    ).lean();
  }
}
