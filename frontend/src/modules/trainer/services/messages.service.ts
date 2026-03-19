/**
 * Trainer Messages Service — wraps the real backend /messages API.
 */

import {
  messagesService as coreMessagesService,
  Conversation as CoreConversation,
  Message as CoreMessage,
} from '@/services/messages/messagesService';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  timestamp: string;
  isFromTrainer: boolean;
}

export interface Conversation {
  id: string;
  learnerId: string;
  learnerName: string;
  learnerInitials: string;
  avatarColor: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen: string;
  programme: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isResolved: boolean;
  messages: Message[];
}

const AVATAR_COLORS = ['#7B61FF', '#4CAF50', '#F5A623', '#4A90D9', '#F44336', '#00BCD4'];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatRelativeTime(dateStr: string | undefined): string {
  if (!dateStr) return '';
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  } catch {
    return '';
  }
}

function mapCoreMessage(msg: CoreMessage, currentUserId?: string): Message {
  const sender = msg.senderId as any;
  const senderId = sender?._id ?? sender ?? '';
  const firstName = sender?.firstName ?? '';
  const lastName = sender?.lastName ?? '';
  const senderName = firstName ? `${firstName} ${lastName}`.trim() : 'Unknown';
  return {
    id: msg._id,
    content: msg.content,
    senderId,
    senderName,
    senderInitials: getInitials(senderName),
    timestamp: msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
    isFromTrainer: currentUserId ? senderId === currentUserId : false,
  };
}

function mapCoreConversation(conv: CoreConversation, idx: number): Conversation {
  const participants = (conv.participants ?? []) as any[];
  // The "other" participant from the trainer's perspective is the learner
  const learnerParticipant = participants.find((p) => {
    const role = p.role ?? p?.userId?.role;
    return role === 'learner';
  }) ?? participants[0] ?? {};

  const firstName = learnerParticipant.firstName ?? learnerParticipant?.userId?.firstName ?? 'Learner';
  const lastName = learnerParticipant.lastName ?? learnerParticipant?.userId?.lastName ?? '';
  const learnerName = `${firstName} ${lastName}`.trim();
  const learnerId = learnerParticipant._id ?? learnerParticipant?.userId?._id ?? '';

  const lastMsg = conv.lastMessage as any;
  const lastMessageContent = typeof lastMsg === 'string' ? lastMsg : lastMsg?.content ?? '';
  const lastMessageTime = formatRelativeTime(conv.updatedAt);

  return {
    id: conv._id,
    learnerId,
    learnerName,
    learnerInitials: getInitials(learnerName),
    avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
    status: 'offline',
    lastSeen: conv.updatedAt ? `Last seen ${formatRelativeTime(conv.updatedAt)}` : '',
    programme: '—',
    lastMessage: lastMessageContent,
    lastMessageTime,
    unreadCount: conv.unreadCount ?? 0,
    isResolved: false,
    messages: [],
  };
}

export const messagesService = {
  async getConversations(): Promise<Conversation[]> {
    const data = await coreMessagesService.getConversations();
    const list: CoreConversation[] = Array.isArray(data) ? data : (data as any)?.data ?? [];
    return list.map((c, i) => mapCoreConversation(c, i));
  },

  async getConversation(id: string): Promise<Conversation | undefined> {
    const all = await messagesService.getConversations();
    return all.find((c) => c.id === id);
  },

  async getMessages(conversationId: string, currentUserId?: string): Promise<Message[]> {
    const res = await coreMessagesService.getMessages(conversationId, { page: 1, pageSize: 50 });
    const msgs: CoreMessage[] = res?.data ?? [];
    return [...msgs].reverse().map((m) => mapCoreMessage(m, currentUserId));
  },

  async sendMessage(conversationId: string, content: string, currentUserId?: string): Promise<Message> {
    const msg = await coreMessagesService.sendMessage(conversationId, content);
    return mapCoreMessage(msg, currentUserId);
  },

  async startConversation(userId: string): Promise<Conversation> {
    const conv = await coreMessagesService.startConversation(userId);
    return mapCoreConversation(conv, 0);
  },
};
