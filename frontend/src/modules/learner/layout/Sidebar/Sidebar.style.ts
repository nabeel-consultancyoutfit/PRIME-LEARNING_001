import { styled } from '@mui/material/styles';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS } from '@/modules/learner/theme/tokens';

export const SidebarContainer = styled(Box)(({ theme }) => ({
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

  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

export const LogoArea = styled(Box)(({ theme }) => ({
  padding: SPACING.sidebar.padding,
  borderBottom: `1px solid ${COLORS.sidebar.borderColor}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 80,
  gap: 8,
}));

export const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  padding: '4px 0',
  color: COLORS.sidebar.inactiveText,
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 700,
  color: COLORS.sidebar.inactiveText,
  lineHeight: 1,
}));

export const LogoSubtext = styled(Typography)(({ theme }) => ({
  fontSize: '10px',
  color: COLORS.text.secondary,
  lineHeight: 1,
  textAlign: 'center',
}));

export const CollapseButton = styled(IconButton)(({ theme }) => ({
  color: COLORS.sidebar.inactiveText,
  padding: theme.spacing(0.5),
  marginLeft: 'auto',
  flexShrink: 0,
}));

export const NavListContainer = styled(List)(({ theme }) => ({
  flex: 1,
  padding: `${SPACING.sidebar.padding}px 0`,
  display: 'flex',
  flexDirection: 'column',
  gap: SPACING.sidebar.itemGap,
  paddingLeft: SPACING.sidebar.padding,
  paddingRight: SPACING.sidebar.padding,
}));

export const NavListItem = styled(ListItem)(({ theme }) => ({
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
}));

export const NavListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: 'inherit',
  minWidth: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}));

export const NavListItemText = styled(ListItemText)(({ theme }) => ({
  margin: 0,

  '& .MuiListItemText-primary': {
    fontSize: '14px',
    fontWeight: 500,
    color: 'inherit',
  },
}));

export const SubmenuChevron = styled(Box)(({ theme }) => ({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  flexShrink: 0,
}));

export const BottomNavContainer = styled(Box)(({ theme }) => ({
  paddingTop: SPACING.sidebar.padding,
  borderTop: `1px solid ${COLORS.sidebar.borderColor}`,
  padding: SPACING.sidebar.padding,
}));

export const AskAnythingItem = styled(ListItem)(({ theme }) => ({
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
}));
