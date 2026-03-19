/**
 * Programmes service — wraps the backend /programmes API.
 */

import { apiClient } from '@/services/api';

export interface KSB {
  code: string;
  type: 'knowledge' | 'skill' | 'behaviour';
  title: string;
  description: string;
}

export interface Programme {
  _id: string;
  title: string;
  description?: string;
  apprenticeshipStandard?: string;
  level?: number;
  duration?: number;
  ksbs: KSB[];
  otjHoursRequired: number;
  status: 'active' | 'archived';
  createdAt?: string;
}

export interface PaginatedProgrammes {
  success: boolean;
  data: Programme[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

const unwrap = (res: any) => (res && 'data' in res ? res.data : res);

export const programmesService = {
  listAll: async (params?: { page?: number; pageSize?: number }): Promise<PaginatedProgrammes> => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/programmes${query}`);
  },

  getById: async (id: string): Promise<Programme> => {
    return unwrap(await apiClient.get<any>(`/programmes/${id}`));
  },

  create: async (data: Partial<Programme>): Promise<Programme> => {
    return unwrap(await apiClient.post<any>('/programmes', data));
  },

  update: async (id: string, data: Partial<Programme>): Promise<Programme> => {
    return unwrap(await apiClient.patch<any>(`/programmes/${id}`, data));
  },

  archive: async (id: string): Promise<Programme> => {
    return unwrap(await apiClient.delete<any>(`/programmes/${id}`));
  },
};
