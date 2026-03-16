import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';

export const SubscriptionListContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const SubscriptionListHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
  },
}));

export const SubscriptionListControls = styled(Box)(({ theme }) => ({
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

export const SubscriptionListSearchBox = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: '250px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const SubscriptionListTableContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  overflow: 'auto',
}));

export const SubscriptionListActionsCell = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}));
