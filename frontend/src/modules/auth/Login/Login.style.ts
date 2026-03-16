/**
 * Login module styled components
 */

import { styled } from '@mui/material/styles';
import { Box, Card } from '@mui/material';

export const LoginWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
}));

export const LoginCard = styled(Card)(({ theme }) => ({
  maxWidth: 420,
  width: '100%',
  padding: theme.spacing(4),
  boxShadow: theme.shadows[3],
  borderRadius: theme.spacing(2),
}));

export const FormWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

export const AppTitle = styled('h1')(({ theme }) => ({
  margin: 0,
  fontSize: '1.75rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

export const FormFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const LinkWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(3),
  fontSize: '0.875rem',
}));

export const RegisterLink = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  cursor: 'pointer',
  fontWeight: 600,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const ErrorMessage = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.error.lighter || '#ffebee',
  color: theme.palette.error.main,
  borderRadius: theme.spacing(1),
  fontSize: '0.875rem',
  marginBottom: theme.spacing(2),
}));
