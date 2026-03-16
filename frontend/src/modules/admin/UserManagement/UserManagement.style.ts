import { styled } from '@mui/material/styles';
import { Box, Container, Tab } from '@mui/material';

export const UserManagementContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const UserManagementHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const UserManagementTabs = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '1rem',
  marginRight: theme.spacing(2),
  '&.Mui-selected': {
    fontWeight: 600,
  },
}));

export const UserManagementControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'stretch',
  },
}));

export const UserManagementSearchBox = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: '250px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const UserManagementTableContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  overflow: 'auto',
}));

export const UserManagementActionsCell = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

export const UserManagementModalContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const UserManagementModalActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2),
}));
