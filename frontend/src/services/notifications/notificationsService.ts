/**
 * Notifications service — wraps the backend /notifications API.
 */

import { apiClient } from '@/services/api';

export type NotificationType =
  | 'task'
  | 'evidence'
  | 'message'
  | 'progress'
  | 'system'
  | 'feedback';

export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
  meta?: Record<string, any>;
  isRead: boolean;
  readAt?: string;
  createdAt?: string;
}

export interface PaginatedNotifications {
  success: boolean;
  data: Notification[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

const unwrap = (res: any) => (res && 'data' in res ? res.data : res);

export const notificationsService = {
  getMyNotifications: async (params?: {
    page?: number;
    pageSize?: number;
    unreadOnly?: boolean;
  }): Promise<PaginatedNotifications> => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    if (params?.unreadOnly) qs.set('unreadOnly', 'true');
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/notifications${query}`);
  },

  getUnreadCount: async (): Promise<{ count: number }> => {
    return unwrap(await apiClient.get<any>('/notifications/unread-count'));
  },

  markRead: async (id: string): Promise<Notification> => {
    return unwrap(await apiClient.patch<any>(`/notifications/${id}/read`));
  },

  markAllRead: async (): Promise<{ message: string }> => {
    return unwrap(await apiClient.patch<any>('/notifications/read-all'));
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/notifications/${id}`);
  },
};
