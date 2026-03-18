/**
 * Styled components for Courses module
 */

import { styled } from '@mui/material/styles';
import { Box, Button, Paper, LinearProgress } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '@/modules/learner/theme/tokens';

export const CoursesContainer = styled(Box)({
  padding: `${SPACING.contentPadding}px`,
});

export const EmptyStateCard = styled(Paper)({
  padding: '48px 24px',
  textAlign: 'center',
  marginBottom: '32px',
  backgroundColor: COLORS.card.bg,
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: `${BORDER_RADIUS.card}px`,
  boxShadow: 'none',
});

export const EmptyStateIcon = styled(Box)({
  fontSize: '3rem',
  marginBottom: '16px',
  color: '#999999',
});

export const EmptyStateTitle = styled(Box)({
  fontSize: '14px',
  fontWeight: 600,
  color: COLORS.text.primary,
  marginBottom: '8px',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const EmptyStateText = styled(Box)({
  fontSize: '13px',
  fontWeight: 400,
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const CoursesHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: `${SPACING.sectionGap}px`,
  gap: `${SPACING.sectionGap}px`,
});

export const CoursesLabel = styled('label')({
  fontSize: '14px',
  fontWeight: 500,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  whiteSpace: 'nowrap',
});

export const OrderSelect = styled('select')({
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

export const SearchInput = styled('input')({
  padding: '8px 12px',
  borderRadius: `${BORDER_RADIUS.input}px`,
  border: `1px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,
  fontSize: '14px',
  fontWeight: 400,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  width: '200px',

  '&::placeholder': {
    color: COLORS.text.secondary,
  },

  '&:hover': {
    borderColor: COLORS.text.primary,
  },

  '&:focus': {
    outline: 'none',
    borderColor: COLORS.text.primary,
  },
});

export const CoursesGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: `${SPACING.sectionGap}px`,

  '@media (max-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
});

export const CourseCardWrapper = styled(Paper)({
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

export const CourseIcon = styled(Box)({
  fontSize: '24px',
  marginBottom: '12px',
  color: COLORS.text.secondary,
});

export const CourseTitle = styled(Box)({
  fontSize: '16px',
  fontWeight: 700,
  color: COLORS.text.primary,
  marginBottom: '8px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const CourseStatus = styled(Box)({
  fontSize: '13px',
  fontWeight: 400,
  color: COLORS.text.secondary,
  marginBottom: '16px',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const StartButton = styled(Button)({
  padding: '8px 24px',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  backgroundColor: COLORS.accent.purple,
  color: '#FFFFFF',
  borderRadius: `${BORDER_RADIUS.input}px`,
  cursor: 'pointer',
  marginBottom: '12px',
  width: '100%',
  fontFamily: TYPOGRAPHY.fontFamily,

  '&:hover': {
    backgroundColor: '#6B52E0',
  },
});

export const ProgressLabel = styled(Box)({
  fontSize: '12px',
  fontWeight: 600,
  color: COLORS.text.primary,
  marginBottom: '6px',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const StyledLinearProgress = styled(LinearProgress)({
  height: '8px',
  borderRadius: `${BORDER_RADIUS.small}px`,
  backgroundColor: '#E8E0FF',
  flex: 1,

  '& .MuiLinearProgress-bar': {
    backgroundColor: COLORS.accent.purple,
    borderRadius: `${BORDER_RADIUS.small}px`,
  },
});
