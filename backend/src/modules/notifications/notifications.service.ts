import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(data: {
    userId: string;
    title: string;
    message: string;
    type?: string;
    link?: string;
    meta?: Record<string, any>;
  }) {
    return this.notificationModel.create(data);
  }

  async getMyNotifications(userId: string, pagination: PaginationDto, unreadOnly = false) {
    const { page = 1, pageSize = 20 } = pagination;
    const filter: any = { userId: new Types.ObjectId(userId) };
    if (unreadOnly) filter.isRead = false;

    const [data, total] = await Promise.all([
      this.notificationModel
        .find(filter)
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .lean(),
      this.notificationModel.countDocuments(filter),
    ]);
    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async getUnreadCount(userId: string) {
    const count = await this.notificationModel.countDocuments({
      userId: new Types.ObjectId(userId),
      isRead: false,
    });
    return { count };
  }

  async markRead(notificationId: string, userId: string) {
    return this.notificationModel.findOneAndUpdate(
      { _id: notificationId, userId: new Types.ObjectId(userId) },
      { isRead: true, readAt: new Date() },
      { new: true },
    ).lean();
  }

  async markAllRead(userId: string) {
    await this.notificationModel.updateMany(
      { userId: new Types.ObjectId(userId), isRead: false },
      { isRead: true, readAt: new Date() },
    );
    return { message: 'All notifications marked as read' };
  }

  async deleteNotification(notificationId: string, userId: string) {
    await this.notificationModel.findOneAndDelete({
      _id: notificationId,
      userId: new Types.ObjectId(userId),
    });
    return { message: 'Notification deleted' };
  }
}
