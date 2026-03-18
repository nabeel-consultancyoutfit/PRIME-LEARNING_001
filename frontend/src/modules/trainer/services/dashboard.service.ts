/**
 * Trainer Dashboard Mock Service
 * Simulates async API responses with realistic data shapes
 */

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

export interface UpcomingSession {
  id: string;
  title: string;
  learnerName: string;
  date: string;
  time: string;
  type: 'Review' | 'Workshop' | 'Assessment' | 'Check-in';
}

export interface CohortProgress {
  label: string;
  percentage: number;
  color: string;
}

const MOCK_STATS: DashboardStats = {
  totalLearners: 14,
  activeTasks: 23,
  pendingReviews: 7,
  unreadMessages: 4,
};

const MOCK_ACTIVITIES: LearnerActivity[] = [
  {
    id: '1',
    learnerName: 'James Wilson',
    learnerInitials: 'JW',
    action: 'Submitted a Learning Journal entry',
    module: 'Customer Service Excellence',
    timestamp: '10 minutes ago',
    avatarColor: '#7B61FF',
  },
  {
    id: '2',
    learnerName: 'Emma Clarke',
    learnerInitials: 'EC',
    action: 'Completed a task',
    module: 'Team Leadership Module 3',
    timestamp: '32 minutes ago',
    avatarColor: '#4CAF50',
  },
  {
    id: '3',
    learnerName: 'Olivia Brown',
    learnerInitials: 'OB',
    action: 'Uploaded evidence',
    module: 'Health & Safety Unit 2',
    timestamp: '1 hour ago',
    avatarColor: '#F5A623',
  },
  {
    id: '4',
    learnerName: 'Marcus Taylor',
    learnerInitials: 'MT',
    action: 'Sent a message',
    module: 'General Enquiry',
    timestamp: '2 hours ago',
    avatarColor: '#4A90D9',
  },
  {
    id: '5',
    learnerName: 'Priya Patel',
    learnerInitials: 'PP',
    action: 'Completed scorecard assessment',
    module: 'End Point Assessment Prep',
    timestamp: '3 hours ago',
    avatarColor: '#F44336',
  },
  {
    id: '6',
    learnerName: 'Daniel Hughes',
    learnerInitials: 'DH',
    action: 'Started a new task',
    module: 'Communication Skills',
    timestamp: '5 hours ago',
    avatarColor: '#00BCD4',
  },
];

const MOCK_SESSIONS: UpcomingSession[] = [
  {
    id: '1',
    title: 'Progress Review',
    learnerName: 'James Wilson',
    date: 'Today',
    time: '2:00 PM',
    type: 'Review',
  },
  {
    id: '2',
    title: 'EPA Preparation Workshop',
    learnerName: 'Group Session (4 learners)',
    date: 'Tomorrow',
    time: '10:00 AM',
    type: 'Workshop',
  },
  {
    id: '3',
    title: 'Mid-Programme Assessment',
    learnerName: 'Emma Clarke',
    date: '19 Mar',
    time: '1:30 PM',
    type: 'Assessment',
  },
  {
    id: '4',
    title: 'Monthly Check-in',
    learnerName: 'Priya Patel',
    date: '20 Mar',
    time: '11:00 AM',
    type: 'Check-in',
  },
];

const MOCK_COHORT_PROGRESS: CohortProgress[] = [
  { label: 'On Track', percentage: 57, color: '#4CAF50' },
  { label: 'Behind', percentage: 29, color: '#FF9800' },
  { label: 'At Risk', percentage: 14, color: '#F44336' },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    await delay(300);
    return { ...MOCK_STATS };
  },

  async getRecentActivity(): Promise<LearnerActivity[]> {
    await delay(400);
    return [...MOCK_ACTIVITIES];
  },

  async getUpcomingSessions(): Promise<UpcomingSession[]> {
    await delay(350);
    return [...MOCK_SESSIONS];
  },

  async getCohortProgress(): Promise<CohortProgress[]> {
    await delay(300);
    return [...MOCK_COHORT_PROGRESS];
  },
};
