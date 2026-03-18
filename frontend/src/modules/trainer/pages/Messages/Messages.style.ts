import { styled } from '@mui/material/styles';
import { Box, Paper, Avatar, Button, InputBase } from '@mui/material';
import { COLORS, BORDER_RADIUS, TYPOGRAPHY, SHADOWS } from '@/modules/trainer/theme/tokens';

export const PageContainer = styled(Box)({
  display: 'flex',
  gap: 0,
  height: 'calc(100vh - 108px)',
  borderRadius: BORDER_RADIUS.card,
  overflow: 'hidden',
  border: `1px solid ${COLORS.card.border}`,
  boxShadow: SHADOWS.card,
  backgroundColor: COLORS.card.bg,
});

export const ConversationList = styled(Box)({
  width: 300,
  flexShrink: 0,
  borderRight: `1px solid ${COLORS.card.border}`,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const ConversationListHeader = styled(Box)({
  padding: '16px',
  borderBottom: `1px solid ${COLORS.card.border}`,
  fontSize: '15px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ConversationListBody = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  '&::-webkit-scrollbar': { width: '6px' },
  '&::-webkit-scrollbar-thumb': { background: '#D0D0D0', borderRadius: '3px' },
});

export const ConversationItem = styled(Box)<{ active?: boolean }>(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 16px',
  cursor: 'pointer',
  borderBottom: `1px solid ${COLORS.card.border}`,
  backgroundColor: active ? 'rgba(30,30,45,0.05)' : 'transparent',
  '&:hover': { backgroundColor: 'rgba(30,30,45,0.04)' },
  '&:last-child': { borderBottom: 'none' },
}));

export const ConvAvatar = styled(Avatar)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: 38,
  height: 38,
  backgroundColor: bgcolor,
  fontSize: '13px',
  fontWeight: 700,
  flexShrink: 0,
  fontFamily: TYPOGRAPHY.fontFamily,
}));

export const ConvInfo = styled(Box)({ flex: 1, minWidth: 0 });

export const ConvName = styled(Box)({
  fontSize: '13px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ConvPreview = styled(Box)({
  fontSize: '12px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  marginTop: 2,
});

export const ConvMeta = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 4,
  flexShrink: 0,
});

export const ConvTime = styled(Box)({
  fontSize: '11px',
  color: COLORS.text.muted,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const UnreadBadge = styled(Box)({
  width: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: '#F44336',
  color: '#FFFFFF',
  fontSize: '11px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: TYPOGRAPHY.fontFamily,
});

// Chat panel
export const ChatPanel = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const ChatHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 20px',
  borderBottom: `1px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,
  flexShrink: 0,
});

export const ChatName = styled(Box)({
  fontSize: '15px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ChatProgramme = styled(Box)({
  fontSize: '12px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const MessageList = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  '&::-webkit-scrollbar': { width: '6px' },
  '&::-webkit-scrollbar-thumb': { background: '#D0D0D0', borderRadius: '3px' },
});

export const MessageBubble = styled(Box)<{ isFromTrainer: boolean }>(({ isFromTrainer }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: isFromTrainer ? 'flex-end' : 'flex-start',
  gap: 4,
  maxWidth: '70%',
  alignSelf: isFromTrainer ? 'flex-end' : 'flex-start',
}));

export const BubbleContent = styled(Box)<{ isFromTrainer: boolean }>(({ isFromTrainer }) => ({
  padding: '10px 14px',
  borderRadius: isFromTrainer ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
  backgroundColor: isFromTrainer ? COLORS.sidebar.activeBg : '#F0F0F5',
  color: isFromTrainer ? '#FFFFFF' : COLORS.text.primary,
  fontSize: '14px',
  lineHeight: 1.5,
  fontFamily: TYPOGRAPHY.fontFamily,
}));

export const BubbleTime = styled(Box)({
  fontSize: '11px',
  color: COLORS.text.muted,
  fontFamily: TYPOGRAPHY.fontFamily,
  padding: '0 4px',
});

export const MessageInput = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 20px',
  borderTop: `1px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,
  flexShrink: 0,
});

export const MessageTextField = styled(InputBase)({
  flex: 1,
  backgroundColor: 'rgba(28,28,28,0.04)',
  borderRadius: BORDER_RADIUS.input,
  padding: '8px 14px',
  fontSize: '14px',
  fontFamily: TYPOGRAPHY.fontFamily,
  color: COLORS.text.primary,

  '& input::placeholder': { color: COLORS.text.muted, opacity: 1 },
});

export const SendButton = styled(Button)({
  height: 36,
  padding: '0 18px',
  fontSize: '13px',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: BORDER_RADIUS.input,
  backgroundColor: COLORS.button.blackBg,
  color: '#FFFFFF',
  fontFamily: TYPOGRAPHY.fontFamily,
  '&:hover': { backgroundColor: '#2D2D3D' },
});

export const EmptyChat = styled(Box)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: 8,
  color: COLORS.text.muted,
  fontSize: '14px',
  fontFamily: TYPOGRAPHY.fontFamily,
});
