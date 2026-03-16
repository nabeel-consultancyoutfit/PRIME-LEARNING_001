/**
 * CourseDetails interfaces
 */

import { Course } from '@/types/course';
import { Lesson } from '@/types/lesson';
import { Enrollment } from '@/types/enrollment';
import { Instructor } from '@/types/instructor';

export interface CourseDetailsProps {
  courseId?: string;
  onEdit?: (courseId: string) => void;
  onDelete?: (courseId: string) => void;
}

export interface LessonTableColumn {
  id: keyof Lesson | 'actions';
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
}

export interface EnrolledStudent {
  id: string;
  name: string;
  email: string;
  enrolledAt: string;
  progress: number;
  status: 'active' | 'completed' | 'suspended';
}

export interface EnrolledStudentColumn {
  id: keyof EnrolledStudent | 'actions';
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
}

export interface CourseDetailsData {
  course: Course | null;
  instructor: Instructor | null;
  lessons: Lesson[];
  enrollments: Enrollment[];
  enrolledStudents: EnrolledStudent[];
}

export interface UseCourseDetailsReturn {
  course: Course | null;
  instructor: Instructor | null;
  lessons: Lesson[];
  enrolledStudents: EnrolledStudent[];
  loading: boolean;
  error: string | null;
}

export interface TabConfig {
  id: string;
  label: string;
  value: string;
}
