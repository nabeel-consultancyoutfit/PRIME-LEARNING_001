/**
 * Lesson type definitions
 */

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  order: number;
  duration: number; // minutes
  videoUrl: string;
  attachments: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLessonPayload {
  courseId: string;
  title: string;
  content: string;
  order: number;
  duration: number;
  videoUrl: string;
  attachments: string[];
  isPublished: boolean;
}

export type UpdateLessonPayload = Partial<CreateLessonPayload>;
