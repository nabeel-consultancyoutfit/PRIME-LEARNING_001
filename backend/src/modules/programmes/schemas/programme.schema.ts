import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface KSB {
  code: string;
  type: 'knowledge' | 'skill' | 'behaviour';
  title: string;
  description: string;
}

export type ProgrammeDocument = Programme & Document;

@Schema({ timestamps: true, collection: 'programmes' })
export class Programme {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: null })
  description: string;

  @Prop({ default: null })
  apprenticeshipStandard: string;

  @Prop({ default: null })
  level: number;

  @Prop({ default: null })
  duration: number; // months

  @Prop({ type: [Object], default: [] })
  ksbs: KSB[];

  @Prop({ default: 0 })
  otjHoursRequired: number;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  createdBy: Types.ObjectId;

  @Prop({ enum: ['active', 'archived'], default: 'active' })
  status: string;
}

export const ProgrammeSchema = SchemaFactory.createForClass(Programme);
