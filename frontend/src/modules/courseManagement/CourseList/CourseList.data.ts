/**
 * CourseList static data and configurations
 */

import { CourseTableColumn, StatusFilterOption, SortOption } from './CourseList.interface';

export const COURSE_TABLE_COLUMNS: CourseTableColumn[] = [
  {
    id: 'title',
    label: 'Title',
    minWidth: 200,
  },
  {
    id: 'instructorId',
    label: 'Instructor',
    minWidth: 150,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 120,
  },
  {
    id: 'enrolledCount',
    label: 'Enrolled',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'duration',
    label: 'Duration (hrs)',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 100,
    align: 'right',
    format: (value: number) => `$${value.toFixed(2)}`,
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 120,
    align: 'center',
  },
];

export const STATUS_FILTER_OPTIONS: StatusFilterOption[] = [
  {
    label: 'All',
    value: null,
    color: 'default',
  },
  {
    label: 'Draft',
    value: 'draft',
    color: 'warning',
  },
  {
    label: 'Published',
    value: 'published',
    color: 'success',
  },
  {
    label: 'Archived',
    value: 'archived',
    color: 'error',
  },
];

export const SORT_OPTIONS: SortOption[] = [
  {
    label: 'Newest First',
    value: '-createdAt',
  },
  {
    label: 'Oldest First',
    value: 'createdAt',
  },
  {
    label: 'Title (A-Z)',
    value: 'title',
  },
  {
    label: 'Title (Z-A)',
    value: '-title',
  },
  {
    label: 'Most Enrolled',
    value: '-enrolledCount',
  },
  {
    label: 'Highest Price',
    value: '-price',
  },
];

export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
