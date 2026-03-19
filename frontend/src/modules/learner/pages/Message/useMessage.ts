/**
 * Hook for Message page state management — uses real backend API.
 */

import { useState, useEffect, useCallback } from 'react';
import { messagesService, Conversation, Message } from '@/services/messages/messagesService';

export interface MessageState {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  isLoadingConversations: boolean;
  isLoadingMessages: boolean;
  isSending: boolean;
  error: string | null;
  newMessage: string;
  hasMoreMessages: boolean;
  messagePage: number;
}

const initialState: MessageState = {
  conversations: [],
  activeConversation: null,
  messages: [],
  isLoadingConversations: false,
  isLoadingMessages: false,
  isSending: false,
  error: null,
  newMessage: '',
  hasMoreMessages: false,
  messagePage: 1,
};

export const useMessage = () => {
  const [state, setState] = useState<MessageState>(initialState);

  // ── Load conversations on mount ────────────────────────────────────────
  const fetchConversations = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoadingConversations: true, error: null }));
    try {
      const data = await messagesService.getConversations();
      setState((prev) => ({
        ...prev,
        conversations: data ?? [],
        isLoadingConversations: false,
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoadingConversations: false,
        error: err?.message ?? 'Failed to load conversations',
      }));
    }
  }, []);

  useEffect(() => { fetchConversations(); }, [fetchConversations]);

  // ── Select a conversation and load its messages ────────────────────────
  const selectConversation = useCallback(async (conversation: Conversation) => {
    setState((prev) => ({
      ...prev,
      activeConversation: conversation,
      messages: [],
      messagePage: 1,
      isLoadingMessages: true,
    }));
    try {
      const res = await messagesService.getMessages(conversation._id, { page: 1, pageSize: 50 });
      setState((prev) => ({
        ...prev,
        messages: [...(res.data ?? [])].reverse(), // oldest first
        hasMoreMessages: res.meta ? res.meta.page < res.meta.totalPages : false,
        isLoadingMessages: false,
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoadingMessages: false,
        error: err?.message ?? 'Failed to load messages',
      }));
    }
  }, []);

  // ── Send a message ─────────────────────────────────────────────────────
  const sendMessage = useCallback(async () => {
    const { activeConversation, newMessage } = state;
    if (!activeConversation || !newMessage.trim()) return;

    setState((prev) => ({ ...prev, isSending: true }));
    try {
      const msg = await messagesService.sendMessage(activeConversation._id, newMessage.trim());
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, msg],
        newMessage: '',
        isSending: false,
      }));
    } catch (err: any) {
      setState((prev) => ({ ...prev, isSending: false, error: err?.message }));
    }
  }, [state]);

  const setNewMessage = (value: string) => {
    setState((prev) => ({ ...prev, newMessage: value }));
  };

  // ── Start a new conversation with a user ──────────────────────────────
  const startConversation = async (userId: string) => {
    try {
      const conv = await messagesService.startConversation(userId);
      setState((prev) => ({
        ...prev,
        conversations: prev.conversations.some((c) => c._id === conv._id)
          ? prev.conversations
          : [conv, ...prev.conversations],
      }));
      await selectConversation(conv);
    } catch (err: any) {
      setState((prev) => ({ ...prev, error: err?.message }));
    }
  };

  return {
    state,
    fetchConversations,
    selectConversation,
    sendMessage,
    setNewMessage,
    startConversation,
  };
};
