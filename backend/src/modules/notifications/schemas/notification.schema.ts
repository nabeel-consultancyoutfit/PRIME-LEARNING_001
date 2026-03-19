import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true, collection: 'notifications' })
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({
    enum: ['task', 'evidence', 'message', 'progress', 'system', 'feedback'],
    default: 'system',
  })
  type: string;

  @Prop({ default: null })
  link: string;

  @Prop({ type: Object, default: null })
  meta: Record<string, any>;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ default: null })
  readAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
NotificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
