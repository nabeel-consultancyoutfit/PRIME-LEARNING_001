/**
 * Learners Mock Service — realistic learner data with progress and status
 */

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

const MOCK_LEARNERS: Learner[] = [
  {
    id: '1',
    name: 'James Wilson',
    initials: 'JW',
    avatarColor: '#7B61FF',
    programme: 'Team Leader / Supervisor L3',
    employer: 'Barclays Bank',
    startDate: '01 Sep 2024',
    endDate: '31 Aug 2025',
    progressPercent: 72,
    status: 'On Track',
    lastActivity: '10 mins ago',
    pendingTasks: 2,
    unreadMessages: 1,
    completedUnits: 8,
    totalUnits: 11,
  },
  {
    id: '2',
    name: 'Emma Clarke',
    initials: 'EC',
    avatarColor: '#4CAF50',
    programme: 'Business Administrator L3',
    employer: 'NHS Trust',
    startDate: '15 Oct 2024',
    endDate: '14 Oct 2025',
    progressPercent: 45,
    status: 'On Track',
    lastActivity: '32 mins ago',
    pendingTasks: 4,
    unreadMessages: 0,
    completedUnits: 5,
    totalUnits: 11,
  },
  {
    id: '3',
    name: 'Olivia Brown',
    initials: 'OB',
    avatarColor: '#F5A623',
    programme: 'Retail Manager L4',
    employer: 'Marks & Spencer',
    startDate: '01 Jun 2024',
    endDate: '31 May 2025',
    progressPercent: 38,
    status: 'Behind',
    lastActivity: '1 hour ago',
    pendingTasks: 7,
    unreadMessages: 2,
    completedUnits: 4,
    totalUnits: 10,
  },
  {
    id: '4',
    name: 'Marcus Taylor',
    initials: 'MT',
    avatarColor: '#4A90D9',
    programme: 'Customer Service Specialist L3',
    employer: 'HSBC',
    startDate: '01 Feb 2024',
    endDate: '31 Jan 2025',
    progressPercent: 22,
    status: 'At Risk',
    lastActivity: '2 hours ago',
    pendingTasks: 9,
    unreadMessages: 3,
    completedUnits: 2,
    totalUnits: 9,
  },
  {
    id: '5',
    name: 'Priya Patel',
    initials: 'PP',
    avatarColor: '#F44336',
    programme: 'Accounting / Finance L3',
    employer: 'Deloitte',
    startDate: '01 Apr 2024',
    endDate: '31 Mar 2025',
    progressPercent: 88,
    status: 'On Track',
    lastActivity: '3 hours ago',
    pendingTasks: 1,
    unreadMessages: 0,
    completedUnits: 8,
    totalUnits: 9,
  },
  {
    id: '6',
    name: 'Daniel Hughes',
    initials: 'DH',
    avatarColor: '#00BCD4',
    programme: 'Data Analyst L4',
    employer: 'Lloyds Banking Group',
    startDate: '01 Nov 2024',
    endDate: '31 Oct 2025',
    progressPercent: 31,
    status: 'On Track',
    lastActivity: '5 hours ago',
    pendingTasks: 3,
    unreadMessages: 0,
    completedUnits: 3,
    totalUnits: 10,
  },
  {
    id: '7',
    name: 'Sophie Mitchell',
    initials: 'SM',
    avatarColor: '#9C27B0',
    programme: 'HR Consultant / Partner L5',
    employer: 'PwC',
    startDate: '01 Jul 2024',
    endDate: '30 Jun 2026',
    progressPercent: 55,
    status: 'Behind',
    lastActivity: 'Yesterday',
    pendingTasks: 5,
    unreadMessages: 1,
    completedUnits: 6,
    totalUnits: 11,
  },
  {
    id: '8',
    name: 'Aaron Okafor',
    initials: 'AO',
    avatarColor: '#FF5722',
    programme: 'Operations / Departmental Manager L5',
    employer: 'Amazon',
    startDate: '01 Mar 2024',
    endDate: '28 Feb 2026',
    progressPercent: 62,
    status: 'On Track',
    lastActivity: '2 days ago',
    pendingTasks: 2,
    unreadMessages: 0,
    completedUnits: 7,
    totalUnits: 11,
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const learnersService = {
  async getAll(): Promise<Learner[]> {
    await delay(400);
    return [...MOCK_LEARNERS];
  },

  async getById(id: string): Promise<Learner | undefined> {
    await delay(300);
    return MOCK_LEARNERS.find((l) => l.id === id);
  },

  async getByStatus(status: LearnerStatus): Promise<Learner[]> {
    await delay(350);
    return MOCK_LEARNERS.filter((l) => l.status === status);
  },
};
