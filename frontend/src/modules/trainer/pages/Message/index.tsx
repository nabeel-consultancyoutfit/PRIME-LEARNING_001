/**
 * Trainer — Message Page (Figma-accurate)
 */

import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import {
  SearchOutlined,
  AddOutlined,
  MicNoneOutlined,
  SendOutlined,
  ChatBubbleOutlineOutlined,
  DoneAllOutlined,
} from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import {
  PageContainer,
  InnerContainer,
  LeftPanel,
  LeftPanelHeader,
  SearchBarWrapper,
  SearchIcon,
  SearchInput,
  TabsRow,
  Tab,
  ConvListBody,
  ConvItem,
  ConvAvatar,
  ConvInfo,
  ConvName,
  ConvPreview,
  ConvMeta,
  ConvTime,
  UnreadBadge,
  RightPanel,
  ChatHeader,
  ChatHeaderInfo,
  ChatName,
  ChatLastSeen,
  MessageArea,
  DateSeparator,
  SystemMessage,
  SentBubbleWrapper,
  ReceivedBubbleWrapper,
  SentBubble,
  ReceivedBubble,
  BubbleTime,
  TickMark,
  InputBar,
  AttachButton,
  MessageInput,
  MicButton,
  SendButton,
  EmptyChat,
} from './Message.style';
import { messagesService, Conversation } from '@/modules/trainer/services/messages.service';

type TabType = 'All' | 'Unread' | 'Unresolved';

const TrainerMessage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [filtered, setFiltered] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesService.getConversations().then((data) => {
      setConversations(data);
      setFiltered(data);
      if (data.length > 0) setSelected(data[0]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let list = conversations;
    if (activeTab === 'Unread') list = list.filter((c) => c.unreadCount > 0);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((c) => c.learnerName.toLowerCase().includes(q));
    }
    setFiltered(list);
  }, [activeTab, searchQuery, conversations]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected]);

  const handleSend = () => {
    if (!newMessage.trim() || !selected) return;
    setNewMessage('');
  };

  return (
    <TrainerLayout pageTitle="Message">
      <PageContainer>
        <InnerContainer>
          {/* ── Left Panel ── */}
          <LeftPanel>
            <LeftPanelHeader>
              <SearchBarWrapper>
                <SearchIcon>
                  <SearchOutlined sx={{ fontSize: 18 }} />
                </SearchIcon>
                <SearchInput
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchBarWrapper>

              <TabsRow>
                {(['All', 'Unread', 'Unresolved'] as TabType[]).map((tab) => (
                  <Tab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
                    {tab}
                  </Tab>
                ))}
              </TabsRow>
            </LeftPanelHeader>

            <ConvListBody>
              {loading ? (
                <Box sx={{ p: 2, color: '#A0A0A0', fontSize: '13px' }}>Loading...</Box>
              ) : filtered.length === 0 ? (
                <Box sx={{ p: 2, color: '#A0A0A0', fontSize: '13px', textAlign: 'center' }}>
                  No conversations found
                </Box>
              ) : (
                filtered.map((conv) => (
                  <ConvItem
                    key={conv.id}
                    active={selected?.id === conv.id}
                    onClick={() => setSelected(conv)}
                  >
                    <ConvAvatar bgcolor={conv.avatarColor}>{conv.learnerInitials}</ConvAvatar>
                    <ConvInfo>
                      <ConvName>{conv.learnerName}</ConvName>
                      <ConvPreview>{conv.lastMessage}</ConvPreview>
                    </ConvInfo>
                    <ConvMeta>
                      <ConvTime>{conv.lastMessageTime}</ConvTime>
                      {conv.unreadCount > 0 && <UnreadBadge>{conv.unreadCount}</UnreadBadge>}
                    </ConvMeta>
                  </ConvItem>
                ))
              )}
            </ConvListBody>
          </LeftPanel>

          {/* ── Right Panel ── */}
          <RightPanel>
            {selected ? (
              <>
                <ChatHeader>
                  <ConvAvatar bgcolor={selected.avatarColor}>{selected.learnerInitials}</ConvAvatar>
                  <ChatHeaderInfo>
                    <ChatName>{selected.learnerName}</ChatName>
                    <ChatLastSeen>Last seen 7h ago</ChatLastSeen>
                  </ChatHeaderInfo>
                </ChatHeader>

                <MessageArea>
                  <DateSeparator>25 April</DateSeparator>
                  <SystemMessage>
                    You viewed {selected.learnerName} · 12:25
                  </SystemMessage>

                  {selected.messages.map((msg) =>
                    msg.isFromTrainer ? (
                      <SentBubbleWrapper key={msg.id}>
                        <SentBubble>
                          {msg.content}
                          <TickMark>
                            <DoneAllOutlined sx={{ fontSize: 14, verticalAlign: 'middle', ml: '4px', color: '#A0D4FF' }} />
                          </TickMark>
                        </SentBubble>
                        <BubbleTime>{msg.timestamp}</BubbleTime>
                      </SentBubbleWrapper>
                    ) : (
                      <ReceivedBubbleWrapper key={msg.id}>
                        <ReceivedBubble>{msg.content}</ReceivedBubble>
                        <BubbleTime>{msg.timestamp}</BubbleTime>
                      </ReceivedBubbleWrapper>
                    )
                  )}
                  <div ref={bottomRef} />
                </MessageArea>

                <InputBar>
                  <AttachButton>
                    <AddOutlined sx={{ fontSize: 20 }} />
                  </AttachButton>
                  <MessageInput
                    placeholder="Write your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <MicButton>
                    <MicNoneOutlined sx={{ fontSize: 20 }} />
                  </MicButton>
                  <SendButton onClick={handleSend}>
                    <SendOutlined sx={{ fontSize: 18 }} />
                  </SendButton>
                </InputBar>
              </>
            ) : (
              <EmptyChat>
                <ChatBubbleOutlineOutlined sx={{ fontSize: '40px', opacity: 0.3 }} />
                <Box>Select a conversation to start messaging</Box>
              </EmptyChat>
            )}
          </RightPanel>
        </InnerContainer>
      </PageContainer>
    </TrainerLayout>
  );
};

export default TrainerMessage;
