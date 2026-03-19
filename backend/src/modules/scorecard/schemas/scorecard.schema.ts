import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface ScorecardEntry {
  ksbCode: string;
  ksbType: 'knowledge' | 'skill' | 'behaviour';
  title: string;
  selfAssessment: number;      // 1-4
  trainerAssessment: number;   // 1-4
  iqaAssessment: number;       // 1-4
  notes: string;
  lastUpdated: Date;
}

export type ScorecardDocument = Scorecard & Document;

@Schema({ timestamps: true, collection: 'scorecards' })
export class Scorecard {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  learnerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Programme', default: null })
  programmeId: Types.ObjectId;

  @Prop({ type: [Object], default: [] })
  entries: ScorecardEntry[];

  @Prop({ default: null })
  overallSelfScore: number;

  @Prop({ default: null })
  overallTrainerScore: number;

  @Prop({ default: null })
  lastReviewDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  lastReviewedBy: Types.ObjectId;
}

export const ScorecardSchema = SchemaFactory.createForClass(Scorecard);
ScorecardSchema.index({ learnerId: 1 });
