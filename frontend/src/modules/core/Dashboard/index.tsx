/**
 * Dashboard Module
 * Main dashboard page showing overview of courses, students, and enrollments
 */

import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import { StatCard } from '@/components/Cards';
import { DashboardProps } from './Dashboard.interface';
import { useDashboard } from './useDashboard';
import { STAT_CARD_CONFIG, CHART_PLACEHOLDER_DATA } from './Dashboard.data';
import {
  DashboardContainer,
  StatsGridContainer,
  SectionContainer,
  SectionTitle,
  ChartPlaceholder,
  RecentCoursesContainer,
  CourseCardRow,
} from './Dashboard.style';

/**
 * Dashboard component
 */
export const Dashboard: React.FC<DashboardProps> = ({ onCourseClick }) => {
  const { stats, recentCourses, loading, error } = useDashboard();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'archived':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (error) {
    return (
      <DashboardContainer>
        <Typography color="error" variant="h6">
          Error loading dashboard: {error}
        </Typography>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      {/* Stats Cards */}
      <StatsGridContainer>
        <Grid container spacing={3}>
          {STAT_CARD_CONFIG.map((config) => {
            const statKey = config.id as keyof typeof stats;
            const Icon = config.icon;
            const value = stats[statKey];
            const formattedValue =
              config.id === 'totalRevenue' ? `$${value.toFixed(2)}` : value;

            return (
              <Grid item xs={12} sm={6} md={3} key={config.id}>
                <StatCard
                  icon={<Icon sx={{ fontSize: 32 }} />}
                  title={config.label}
                  value={formattedValue}
                />
              </Grid>
            );
          })}
        </Grid>
      </StatsGridContainer>

      {/* Enrollment Trends Chart Placeholder */}
      <SectionContainer>
        <SectionTitle>{CHART_PLACEHOLDER_DATA.title}</SectionTitle>
        <ChartPlaceholder>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {CHART_PLACEHOLDER_DATA.description}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Chart visualization will be integrated here
            </Typography>
          </Box>
        </ChartPlaceholder>
      </SectionContainer>

      {/* Recent Courses Section */}
      <SectionContainer>
        <SectionTitle>Recent Courses</SectionTitle>
        {loading && !recentCourses.length ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : recentCourses.length === 0 ? (
          <Card>
            <CardContent>
              <Typography color="textSecondary" align="center">
                No courses available yet
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <RecentCoursesContainer>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Instructor</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">
                      Enrolled
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="right">
                      Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentCourses.map((course) => (
                    <TableRow
                      key={course.id}
                      sx={{
                        '&:hover': { backgroundColor: '#f9f9f9' },
                        cursor: 'pointer',
                      }}
                      onClick={() => onCourseClick?.(course.id)}
                    >
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(course.status)}
                          color={getStatusColor(course.status)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        {course.enrolledCount} / {course.maxStudents}
                      </TableCell>
                      <TableCell align="right">${course.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </RecentCoursesContainer>
        )}
      </SectionContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
