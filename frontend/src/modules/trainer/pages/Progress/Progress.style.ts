import { styled } from '@mui/material/styles';
import { Box, Paper, Avatar } from '@mui/material';
import { COLORS, BORDER_RADIUS, TYPOGRAPHY, SHADOWS } from '@/modules/trainer/theme/tokens';

export const PageContainer = styled(Box)({ display: 'flex', flexDirection: 'column', gap: 20 });

export const SectionCard = styled(Paper)({
  borderRadius: BORDER_RADIUS.card,
  boxShadow: SHADOWS.card,
  border: `1px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,
  overflow: 'hidden',
});

export const SectionHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderBottom: `1px solid ${COLORS.card.border}`,
});

export const SectionTitle = styled(Box)({
  fontSize: '15px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ProgressList = styled(Box)({ display: 'flex', flexDirection: 'column', gap: 14, padding: '20px' });

export const LearnerProgressCard = styled(Box)({
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: BORDER_RADIUS.input,
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const LearnerRow = styled(Box)({ display: 'flex', alignItems: 'center', gap: 12 });

export const LearnerAvatar = styled(Avatar)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: 38,
  height: 38,
  backgroundColor: bgcolor,
  fontSize: '13px',
  fontWeight: 700,
  fontFamily: TYPOGRAPHY.fontFamily,
}));

export const LearnerName = styled(Box)({
  fontSize: '14px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const LearnerProgramme = styled(Box)({
  fontSize: '12px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const OverallProgress = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginLeft: 'auto',
});

export const ProgressValue = styled(Box)({
  fontSize: '20px',
  fontWeight: 700,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: 1,
});

export const UnitsList = styled(Box)({ display: 'flex', flexDirection: 'column', gap: 8 });

export const UnitRow = styled(Box)({ display: 'flex', alignItems: 'center', gap: 12 });

export const UnitName = styled(Box)({
  flex: 1,
  fontSize: '13px',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const UnitStatusBadge = styled(Box)<{ status: string }>(({ status }) => {
  const m: Record<string, string> = {
    'Completed': '#4CAF50',
    'In Progress': '#4A90D9',
    'Not Started': '#9291A5',
  };
  return {
    fontSize: '11px',
    fontWeight: 500,
    color: m[status] || '#9291A5',
    fontFamily: TYPOGRAPHY.fontFamily,
    flexShrink: 0,
    minWidth: 80,
    textAlign: 'right' as const,
  };
});

export const UnitTrack = styled(Box)({ width: 120, height: 6, borderRadius: 3, backgroundColor: '#E8E8E8', overflow: 'hidden', flexShrink: 0 });

export const UnitFill = styled(Box)<{ percent: number; status: string }>(({ percent, status }) => {
  const m: Record<string, string> = { 'Completed': '#4CAF50', 'In Progress': '#4A90D9', 'Not Started': '#E8E8E8' };
  return { height: '100%', width: `${percent}%`, borderRadius: 3, backgroundColor: m[status] || '#E8E8E8' };
});
