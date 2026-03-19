/**
 * Learners service — wraps the backend /learners API.
 */

import { apiClient } from '@/services/api';

export type LearnerStatus = 'active' | 'on_break' | 'withdrawn' | 'completed';

export interface LearnerProfile {
  _id: string;
  userId: string | any;
  trainerId?: string | any;
  programmeId?: string | any;
  apprenticeshipStandard?: string;
  cohort?: string;
  startDate?: string;
  expectedEndDate?: string;
  actualEndDate?: string;
  employer?: string;
  otjHoursTarget: number;
  otjHoursLogged: number;
  status: LearnerStatus;
  overallProgress: number;
  ksbCompleted: string[];
}

export interface PaginatedLearners {
  success: boolean;
  data: LearnerProfile[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

export interface UpdateLearnerDto {
  trainerId?: string;
  programmeId?: string;
  apprenticeshipStandard?: string;
  cohort?: string;
  startDate?: string;
  expectedEndDate?: string;
  employer?: string;
  otjHoursTarget?: number;
  otjHoursLogged?: number;
  status?: LearnerStatus;
  overallProgress?: number;
}

const unwrap = (res: any) => (res && 'data' in res ? res.data : res);

export const learnersService = {
  getMyProfile: async (): Promise<LearnerProfile> => {
    return unwrap(await apiClient.get<any>('/learners/me'));
  },

  listAll: async (params?: {
    trainerId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedLearners> => {
    const qs = new URLSearchParams();
    if (params?.trainerId) qs.set('trainerId', params.trainerId);
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/learners${query}`);
  },

  getById: async (id: string): Promise<LearnerProfile> => {
    return unwrap(await apiClient.get<any>(`/learners/${id}`));
  },

  update: async (id: string, dto: UpdateLearnerDto): Promise<LearnerProfile> => {
    return unwrap(await apiClient.patch<any>(`/learners/${id}`, dto));
  },
};
