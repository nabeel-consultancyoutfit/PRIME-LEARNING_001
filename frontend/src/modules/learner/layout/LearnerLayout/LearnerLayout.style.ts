import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { COLORS, SPACING } from '@/modules/learner/theme/tokens';

export const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: COLORS.contentArea.bg,
}));

export const LayoutSidebarWrapper = styled(Box)(({ theme }) => ({
  flex: `0 0 ${SPACING.sidebar.width}px`,
  height: '100vh',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  backgroundColor: COLORS.sidebar.bg,
  '&::-webkit-scrollbar': { display: 'none' },
}));

export const LayoutContentWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: COLORS.contentArea.bg,
}));

export const LayoutHeaderWrapper = styled(Box)(({ theme }) => ({
  flex: `0 0 ${SPACING.header.height}px`,
  height: SPACING.header.height,
  overflowX: 'hidden',
  borderBottom: `1px solid ${COLORS.header.borderColor}`,
}));

export const LayoutPageContent = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  padding: SPACING.contentPadding,
  backgroundColor: COLORS.contentArea.bg,

  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));
