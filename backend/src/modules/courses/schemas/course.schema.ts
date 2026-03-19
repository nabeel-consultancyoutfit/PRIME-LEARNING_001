import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl: string;
  duration: number; // minutes
  order: number;
  resources: Array<{ title: string; url: string; type: string }>;
}

export type CourseDocument = Course & Document;

@Schema({ timestamps: true, collection: 'courses' })
export class Course {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: null })
  description: string;

  @Prop({ default: null })
  thumbnail: string;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  instructorId: Types.ObjectId;

  @Prop({ type: [Object], default: [] })
  lessons: Lesson[];

  @Prop({ type: [String], default: [] })
  ksbTags: string[];

  @Prop({ type: Types.ObjectId, ref: 'Programme', default: null })
  programmeId: Types.ObjectId;

  @Prop({ default: 0 })
  duration: number; // total minutes

  @Prop({ enum: ['draft', 'published', 'archived'], default: 'draft' })
  status: string;

  @Prop({ default: 0 })
  enrollmentCount: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
CourseSchema.index({ programmeId: 1 });
CourseSchema.index({ status: 1 });
