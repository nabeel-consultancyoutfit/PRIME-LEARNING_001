/**
 * Users service — wraps the backend /users API.
 */

import { apiClient } from '@/services/api';

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt?: string;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

const unwrap = (res: any) => (res && 'data' in res ? res.data : res);

export const usersService = {
  getMe: async (): Promise<UserProfile> => {
    return unwrap(await apiClient.get<any>('/users/me'));
  },

  updateMe: async (dto: UpdateProfileDto): Promise<UserProfile> => {
    return unwrap(await apiClient.patch<any>('/users/me', dto));
  },

  getById: async (id: string): Promise<UserProfile> => {
    return unwrap(await apiClient.get<any>(`/users/${id}`));
  },

  listAll: async (params?: {
    role?: string;
    page?: number;
    pageSize?: number;
  }): Promise<any> => {
    const qs = new URLSearchParams();
    if (params?.role) qs.set('role', params.role);
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/users${query}`);
  },
};
