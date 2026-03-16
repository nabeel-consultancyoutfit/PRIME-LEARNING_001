/**
 * Register module styled components
 */

import { styled } from '@mui/material/styles';
import { Box, Card } from '@mui/material';

export const RegisterWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
}));

export const RegisterCard = styled(Card)(({ theme }) => ({
  maxWidth: 500,
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

export const PageTitle = styled('h1')(({ theme }) => ({
  margin: 0,
  fontSize: '1.75rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

export const NameFieldsWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const LinkWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(3),
  fontSize: '0.875rem',
}));

export const LoginLink = styled('span')(({ theme }) => ({
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

export const FormSectionTitle = styled('h3')(({ theme }) => ({
  margin: theme.spacing(2, 0, 1, 0),
  fontSize: '0.875rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));
