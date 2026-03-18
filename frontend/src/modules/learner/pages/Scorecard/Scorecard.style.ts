/**
 * Styled components for Scorecard module
 */

import { styled } from '@mui/material/styles';
import { Box, Paper, Button } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '@/modules/learner/theme/tokens';

export const ScorecardContainer = styled(Box)({
  padding: `${SPACING.contentPadding}px`,
});

export const PanelGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: `${SPACING.sectionGap}px`,

  '@media (max-width: 1200px)': {
    gridTemplateColumns: '1fr',
  },
});

export const Panel = styled(Paper)({
  padding: SPACING.card.padding,
  backgroundColor: COLORS.card.bg,
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: `${BORDER_RADIUS.card}px`,
  boxShadow: 'none',
});

export const PanelTitle = styled('h2')({
  margin: `0 0 16px 0`,
  fontSize: '18px',
  fontWeight: 700,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const CreateButton = styled(Button)({
  padding: '8px 16px',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  backgroundColor: 'transparent',
  color: COLORS.text.primary,
  border: `1px solid ${COLORS.button.blackBg}`,
  borderRadius: `${BORDER_RADIUS.input}px`,
  cursor: 'pointer',
  fontFamily: TYPOGRAPHY.fontFamily,

  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
});

export const SubmitButton = styled(Button)({
  padding: '6px 12px',
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'none',
  backgroundColor: COLORS.button.blackBg,
  color: '#FFFFFF',
  borderRadius: `${BORDER_RADIUS.input}px`,
  cursor: 'pointer',
  fontFamily: TYPOGRAPHY.fontFamily,

  '&:hover': {
    backgroundColor: '#2D2D3D',
  },
});

export const DateFromGroup = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px',
});

export const DateLabel = styled('label')({
  fontSize: '14px',
  fontWeight: 500,
  color: COLORS.text.primary,
  minWidth: 'auto',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const DateInput = styled('input')({
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

export const EmptyStateMessage = styled(Box)({
  padding: '32px 16px',
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: 400,
  color: COLORS.text.secondary,
  fontStyle: 'italic',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ChartContainer = styled(Box)({
  padding: `${SPACING.card.padding}px`,
  backgroundColor: COLORS.card.bg,
  borderRadius: `${BORDER_RADIUS.card}px`,
});

export const ChartHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
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

export const FilterGroup = styled(Box)({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
});

export const FilterLabel = styled('label')({
  fontSize: '14px',
  fontWeight: 500,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ChartSVGWrapper = styled(Box)({
  overflow: 'auto',
  padding: '12px',
  backgroundColor: COLORS.card.bg,
  borderRadius: `${BORDER_RADIUS.input}px`,
  border: `1px solid ${COLORS.card.border}`,
});

export const ChartAxisLabel = styled(Box)({
  fontSize: '11px',
  color: COLORS.text.secondary,
  textAlign: 'center',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ChartLegend = styled(Box)({
  display: 'flex',
  gap: `${SPACING.sectionGap}px`,
  marginTop: '12px',
  fontSize: '14px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});
