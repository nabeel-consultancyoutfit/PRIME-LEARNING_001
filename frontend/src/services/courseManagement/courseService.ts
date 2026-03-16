/**
 * Course management service
 */

import { apiClient } from '@/services/api';
import {
  Course,
  CreateCoursePayload,
  UpdateCoursePayload,
} from '@/types/course';
import { PaginatedResponse } from '@/types/common';

const COURSE_ENDPOINTS = {
  LIST: '/courses',
  DETAIL: (id: string) => `/courses/${id}`,
  CREATE: '/courses',
  UPDATE: (id: string) => `/courses/${id}`,
  DELETE: (id: string) => `/courses/${id}`,
};

interface GetCoursesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  sortBy?: string;
}

/**
 * Get courses with pagination and filtering
 */
export const getCourses = async (
  params?: GetCoursesParams
): Promise<PaginatedResponse<Course>> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.status) queryParams.append('status', params.status);
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

  const query = queryParams.toString();
  const endpoint = query ? `${COURSE_ENDPOINTS.LIST}?${query}` : COURSE_ENDPOINTS.LIST;

  return apiClient.get<PaginatedResponse<Course>>(endpoint);
};

/**
 * Get course by ID
 */
export const getCourseById = async (id: string): Promise<Course> => {
  return apiClient.get<Course>(COURSE_ENDPOINTS.DETAIL(id));
};

/**
 * Create a new course
 */
export const createCourse = async (
  payload: CreateCoursePayload
): Promise<Course> => {
  return apiClient.post<Course>(COURSE_ENDPOINTS.CREATE, payload);
};

/**
 * Update a course
 */
export const updateCourse = async (
  id: string,
  payload: UpdateCoursePayload
): Promise<Course> => {
  return apiClient.patch<Course>(COURSE_ENDPOINTS.UPDATE(id), payload);
};

/**
 * Delete a course
 */
export const deleteCourse = async (id: string): Promise<void> => {
  return apiClient.delete<void>(COURSE_ENDPOINTS.DELETE(id));
};
