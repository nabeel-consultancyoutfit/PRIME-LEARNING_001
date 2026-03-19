/**
 * Scorecard service — wraps the backend /scorecard API.
 */

import { apiClient } from '@/services/api';

export interface ScorecardEntry {
  ksbCode: string;
  ksbType: 'knowledge' | 'skill' | 'behaviour';
  title: string;
  selfAssessment: number;     // 1-4
  trainerAssessment: number;  // 1-4
  iqaAssessment: number;      // 1-4
  notes: string;
  lastUpdated: string;
}

export interface Scorecard {
  _id: string;
  learnerId: string | any;
  programmeId?: string | any;
  entries: ScorecardEntry[];
  overallSelfScore?: number;
  overallTrainerScore?: number;
  lastReviewDate?: string;
  lastReviewedBy?: string | any;
}

export interface PaginatedScorecards {
  success: boolean;
  data: Scorecard[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

const unwrap = (res: any) => (res && 'data' in res ? res.data : res);

export const scorecardService = {
  getMyScorecard: async (): Promise<Scorecard> => {
    return unwrap(await apiClient.get<any>('/scorecard/me'));
  },

  updateSelfAssessment: async (entries: Partial<ScorecardEntry>[]): Promise<Scorecard> => {
    return unwrap(await apiClient.patch<any>('/scorecard/me/self-assessment', { entries }));
  },

  getByLearner: async (learnerId: string): Promise<Scorecard> => {
    return unwrap(await apiClient.get<any>(`/scorecard/${learnerId}`));
  },

  listAll: async (params?: { page?: number; pageSize?: number }): Promise<PaginatedScorecards> => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/scorecard${query}`);
  },

  updateEntry: async (
    learnerId: string,
    ksbCode: string,
    data: Partial<ScorecardEntry>,
  ): Promise<Scorecard> => {
    return unwrap(
      await apiClient.patch<any>(`/scorecard/${learnerId}/entry/${ksbCode}`, data),
    );
  },
};
