/**
 * Course type definitions
 */

export type CourseStatus = 'draft' | 'published' | 'archived';

export interface Course {
  id: string;
  title: string;
  description: string;
  status: CourseStatus;
  instructorId: string;
  categoryId: string;
  duration: number; // hours
  maxStudents: number;
  enrolledCount: number;
  price: number;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCoursePayload {
  title: string;
  description: string;
  status: CourseStatus;
  instructorId: string;
  categoryId: string;
  duration: number;
  maxStudents: number;
  price: number;
  thumbnail: string;
}

export type UpdateCoursePayload = Partial<CreateCoursePayload>;
