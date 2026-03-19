import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LearnerDocument = Learner & Document;

@Schema({ timestamps: true, collection: 'learners' })
export class Learner {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  trainerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Programme', default: null })
  programmeId: Types.ObjectId;

  @Prop({ default: null })
  apprenticeshipStandard: string;

  @Prop({ default: null })
  cohort: string;

  @Prop({ default: null })
  startDate: Date;

  @Prop({ default: null })
  expectedEndDate: Date;

  @Prop({ default: null })
  actualEndDate: Date;

  @Prop({ default: null })
  employer: string;

  @Prop({ default: null })
  employerContact: string;

  @Prop({ default: 0 })
  otjHoursTarget: number;

  @Prop({ default: 0 })
  otjHoursLogged: number;

  @Prop({ enum: ['active', 'on_break', 'withdrawn', 'completed'], default: 'active' })
  status: string;

  @Prop({ default: 0 })
  overallProgress: number; // 0-100

  @Prop({ type: [{ type: String }], default: [] })
  ksbCompleted: string[];
}

export const LearnerSchema = SchemaFactory.createForClass(Learner);
LearnerSchema.index({ userId: 1 });
LearnerSchema.index({ trainerId: 1 });
