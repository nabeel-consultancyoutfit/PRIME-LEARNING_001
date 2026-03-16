import { styled } from '@mui/material/styles';
import { Box, AppBar as MuiAppBar, Drawer as MuiDrawer } from '@mui/material';

const DRAWER_WIDTH = 240;
const APP_BAR_HEIGHT = 64;

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  width: `calc(100% - ${DRAWER_WIDTH}px)`,
  marginLeft: DRAWER_WIDTH,
  height: APP_BAR_HEIGHT,
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 0,
  },
}));

export const Drawer = styled(MuiDrawer)({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
  },
});

export const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  minHeight: APP_BAR_HEIGHT,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    marginLeft: DRAWER_WIDTH,
  },
}));

export const ContentArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: APP_BAR_HEIGHT,
  backgroundColor: theme.palette.background.default,
  minHeight: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
}));

export const AppBarContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

export const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flex: 1,
  maxWidth: 400,
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const AppBarActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const NavItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  fontWeight: 500,
  borderLeft: '3px solid transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
  '&.active': {
    backgroundColor: theme.palette.primary.lighter || theme.palette.primary.light,
    borderLeftColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

export const NavSection = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
  '&:first-of-type': {
    borderTop: 'none',
    paddingTop: theme.spacing(1),
  },
}));

export const NavSectionTitle = styled(Box)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  padding: theme.spacing(2, 2, 1, 2),
  letterSpacing: 0.5,
}));
