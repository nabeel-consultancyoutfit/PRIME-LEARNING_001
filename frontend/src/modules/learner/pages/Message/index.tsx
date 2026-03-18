/**
 * Learner — Message Page
 * Pixel-perfect to Figma node 40000068:36425
 * Two-panel: left conversation list (search + All/Unread/Unresolved tabs) + right chat panel
 */

import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import {
  SendOutlined,
  ChatBubbleOutlineOutlined,
  SearchOutlined,
  AddOutlined,
  MicNoneOutlined,
  EmojiEmotionsOutlined,
  AttachFileOutlined,
} from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import {
  PageContainer,
  ConversationList,
  SearchBarWrapper,
  SearchBarInner,
  SearchInput,
  TabsRow,
  TabBtn,
  ConversationListBody,
  ConversationItem,
  AvatarWrapper,
  ConvAvatar,
  StatusDot,
  ConvInfo,
  ConvTopRow,
  ConvName,
  ConvTime,
  ConvBottomRow,
  ConvPreview,
  UnreadBadge,
  ChatPanel,
  ChatHeader,
  ChatHeaderAvatar,
  ChatName,
  ChatStatus,
  MessageList,
  DateDivider,
  DateDividerText,
  SystemNote,
  MessageBubble,
  BubbleContent,
  BubbleTime,
  MessageInputBar,
  InputPlusBtn,
  MessageTextField,
  InputIconBtn,
  SendButton,
  EmptyChat,
} from './Message.style';
import {
  learnerMessagesService,
  LearnerConversation,
  LearnerMessage,
} from './Message.service';

type Tab = 'all' | 'unread' | 'unresolved';

const LearnerMessagePage: React.FC = () => {
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

  // ── Filter: search + tab ──────────────────────────────────────────────────────
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

  const unreadTabCount = conversations.filter((c) => c.unreadCount > 0).length;
  const unresolvedTabCount = conversations.filter((c) => !c.isResolved).length;

  // ── Actions ───────────────────────────────────────────────────────────────────
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
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const msg: LearnerMessage = {
      id: `msg-${Date.now()}`,
      content: newMessage.trim(),
      senderId: 'learner',
      senderName: 'You',
      senderInitials: 'JD',
      timestamp: timeStr,
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

  return (
    <LearnerLayout pageTitle="Message">
      <PageContainer>

        {/* ── Left panel ── */}
        <ConversationList>

          {/* Search */}
          <SearchBarWrapper>
            <SearchBarInner>
              <SearchOutlined />
              <SearchInput
                placeholder="Search..."
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

          {/* Conversation list */}
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
                  <AvatarWrapper>
                    <ConvAvatar bgcolor={conv.avatarColor}>
                      {conv.contactInitials}
                    </ConvAvatar>
                    <StatusDot status={conv.status} />
                  </AvatarWrapper>

                  <ConvInfo>
                    <ConvTopRow>
                      <ConvName>{conv.contactName}</ConvName>
                      <ConvTime>{conv.lastMessageTime}</ConvTime>
                    </ConvTopRow>
                    <ConvBottomRow>
                      <ConvPreview>{conv.lastMessage}</ConvPreview>
                      {conv.unreadCount > 0 && (
                        <UnreadBadge>{conv.unreadCount}</UnreadBadge>
                      )}
                    </ConvBottomRow>
                  </ConvInfo>
                </ConversationItem>
              ))
            )}
          </ConversationListBody>
        </ConversationList>

        {/* ── Right panel: chat ── */}
        <ChatPanel>
          {selected ? (
            <>
              {/* Chat header */}
              <ChatHeader>
                <AvatarWrapper>
                  <ChatHeaderAvatar bgcolor={selected.avatarColor}>
                    {selected.contactInitials}
                  </ChatHeaderAvatar>
                  <StatusDot status={selected.status} />
                </AvatarWrapper>
                <Box sx={{ flex: 1 }}>
                  <ChatName>{selected.contactName}</ChatName>
                  <ChatStatus>{selected.lastSeen}</ChatStatus>
                </Box>
              </ChatHeader>

              {/* Message thread */}
              <MessageList ref={messageListRef}>
                {/* Date divider */}
                <DateDivider>
                  <DateDividerText>25 April</DateDividerText>
                </DateDivider>

                {/* System note */}
                <SystemNote>
                  You viewed {selected.contactName} 12:25 ▾
                </SystemNote>

                {localMessages.map((msg) => (
                  <MessageBubble key={msg.id} isFromMe={msg.isFromLearner}>
                    <BubbleContent isFromMe={msg.isFromLearner}>
                      {msg.content}
                      <BubbleTime isFromMe={msg.isFromLearner}>
                        {msg.timestamp}
                      </BubbleTime>
                    </BubbleContent>
                  </MessageBubble>
                ))}
              </MessageList>

              {/* Input bar */}
              <MessageInputBar>
                <InputPlusBtn>
                  <AddOutlined sx={{ fontSize: '20px' }} />
                </InputPlusBtn>

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

                <InputIconBtn>
                  <EmojiEmotionsOutlined sx={{ fontSize: '18px' }} />
                </InputIconBtn>

                <InputIconBtn>
                  <AttachFileOutlined sx={{ fontSize: '18px' }} />
                </InputIconBtn>

                {newMessage.trim() ? (
                  <SendButton onClick={handleSend}>
                    <SendOutlined sx={{ fontSize: '16px' }} />
                  </SendButton>
                ) : (
                  <SendButton onClick={handleSend}>
                    <MicNoneOutlined sx={{ fontSize: '18px' }} />
                  </SendButton>
                )}
              </MessageInputBar>
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

export default LearnerMessagePage;
