/**
 * Styled components for Tasks module
 */

import { styled } from '@mui/material/styles';
import { Box, Table, TableCell, Button } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '@/modules/learner/theme/tokens';

export const TasksContainer = styled(Box)({
  padding: `${SPACING.contentPadding}px`,
});

export const TasksHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: `${SPACING.sectionGap}px`,
  gap: `${SPACING.sectionGap}px`,
});

export const TasksTitle = styled('h2')({
  margin: 0,
  fontSize: '20px',
  fontWeight: 700,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const NotificationBadge = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  fontSize: '12px',
  fontWeight: 500,
  color: COLORS.accent.orange,
  border: `1px solid ${COLORS.accent.orange}`,
  backgroundColor: 'transparent',
  borderRadius: '20px',
  fontFamily: TYPOGRAPHY.fontFamily,
  whiteSpace: 'nowrap',
});

export const FilterBar = styled(Box)({
  display: 'flex',
  gap: `${SPACING.sectionGap}px`,
  alignItems: 'center',
  marginBottom: `${SPACING.sectionGap}px`,
});

export const FilterGroup = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const FilterLabel = styled('label')({
  fontSize: '14px',
  fontWeight: 500,
  color: COLORS.text.primary,
  minWidth: 'auto',
  fontFamily: TYPOGRAPHY.fontFamily,
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
  height: '36px',
  minWidth: '150px',

  '&:hover': {
    borderColor: COLORS.text.primary,
  },
  '&:focus': {
    outline: 'none',
    borderColor: COLORS.text.primary,
  },
});

export const TasksCard = styled(Box)({
  backgroundColor: COLORS.card.bg,
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: `${BORDER_RADIUS.card}px`,
  overflow: 'hidden',
});

export const StyledTable = styled(Table)({
  width: '100%',
  borderCollapse: 'collapse',

  '& thead': {
    backgroundColor: '#F9F9F9',
  },
  '& th': {
    padding: `${SPACING.card.padding}px`,
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: COLORS.text.secondary,
    borderBottom: `1px solid ${COLORS.card.border}`,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  '& td': {
    padding: `${SPACING.card.padding}px`,
    fontSize: '14px',
    fontWeight: 400,
    color: COLORS.text.primary,
    borderBottom: `1px solid ${COLORS.card.border}`,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  '& tbody tr:last-child td': {
    borderBottom: 'none',
  },
  '& tbody tr:hover': {
    backgroundColor: '#FAFAFA',
  },
});

export const StatusCell = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '12px',
  fontWeight: 500,
  fontFamily: TYPOGRAPHY.fontFamily,

  '&::before': {
    content: '""',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    flexShrink: 0,
  },
});

export const ActionButton = styled(Button)({
  padding: '6px 16px',
  fontSize: '12px',
  fontWeight: 500,
  textTransform: 'none',
  backgroundColor: COLORS.button.blackBg,
  color: '#FFFFFF',
  borderRadius: `${BORDER_RADIUS.input}px`,
  fontFamily: TYPOGRAPHY.fontFamily,
  border: 'none',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#2D2D3D',
  },
});

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'In Progress':
      return COLORS.link.blue; // #4A90D9
    case 'Complete':
      return COLORS.progress.green; // #4CAF50
    case 'Pending':
      return COLORS.accent.orange; // #F5A623
    case 'Approved':
      return COLORS.progress.green; // #4CAF50
    case 'Rejected':
      return '#E53935';
    default:
      return COLORS.text.primary;
  }
};
