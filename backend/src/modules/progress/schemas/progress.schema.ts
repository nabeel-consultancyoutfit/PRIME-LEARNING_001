import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface KSBProgressItem {
  ksbCode: string;
  ksbType: 'knowledge' | 'skill' | 'behaviour';
  title: string;
  completed: boolean;
  completedAt: Date | null;
  evidence: string[];
}

export type ProgressDocument = Progress & Document;

@Schema({ timestamps: true, collection: 'progress' })
export class Progress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  learnerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Programme', default: null })
  programmeId: Types.ObjectId;

  @Prop({ default: 0 })
  overallPercentage: number;

  @Prop({ default: 0 })
  tasksCompleted: number;

  @Prop({ default: 0 })
  tasksTotal: number;

  @Prop({ default: 0 })
  evidenceApproved: number;

  @Prop({ default: 0 })
  journalsPublished: number;

  @Prop({ default: 0 })
  otjHoursLogged: number;

  @Prop({ default: 0 })
  otjHoursTarget: number;

  @Prop({ type: [Object], default: [] })
  ksbProgress: KSBProgressItem[];

  @Prop({ default: null })
  lastUpdated: Date;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
ProgressSchema.index({ learnerId: 1 });
