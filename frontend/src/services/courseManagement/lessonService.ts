/**
 * Lesson management service
 */

import { apiClient } from '@/services/api';
import {
  Lesson,
  CreateLessonPayload,
  UpdateLessonPayload,
} from '@/types/lesson';
import { PaginatedResponse } from '@/types/common';

const LESSON_ENDPOINTS = {
  LIST_BY_COURSE: (courseId: string) => `/courses/${courseId}/lessons`,
  DETAIL: (lessonId: string) => `/lessons/${lessonId}`,
  CREATE: (courseId: string) => `/courses/${courseId}/lessons`,
  UPDATE: (lessonId: string) => `/lessons/${lessonId}`,
  DELETE: (lessonId: string) => `/lessons/${lessonId}`,
  REORDER: (courseId: string) => `/courses/${courseId}/lessons/reorder`,
};

interface GetLessonsParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
}

/**
 * Get lessons by course
 */
export const getLessonsByCourse = async (
  courseId: string,
  params?: GetLessonsParams
): Promise<PaginatedResponse<Lesson>> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

  const query = queryParams.toString();
  const endpoint = query
    ? `${LESSON_ENDPOINTS.LIST_BY_COURSE(courseId)}?${query}`
    : LESSON_ENDPOINTS.LIST_BY_COURSE(courseId);

  return apiClient.get<PaginatedResponse<Lesson>>(endpoint);
};

/**
 * Get lesson by ID
 */
export const getLessonById = async (id: string): Promise<Lesson> => {
  return apiClient.get<Lesson>(LESSON_ENDPOINTS.DETAIL(id));
};

/**
 * Create a new lesson
 */
export const createLesson = async (
  courseId: string,
  payload: CreateLessonPayload
): Promise<Lesson> => {
  return apiClient.post<Lesson>(
    LESSON_ENDPOINTS.CREATE(courseId),
    payload
  );
};

/**
 * Update a lesson
 */
export const updateLesson = async (
  id: string,
  payload: UpdateLessonPayload
): Promise<Lesson> => {
  return apiClient.patch<Lesson>(LESSON_ENDPOINTS.UPDATE(id), payload);
};

/**
 * Delete a lesson
 */
export const deleteLesson = async (id: string): Promise<void> => {
  return apiClient.delete<void>(LESSON_ENDPOINTS.DELETE(id));
};

/**
 * Reorder lessons in a course
 */
export const reorderLessons = async (
  courseId: string,
  lessonIds: string[]
): Promise<Lesson[]> => {
  return apiClient.post<Lesson[]>(
    LESSON_ENDPOINTS.REORDER(courseId),
    { lessonIds }
  );
};
