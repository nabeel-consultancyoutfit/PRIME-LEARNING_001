/**
 * CourseList interfaces
 */

import { Course } from '@/types/course';

export interface CourseListProps {
  onEdit?: (courseId: string) => void;
  onDelete?: (courseId: string) => void;
  onView?: (courseId: string) => void;
}

export interface CourseTableColumn {
  id: keyof Course | 'actions';
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string | React.ReactNode;
}

export interface StatusFilterOption {
  label: string;
  value: string | null;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

export interface SortOption {
  label: string;
  value: string;
}

export interface UseCourseListReturn {
  courses: Course[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedStatus: string | null;
  onSearch: (query: string) => void;
  onStatusChange: (status: string | null) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSort: (sortBy: string) => void;
}
