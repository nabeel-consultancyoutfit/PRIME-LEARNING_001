/**
 * Learner Messages Service — wraps the real backend /messages API.
 */

import {
  messagesService as coreMessagesService,
  Conversation as CoreConversation,
  Message as CoreMessage,
} from '@/services/messages/messagesService';

export interface LearnerMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  timestamp: string;
  isFromLearner: boolean;
}

export interface LearnerConversation {
  id: string;
  contactId: string;
  contactName: string;
  contactInitials: string;
  contactRole: string;
  avatarColor: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen: string;
  programme: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isResolved: boolean;
  messages: LearnerMessage[];
}

const AVATAR_COLORS = ['#7B61FF', '#F5A623', '#E53935', '#4A90D9', '#43A047', '#AB47BC'];

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
    if (mins < 1) return 'Just now';
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

/** Get the "other" participant (not the current learner) from a conversation */
function getOtherParticipant(conv: CoreConversation, currentUserId?: string): any {
  if (!currentUserId) return conv.participants[0] ?? {};
  return conv.participants.find((p: any) => (p._id ?? p) !== currentUserId) ?? conv.participants[0] ?? {};
}

function mapCoreConversation(conv: CoreConversation, idx: number, currentUserId?: string): LearnerConversation {
  const other = getOtherParticipant(conv, currentUserId);
  const firstName = other.firstName ?? '';
  const lastName = other.lastName ?? '';
  const contactName = `${firstName} ${lastName}`.trim() || 'Unknown';
  const contactId = other._id ?? String(idx);
  const role = other.role ?? 'Trainer';
  const lastMsg = conv.lastMessage as any;
  const lastMessageContent = typeof lastMsg === 'string' ? lastMsg : lastMsg?.content ?? '';

  return {
    id: conv._id,
    contactId,
    contactName,
    contactInitials: getInitials(contactName),
    contactRole: role.charAt(0).toUpperCase() + role.slice(1),
    avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
    status: 'offline',
    lastSeen: conv.lastMessageAt ? `Last seen ${formatRelativeTime(conv.lastMessageAt)}` : '',
    programme: '—',
    lastMessage: lastMessageContent,
    lastMessageTime: formatRelativeTime(conv.lastMessageAt ?? conv.createdAt),
    unreadCount: conv.unreadCount ?? 0,
    isResolved: false,
    messages: [],
  };
}

function mapCoreMessage(msg: CoreMessage, currentUserId?: string): LearnerMessage {
  const sender = msg.senderId as any;
  const senderId = sender?._id ?? sender ?? '';
  const firstName = sender?.firstName ?? '';
  const lastName = sender?.lastName ?? '';
  const senderName = firstName ? `${firstName} ${lastName}`.trim() : 'Unknown';
  const isFromLearner = currentUserId ? senderId === currentUserId : false;

  return {
    id: msg._id,
    content: msg.content,
    senderId,
    senderName,
    senderInitials: getInitials(senderName),
    timestamp: msg.createdAt
      ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '',
    isFromLearner,
  };
}

function getCurrentUserId(): string | undefined {
  try {
    const stored = localStorage.getItem('authUser');
    return stored ? JSON.parse(stored).id : undefined;
  } catch {
    return undefined;
  }
}

export const learnerMessagesService = {
  async getConversations(): Promise<LearnerConversation[]> {
    const currentUserId = getCurrentUserId();
    const data = await coreMessagesService.getConversations();
    const list: CoreConversation[] = Array.isArray(data) ? data : (data as any)?.data ?? [];
    return list.map((c, i) => mapCoreConversation(c, i, currentUserId));
  },

  async getConversation(id: string): Promise<LearnerConversation | undefined> {
    const all = await learnerMessagesService.getConversations();
    return all.find((c) => c.id === id);
  },

  async getMessages(conversationId: string): Promise<LearnerMessage[]> {
    const currentUserId = getCurrentUserId();
    const res = await coreMessagesService.getMessages(conversationId, { page: 1, pageSize: 50 });
    const msgs: CoreMessage[] = res?.data ?? [];
    return [...msgs].reverse().map((m) => mapCoreMessage(m, currentUserId));
  },

  async sendMessage(conversationId: string, content: string): Promise<LearnerMessage> {
    const currentUserId = getCurrentUserId();
    const msg = await coreMessagesService.sendMessage(conversationId, content);
    return mapCoreMessage(msg, currentUserId);
  },

  async startConversation(userId: string): Promise<LearnerConversation> {
    const conv = await coreMessagesService.startConversation(userId);
    return mapCoreConversation(conv, 0, getCurrentUserId());
  },
};
