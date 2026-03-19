/**
 * Dashboard service — wraps the backend /dashboard API.
 */

import { apiClient } from '@/services/api';

export interface LearnerDashboard {
  taskSummary: {
    total: number;
    inProgress: number;
    complete: number;
    approved: number;
    pending: number;
    rejected: number;
  };
  evidenceSummary: {
    total: number;
    draft: number;
    submitted: number;
    approved: number;
    rejected: number;
  };
  journalCount: number;
  progress: {
    overallPercentage: number;
    otjHoursLogged: number;
    otjHoursTarget: number;
  };
  notifications: any[];
  pendingTasks: any[];
}

export interface TrainerDashboard {
  learnerCount: number;
  pendingReviews: number;
  recentActivity: any[];
  learnerProgressOverview: Array<{
    learner: any;
    overallPercentage: number;
    otjHoursLogged: number;
    otjHoursTarget: number;
  }>;
}

export interface AdminDashboard {
  totalLearners: number;
  totalTrainers: number;
  totalTasks: number;
  tasksByStatus: Record<string, number>;
  recentUsers: any[];
}

const unwrap = (res: any) => (res && 'data' in res ? res.data : res);

export const dashboardService = {
  getLearnerDashboard: async (): Promise<LearnerDashboard> => {
    return unwrap(await apiClient.get<any>('/dashboard/learner'));
  },

  getTrainerDashboard: async (): Promise<TrainerDashboard> => {
    return unwrap(await apiClient.get<any>('/dashboard/trainer'));
  },

  getAdminDashboard: async (): Promise<AdminDashboard> => {
    return unwrap(await apiClient.get<any>('/dashboard/admin'));
  },
};
