/**
 * CourseDetails static data and configurations
 */

import { LessonTableColumn, EnrolledStudentColumn, TabConfig } from './CourseDetails.interface';

export const LESSON_TABLE_COLUMNS: LessonTableColumn[] = [
  {
    id: 'order',
    label: 'Order',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'title',
    label: 'Lesson Title',
    minWidth: 250,
  },
  {
    id: 'duration',
    label: 'Duration (min)',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'isPublished',
    label: 'Published',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    align: 'center',
  },
];

export const ENROLLED_STUDENT_COLUMNS: EnrolledStudentColumn[] = [
  {
    id: 'name',
    label: 'Student Name',
    minWidth: 200,
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 250,
  },
  {
    id: 'enrolledAt',
    label: 'Enrolled Date',
    minWidth: 150,
  },
  {
    id: 'progress',
    label: 'Progress (%)',
    minWidth: 120,
    align: 'center',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 120,
    align: 'center',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    align: 'center',
  },
];

export const DETAIL_TABS: TabConfig[] = [
  {
    id: 'overview',
    label: 'Overview',
    value: 'overview',
  },
  {
    id: 'lessons',
    label: 'Lessons',
    value: 'lessons',
  },
  {
    id: 'students',
    label: 'Enrolled Students',
    value: 'students',
  },
];

export const STATUS_COLORS = {
  draft: 'warning',
  published: 'success',
  archived: 'error',
} as const;

export const STUDENT_STATUS_COLORS = {
  active: 'info',
  completed: 'success',
  suspended: 'error',
} as const;
