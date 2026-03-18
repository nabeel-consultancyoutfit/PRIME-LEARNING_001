import { styled } from '@mui/material/styles';
import { Box, Paper, Avatar, Button, TextField } from '@mui/material';
import { COLORS, BORDER_RADIUS, TYPOGRAPHY, SHADOWS } from '@/modules/trainer/theme/tokens';

export const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

export const TopBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
});

export const FilterGroup = styled(Box)({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const FilterChip = styled(Box)<{ active?: boolean }>(({ active }) => ({
  padding: '6px 16px',
  borderRadius: BORDER_RADIUS.pill,
  fontSize: '13px',
  fontWeight: active ? 600 : 500,
  cursor: 'pointer',
  backgroundColor: active ? COLORS.sidebar.activeBg : COLORS.card.bg,
  color: active ? '#FFFFFF' : COLORS.text.primary,
  border: `1px solid ${active ? COLORS.sidebar.activeBg : COLORS.card.border}`,
  fontFamily: TYPOGRAPHY.fontFamily,
  transition: 'all 0.2s',
  userSelect: 'none' as const,
  '&:hover': { backgroundColor: active ? '#2D2D3D' : '#F5F5F5' },
}));

export const JournalList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
});

export const JournalCard = styled(Paper)({
  borderRadius: BORDER_RADIUS.card,
  boxShadow: SHADOWS.card,
  border: `1px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,
  overflow: 'hidden',
});

export const JournalCardHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 20px',
  backgroundColor: COLORS.sidebar.activeBg,
  cursor: 'pointer',
});

export const HeaderLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const LearnerAvatar = styled(Avatar)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: 34,
  height: 34,
  backgroundColor: bgcolor,
  fontSize: '12px',
  fontWeight: 700,
  fontFamily: TYPOGRAPHY.fontFamily,
}));

export const LearnerName = styled(Box)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#FFFFFF',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const JournalTitle = styled(Box)({
  fontSize: '13px',
  color: 'rgba(255,255,255,0.7)',
  fontFamily: TYPOGRAPHY.fontFamily,
  marginTop: 1,
});

export const HeaderRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});

export const StatusBadge = styled(Box)<{ status: string }>(({ status }) => {
  const map: Record<string, { bg: string; color: string }> = {
    'Pending Review': { bg: 'rgba(245,166,35,0.2)', color: '#F5C242' },
    'Reviewed': { bg: 'rgba(76,175,80,0.2)', color: '#6FCF97' },
    'Needs Revision': { bg: 'rgba(244,67,54,0.2)', color: '#EB5757' },
  };
  const c = map[status] || map['Pending Review'];
  return {
    padding: '3px 10px',
    borderRadius: BORDER_RADIUS.badge,
    backgroundColor: c.bg,
    color: c.color,
    fontSize: '12px',
    fontWeight: 500,
    fontFamily: TYPOGRAPHY.fontFamily,
  };
});

export const ChevronBox = styled(Box)({
  color: 'rgba(255,255,255,0.7)',
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px',
});

export const JournalBody = styled(Box)({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  borderTop: 'none',
});

export const MetaRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 12,
});

export const MetaItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
});

export const MetaLabel = styled(Box)({
  fontSize: '11px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

export const MetaValue = styled(Box)({
  fontSize: '13px',
  fontWeight: 500,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ReflectionBox = styled(Box)({
  backgroundColor: 'rgba(28,28,28,0.03)',
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: BORDER_RADIUS.input,
  padding: '14px 16px',
  fontSize: '14px',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: 1.6,
});

export const CommentSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  paddingTop: 14,
  borderTop: `1px solid ${COLORS.card.border}`,
});

export const ExistingComment = styled(Box)({
  display: 'flex',
  gap: 12,
  backgroundColor: 'rgba(74,144,217,0.06)',
  border: `1px solid rgba(74,144,217,0.15)`,
  borderRadius: BORDER_RADIUS.input,
  padding: '12px 14px',
});

export const CommentText = styled(Box)({
  fontSize: '13px',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: 1.5,
  flex: 1,
});

export const CommentInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: BORDER_RADIUS.input,
    fontSize: '14px',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 12px',
    '&::placeholder': { color: COLORS.text.muted, opacity: 1 },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: COLORS.card.border,
  },
});

export const CommentActions = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
});

export const ActionButton = styled(Button)<{ variant?: string }>(({ variant }) => ({
  height: '32px',
  padding: '0 14px',
  fontSize: '13px',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: BORDER_RADIUS.input,
  fontFamily: TYPOGRAPHY.fontFamily,
  ...(variant === 'contained'
    ? { backgroundColor: COLORS.button.blackBg, color: '#FFFFFF', '&:hover': { backgroundColor: '#2D2D3D' } }
    : { border: `1px solid ${COLORS.card.border}`, color: COLORS.text.primary, '&:hover': { backgroundColor: '#F5F5F5' } }),
}));
