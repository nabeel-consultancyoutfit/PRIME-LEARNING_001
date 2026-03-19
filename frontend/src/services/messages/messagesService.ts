/**
 * Messages service — wraps the backend /messages API.
 */

import { apiClient } from '@/services/api';

export interface MessageUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface Conversation {
  _id: string;
  participants: MessageUser[];
  lastMessage?: string;
  lastMessageAt?: string;
  lastMessageBy?: string | MessageUser;
  unreadCount: number;
  createdAt?: string;
}

export interface Message {
  _id: string;
  conversationId: string;
  senderId: string | MessageUser;
  content: string;
  type: 'text' | 'file' | 'image';
  fileUrl?: string;
  readBy: string[];
  isDeleted: boolean;
  createdAt?: string;
}

export interface PaginatedMessages {
  success: boolean;
  data: Message[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

const unwrap = (res: any) => (res && 'data' in res ? res.data : res);

export const messagesService = {
  // Get all my conversations
  getConversations: async (): Promise<Conversation[]> => {
    return unwrap(await apiClient.get<any>('/messages/conversations'));
  },

  // Start or get existing conversation with a user
  startConversation: async (userId: string): Promise<Conversation> => {
    return unwrap(await apiClient.post<any>('/messages/conversations/start', { userId }));
  },

  // Get messages in a conversation
  getMessages: async (
    conversationId: string,
    params?: { page?: number; pageSize?: number },
  ): Promise<PaginatedMessages> => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/messages/conversations/${conversationId}${query}`);
  },

  // Send a message
  sendMessage: async (
    conversationId: string,
    content: string,
    type: 'text' | 'file' | 'image' = 'text',
    fileUrl?: string,
  ): Promise<Message> => {
    return unwrap(
      await apiClient.post<any>('/messages', { conversationId, content, type, fileUrl }),
    );
  },

  // Delete a message (soft delete)
  deleteMessage: async (messageId: string): Promise<void> => {
    await apiClient.delete(`/messages/${messageId}`);
  },
};
