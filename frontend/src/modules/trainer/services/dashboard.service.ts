/**
 * Trainer Dashboard Service — wraps the real backend /dashboard API.
 */

import { dashboardService as coreDashboardService, TrainerDashboard } from '@/services/dashboard/dashboardService';
import { notificationsService } from '@/services/notifications/notificationsService';

export interface DashboardStats {
  totalLearners: number;
  activeTasks: number;
  pendingReviews: number;
  unreadMessages: number;
}

export interface LearnerActivity {
  id: string;
  learnerName: string;
  learnerInitials: string;
  action: string;
  module: string;
  timestamp: string;
  avatarColor: string;
}

export interface CohortProgress {
  label: string;
  percentage: number;
  color: string;
}

function getInitials(first: string, last: string): string {
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
}

const AVATAR_COLORS = ['#7B61FF', '#4CAF50', '#F5A623', '#4A90D9', '#F44336', '#00BCD4'];

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const data: TrainerDashboard = await coreDashboardService.getTrainerDashboard();
    return {
      totalLearners: data.learnerCount ?? 0,
      activeTasks: (data.recentActivity ?? []).length,
      pendingReviews: data.pendingReviews ?? 0,
      unreadMessages: 0, // could fetch from notifications
    };
  },

  async getRecentActivity(): Promise<LearnerActivity[]> {
    const data: TrainerDashboard = await coreDashboardService.getTrainerDashboard();
    return (data.recentActivity ?? []).map((item: any, idx: number) => {
      const learner = item.learnerId ?? {};
      const first = learner.firstName ?? 'Learner';
      const last = learner.lastName ?? '';
      return {
        id: item._id ?? String(idx),
        learnerName: `${first} ${last}`.trim(),
        learnerInitials: getInitials(first, last),
        action: `Status updated to: ${item.status}`,
        module: item.title ?? 'Task',
        timestamp: item.updatedAt ? new Date(item.updatedAt).toLocaleString() : '',
        avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
      };
    });
  },

  async getCohortProgress(): Promise<CohortProgress[]> {
    const data: TrainerDashboard = await coreDashboardService.getTrainerDashboard();
    const overview = data.learnerProgressOverview ?? [];
    const total = overview.length || 1;
    const onTrack = overview.filter((l) => l.overallPercentage >= 60).length;
    const behind = overview.filter((l) => l.overallPercentage >= 30 && l.overallPercentage < 60).length;
    const atRisk = overview.filter((l) => l.overallPercentage < 30).length;
    return [
      { label: 'On Track', percentage: Math.round((onTrack / total) * 100), color: '#4CAF50' },
      { label: 'Behind', percentage: Math.round((behind / total) * 100), color: '#FF9800' },
      { label: 'At Risk', percentage: Math.round((atRisk / total) * 100), color: '#F44336' },
    ];
  },

  async getUpcomingSessions() {
    // Sessions/calendar not yet in backend — return empty for now
    return [];
  },
};
