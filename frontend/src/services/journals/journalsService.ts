/**
 * Learning Journals service — wraps the backend /journals API.
 */

import { apiClient } from '@/services/api';

export type JournalStatus = 'draft' | 'published';

export interface Journal {
  _id: string;
  learnerId: string | any;
  title: string;
  content: string;
  tags: string[];
  ksbTags: string[];
  status: JournalStatus;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateJournalDto {
  title: string;
  content: string;
  tags?: string[];
  ksbTags?: string[];
  status?: JournalStatus;
}

export interface PaginatedJournals {
  success: boolean;
  data: Journal[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

const unwrap = (res: any) => (res && 'data' in res ? res.data : res);

export const journalsService = {
  getMyJournals: async (params?: {
    page?: number;
    pageSize?: number;
    status?: JournalStatus;
  }): Promise<PaginatedJournals> => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    if (params?.status) qs.set('status', params.status);
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/journals/my${query}`);
  },

  getById: async (id: string): Promise<Journal> => {
    return unwrap(await apiClient.get<any>(`/journals/${id}`));
  },

  create: async (dto: CreateJournalDto): Promise<Journal> => {
    return unwrap(await apiClient.post<any>('/journals', dto));
  },

  update: async (id: string, dto: Partial<CreateJournalDto>): Promise<Journal> => {
    return unwrap(await apiClient.patch<any>(`/journals/${id}`, dto));
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/journals/${id}`);
  },

  publish: async (id: string): Promise<Journal> => {
    return journalsService.update(id, { status: 'published' });
  },

  saveDraft: async (id: string, dto: Partial<CreateJournalDto>): Promise<Journal> => {
    return journalsService.update(id, { ...dto, status: 'draft' });
  },

  // Trainer/Admin: list journals for a learner
  listAll: async (params?: {
    learnerId?: string;
    status?: JournalStatus;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedJournals> => {
    const qs = new URLSearchParams();
    if (params?.learnerId) qs.set('learnerId', params.learnerId);
    if (params?.status) qs.set('status', params.status);
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/journals${query}`);
  },
};
