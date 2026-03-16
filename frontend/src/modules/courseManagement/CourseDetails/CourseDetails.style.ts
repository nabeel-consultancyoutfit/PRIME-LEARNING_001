/**
 * CourseDetails styled components
 */

import { styled, Box, Card, Container } from '@mui/material';

export const CourseDetailsContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

export const BreadcrumbWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const CourseHeaderContent = styled(Box)(({ theme }) => ({
  flex: 1,
}));

export const CourseTitle = styled(Box)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

export const CourseHeaderActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    '& button': {
      flex: 1,
    },
  },
}));

export const ContentGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const DetailsCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: theme.shadows[2],
}));

export const SectionTitle = styled(Box)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

export const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
    paddingBottom: 0,
    marginBottom: 0,
  },
}));

export const InfoLabel = styled(Box)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

export const InfoValue = styled(Box)(({ theme }) => ({
  fontSize: '0.95rem',
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

export const InstructorSection = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  boxShadow: theme.shadows[2],
}));

export const InstructorAvatar = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.primary.dark,
}));

export const TabsSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export const TableCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
  boxShadow: theme.shadows[2],
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 400,
}));

export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 300,
  padding: theme.spacing(3),
  textAlign: 'center',
  gap: theme.spacing(1),
}));
