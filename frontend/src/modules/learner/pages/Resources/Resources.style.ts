/**
 * Styled components for Resources module
 */

import { styled } from '@mui/material/styles';
import { Box, Button, Paper } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '@/modules/learner/theme/tokens';

export const ResourcesContainer = styled(Box)({
  padding: `${SPACING.contentPadding}px`,
});

export const HeaderCard = styled(Paper)({
  padding: '16px 24px',
  backgroundColor: COLORS.card.bg,
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: `${BORDER_RADIUS.card}px`,
  marginBottom: `${SPACING.sectionGap}px`,
  boxShadow: 'none',
});

export const HeaderTitle = styled('h2')({
  margin: 0,
  fontSize: '18px',
  fontWeight: 700,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const FilterBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: `${SPACING.sectionGap}px`,
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
  whiteSpace: 'nowrap',
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

export const SearchInput = styled('input')({
  padding: '8px 12px',
  borderRadius: `${BORDER_RADIUS.input}px`,
  border: `1px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,
  fontSize: '14px',
  fontWeight: 400,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  flex: 1,
  minWidth: '200px',

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

export const BackButton = styled(Button)({
  padding: '8px 12px',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  backgroundColor: 'transparent',
  color: COLORS.text.primary,
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: `${BORDER_RADIUS.input}px`,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: TYPOGRAPHY.fontFamily,

  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
});

export const FoldersGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  gap: `${SPACING.sectionGap}px`,
});

export const FolderItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  padding: '12px',
  borderRadius: `${BORDER_RADIUS.card}px`,
  border: `1px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,

  '&:hover': {
    borderColor: COLORS.text.primary,
    backgroundColor: '#F5F5F5',
  },
});

export const FolderIcon = styled(Box)({
  fontSize: '48px',
  color: COLORS.accent.orange,
});

export const FolderName = styled(Box)({
  fontSize: '14px',
  fontWeight: 500,
  color: COLORS.text.primary,
  textAlign: 'center',
  wordBreak: 'break-word',
  maxWidth: '120px',
  fontFamily: TYPOGRAPHY.fontFamily,
});
