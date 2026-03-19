import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JournalDocument = Journal & Document;

@Schema({ timestamps: true, collection: 'journals' })
export class Journal {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  learnerId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  content: string; // rich text / markdown

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: [String], default: [] })
  ksbTags: string[];

  @Prop({ enum: ['draft', 'published'], default: 'draft' })
  status: string;

  @Prop({ default: null })
  publishedAt: Date;
}

export const JournalSchema = SchemaFactory.createForClass(Journal);
JournalSchema.index({ learnerId: 1, status: 1 });
