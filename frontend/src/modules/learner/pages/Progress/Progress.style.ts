/**
 * Styled components for Progress module
 */

import { styled } from '@mui/material/styles';
import { Box, Paper, LinearProgress } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '@/modules/learner/theme/tokens';

export const ProgressContainer = styled(Box)({
  padding: `${SPACING.contentPadding}px`,
});

export const TopBar = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: `${SPACING.sectionGap}px`,
  gap: `${SPACING.sectionGap}px`,
});

export const ProgressInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const ProgressLabel = styled('label')({
  fontSize: '14px',
  fontWeight: 500,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  whiteSpace: 'nowrap',
});

export const ProgressBadge = styled(Box)({
  padding: '6px 12px',
  backgroundColor: COLORS.calendar.highlightBg,
  color: COLORS.progress.green,
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: 600,
  minWidth: '50px',
  textAlign: 'center',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const CheckboxGroup = styled(Box)({
  display: 'flex',
  gap: `${SPACING.sectionGap}px`,
  alignItems: 'center',
});

export const CheckboxLabel = styled('label')({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '14px',
  fontWeight: 400,
  color: COLORS.text.primary,
  cursor: 'pointer',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const UnitFilterSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: `${SPACING.sectionGap}px`,
});

export const FilterSelect = styled('select')({
  padding: '8px 12px',
  borderRadius: `${BORDER_RADIUS.input}px`,
  border: `1px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,
  fontSize: '14px',
  fontWeight: 400,
  cursor: 'pointer',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,

  '&:hover': {
    borderColor: COLORS.text.primary,
  },

  '&:focus': {
    outline: 'none',
    borderColor: COLORS.text.primary,
  },
});

export const ViewMoreLink = styled('a')({
  color: COLORS.link.blue,
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: TYPOGRAPHY.fontFamily,

  '&:hover': {
    textDecoration: 'underline',
  },
});

export const UnitsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: `${SPACING.sectionGap}px`,

  '& > :nth-of-type(4)': {
    gridColumn: '1 / 2',
  },

  '& > :nth-of-type(5)': {
    gridColumn: '2 / 3',
  },

  '@media (max-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',

    '& > :nth-of-type(4)': {
      gridColumn: '1 / 2',
    },

    '& > :nth-of-type(5)': {
      gridColumn: '2 / 3',
    },
  },

  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',

    '& > :nth-of-type(4)': {
      gridColumn: '1 / 2',
    },

    '& > :nth-of-type(5)': {
      gridColumn: '1 / 2',
    },
  },
});

export const UnitCardWrapper = styled(Paper)({
  padding: SPACING.card.padding,
  backgroundColor: COLORS.card.bg,
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: `${BORDER_RADIUS.card}px`,
  transition: 'all 0.3s ease',
  boxShadow: 'none',

  '&:hover': {
    borderColor: COLORS.text.primary,
  },
});

export const UnitIcon = styled(Box)({
  fontSize: '24px',
  marginBottom: '12px',
  color: COLORS.text.secondary,
});

export const UnitTitle = styled(Box)({
  fontSize: '14px',
  fontWeight: 600,
  color: COLORS.text.primary,
  marginBottom: '12px',
  lineHeight: '1.4',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const UnitProgress = styled(Box)({
  marginBottom: '16px',
});

export const ProgressMetric = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '12px',
  fontWeight: 400,
  marginBottom: '6px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ProgressValue = styled(Box)({
  fontWeight: 600,
  color: COLORS.text.primary,
  fontSize: '12px',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const StyledLinearProgress = styled(LinearProgress)({
  height: '8px',
  borderRadius: `${BORDER_RADIUS.small}px`,
  backgroundColor: '#E8E0FF',

  '& .MuiLinearProgress-bar': {
    backgroundColor: COLORS.accent.purple,
    borderRadius: `${BORDER_RADIUS.small}px`,
  },
});
