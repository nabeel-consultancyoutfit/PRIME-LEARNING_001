/**
 * Trainer — Messages Page
 */

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { SendOutlined, ChatBubbleOutlineOutlined } from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import {
  PageContainer,
  ConversationList,
  ConversationListHeader,
  ConversationListBody,
  ConversationItem,
  ConvAvatar,
  ConvInfo,
  ConvName,
  ConvPreview,
  ConvMeta,
  ConvTime,
  UnreadBadge,
  ChatPanel,
  ChatHeader,
  ChatName,
  ChatProgramme,
  MessageList,
  MessageBubble,
  BubbleContent,
  BubbleTime,
  MessageInput,
  MessageTextField,
  SendButton,
  EmptyChat,
} from './Messages.style';
import { messagesService, Conversation } from '@/modules/trainer/services/messages.service';

const TrainerMessages: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    messagesService.getConversations().then((data) => {
      setConversations(data);
      if (data.length > 0) setSelected(data[0]);
      setLoading(false);
    });
  }, []);

  const handleSend = () => {
    if (!newMessage.trim() || !selected) return;
    setNewMessage('');
    // In a real app, would call service to send message
  };

  return (
    <TrainerLayout pageTitle="Messages">
      <PageContainer>
        {/* Conversation list */}
        <ConversationList>
          <ConversationListHeader>
            Messages
            {conversations.some((c) => c.unreadCount > 0) && (
              <Box component="span" sx={{ ml: '6px', fontSize: '12px', color: '#F44336' }}>
                ({conversations.reduce((s, c) => s + c.unreadCount, 0)} unread)
              </Box>
            )}
          </ConversationListHeader>
          <ConversationListBody>
            {loading ? (
              <Box sx={{ p: 2, color: '#A0A0A0', fontSize: '13px' }}>Loading...</Box>
            ) : (
              conversations.map((conv) => (
                <ConversationItem
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
                </ConversationItem>
              ))
            )}
          </ConversationListBody>
        </ConversationList>

        {/* Chat panel */}
        <ChatPanel>
          {selected ? (
            <>
              <ChatHeader>
                <ConvAvatar bgcolor={selected.avatarColor}>{selected.learnerInitials}</ConvAvatar>
                <Box>
                  <ChatName>{selected.learnerName}</ChatName>
                  <ChatProgramme>{selected.programme}</ChatProgramme>
                </Box>
              </ChatHeader>

              <MessageList>
                {selected.messages.map((msg) => (
                  <MessageBubble key={msg.id} isFromTrainer={msg.isFromTrainer}>
                    <BubbleContent isFromTrainer={msg.isFromTrainer}>{msg.content}</BubbleContent>
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
    </TrainerLayout>
  );
};

export default TrainerMessages;
