import { styled } from '@mui/material/styles';
import { Box, Avatar, InputBase } from '@mui/material';
import { COLORS, BORDER_RADIUS, TYPOGRAPHY, SHADOWS } from '@/modules/trainer/theme/tokens';

/* ─── Page Wrapper ─────────────────────────────────────────── */
export const PageContainer = styled(Box)({
  display: 'flex',
  height: 'calc(100vh - 60px)',
  overflow: 'hidden',
  backgroundColor: COLORS.contentArea.bg,
  padding: 24,
  gap: 0,
});

export const InnerContainer = styled(Box)({
  display: 'flex',
  flex: 1,
  borderRadius: BORDER_RADIUS.card,
  overflow: 'hidden',
  border: `1px solid ${COLORS.card.border}`,
  boxShadow: SHADOWS.card,
  backgroundColor: COLORS.card.bg,
});

/* ─── Left Panel ────────────────────────────────────────────── */
export const LeftPanel = styled(Box)({
  width: 360,
  flexShrink: 0,
  borderRight: `1px solid ${COLORS.card.border}`,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',
});

export const LeftPanelHeader = styled(Box)({
  padding: '16px 16px 0',
  flexShrink: 0,
});

export const SearchBarWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  backgroundColor: '#F5F5F7',
  borderRadius: 8,
  padding: '8px 12px',
  marginBottom: 12,
});

export const SearchIcon = styled(Box)({
  color: '#9291A5',
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
});

export const SearchInput = styled(InputBase)({
  flex: 1,
  fontSize: '13px',
  fontFamily: TYPOGRAPHY.fontFamily,
  color: COLORS.text.primary,
  '& input::placeholder': { color: '#B0B0B0', opacity: 1 },
});

export const TabsRow = styled(Box)({
  display: 'flex',
  gap: 0,
  borderBottom: `1px solid ${COLORS.card.border}`,
});

export const Tab = styled(Box)<{ active?: boolean }>(({ active }) => ({
  flex: 1,
  textAlign: 'center',
  fontSize: '13px',
  fontWeight: active ? 600 : 400,
  color: active ? '#5B4FCF' : COLORS.text.secondary,
  padding: '10px 0',
  cursor: 'pointer',
  fontFamily: TYPOGRAPHY.fontFamily,
  borderBottom: active ? '2px solid #5B4FCF' : '2px solid transparent',
  transition: 'all 0.2s ease',
  '&:hover': { color: '#5B4FCF' },
}));

export const ConvListBody = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  '&::-webkit-scrollbar': { width: '4px' },
  '&::-webkit-scrollbar-thumb': { background: '#D0D0D0', borderRadius: '2px' },
});

export const ConvItem = styled(Box)<{ active?: boolean }>(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 16px',
  cursor: 'pointer',
  borderBottom: `1px solid ${COLORS.card.border}`,
  borderLeft: active ? '3px solid #5B4FCF' : '3px solid transparent',
  backgroundColor: active ? 'rgba(91,79,207,0.04)' : 'transparent',
  transition: 'all 0.15s ease',
  '&:hover': { backgroundColor: active ? 'rgba(91,79,207,0.06)' : 'rgba(0,0,0,0.02)' },
  '&:last-child': { borderBottom: 'none' },
}));

export const ConvAvatar = styled(Avatar)<{ bgcolor?: string }>(({ bgcolor }) => ({
  width: 40,
  height: 40,
  backgroundColor: bgcolor || '#7B61FF',
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
  whiteSpace: 'nowrap',
});

export const UnreadBadge = styled(Box)({
  minWidth: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: '#5B4FCF',
  color: '#FFFFFF',
  fontSize: '11px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 4px',
  fontFamily: TYPOGRAPHY.fontFamily,
});

/* ─── Right Panel ───────────────────────────────────────────── */
export const RightPanel = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',
});

export const ChatHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 20px',
  borderBottom: `1px solid ${COLORS.card.border}`,
  backgroundColor: '#FFFFFF',
  flexShrink: 0,
});

export const ChatHeaderInfo = styled(Box)({ flex: 1, minWidth: 0 });

export const ChatName = styled(Box)({
  fontSize: '15px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ChatLastSeen = styled(Box)({
  fontSize: '12px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  marginTop: 1,
});

export const MessageArea = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '20px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  backgroundColor: '#FAFAFA',
  '&::-webkit-scrollbar': { width: '4px' },
  '&::-webkit-scrollbar-thumb': { background: '#D0D0D0', borderRadius: '2px' },
});

export const DateSeparator = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  margin: '8px 0',
  fontSize: '12px',
  color: COLORS.text.muted,
  fontFamily: TYPOGRAPHY.fontFamily,
  '&::before, &::after': {
    content: '""',
    flex: 1,
    height: '1px',
    backgroundColor: COLORS.card.border,
  },
});

export const SystemMessage = styled(Box)({
  textAlign: 'center',
  fontSize: '12px',
  color: COLORS.text.muted,
  fontFamily: TYPOGRAPHY.fontFamily,
  padding: '4px 0',
});

export const SentBubbleWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 4,
  alignSelf: 'flex-end',
  maxWidth: '65%',
});

export const ReceivedBubbleWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 4,
  alignSelf: 'flex-start',
  maxWidth: '65%',
});

export const SentBubble = styled(Box)({
  padding: '10px 14px',
  borderRadius: '18px 18px 4px 18px',
  backgroundColor: '#5B4FCF',
  color: '#FFFFFF',
  fontSize: '14px',
  lineHeight: 1.5,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ReceivedBubble = styled(Box)({
  padding: '10px 14px',
  borderRadius: '18px 18px 18px 4px',
  backgroundColor: '#F0F0F5',
  color: COLORS.text.primary,
  fontSize: '14px',
  lineHeight: 1.5,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const BubbleTime = styled(Box)({
  fontSize: '11px',
  color: COLORS.text.muted,
  fontFamily: TYPOGRAPHY.fontFamily,
  padding: '0 2px',
});

export const TickMark = styled(Box)({
  display: 'inline',
  color: '#A0D4FF',
  fontSize: '12px',
  marginLeft: 4,
});

/* ─── Input Bar ─────────────────────────────────────────────── */
export const InputBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '12px 20px',
  borderTop: `1px solid ${COLORS.card.border}`,
  backgroundColor: '#FFFFFF',
  flexShrink: 0,
});

export const AttachButton = styled(Box)({
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: `1px solid ${COLORS.card.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: COLORS.text.secondary,
  flexShrink: 0,
  '&:hover': { backgroundColor: '#F5F5F5' },
});

export const MessageInput = styled(InputBase)({
  flex: 1,
  backgroundColor: '#F5F5F7',
  borderRadius: 20,
  padding: '8px 16px',
  fontSize: '14px',
  fontFamily: TYPOGRAPHY.fontFamily,
  color: COLORS.text.primary,
  '& input::placeholder': { color: '#B0B0B0', opacity: 1 },
});

export const MicButton = styled(Box)({
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: `1px solid ${COLORS.card.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: COLORS.text.secondary,
  flexShrink: 0,
  '&:hover': { backgroundColor: '#F5F5F5' },
});

export const SendButton = styled(Box)({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: '#1E1E2D',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '#FFFFFF',
  flexShrink: 0,
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
