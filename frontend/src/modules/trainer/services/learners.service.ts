/**
 * Trainer Learners Service — wraps the real backend /learners and /progress APIs.
 */

import { learnersService as coreLearnersService } from '@/services/learners/learnersService';
import { progressService as coreProgressService } from '@/services/progress/progressService';

export type LearnerStatus = 'On Track' | 'Behind' | 'At Risk';

export interface Learner {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  programme: string;
  employer: string;
  startDate: string;
  endDate: string;
  progressPercent: number;
  status: LearnerStatus;
  lastActivity: string;
  pendingTasks: number;
  unreadMessages: number;
  completedUnits: number;
  totalUnits: number;
}

const AVATAR_COLORS = ['#7B61FF', '#4CAF50', '#F5A623', '#4A90D9', '#F44336', '#00BCD4', '#9C27B0', '#FF5722'];

function getInitials(first: string, last: string): string {
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
}

function deriveStatus(percent: number): LearnerStatus {
  if (percent >= 60) return 'On Track';
  if (percent >= 30) return 'Behind';
  return 'At Risk';
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

const unwrapList = (res: any): any[] => {
  if (res && Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
};

export const learnersService = {
  async getAll(params?: { page?: number; pageSize?: number }): Promise<Learner[]> {
    const [learnersRes, progressRes] = await Promise.all([
      coreLearnersService.listAll(params),
      coreProgressService.listAll().catch(() => []),
    ]);

    const learners = unwrapList(learnersRes);
    const progressList = unwrapList(progressRes);
    const progressMap = new Map(progressList.map((p: any) => [p.learnerId?._id ?? p.learnerId, p]));

    return learners.map((l: any, idx: number) => {
      const userId = l.userId ?? {};
      const first = userId.firstName ?? 'Learner';
      const last = userId.lastName ?? '';
      const prog = progressMap.get(l._id) ?? progressMap.get(l.userId?._id) ?? {};
      const percent = prog.overallPercentage ?? 0;

      return {
        id: l._id,
        name: `${first} ${last}`.trim(),
        initials: getInitials(first, last),
        avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
        programme: l.programmeId?.title ?? l.programme ?? '—',
        employer: l.employer ?? '—',
        startDate: formatDate(l.startDate),
        endDate: formatDate(l.expectedEndDate),
        progressPercent: percent,
        status: deriveStatus(percent),
        lastActivity: l.updatedAt ? new Date(l.updatedAt).toLocaleString() : '—',
        pendingTasks: prog.taskCounts?.pending ?? 0,
        unreadMessages: 0,
        completedUnits: prog.ksbProgress?.filter((k: any) => k.trainerRating === 4).length ?? 0,
        totalUnits: prog.ksbProgress?.length ?? 0,
      };
    });
  },

  async getById(id: string): Promise<Learner | undefined> {
    try {
      const [learnerRes, progRes] = await Promise.all([
        coreLearnersService.getById(id),
        coreProgressService.getProgressByLearner(id).catch(() => null),
      ]);

      const l = learnerRes?.data ?? learnerRes;
      if (!l) return undefined;

      const prog = progRes?.data ?? progRes ?? {};
      const userId = l.userId ?? {};
      const first = userId.firstName ?? 'Learner';
      const last = userId.lastName ?? '';
      const percent = prog.overallPercentage ?? 0;

      return {
        id: l._id,
        name: `${first} ${last}`.trim(),
        initials: getInitials(first, last),
        avatarColor: AVATAR_COLORS[0],
        programme: l.programmeId?.title ?? '—',
        employer: l.employer ?? '—',
        startDate: formatDate(l.startDate),
        endDate: formatDate(l.expectedEndDate),
        progressPercent: percent,
        status: deriveStatus(percent),
        lastActivity: l.updatedAt ? new Date(l.updatedAt).toLocaleString() : '—',
        pendingTasks: prog.taskCounts?.pending ?? 0,
        unreadMessages: 0,
        completedUnits: prog.ksbProgress?.filter((k: any) => k.trainerRating === 4).length ?? 0,
        totalUnits: prog.ksbProgress?.length ?? 0,
      };
    } catch {
      return undefined;
    }
  },

  async getByStatus(status: LearnerStatus): Promise<Learner[]> {
    const all = await learnersService.getAll();
    return all.filter((l) => l.status === status);
  },
};
