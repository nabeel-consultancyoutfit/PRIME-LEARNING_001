import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conversation, ConversationDocument } from './schemas/conversation.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { SendMessageDto } from './dto/send-message.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async getMyConversations(userId: string) {
    return this.conversationModel
      .find({ participants: new Types.ObjectId(userId) })
      .populate('participants', 'firstName lastName email avatar role')
      .sort({ lastMessageAt: -1 })
      .lean();
  }

  async getOrCreateConversation(userId: string, otherUserId: string) {
    const existing = await this.conversationModel.findOne({
      participants: {
        $all: [new Types.ObjectId(userId), new Types.ObjectId(otherUserId)],
        $size: 2,
      },
    });
    if (existing) return existing;
    return this.conversationModel.create({
      participants: [userId, otherUserId],
    });
  }

  async getMessages(conversationId: string, userId: string, pagination: PaginationDto) {
    const conv = await this.conversationModel.findById(conversationId);
    if (!conv) throw new NotFoundException('Conversation not found');
    const isParticipant = conv.participants.some((p) => p.toString() === userId);
    if (!isParticipant) throw new ForbiddenException('Not a conversation participant');

    const { page = 1, pageSize = 50 } = pagination;
    const [data, total] = await Promise.all([
      this.messageModel
        .find({ conversationId: new Types.ObjectId(conversationId), isDeleted: false })
        .populate('senderId', 'firstName lastName avatar')
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .lean(),
      this.messageModel.countDocuments({ conversationId: new Types.ObjectId(conversationId), isDeleted: false }),
    ]);

    // Mark messages as read
    await this.messageModel.updateMany(
      { conversationId: new Types.ObjectId(conversationId), readBy: { $ne: new Types.ObjectId(userId) } },
      { $addToSet: { readBy: userId } },
    );

    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async sendMessage(dto: SendMessageDto, senderId: string) {
    const conv = await this.conversationModel.findById(dto.conversationId);
    if (!conv) throw new NotFoundException('Conversation not found');
    const isParticipant = conv.participants.some((p) => p.toString() === senderId);
    if (!isParticipant) throw new ForbiddenException('Not a conversation participant');

    const message = await this.messageModel.create({
      ...dto,
      senderId,
      readBy: [senderId],
    });

    // Update conversation last message
    await this.conversationModel.findByIdAndUpdate(dto.conversationId, {
      lastMessage: dto.content.substring(0, 100),
      lastMessageAt: new Date(),
      lastMessageBy: senderId,
    });

    return message;
  }

  async deleteMessage(messageId: string, userId: string) {
    const msg = await this.messageModel.findById(messageId);
    if (!msg) throw new NotFoundException('Message not found');
    if (msg.senderId.toString() !== userId) throw new ForbiddenException('Cannot delete another user\'s message');
    return this.messageModel.findByIdAndUpdate(messageId, { isDeleted: true }, { new: true }).lean();
  }
}
