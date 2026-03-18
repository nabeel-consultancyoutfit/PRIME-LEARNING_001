/**
 * Learner — Message Page
 * Two-panel chat UI with search bar + All / Unread / Unresolved tabs
 */

import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { SendOutlined, ChatBubbleOutlineOutlined, SearchOutlined } from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import {
  PageContainer,
  ConversationList,
  ConversationListHeader,
  ConversationListBody,
  ConversationItem,
  ConvAvatar,
  ConvInfo,
  ConvName,
  ConvRole,
  ConvPreview,
  ConvMeta,
  ConvTime,
  UnreadBadge,
  SearchBarWrapper,
  SearchBarInner,
  SearchInput,
  TabsRow,
  TabBtn,
  ChatPanel,
  ChatHeader,
  ChatName,
  ChatRole,
  ChatProgramme,
  MessageList,
  MessageBubble,
  BubbleContent,
  BubbleTime,
  MessageInput,
  MessageTextField,
  SendButton,
  EmptyChat,
} from './Message.style';
import {
  learnerMessagesService,
  LearnerConversation,
  LearnerMessage,
} from './Message.service';

type Tab = 'all' | 'unread' | 'unresolved';

const LearnerMessage: React.FC = () => {
  const [conversations, setConversations] = useState<LearnerConversation[]>([]);
  const [selected, setSelected] = useState<LearnerConversation | null>(null);
  const [localMessages, setLocalMessages] = useState<LearnerMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    learnerMessagesService.getConversations().then((data) => {
      setConversations(data);
      if (data.length > 0) {
        setSelected(data[0]);
        setLocalMessages(data[0].messages);
      }
      setLoading(false);
    });
  }, []);

  // Auto-scroll to newest message
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [localMessages]);

  // ── Filter: search + tab ─────────────────────────────────────────────────────
  const filtered = conversations.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch =
      c.contactName.toLowerCase().includes(q) ||
      c.lastMessage.toLowerCase().includes(q) ||
      c.contactRole.toLowerCase().includes(q);

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'unread' && c.unreadCount > 0) ||
      (activeTab === 'unresolved' && !c.isResolved);

    return matchesSearch && matchesTab;
  });

  const totalUnread = conversations.reduce((s, c) => s + c.unreadCount, 0);
  const unreadTabCount = conversations.filter((c) => c.unreadCount > 0).length;
  const unresolvedTabCount = conversations.filter((c) => !c.isResolved).length;

  // ── Actions ──────────────────────────────────────────────────────────────────
  const handleSelectConversation = (conv: LearnerConversation) => {
    setSelected(conv);
    setLocalMessages(conv.messages);
    // Mark as read on open
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSend = () => {
    if (!newMessage.trim() || !selected) return;
    const msg: LearnerMessage = {
      id: `msg-${Date.now()}`,
      content: newMessage.trim(),
      senderId: 'learner',
      senderName: 'John Doe',
      senderInitials: 'JD',
      timestamp: new Date().toLocaleString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      }),
      isFromLearner: true,
    };
    setLocalMessages((prev) => [...prev, msg]);
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selected.id
          ? { ...c, lastMessage: msg.content, lastMessageTime: 'Just now' }
          : c
      )
    );
    setNewMessage('');
  };

  const handleMarkResolved = () => {
    if (!selected) return;
    setConversations((prev) =>
      prev.map((c) => (c.id === selected.id ? { ...c, isResolved: true } : c))
    );
    setSelected((prev) => (prev ? { ...prev, isResolved: true } : prev));
  };

  return (
    <LearnerLayout pageTitle="Message">
      <PageContainer>

        {/* ── Left panel ── */}
        <ConversationList>

          {/* Title */}
          <ConversationListHeader>
            Messages
            {totalUnread > 0 && (
              <Box component="span" sx={{ fontSize: '12px', color: '#F44336' }}>
                ({totalUnread} unread)
              </Box>
            )}
          </ConversationListHeader>

          {/* Search */}
          <SearchBarWrapper>
            <SearchBarInner>
              <SearchOutlined />
              <SearchInput
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchBarInner>
          </SearchBarWrapper>

          {/* All / Unread / Unresolved tabs */}
          <TabsRow>
            <TabBtn active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
              All
            </TabBtn>
            <TabBtn active={activeTab === 'unread'} onClick={() => setActiveTab('unread')}>
              Unread
              {unreadTabCount > 0 && (
                <Box component="span" sx={{ ml: '3px', color: '#F44336' }}>
                  ({unreadTabCount})
                </Box>
              )}
            </TabBtn>
            <TabBtn active={activeTab === 'unresolved'} onClick={() => setActiveTab('unresolved')}>
              Unresolved
              {unresolvedTabCount > 0 && (
                <Box component="span" sx={{ ml: '3px', color: '#FB8C00' }}>
                  ({unresolvedTabCount})
                </Box>
              )}
            </TabBtn>
          </TabsRow>

          {/* List */}
          <ConversationListBody>
            {loading ? (
              <Box sx={{ p: 2, color: '#A0A0A0', fontSize: '13px', fontFamily: "'Inter', sans-serif" }}>
                Loading...
              </Box>
            ) : filtered.length === 0 ? (
              <Box sx={{ p: '24px 16px', color: '#A0A0A0', fontSize: '13px', fontFamily: "'Inter', sans-serif", textAlign: 'center' }}>
                No conversations found.
              </Box>
            ) : (
              filtered.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  active={selected?.id === conv.id}
                  onClick={() => handleSelectConversation(conv)}
                >
                  <ConvAvatar bgcolor={conv.avatarColor}>{conv.contactInitials}</ConvAvatar>
                  <ConvInfo>
                    <ConvName>{conv.contactName}</ConvName>
                    <ConvRole>{conv.contactRole}</ConvRole>
                    <ConvPreview>{conv.lastMessage}</ConvPreview>
                  </ConvInfo>
                  <ConvMeta>
                    <ConvTime>{conv.lastMessageTime}</ConvTime>
                    {conv.unreadCount > 0 && <UnreadBadge>{conv.unreadCount}</UnreadBadge>}
                    {conv.isResolved && (
                      <Box sx={{
                        fontSize: '10px', color: '#43A047', fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                        backgroundColor: 'rgba(67,160,71,0.1)',
                        borderRadius: '8px', padding: '1px 6px',
                      }}>
                        Resolved
                      </Box>
                    )}
                  </ConvMeta>
                </ConversationItem>
              ))
            )}
          </ConversationListBody>
        </ConversationList>

        {/* ── Right panel: chat ── */}
        <ChatPanel>
          {selected ? (
            <>
              <ChatHeader>
                <ConvAvatar bgcolor={selected.avatarColor}>{selected.contactInitials}</ConvAvatar>
                <Box sx={{ flex: 1 }}>
                  <ChatName>{selected.contactName}</ChatName>
                  <ChatRole>{selected.contactRole}</ChatRole>
                  <ChatProgramme>{selected.programme}</ChatProgramme>
                </Box>

                {selected.isResolved ? (
                  <Box sx={{
                    fontSize: '12px', color: '#43A047', fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    backgroundColor: 'rgba(67,160,71,0.1)',
                    borderRadius: '8px', padding: '5px 12px',
                  }}>
                    Resolved
                  </Box>
                ) : (
                  <Box
                    onClick={handleMarkResolved}
                    sx={{
                      fontSize: '12px', fontWeight: 500, fontFamily: "'Inter', sans-serif",
                      border: '1px solid rgba(28,28,28,0.2)', borderRadius: '8px',
                      padding: '5px 12px', cursor: 'pointer', whiteSpace: 'nowrap',
                      color: '#1C1C1C',
                      '&:hover': { backgroundColor: 'rgba(28,28,28,0.04)' },
                    }}
                  >
                    Mark as Resolved
                  </Box>
                )}
              </ChatHeader>

              <MessageList ref={messageListRef}>
                {localMessages.map((msg) => (
                  <MessageBubble key={msg.id} isFromLearner={msg.isFromLearner}>
                    <BubbleContent isFromLearner={msg.isFromLearner}>
                      {msg.content}
                    </BubbleContent>
                    <BubbleTime>{msg.timestamp}</BubbleTime>
                  </MessageBubble>
                ))}
              </MessageList>

              <MessageInput>
                <MessageTextField
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <SendButton
                  onClick={handleSend}
                  startIcon={<SendOutlined sx={{ fontSize: '16px' }} />}
                >
                  Send
                </SendButton>
              </MessageInput>
            </>
          ) : (
            <EmptyChat>
              <ChatBubbleOutlineOutlined sx={{ fontSize: '40px', opacity: 0.3 }} />
              <Box>Select a conversation to start messaging</Box>
            </EmptyChat>
          )}
        </ChatPanel>

      </PageContainer>
    </LearnerLayout>
  );
};

export default LearnerMessage;
