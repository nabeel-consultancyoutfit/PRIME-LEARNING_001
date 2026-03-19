import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TrainerDocument = Trainer & Document;

@Schema({ timestamps: true, collection: 'trainers' })
export class Trainer {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ default: null })
  specialisation: string;

  @Prop({ default: null })
  qualifications: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  learnerIds: Types.ObjectId[];

  @Prop({ default: 0 })
  maxLearners: number;

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
TrainerSchema.index({ userId: 1 });
