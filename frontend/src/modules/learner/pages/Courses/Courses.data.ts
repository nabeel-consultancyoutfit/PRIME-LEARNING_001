/**
 * Mock data for Courses module
 */

import { CourseCard } from './Courses.interface';

export const MOCK_COURSES: CourseCard[] = [
  {
    id: '1',
    title: 'BRITISH VALUES',
    status: 'You have not started this course',
    progress: 51,
  },
  {
    id: '2',
    title: 'BRITISH VALUES',
    status: 'You have not started this course',
    progress: 51,
  },
  {
    id: '3',
    title: 'BRITISH VALUES',
    status: 'You have not started this course',
    progress: 51,
  },
];

export const ORDER_OPTIONS = [
  { value: 'name_asc', label: 'Name Ascending' },
  { value: 'name_desc', label: 'Name Descending' },
  { value: 'date_new', label: 'Newest First' },
  { value: 'date_old', label: 'Oldest First' },
];
