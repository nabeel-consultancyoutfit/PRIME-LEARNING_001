/**
 * Trainer Journals Service — wraps the real backend /journals API (trainer review view).
 */

import { journalsService as coreJournalsService, Journal } from '@/services/journals/journalsService';

export type JournalStatus = 'Pending Review' | 'Reviewed' | 'Needs Revision';

export interface JournalEntry {
  id: string;
  learnerId: string;
  learnerName: string;
  learnerInitials: string;
  avatarColor: string;
  title: string;
  category: string;
  date: string;
  duration: string;
  activityType: string;
  reflection: string;
  status: JournalStatus;
  submittedAt: string;
  trainerComment?: string;
}

export type { Journal };

const AVATAR_COLORS = ['#7B61FF', '#4CAF50', '#F5A623', '#4A90D9', '#F44336', '#00BCD4', '#9C27B0', '#FF5722'];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function mapJournalStatus(status: string): JournalStatus {
  switch (status) {
    case 'published': return 'Pending Review';
    case 'reviewed': return 'Reviewed';
    case 'revision': return 'Needs Revision';
    default: return 'Pending Review';
  }
}

function mapJournal(j: any, idx: number): JournalEntry {
  const learner = j.learnerId ?? {};
  const userId = learner.userId ?? {};
  const first = userId.firstName ?? j.authorFirstName ?? 'Learner';
  const last = userId.lastName ?? j.authorLastName ?? '';
  const learnerName = `${first} ${last}`.trim();

  return {
    id: j._id,
    learnerId: learner._id ?? j.learnerId ?? '',
    learnerName,
    learnerInitials: getInitials(learnerName),
    avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
    title: j.title ?? 'Untitled',
    category: j.tags?.[0] ?? j.category ?? 'General',
    date: j.publishedAt
      ? new Date(j.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : '',
    duration: j.otjHours ? `${j.otjHours * 60} minutes` : '—',
    activityType: j.activityType ?? 'On the job',
    reflection: j.content ?? '',
    status: mapJournalStatus(j.status),
    submittedAt: j.publishedAt
      ? new Date(j.publishedAt).toLocaleString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit',
        })
      : '',
    trainerComment: j.trainerFeedback ?? undefined,
  };
}

const unwrapList = (res: any): any[] => {
  if (res && Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
};

export const journalsService = {
  async getAll(params?: { page?: number; pageSize?: number }): Promise<JournalEntry[]> {
    // Trainers see published journals from their learners
    const res = await coreJournalsService.listAll({ ...params, status: 'published' });
    return unwrapList(res).map(mapJournal);
  },

  async getByLearner(learnerId: string): Promise<JournalEntry[]> {
    const res = await coreJournalsService.listAll({ learnerId });
    return unwrapList(res).map(mapJournal);
  },

  async getByStatus(status: JournalStatus): Promise<JournalEntry[]> {
    const backendStatus = status === 'Pending Review' ? 'published'
      : status === 'Reviewed' ? 'reviewed'
      : 'revision';
    const res = await coreJournalsService.listAll({ status: backendStatus as any });
    return unwrapList(res).map(mapJournal);
  },
};
