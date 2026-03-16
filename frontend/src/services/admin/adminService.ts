/**
 * Admin service
 */

import { apiClient } from '@/services/api';
import { User, UserRole } from '@/types/auth';
import { PaginatedResponse } from '@/types/common';

const ADMIN_ENDPOINTS = {
  USERS: '/admin/users',
  USER_DETAIL: (id: string) => `/admin/users/${id}`,
  UPDATE_USER_ROLE: (id: string) => `/admin/users/${id}/role`,
  DASHBOARD_STATS: '/admin/stats',
};

interface GetUsersParams {
  page?: number;
  pageSize?: number;
  role?: UserRole;
  search?: string;
  sortBy?: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  activeEnrollments: number;
  completionRate: number;
}

/**
 * Get all users with pagination and filtering
 */
export const getUsers = async (
  params?: GetUsersParams
): Promise<PaginatedResponse<User>> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
  if (params?.role) queryParams.append('role', params.role);
  if (params?.search) queryParams.append('search', params.search);
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

  const query = queryParams.toString();
  const endpoint = query ? `${ADMIN_ENDPOINTS.USERS}?${query}` : ADMIN_ENDPOINTS.USERS;

  return apiClient.get<PaginatedResponse<User>>(endpoint);
};

/**
 * Get user by ID
 */
export const getUserById = async (id: string): Promise<User> => {
  return apiClient.get<User>(ADMIN_ENDPOINTS.USER_DETAIL(id));
};

/**
 * Update user role
 */
export const updateUserRole = async (
  id: string,
  role: UserRole
): Promise<User> => {
  return apiClient.patch<User>(ADMIN_ENDPOINTS.UPDATE_USER_ROLE(id), { role });
};

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  return apiClient.get<DashboardStats>(ADMIN_ENDPOINTS.DASHBOARD_STATS);
};
