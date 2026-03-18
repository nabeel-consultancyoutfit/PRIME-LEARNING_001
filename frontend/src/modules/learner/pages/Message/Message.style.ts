/**
 * Learner — Message page styled components
 * Pixel-perfect to Figma node 40000068:36425
 */

import { styled } from '@mui/material/styles';
import { Box, InputBase } from '@mui/material';
import { COLORS, BORDER_RADIUS, TYPOGRAPHY, SPACING } from '@/modules/learner/theme/tokens';

// ─── Page layout ──────────────────────────────────────────────────────────────

export const PageContainer = styled(Box)({
  display: 'flex',
  height: 'calc(100vh - 100px)',
  backgroundColor: '#FFFFFF',
  borderRadius: BORDER_RADIUS.card,
  border: '1px solid rgba(28,28,28,0.1)',
  overflow: 'hidden',
});

// ─── Left panel ───────────────────────────────────────────────────────────────

export const ConversationList = styled(Box)({
  width: 290,
  flexShrink: 0,
  borderRight: '1px solid rgba(28,28,28,0.08)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',
});

export const SearchBarWrapper = styled(Box)({
  padding: '14px 14px 10px',
});

export const SearchBarInner = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  border: '1px solid rgba(28,28,28,0.14)',
  borderRadius: '8px',
  padding: '8px 12px',
  '& svg': { fontSize: '16px', color: 'rgba(28,28,28,0.4)', flexShrink: 0 },
});

export const SearchInput = styled('input')({
  flex: 1,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  fontSize: '13px',
  fontFamily: TYPOGRAPHY.fontFamily,
  color: COLORS.text.primary,
  '&::placeholder': { color: 'rgba(28,28,28,0.4)' },
});

export const TabsRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid rgba(28,28,28,0.1)',
  padding: '0 14px',
  gap: '4px',
});

export const TabBtn = styled(Box)<{ active?: boolean }>(({ active }) => ({
  padding: '8px 10px',
  fontSize: '13px',
  fontWeight: active ? 600 : 400,
  color: active ? COLORS.text.primary : 'rgba(28,28,28,0.45)',
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  borderBottom: active ? `2px solid ${COLORS.text.primary}` : '2px solid transparent',
  marginBottom: '-1px',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  transition: 'color 0.15s',
  '&:hover': { color: COLORS.text.primary },
}));

export const ConversationListBody = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  '&::-webkit-scrollbar': { width: '4px' },
  '&::-webkit-scrollbar-thumb': { background: 'rgba(28,28,28,0.15)', borderRadius: '2px' },
});

// Conversation row
export const ConversationItem = styled(Box)<{ active?: boolean }>(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '11px 14px',
  cursor: 'pointer',
  borderLeft: active ? '3px solid #7B61FF' : '3px solid transparent',
  backgroundColor: active ? 'rgba(123,97,255,0.05)' : 'transparent',
  transition: 'background-color 0.12s',
  '&:hover': {
    backgroundColor: active ? 'rgba(123,97,255,0.05)' : 'rgba(28,28,28,0.03)',
  },
}));

export const AvatarWrapper = styled(Box)({
  position: 'relative',
  flexShrink: 0,
});

export const ConvAvatar = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: 42,
  height: 42,
  borderRadius: '50%',
  backgroundColor: bgcolor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: 700,
  color: '#FFFFFF',
  fontFamily: TYPOGRAPHY.fontFamily,
  flexShrink: 0,
}));

export const StatusDot = styled(Box)<{ status: 'online' | 'offline' | 'busy' }>(({ status }) => ({
  position: 'absolute',
  bottom: '1px',
  right: '1px',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor:
    status === 'online' ? '#22C55E' :
    status === 'busy'   ? '#EF4444' :
    '#9CA3AF',
  border: '2px solid #FFFFFF',
}));

export const ConvInfo = styled(Box)({ flex: 1, minWidth: 0 });

export const ConvTopRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '4px',
  marginBottom: '3px',
});

export const ConvName = styled(Box)({
  fontSize: '13px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const ConvTime = styled(Box)({
  fontSize: '11px',
  color: 'rgba(28,28,28,0.4)',
  fontFamily: TYPOGRAPHY.fontFamily,
  flexShrink: 0,
});

export const ConvBottomRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '4px',
});

export const ConvPreview = styled(Box)({
  fontSize: '12px',
  color: 'rgba(28,28,28,0.5)',
  fontFamily: TYPOGRAPHY.fontFamily,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
  minWidth: 0,
});

export const UnreadBadge = styled(Box)({
  minWidth: '20px',
  height: '20px',
  borderRadius: '10px',
  backgroundColor: '#1E1B4B',
  color: '#FFFFFF',
  fontSize: '11px',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 5px',
  fontFamily: TYPOGRAPHY.fontFamily,
  flexShrink: 0,
});

// ─── Chat panel ───────────────────────────────────────────────────────────────

export const ChatPanel = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',
});

export const ChatHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 20px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
  flexShrink: 0,
});

export const ChatHeaderAvatar = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: 44,
  height: 44,
  borderRadius: '50%',
  backgroundColor: bgcolor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '15px',
  fontWeight: 700,
  color: '#FFFFFF',
  fontFamily: TYPOGRAPHY.fontFamily,
  flexShrink: 0,
}));

export const ChatName = styled(Box)({
  fontSize: '15px',
  fontWeight: 700,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: 1.3,
});

export const ChatStatus = styled(Box)({
  fontSize: '12px',
  color: 'rgba(28,28,28,0.45)',
  fontFamily: TYPOGRAPHY.fontFamily,
  marginTop: '2px',
});

export const MessageList = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '16px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  '&::-webkit-scrollbar': { width: '4px' },
  '&::-webkit-scrollbar-thumb': { background: 'rgba(28,28,28,0.15)', borderRadius: '2px' },
});

export const DateDivider = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  margin: '10px 0',
  '&::before, &::after': {
    content: '""',
    flex: 1,
    height: '1px',
    backgroundColor: 'rgba(28,28,28,0.1)',
  },
});

export const DateDividerText = styled(Box)({
  fontSize: '12px',
  color: 'rgba(28,28,28,0.4)',
  fontFamily: TYPOGRAPHY.fontFamily,
  whiteSpace: 'nowrap',
  flexShrink: 0,
});

export const SystemNote = styled(Box)({
  fontSize: '12px',
  color: 'rgba(28,28,28,0.4)',
  fontFamily: TYPOGRAPHY.fontFamily,
  textAlign: 'center',
  margin: '2px 0 10px',
});

export const MessageBubble = styled(Box)<{ isFromMe: boolean }>(({ isFromMe }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: isFromMe ? 'flex-end' : 'flex-start',
  alignSelf: isFromMe ? 'flex-end' : 'flex-start',
  maxWidth: '72%',
  gap: '3px',
}));

export const BubbleContent = styled(Box)<{ isFromMe: boolean }>(({ isFromMe }) => ({
  padding: '10px 14px',
  borderRadius: isFromMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
  backgroundColor: isFromMe ? '#7B61FF' : '#F4F4F8',
  color: isFromMe ? '#FFFFFF' : COLORS.text.primary,
  fontSize: '14px',
  lineHeight: 1.5,
  fontFamily: TYPOGRAPHY.fontFamily,
  display: 'flex',
  alignItems: 'flex-end',
  gap: '8px',
  flexWrap: 'wrap',
  wordBreak: 'break-word',
}));

export const BubbleTime = styled(Box)<{ isFromMe: boolean }>(({ isFromMe }) => ({
  fontSize: '11px',
  color: isFromMe ? 'rgba(255,255,255,0.65)' : 'rgba(28,28,28,0.4)',
  fontFamily: TYPOGRAPHY.fontFamily,
  flexShrink: 0,
  marginBottom: '1px',
}));

// ─── Input bar ────────────────────────────────────────────────────────────────

export const MessageInputBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 16px',
  borderTop: '1px solid rgba(28,28,28,0.08)',
  backgroundColor: '#FFFFFF',
  flexShrink: 0,
});

export const InputPlusBtn = styled(Box)({
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'rgba(28,28,28,0.45)',
  flexShrink: 0,
  borderRadius: '50%',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.06)', color: 'rgba(28,28,28,0.7)' },
});

export const MessageTextField = styled(InputBase)({
  flex: 1,
  border: '1px solid rgba(28,28,28,0.14)',
  borderRadius: '22px',
  padding: '8px 16px',
  fontSize: '14px',
  fontFamily: TYPOGRAPHY.fontFamily,
  color: COLORS.text.primary,
  backgroundColor: '#FAFAFA',
  '& input::placeholder': { color: 'rgba(28,28,28,0.35)', opacity: 1 },
});

export const InputIconBtn = styled(Box)({
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'rgba(28,28,28,0.45)',
  flexShrink: 0,
  borderRadius: '50%',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.06)', color: 'rgba(28,28,28,0.7)' },
});

export const SendButton = styled(Box)({
  width: '34px',
  height: '34px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  flexShrink: 0,
  transition: 'background-color 0.15s',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});

export const EmptyChat = styled(Box)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '10px',
  color: 'rgba(28,28,28,0.35)',
  fontSize: '14px',
  fontFamily: TYPOGRAPHY.fontFamily,
});

// Legacy
export const MessageContainer = styled(Box)({ padding: `${SPACING.contentPadding}px` });
export const MessageTitle = styled('h2')({ margin: '0 0 16px', fontSize: '18px', fontWeight: 700, color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily });
export const MessageText = styled(Box)({ fontSize: '14px', color: 'rgba(28,28,28,0.5)', fontFamily: TYPOGRAPHY.fontFamily });
