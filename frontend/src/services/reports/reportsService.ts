/**
 * Reports service — wraps the backend /reports API.
 */

import { apiClient } from '@/services/api';

const unwrap = (res: any) => (res && 'data' in res ? res.data : res);

export const reportsService = {
  getLearnerReport: async (learnerId: string) => {
    return unwrap(await apiClient.get<any>(`/reports/learner/${learnerId}`));
  },

  getCohortReport: async () => {
    return unwrap(await apiClient.get<any>('/reports/cohort'));
  },

  getOTJReport: async (learnerId?: string) => {
    const qs = learnerId ? `?learnerId=${learnerId}` : '';
    return unwrap(await apiClient.get<any>(`/reports/otj${qs}`));
  },
};
