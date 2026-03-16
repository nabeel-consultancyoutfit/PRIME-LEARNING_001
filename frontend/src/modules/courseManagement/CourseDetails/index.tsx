/**
 * CourseDetails Module
 * Displays detailed information about a course including lessons and enrolled students
 */

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Chip,
  Tabs,
  Tab,
  CircularProgress,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AppBreadcrumbs } from '@/components/Breadcrumbs';
import { CourseDetailsProps } from './CourseDetails.interface';
import { useCourseDetails } from './useCourseDetails';
import {
  LESSON_TABLE_COLUMNS,
  ENROLLED_STUDENT_COLUMNS,
  DETAIL_TABS,
  STATUS_COLORS,
  STUDENT_STATUS_COLORS,
} from './CourseDetails.data';
import {
  CourseDetailsContainer,
  BreadcrumbWrapper,
  HeaderSection,
  CourseHeaderContent,
  CourseTitle,
  CourseHeaderActions,
  ContentGrid,
  DetailsCard,
  SectionTitle,
  InfoRow,
  InfoLabel,
  InfoValue,
  InstructorSection,
  InstructorAvatar,
  TabsSection,
  TableCard,
  LoadingContainer,
  EmptyStateContainer,
} from './CourseDetails.style';

/**
 * CourseDetails component
 */
export const CourseDetails: React.FC<CourseDetailsProps> = ({
  courseId,
  onEdit,
  onDelete,
}) => {
  const { course, instructor, lessons, enrolledStudents, loading, error } =
    useCourseDetails(courseId);
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <CourseDetailsContainer maxWidth="lg">
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      </CourseDetailsContainer>
    );
  }

  if (error || !course) {
    return (
      <CourseDetailsContainer maxWidth="lg">
        <Typography color="error" variant="h6">
          {error || 'Course not found'}
        </Typography>
      </CourseDetailsContainer>
    );
  }

  const handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete this course?')) {
      onDelete?.(course.id);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Course Management', href: '/courses' },
    { label: 'Courses', href: '/courses' },
    { label: course.title },
  ];

  const getStatusColor = (status: string): any => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || 'default';
  };

  const getStudentStatusColor = (status: string): any => {
    return STUDENT_STATUS_COLORS[status as keyof typeof STUDENT_STATUS_COLORS] || 'default';
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <CourseDetailsContainer maxWidth="lg">
      {/* Breadcrumbs */}
      <BreadcrumbWrapper>
        <AppBreadcrumbs items={breadcrumbItems} />
      </BreadcrumbWrapper>

      {/* Header */}
      <HeaderSection>
        <CourseHeaderContent>
          <CourseTitle>{course.title}</CourseTitle>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
            <Chip
              label={getStatusLabel(course.status)}
              color={getStatusColor(course.status)}
              size="small"
              variant="filled"
            />
          </Box>
        </CourseHeaderContent>
        <CourseHeaderActions>
          <Link href={`/courses/${course.id}/edit`} passHref legacyBehavior>
            <Tooltip title="Edit Course">
              <IconButton
                color="primary"
                onClick={() => onEdit?.(course.id)}
                component="a"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title="Delete Course">
            <IconButton color="error" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CourseHeaderActions>
      </HeaderSection>

      {/* Content Grid */}
      <ContentGrid>
        {/* Course Info */}
        <DetailsCard>
          <SectionTitle>Course Information</SectionTitle>

          <InfoRow>
            <InfoLabel>Description</InfoLabel>
            <InfoValue>{course.description}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Category</InfoLabel>
            <InfoValue>{course.categoryId}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Duration</InfoLabel>
            <InfoValue>{course.duration} hours</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Price</InfoLabel>
            <InfoValue>${course.price.toFixed(2)}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Max Students</InfoLabel>
            <InfoValue>{course.maxStudents}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Enrolled Students</InfoLabel>
            <InfoValue>
              {course.enrolledCount} / {course.maxStudents}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Created</InfoLabel>
            <InfoValue>
              {new Date(course.createdAt).toLocaleDateString()}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Last Updated</InfoLabel>
            <InfoValue>
              {new Date(course.updatedAt).toLocaleDateString()}
            </InfoValue>
          </InfoRow>
        </DetailsCard>

        {/* Instructor Info */}
        <InstructorSection>
          <SectionTitle sx={{ width: '100%', textAlign: 'center' }}>
            Instructor
          </SectionTitle>
          <InstructorAvatar>
            {course.instructorId.charAt(0).toUpperCase()}
          </InstructorAvatar>
          <Typography variant="h6">{course.instructorId}</Typography>
          <Typography variant="body2" color="textSecondary">
            instructor@example.com
          </Typography>
        </InstructorSection>
      </ContentGrid>

      {/* Tabs Section */}
      <TabsSection>
        <Card>
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {DETAIL_TABS.map((tab) => (
              <Tab key={tab.id} label={tab.label} value={tab.value} />
            ))}
          </Tabs>

          <CardContent>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Course Overview
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Statistics
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Total Duration
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {course.duration} hours
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Enrollment Rate
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {Math.round((course.enrolledCount / course.maxStudents) * 100)}%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Potential Revenue
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        ${(course.price * course.enrolledCount).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Lessons Tab */}
            {activeTab === 'lessons' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Course Lessons
                </Typography>
                {lessons.length === 0 ? (
                  <EmptyStateContainer>
                    <Typography variant="body2" color="textSecondary">
                      No lessons added yet
                    </Typography>
                  </EmptyStateContainer>
                ) : (
                  <TableCard>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            {LESSON_TABLE_COLUMNS.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align || 'left'}
                                sx={{ minWidth: column.minWidth, fontWeight: 600 }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {lessons.map((lesson) => (
                            <TableRow key={lesson.id}>
                              <TableCell align="center">{lesson.order}</TableCell>
                              <TableCell>{lesson.title}</TableCell>
                              <TableCell align="center">{lesson.duration}</TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={lesson.isPublished ? 'Yes' : 'No'}
                                  color={lesson.isPublished ? 'success' : 'warning'}
                                  size="small"
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title="Edit">
                                  <IconButton size="small">
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </TableCard>
                )}
              </Box>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Enrolled Students
                </Typography>
                {enrolledStudents.length === 0 ? (
                  <EmptyStateContainer>
                    <Typography variant="body2" color="textSecondary">
                      No students enrolled yet
                    </Typography>
                  </EmptyStateContainer>
                ) : (
                  <TableCard>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            {ENROLLED_STUDENT_COLUMNS.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align || 'left'}
                                sx={{ minWidth: column.minWidth, fontWeight: 600 }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {enrolledStudents.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.email}</TableCell>
                              <TableCell>{student.enrolledAt}</TableCell>
                              <TableCell align="center">{student.progress}%</TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={getStatusLabel(student.status)}
                                  color={getStudentStatusColor(student.status)}
                                  size="small"
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title="View Progress">
                                  <IconButton size="small">
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </TableCard>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </TabsSection>
    </CourseDetailsContainer>
  );
};

export default CourseDetails;
