/**
 * Dashboard styled components
 */

import { styled, Box, Card } from '@mui/material';

export const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

export const StatsGridContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SectionTitle = styled(Box)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

export const ChartPlaceholder = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: 300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  border: `2px dashed ${theme.palette.divider}`,
}));

export const RecentCoursesContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const CourseCardRow = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1.5),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transition: 'all 0.3s ease',
  },
}));
