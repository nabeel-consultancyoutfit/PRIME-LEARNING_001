/**
 * Progress service — wraps the backend /progress API.
 */

import { apiClient } from '@/services/api';

export interface KSBProgressItem {
  ksbCode: string;
  ksbType: 'knowledge' | 'skill' | 'behaviour';
  title: string;
  completed: boolean;
  completedAt: string | null;
  evidence: string[];
}

export interface ProgressRecord {
  _id: string;
  learnerId: string | any;
  programmeId?: string | any;
  overallPercentage: number;
  tasksCompleted: number;
  tasksTotal: number;
  evidenceApproved: number;
  journalsPublished: number;
  otjHoursLogged: number;
  otjHoursTarget: number;
  ksbProgress: KSBProgressItem[];
  lastUpdated?: string;
}

export interface PaginatedProgress {
  success: boolean;
  data: ProgressRecord[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

const unwrap = (res: any) => (res && 'data' in res ? res.data : res);

export const progressService = {
  getMyProgress: async (): Promise<ProgressRecord> => {
    return unwrap(await apiClient.get<any>('/progress/me'));
  },

  getProgressByLearner: async (learnerId: string): Promise<ProgressRecord> => {
    return unwrap(await apiClient.get<any>(`/progress/${learnerId}`));
  },

  listAll: async (params?: { page?: number; pageSize?: number }): Promise<PaginatedProgress> => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/progress${query}`);
  },

  update: async (learnerId: string, data: Partial<ProgressRecord>): Promise<ProgressRecord> => {
    return unwrap(await apiClient.patch<any>(`/progress/${learnerId}`, data));
  },

  markKSBComplete: async (learnerId: string, ksbCode: string): Promise<ProgressRecord> => {
    return unwrap(await apiClient.patch<any>(`/progress/${learnerId}/ksb/${ksbCode}`));
  },
};
