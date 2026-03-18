/**
 * Styled components for Evidence module
 */

import { styled } from '@mui/material/styles';
import { Box, Button, Table, TableCell } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '@/modules/learner/theme/tokens';

export const EvidenceContainer = styled(Box)({
  padding: `${SPACING.contentPadding}px`,
});

export const EvidenceHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: `${SPACING.sectionGap}px`,
  gap: `${SPACING.sectionGap}px`,
});

export const EvidenceTitle = styled('h2')({
  margin: 0,
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

export const FilterBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: `${SPACING.sectionGap}px`,
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

export const EvidenceCard = styled(Box)({
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

export const TitleLink = styled('a')({
  color: COLORS.link.blue,
  textDecoration: 'none',
  cursor: 'pointer',
  fontWeight: 500,
  fontFamily: TYPOGRAPHY.fontFamily,

  '&:hover': {
    textDecoration: 'underline',
  },
});

export const CheckboxCell = styled(TableCell)({
  textAlign: 'center',
});
