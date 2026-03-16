/**
 * Enrollment management service
 */

import { apiClient } from '@/services/api';
import {
  Enrollment,
  CreateEnrollmentPayload,
  UpdateEnrollmentPayload,
} from '@/types/enrollment';
import { PaginatedResponse } from '@/types/common';

const ENROLLMENT_ENDPOINTS = {
  LIST: '/enrollments',
  DETAIL: (id: string) => `/enrollments/${id}`,
  CREATE: '/enrollments',
  UPDATE: (id: string) => `/enrollments/${id}`,
  BY_COURSE: (courseId: string) => `/courses/${courseId}/enrollments`,
  BY_STUDENT: (studentId: string) => `/students/${studentId}/enrollments`,
};

interface GetEnrollmentsParams {
  page?: number;
  pageSize?: number;
  status?: string;
  sortBy?: string;
}

/**
 * Get all enrollments with pagination and filtering
 */
export const getEnrollments = async (
  params?: GetEnrollmentsParams
): Promise<PaginatedResponse<Enrollment>> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

  const query = queryParams.toString();
  const endpoint = query ? `${ENROLLMENT_ENDPOINTS.LIST}?${query}` : ENROLLMENT_ENDPOINTS.LIST;

  return apiClient.get<PaginatedResponse<Enrollment>>(endpoint);
};

/**
 * Get enrollment by ID
 */
export const getEnrollmentById = async (id: string): Promise<Enrollment> => {
  return apiClient.get<Enrollment>(ENROLLMENT_ENDPOINTS.DETAIL(id));
};

/**
 * Create a new enrollment
 */
export const createEnrollment = async (
  payload: CreateEnrollmentPayload
): Promise<Enrollment> => {
  return apiClient.post<Enrollment>(ENROLLMENT_ENDPOINTS.CREATE, payload);
};

/**
 * Update an enrollment
 */
export const updateEnrollment = async (
  id: string,
  payload: UpdateEnrollmentPayload
): Promise<Enrollment> => {
  return apiClient.patch<Enrollment>(ENROLLMENT_ENDPOINTS.UPDATE(id), payload);
};

/**
 * Get enrollments by course
 */
export const getEnrollmentsByCourse = async (
  courseId: string,
  params?: GetEnrollmentsParams
): Promise<PaginatedResponse<Enrollment>> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

  const query = queryParams.toString();
  const endpoint = query
    ? `${ENROLLMENT_ENDPOINTS.BY_COURSE(courseId)}?${query}`
    : ENROLLMENT_ENDPOINTS.BY_COURSE(courseId);

  return apiClient.get<PaginatedResponse<Enrollment>>(endpoint);
};

/**
 * Get enrollments by student
 */
export const getEnrollmentsByStudent = async (
  studentId: string,
  params?: GetEnrollmentsParams
): Promise<PaginatedResponse<Enrollment>> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

  const query = queryParams.toString();
  const endpoint = query
    ? `${ENROLLMENT_ENDPOINTS.BY_STUDENT(studentId)}?${query}`
    : ENROLLMENT_ENDPOINTS.BY_STUDENT(studentId);

  return apiClient.get<PaginatedResponse<Enrollment>>(endpoint);
};
