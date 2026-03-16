/**
 * CourseList custom hook
 */

import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchCourses } from '@/redux/slices/courseManagementSlice';
import { usePagination } from '@/hooks/usePagination';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import { UseCourseListReturn } from './CourseList.interface';
import { DEFAULT_PAGE_SIZE } from './CourseList.data';

/**
 * Custom hook for course list functionality
 */
export const useCourseList = (): UseCourseListReturn => {
  const dispatch = useAppDispatch();

  // Redux selectors
  const courses = useAppSelector((state) => state.courseManagement.courses);
  const pagination = useAppSelector((state) => state.courseManagement.pagination);
  const loading = useAppSelector((state) => state.courseManagement.loading);
  const error = useAppSelector((state) => state.courseManagement.error);

  // Pagination hook
  const {
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
  } = usePagination(
    {
      initialPage: pagination.page,
      initialPageSize: DEFAULT_PAGE_SIZE,
    }
  );

  // Search hook
  const {
    searchQuery,
    debouncedValue: debouncedSearchQuery,
    onSearch,
  } = useDebouncedSearch('', 500);

  // Status filter state
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);

  // Sort state
  const [sortBy, setSortBy] = React.useState<string>('-createdAt');

  // Fetch courses on mount and when dependencies change
  React.useEffect(() => {
    dispatch(
      fetchCourses({
        page,
        pageSize,
        search: debouncedSearchQuery,
        status: selectedStatus || undefined,
        sortBy,
      })
    );
  }, [dispatch, page, pageSize, debouncedSearchQuery, selectedStatus, sortBy]);

  const onStatusChange = useCallback((status: string | null) => {
    setSelectedStatus(status);
    onPageChange(1); // Reset to first page
  }, [onPageChange]);

  const onSort = useCallback((newSortBy: string) => {
    setSortBy(newSortBy);
    onPageChange(1); // Reset to first page
  }, [onPageChange]);

  return {
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
  };
};
