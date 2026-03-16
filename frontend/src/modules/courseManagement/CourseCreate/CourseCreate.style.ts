/**
 * CourseCreate styled components
 */

import { styled, Box, Card, Container } from '@mui/material';

export const CourseCreateContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  '& > *': {
    marginBottom: theme.spacing(2),
  },
}));

export const PageTitle = styled(Box)(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
}));

export const FormCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  boxShadow: theme.shadows[2],
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const FormActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  paddingTop: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    '& button': {
      width: '100%',
    },
  },
}));

export const BreadcrumbWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const SuccessMessage = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.dark,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const ErrorMessage = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.dark,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));
