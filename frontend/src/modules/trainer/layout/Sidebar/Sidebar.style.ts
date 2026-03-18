import { styled } from '@mui/material/styles';
import { Box, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS } from '@/modules/trainer/theme/tokens';

export const SidebarContainer = styled(Box)({
  width: SPACING.sidebar.width,
  height: '100vh',
  backgroundColor: COLORS.sidebar.bg,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  overflowX: 'hidden',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  borderRight: `1px solid ${COLORS.sidebar.borderColor}`,
  position: 'relative',

  '&::-webkit-scrollbar': { display: 'none' },
});

export const LogoArea = styled(Box)({
  padding: SPACING.sidebar.padding,
  borderBottom: `1px solid ${COLORS.sidebar.borderColor}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 80,
  gap: 8,
});

export const LogoBox = styled(Box)({
  border: `1px solid ${COLORS.sidebar.inactiveText}`,
  borderRadius: BORDER_RADIUS.small,
  padding: 12,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  backgroundColor: COLORS.card.bg,
  gap: 4,
});

export const LogoText = styled(Typography)({
  fontSize: '18px',
  fontWeight: 700,
  color: COLORS.sidebar.inactiveText,
  lineHeight: 1,
});

export const LogoSubtext = styled(Typography)({
  fontSize: '10px',
  color: COLORS.text.muted,
  lineHeight: 1,
  textAlign: 'center',
});

export const CollapseButton = styled(IconButton)({
  color: COLORS.sidebar.inactiveText,
  padding: 4,
  marginLeft: 'auto',
  flexShrink: 0,
});

export const NavListContainer = styled(List)({
  flex: 1,
  padding: `${SPACING.sidebar.padding}px 0`,
  display: 'flex',
  flexDirection: 'column',
  gap: SPACING.sidebar.itemGap,
  paddingLeft: SPACING.sidebar.padding,
  paddingRight: SPACING.sidebar.padding,
});

export const NavListItem = styled(ListItem)({
  height: SPACING.sidebar.itemHeight,
  color: COLORS.sidebar.inactiveText,
  padding: `${SPACING.sidebar.itemPaddingY}px ${SPACING.sidebar.itemPaddingX}px`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  borderRadius: BORDER_RADIUS.pill,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: SPACING.sidebar.itemGap,

  '&:hover': {
    backgroundColor: 'rgba(30, 30, 45, 0.08)',
  },

  '&.active': {
    backgroundColor: COLORS.sidebar.activeBg,
    color: COLORS.sidebar.activeText,
    fontWeight: 600,

    '& .MuiListItemIcon-root': {
      color: COLORS.sidebar.activeText,
    },
    '& .MuiListItemText-primary': {
      color: COLORS.sidebar.activeText,
      fontWeight: 600,
    },
  },
});

export const NavListItemIcon = styled(ListItemIcon)({
  color: 'inherit',
  minWidth: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const NavListItemText = styled(ListItemText)({
  margin: 0,
  '& .MuiListItemText-primary': {
    fontSize: '14px',
    fontWeight: 500,
    color: 'inherit',
  },
});

export const SubmenuChevron = styled(Box)({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  flexShrink: 0,
});

export const BottomNavContainer = styled(Box)({
  paddingTop: SPACING.sidebar.padding,
  borderTop: `1px solid ${COLORS.sidebar.borderColor}`,
  padding: SPACING.sidebar.padding,
});

export const AskAnythingItem = styled(ListItem)({
  height: SPACING.sidebar.itemHeight,
  color: COLORS.sidebar.inactiveText,
  padding: `${SPACING.sidebar.itemPaddingY}px ${SPACING.sidebar.itemPaddingX}px`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  borderRadius: BORDER_RADIUS.pill,
  display: 'flex',
  alignItems: 'center',
  gap: SPACING.sidebar.itemGap,

  '&:hover': {
    backgroundColor: 'rgba(30, 30, 45, 0.08)',
  },
});
