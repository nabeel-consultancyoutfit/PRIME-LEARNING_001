/**
 * CourseList Module
 * Displays a paginated, searchable list of courses with filtering and actions
 */

import React from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { AppBreadcrumbs } from '@/components/Breadcrumbs';
import { PrimaryButton } from '@/components/Buttons';
import { SearchInput } from '@/components/Search';
import { CourseListProps } from './CourseList.interface';
import { useCourseList } from './useCourseList';
import {
  COURSE_TABLE_COLUMNS,
  STATUS_FILTER_OPTIONS,
  SORT_OPTIONS,
  PAGE_SIZE_OPTIONS,
} from './CourseList.data';
import {
  CourseListContainer,
  HeaderContainer,
  HeaderTitle,
  FiltersContainer,
  SearchInputWrapper,
  StatusChipsContainer,
  StatusChip,
  TableCardContainer,
  TableContainerStyled,
  ActionsCellContainer,
  PaginationContainer,
  LoadingContainer,
  EmptyStateContainer,
} from './CourseList.style';

/**
 * CourseList component
 */
export const CourseList: React.FC<CourseListProps> = ({
  onEdit,
  onDelete,
  onView,
}) => {
  const {
    courses,
    pagination,
    loading,
    error,
    searchQuery,
    selectedStatus,
    onSearch,
    onStatusChange,
    onPageChange,
    onPageSizeChange,
    onSort,
  } = useCourseList();

  const handleDeleteClick = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      onDelete?.(courseId);
    }
  };

  const handleEditClick = (courseId: string) => {
    onEdit?.(courseId);
  };

  const handleViewClick = (courseId: string) => {
    onView?.(courseId);
  };

  const getStatusColor = (status: string): any => {
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

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Course Management', href: '/courses' },
    { label: 'Courses' },
  ];

  return (
    <CourseListContainer>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <AppBreadcrumbs items={breadcrumbItems} />
      </Box>

      {/* Header with Create Button */}
      <HeaderContainer>
        <HeaderTitle>Courses</HeaderTitle>
        <Link href="/courses/create" passHref legacyBehavior>
          <PrimaryButton
            startIcon={<AddIcon />}
            href="/courses/create"
            component="a"
          >
            Create Course
          </PrimaryButton>
        </Link>
      </HeaderContainer>

      {/* Error Message */}
      {error && (
        <Box sx={{ mb: 2, p: 2, backgroundColor: '#ffebee', borderRadius: 1 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {/* Filters */}
      <FiltersContainer>
        <SearchInputWrapper>
          <SearchInput
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </SearchInputWrapper>

        <StatusChipsContainer>
          {STATUS_FILTER_OPTIONS.map((option) => (
            <StatusChip
              key={option.value || 'all'}
              label={option.label}
              onClick={() => onStatusChange(option.value)}
              color={option.color || 'default'}
              variant={selectedStatus === option.value ? 'filled' : 'outlined'}
            />
          ))}
        </StatusChipsContainer>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            label="Sort By"
            defaultValue="-createdAt"
            onChange={(e) => onSort(e.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FiltersContainer>

      {/* Table */}
      <TableCardContainer>
        {loading && !courses.length ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : courses.length === 0 ? (
          <EmptyStateContainer>
            <Typography variant="h6">No courses found</Typography>
            <Typography variant="body2" color="textSecondary">
              {searchQuery || selectedStatus
                ? 'Try adjusting your filters'
                : 'Create your first course to get started'}
            </Typography>
          </EmptyStateContainer>
        ) : (
          <>
            <TableContainerStyled>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    {COURSE_TABLE_COLUMNS.map((column) => (
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
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.instructorId}</TableCell>
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
                      <TableCell align="center">{course.duration}</TableCell>
                      <TableCell align="right">${course.price.toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <ActionsCellContainer>
                          <Tooltip title="View">
                            <IconButton
                              size="small"
                              onClick={() => handleViewClick(course.id)}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => handleEditClick(course.id)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteClick(course.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </ActionsCellContainer>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainerStyled>

            {/* Pagination */}
            <PaginationContainer>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Showing {courses.length > 0 ? (pagination.page - 1) * pagination.pageSize + 1 : 0} to{' '}
                  {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
                  {pagination.total} courses
                </Typography>
              </Box>
              <TablePagination
                rowsPerPageOptions={PAGE_SIZE_OPTIONS}
                component="div"
                count={pagination.total}
                rowsPerPage={pagination.pageSize}
                page={pagination.page - 1}
                onPageChange={(_, newPage) => onPageChange(newPage + 1)}
                onRowsPerPageChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
              />
            </PaginationContainer>
          </>
        )}
      </TableCardContainer>
    </CourseListContainer>
  );
};

export default CourseList;
