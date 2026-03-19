import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt: Date | null;
  timeSpent: number; // seconds
}

export type EnrollmentDocument = Enrollment & Document;

@Schema({ timestamps: true, collection: 'enrollments' })
export class Enrollment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  learnerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ default: 0 })
  progressPercentage: number;

  @Prop({ type: [Object], default: [] })
  lessonProgress: LessonProgress[];

  @Prop({ enum: ['enrolled', 'in_progress', 'completed', 'dropped'], default: 'enrolled' })
  status: string;

  @Prop({ default: null })
  completedAt: Date;

  @Prop({ default: null })
  certificateUrl: string;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
EnrollmentSchema.index({ learnerId: 1, courseId: 1 }, { unique: true });
EnrollmentSchema.index({ courseId: 1 });
