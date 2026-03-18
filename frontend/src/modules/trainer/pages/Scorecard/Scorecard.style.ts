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
  gap: 14,
  padding: '16px 20px',
  borderBottom: `1px solid ${COLORS.card.border}`,
});

export const LearnerAvatar = styled(Avatar)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: 38,
  height: 38,
  backgroundColor: bgcolor,
  fontSize: '13px',
  fontWeight: 700,
  fontFamily: TYPOGRAPHY.fontFamily,
}));

export const SectionTitle = styled(Box)({
  fontSize: '15px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const SectionSub = styled(Box)({
  fontSize: '12px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ScorecardTable = styled(Box)({ padding: '20px', display: 'flex', flexDirection: 'column', gap: 4 });

export const CriteriaGroup = styled(Box)({ marginBottom: 16 });

export const GroupLabel = styled(Box)({
  fontSize: '11px',
  fontWeight: 700,
  color: COLORS.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.6px',
  fontFamily: TYPOGRAPHY.fontFamily,
  padding: '8px 0 6px',
  borderBottom: `1px solid ${COLORS.card.border}`,
  marginBottom: 8,
});

export const CriteriaRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 2fr',
  gap: 14,
  padding: '10px 0',
  borderBottom: `1px solid rgba(0,0,0,0.04)`,
  alignItems: 'center',
  '&:last-child': { borderBottom: 'none' },
});

export const CriteriaLabel = styled(Box)({
  fontSize: '13px',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const RatingDots = styled(Box)({
  display: 'flex',
  gap: 5,
  alignItems: 'center',
});

export const RatingDot = styled(Box)<{ filled: boolean }>(({ filled }) => ({
  width: 14,
  height: 14,
  borderRadius: '50%',
  backgroundColor: filled ? COLORS.sidebar.activeBg : '#E8E8E8',
  border: `1.5px solid ${filled ? COLORS.sidebar.activeBg : '#D0D0D0'}`,
  transition: 'background-color 0.2s',
  cursor: 'pointer',
}));

export const EvidenceText = styled(Box)({
  fontSize: '12px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const LastAssessed = styled(Box)({
  fontSize: '11px',
  color: COLORS.text.muted,
  textAlign: 'right',
  padding: '12px 20px',
  borderTop: `1px solid ${COLORS.card.border}`,
  fontFamily: TYPOGRAPHY.fontFamily,
});
