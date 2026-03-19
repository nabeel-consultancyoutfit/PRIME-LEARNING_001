import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EvidenceDocument = Evidence & Document;

@Schema({ timestamps: true, collection: 'evidence' })
export class Evidence {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  learnerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Task', default: null })
  taskId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: null })
  description: string;

  @Prop({ default: null })
  content: string; // rich text

  @Prop({ type: [String], default: [] })
  attachments: string[]; // file URLs

  @Prop({ type: [String], default: [] })
  ksbTags: string[];

  @Prop({ enum: ['draft', 'submitted', 'approved', 'rejected'], default: 'draft' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  reviewedBy: Types.ObjectId;

  @Prop({ default: null })
  reviewedAt: Date;

  @Prop({ default: null })
  reviewNotes: string;
}

export const EvidenceSchema = SchemaFactory.createForClass(Evidence);
EvidenceSchema.index({ learnerId: 1, status: 1 });
EvidenceSchema.index({ taskId: 1 });
