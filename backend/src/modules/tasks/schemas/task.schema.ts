import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface AssessmentCriterion {
  id: string;
  title: string;
  subItems: Array<{ id: string; text: string; checked: boolean }>;
}

export interface TaskResource {
  id: string;
  title: string;
  url: string;
  type: string;
}

export type TaskDocument = Task & Document;

@Schema({ timestamps: true, collection: 'tasks' })
export class Task {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  learnerId: Types.ObjectId;   // user._id of learner

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  trainerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Programme', default: null })
  programmeId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: null })
  subtitle: string;

  @Prop({ required: true })
  primaryMethod: string;

  @Prop({ type: [String], default: [] })
  secondaryMethods: string[];

  @Prop({ type: [Object], default: [] })
  assessmentCriteria: AssessmentCriterion[];

  @Prop({ type: [String], default: [] })
  skillTags: string[];

  @Prop({ type: [Object], default: [] })
  associatedResources: TaskResource[];

  @Prop({ default: null })
  reference: string;

  @Prop({ default: null })
  dateSet: Date;

  @Prop({ default: null })
  dateDue: Date;

  @Prop({ default: null })
  dateCompleted: Date;

  @Prop({
    enum: ['In Progress', 'Complete', 'Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  })
  status: string;

  @Prop({ default: false })
  isTrainerAssigned: boolean;

  @Prop({ default: null })
  evidence: string;  // rich text / markdown

  @Prop({ default: null })
  feedbackComments: string;

  @Prop({ default: null })
  declaration: string;

  @Prop({ default: 0 })
  otjHours: number;

  @Prop({ default: null })
  rejectionReason: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.index({ learnerId: 1, status: 1 });
TaskSchema.index({ trainerId: 1 });
TaskSchema.index({ programmeId: 1 });
