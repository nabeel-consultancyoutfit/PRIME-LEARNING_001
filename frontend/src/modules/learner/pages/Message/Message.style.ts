/**
 * Styled components for Learner Message module
 * Mirrors trainer Messages.style.ts — adapted to learner theme tokens
 */

import { styled } from '@mui/material/styles';
import { Box, Avatar, Button, InputBase } from '@mui/material';
import { COLORS, BORDER_RADIUS, TYPOGRAPHY, SHADOWS, SPACING } from '@/modules/learner/theme/tokens';

// ─── Layout ────────────────────────────────────────────────────────────────────

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

// ─── Conversation list (left panel) ───────────────────────────────────────────

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
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

// ─── Search + Tabs (below list header) ────────────────────────────────────────

export const SearchBarWrapper = styled(Box)({
  padding: '10px 12px',
  borderBottom: `1px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,
});

export const SearchBarInner = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: 'rgba(28,28,28,0.05)',
  borderRadius: BORDER_RADIUS.input,
  padding: '7px 12px',
  '& svg': { fontSize: '16px', color: COLORS.text.muted, flexShrink: 0 },
});

export const SearchInput = styled('input')({
  flex: 1,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  fontSize: '13px',
  fontFamily: TYPOGRAPHY.fontFamily,
  color: COLORS.text.primary,
  '&::placeholder': { color: COLORS.text.muted },
});

export const TabsRow = styled(Box)({
  display: 'flex',
  borderBottom: `1px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,
});

export const TabBtn = styled(Box)<{ active?: boolean }>(({ active }) => ({
  flex: 1,
  textAlign: 'center',
  padding: '9px 0',
  fontSize: '12px',
  fontWeight: active ? 700 : 500,
  color: active ? COLORS.text.primary : COLORS.text.muted,
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  borderBottom: active ? `2px solid ${COLORS.text.primary}` : '2px solid transparent',
  marginBottom: '-1px',
  transition: 'all 0.15s',
  userSelect: 'none',
  '&:hover': { color: COLORS.text.primary },
}));

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
  backgroundColor: active ? 'rgba(28,28,28,0.05)' : 'transparent',
  transition: 'background-color 0.15s',
  '&:hover': { backgroundColor: active ? 'rgba(28,28,28,0.05)' : 'rgba(28,28,28,0.03)' },
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
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const ConvRole = styled(Box)({
  fontSize: '11px',
  color: COLORS.text.muted,
  fontFamily: TYPOGRAPHY.fontFamily,
  marginTop: '2px',
});

export const ConvPreview = styled(Box)({
  fontSize: '12px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  marginTop: '3px',
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

// ─── Chat panel (right panel) ─────────────────────────────────────────────────

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

export const ChatRole = styled(Box)({
  fontSize: '12px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ChatProgramme = styled(Box)({
  fontSize: '11px',
  color: COLORS.text.muted,
  fontFamily: TYPOGRAPHY.fontFamily,
  marginTop: '1px',
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

export const MessageBubble = styled(Box)<{ isFromLearner: boolean }>(({ isFromLearner }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: isFromLearner ? 'flex-end' : 'flex-start',
  gap: 4,
  maxWidth: '70%',
  alignSelf: isFromLearner ? 'flex-end' : 'flex-start',
}));

export const BubbleContent = styled(Box)<{ isFromLearner: boolean }>(({ isFromLearner }) => ({
  padding: '10px 14px',
  borderRadius: isFromLearner ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
  backgroundColor: isFromLearner ? COLORS.text.primary : '#F0F0F5',
  color: isFromLearner ? '#FFFFFF' : COLORS.text.primary,
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
  backgroundColor: COLORS.text.primary,
  color: '#FFFFFF',
  fontFamily: TYPOGRAPHY.fontFamily,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
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

// ─── Legacy exports (kept for compatibility) ──────────────────────────────────

export const MessageContainer = styled(Box)({
  padding: `${SPACING.contentPadding}px`,
});

export const MessageTitle = styled('h2')({
  margin: `0 0 16px 0`,
  fontSize: '18px',
  fontWeight: 700,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const MessageText = styled(Box)({
  fontSize: '14px',
  fontWeight: 400,
  color: COLORS.text.secondary,
  lineHeight: '1.6',
  fontFamily: TYPOGRAPHY.fontFamily,
});
