import { styled } from '@mui/material/styles';
import { Box, Paper, Avatar, Button } from '@mui/material';
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

export const TopBarLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const TopBarRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const FilterButton = styled(Button)({
  height: 36,
  padding: '0 16px',
  fontSize: '13px',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: BORDER_RADIUS.input,
  border: `1px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  gap: 6,
  '&:hover': { backgroundColor: '#F5F5F5' },
});

export const FilterGroup = styled(Box)({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
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
  userSelect: 'none',
  '&:hover': { backgroundColor: active ? '#2D2D3D' : '#F5F5F5' },
}));

export const LearnersGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 16,
});

export const LearnerCard = styled(Paper)({
  borderRadius: BORDER_RADIUS.card,
  boxShadow: SHADOWS.card,
  border: `1px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  cursor: 'pointer',
  transition: 'box-shadow 0.2s',
  '&:hover': { boxShadow: SHADOWS.cardHover },
});

export const CardTopRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
});

export const LearnerAvatar = styled(Avatar)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: 44,
  height: 44,
  backgroundColor: bgcolor,
  fontSize: '14px',
  fontWeight: 700,
  flexShrink: 0,
  fontFamily: TYPOGRAPHY.fontFamily,
}));

export const LearnerInfo = styled(Box)({
  flex: 1,
  minWidth: 0,
});

export const LearnerName = styled(Box)({
  fontSize: '15px',
  fontWeight: 700,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const LearnerProgramme = styled(Box)({
  fontSize: '12px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  marginTop: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const LearnerEmployer = styled(Box)({
  fontSize: '12px',
  color: COLORS.text.muted,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const StatusBadge = styled(Box)<{ status: string }>(({ status }) => {
  const map: Record<string, { bg: string; color: string }> = {
    'On Track': { bg: 'rgba(76,175,80,0.1)', color: '#4CAF50' },
    'Behind': { bg: 'rgba(255,152,0,0.1)', color: '#FF9800' },
    'At Risk': { bg: 'rgba(244,67,54,0.1)', color: '#F44336' },
  };
  const c = map[status] || map['On Track'];
  return {
    padding: '3px 10px',
    borderRadius: BORDER_RADIUS.badge,
    backgroundColor: c.bg,
    color: c.color,
    fontSize: '12px',
    fontWeight: 600,
    flexShrink: 0,
    fontFamily: TYPOGRAPHY.fontFamily,
  };
});

export const ProgressSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
});

export const ProgressMeta = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '12px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ProgressTrack = styled(Box)({
  height: 6,
  borderRadius: 3,
  backgroundColor: '#E8E8E8',
  overflow: 'hidden',
});

export const ProgressFill = styled(Box)<{ percent: number; status: string }>(({ percent, status }) => {
  const colorMap: Record<string, string> = {
    'On Track': '#4CAF50',
    'Behind': '#FF9800',
    'At Risk': '#F44336',
  };
  return {
    height: '100%',
    width: `${percent}%`,
    borderRadius: 3,
    backgroundColor: colorMap[status] || '#4CAF50',
    transition: 'width 0.5s ease',
  };
});

export const CardBottomRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: 10,
  borderTop: `1px solid ${COLORS.card.border}`,
});

export const CardMeta = styled(Box)({
  display: 'flex',
  gap: 14,
  alignItems: 'center',
});

export const MetaItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: '12px',
  color: COLORS.text.muted,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const MetaBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: '#F44336',
  color: '#FFFFFF',
  fontSize: '11px',
  fontWeight: 600,
  padding: '0 4px',
});

export const ViewProfileButton = styled(Button)({
  height: 30,
  padding: '0 12px',
  fontSize: '12px',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: BORDER_RADIUS.input,
  border: `1px solid ${COLORS.sidebar.activeBg}`,
  backgroundColor: 'transparent',
  color: COLORS.sidebar.activeBg,
  fontFamily: TYPOGRAPHY.fontFamily,
  '&:hover': { backgroundColor: 'rgba(30,30,45,0.05)' },
});
