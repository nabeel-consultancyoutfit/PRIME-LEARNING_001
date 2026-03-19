/**
 * Trainer Progress & Scorecard Service — wraps the real backend /progress and /scorecard APIs.
 */

import { progressService as coreProgressService } from '@/services/progress/progressService';
import { scorecardService as coreScorecardService } from '@/services/scorecard/scorecardService';

export interface LearnerProgress {
  learnerId: string;
  learnerName: string;
  learnerInitials: string;
  avatarColor: string;
  programme: string;
  overallPercent: number;
  unitBreakdown: UnitProgress[];
  lastUpdated: string;
}

export interface UnitProgress {
  unit: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  percent: number;
}

export interface ScorecardEntry {
  learnerId: string;
  learnerName: string;
  learnerInitials: string;
  avatarColor: string;
  programme: string;
  criteria: ScorecardCriteria[];
  lastAssessed: string;
}

export interface ScorecardCriteria {
  id: string;
  label: string;
  category: string;
  rating: 0 | 1 | 2 | 3 | 4;
  maxRating: 4;
  evidence: string;
}

const AVATAR_COLORS = ['#7B61FF', '#4CAF50', '#F5A623', '#4A90D9', '#F44336', '#00BCD4'];

function getInitials(first: string, last: string): string {
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
}

function ksbStatusFromRating(rating: number): UnitProgress['status'] {
  if (rating >= 4) return 'Completed';
  if (rating >= 1) return 'In Progress';
  return 'Not Started';
}

function mapProgressRecord(p: any, idx: number): LearnerProgress {
  const learner = p.learnerId ?? {};
  const userId = learner.userId ?? {};
  const first = userId.firstName ?? 'Learner';
  const last = userId.lastName ?? '';
  const programme = learner.programmeId?.title ?? '—';

  const ksbProgress: any[] = p.ksbProgress ?? [];
  const unitBreakdown: UnitProgress[] = ksbProgress.map((k: any) => {
    const rating = k.trainerRating ?? 0;
    const percent = Math.round((rating / 4) * 100);
    return {
      unit: k.ksbRef ?? k.description ?? `KSB ${k.ksbRef}`,
      status: ksbStatusFromRating(rating),
      percent,
    };
  });

  return {
    learnerId: p.learnerId?._id ?? p.learnerId ?? '',
    learnerName: `${first} ${last}`.trim(),
    learnerInitials: getInitials(first, last),
    avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
    programme,
    overallPercent: p.overallPercentage ?? 0,
    unitBreakdown,
    lastUpdated: p.updatedAt ? new Date(p.updatedAt).toLocaleDateString('en-GB') : '',
  };
}

function mapScorecardEntry(s: any, idx: number): ScorecardEntry {
  const learner = s.learnerId ?? {};
  const userId = learner.userId ?? {};
  const first = userId.firstName ?? 'Learner';
  const last = userId.lastName ?? '';
  const programme = learner.programmeId?.title ?? '—';

  const criteria: ScorecardCriteria[] = (s.entries ?? []).map((e: any) => ({
    id: e._id ?? e.ksbRef ?? String(Math.random()),
    label: e.description ?? e.ksbRef ?? '—',
    category: e.type ?? 'Knowledge',
    rating: Math.min(4, Math.max(0, e.trainerRating ?? 0)) as 0 | 1 | 2 | 3 | 4,
    maxRating: 4 as 4,
    evidence: e.evidence ?? '',
  }));

  return {
    learnerId: s.learnerId?._id ?? s.learnerId ?? '',
    learnerName: `${first} ${last}`.trim(),
    learnerInitials: getInitials(first, last),
    avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
    programme,
    criteria,
    lastAssessed: s.updatedAt ? new Date(s.updatedAt).toLocaleDateString('en-GB') : '',
  };
}

const unwrapList = (res: any): any[] => {
  if (res && Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
};

export const progressService = {
  async getAllProgress(): Promise<LearnerProgress[]> {
    const res = await coreProgressService.listAll();
    return unwrapList(res).map(mapProgressRecord);
  },

  async getLearnerProgress(learnerId: string): Promise<LearnerProgress | undefined> {
    try {
      const res = await coreProgressService.getProgressByLearner(learnerId);
      const p = res?.data ?? res;
      if (!p) return undefined;
      return mapProgressRecord(p, 0);
    } catch {
      return undefined;
    }
  },
};

export const scorecardService = {
  async getAll(): Promise<ScorecardEntry[]> {
    const res = await coreScorecardService.listAll();
    return unwrapList(res).map(mapScorecardEntry);
  },

  async getByLearner(learnerId: string): Promise<ScorecardEntry | undefined> {
    try {
      const res = await coreScorecardService.getByLearner(learnerId);
      const s = res?.data ?? res;
      if (!s) return undefined;
      return mapScorecardEntry(s, 0);
    } catch {
      return undefined;
    }
  },

  async updateEntry(learnerId: string, ksbRef: string, trainerRating: number): Promise<void> {
    await coreScorecardService.updateEntry(learnerId, { ksbRef, trainerRating });
  },
};
