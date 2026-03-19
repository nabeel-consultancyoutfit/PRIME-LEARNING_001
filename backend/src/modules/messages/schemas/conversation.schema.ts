import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true, collection: 'conversations' })
export class Conversation {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  @Prop({ default: null })
  lastMessage: string;

  @Prop({ default: null })
  lastMessageAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  lastMessageBy: Types.ObjectId;

  @Prop({ default: 0 })
  unreadCount: number;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
ConversationSchema.index({ participants: 1 });
