/**
 * Student management service
 */

import { apiClient } from '@/services/api';
import {
  Student,
  CreateStudentPayload,
  UpdateStudentPayload,
} from '@/types/student';
import { PaginatedResponse } from '@/types/common';

const STUDENT_ENDPOINTS = {
  LIST: '/students',
  DETAIL: (id: string) => `/students/${id}`,
  CREATE: '/students',
  UPDATE: (id: string) => `/students/${id}`,
  DELETE: (id: string) => `/students/${id}`,
};

interface GetStudentsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  sortBy?: string;
}

/**
 * Get all students with pagination and filtering
 */
export const getStudents = async (
  params?: GetStudentsParams
): Promise<PaginatedResponse<Student>> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.status) queryParams.append('status', params.status);
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

  const query = queryParams.toString();
  const endpoint = query ? `${STUDENT_ENDPOINTS.LIST}?${query}` : STUDENT_ENDPOINTS.LIST;

  return apiClient.get<PaginatedResponse<Student>>(endpoint);
};

/**
 * Get student by ID
 */
export const getStudentById = async (id: string): Promise<Student> => {
  return apiClient.get<Student>(STUDENT_ENDPOINTS.DETAIL(id));
};

/**
 * Create a new student
 */
export const createStudent = async (
  payload: CreateStudentPayload
): Promise<Student> => {
  return apiClient.post<Student>(STUDENT_ENDPOINTS.CREATE, payload);
};

/**
 * Update a student
 */
export const updateStudent = async (
  id: string,
  payload: UpdateStudentPayload
): Promise<Student> => {
  return apiClient.patch<Student>(STUDENT_ENDPOINTS.UPDATE(id), payload);
};

/**
 * Delete a student
 */
export const deleteStudent = async (id: string): Promise<void> => {
  return apiClient.delete<void>(STUDENT_ENDPOINTS.DELETE(id));
};
