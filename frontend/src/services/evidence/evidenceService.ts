/**
 * Evidence service — wraps the backend /evidence API.
 */

import { apiClient } from '@/services/api';

export type EvidenceStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

export interface Evidence {
  _id: string;
  learnerId: string | any;
  taskId?: string | any;
  title: string;
  description?: string;
  content?: string;
  attachments: string[];
  ksbTags: string[];
  status: EvidenceStatus;
  reviewedBy?: string | any;
  reviewedAt?: string;
  reviewNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEvidenceDto {
  taskId?: string;
  title: string;
  description?: string;
  content?: string;
  attachments?: string[];
  ksbTags?: string[];
}

export interface PaginatedEvidence {
  success: boolean;
  data: Evidence[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

const unwrap = (res: any) => (res && 'data' in res ? res.data : res);

export const evidenceService = {
  getMyEvidence: async (params?: {
    page?: number;
    pageSize?: number;
    status?: EvidenceStatus;
  }): Promise<PaginatedEvidence> => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    if (params?.status) qs.set('status', params.status);
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/evidence/my${query}`);
  },

  getById: async (id: string): Promise<Evidence> => {
    return unwrap(await apiClient.get<any>(`/evidence/${id}`));
  },

  create: async (dto: CreateEvidenceDto): Promise<Evidence> => {
    return unwrap(await apiClient.post<any>('/evidence', dto));
  },

  update: async (id: string, dto: Partial<CreateEvidenceDto>): Promise<Evidence> => {
    return unwrap(await apiClient.patch<any>(`/evidence/${id}`, dto));
  },

  submit: async (id: string): Promise<Evidence> => {
    return unwrap(await apiClient.post<any>(`/evidence/${id}/submit`));
  },

  review: async (
    id: string,
    approved: boolean,
    notes?: string,
  ): Promise<Evidence> => {
    return unwrap(await apiClient.post<any>(`/evidence/${id}/review`, { approved, notes }));
  },

  // Admin/Trainer: list all evidence
  listAll: async (params?: {
    learnerId?: string;
    status?: EvidenceStatus;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedEvidence> => {
    const qs = new URLSearchParams();
    if (params?.learnerId) qs.set('learnerId', params.learnerId);
    if (params?.status) qs.set('status', params.status);
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/evidence${query}`);
  },
};
