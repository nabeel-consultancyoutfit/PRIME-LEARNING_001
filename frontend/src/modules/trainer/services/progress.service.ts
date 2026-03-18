/**
 * Progress & Scorecard Mock Service
 */

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

const MOCK_PROGRESS: LearnerProgress[] = [
  {
    learnerId: '1',
    learnerName: 'James Wilson',
    learnerInitials: 'JW',
    avatarColor: '#7B61FF',
    programme: 'Team Leader / Supervisor L3',
    overallPercent: 72,
    lastUpdated: '14 Mar 2025',
    unitBreakdown: [
      { unit: 'Unit 1 — Role of a Team Leader', status: 'Completed', percent: 100 },
      { unit: 'Unit 2 — Communication', status: 'Completed', percent: 100 },
      { unit: 'Unit 3 — Managing Performance', status: 'Completed', percent: 100 },
      { unit: 'Unit 4 — Problem Solving', status: 'In Progress', percent: 60 },
      { unit: 'Unit 5 — Project Management', status: 'Not Started', percent: 0 },
    ],
  },
  {
    learnerId: '5',
    learnerName: 'Priya Patel',
    learnerInitials: 'PP',
    avatarColor: '#F44336',
    programme: 'Accounting / Finance L3',
    overallPercent: 88,
    lastUpdated: '11 Mar 2025',
    unitBreakdown: [
      { unit: 'Unit 1 — Bookkeeping', status: 'Completed', percent: 100 },
      { unit: 'Unit 2 — Financial Statements', status: 'Completed', percent: 100 },
      { unit: 'Unit 3 — Payroll', status: 'Completed', percent: 100 },
      { unit: 'Unit 4 — Month-End Reporting', status: 'In Progress', percent: 80 },
      { unit: 'Unit 5 — EPA Preparation', status: 'Not Started', percent: 0 },
    ],
  },
];

const MOCK_SCORECARD: ScorecardEntry[] = [
  {
    learnerId: '1',
    learnerName: 'James Wilson',
    learnerInitials: 'JW',
    avatarColor: '#7B61FF',
    programme: 'Team Leader / Supervisor L3',
    lastAssessed: '10 Mar 2025',
    criteria: [
      { id: 'k1', label: 'Understand team dynamics', category: 'Knowledge', rating: 3, maxRating: 4, evidence: '3 journal entries' },
      { id: 'k2', label: 'Performance management techniques', category: 'Knowledge', rating: 2, maxRating: 4, evidence: '1 reflective account' },
      { id: 's1', label: 'Leads team meetings effectively', category: 'Skills', rating: 4, maxRating: 4, evidence: 'Observation + journal' },
      { id: 's2', label: 'Delegates tasks appropriately', category: 'Skills', rating: 3, maxRating: 4, evidence: '2 workplace examples' },
      { id: 'b1', label: 'Acts with integrity and fairness', category: 'Behaviours', rating: 4, maxRating: 4, evidence: 'Manager testimony' },
      { id: 'b2', label: 'Commits to continuous development', category: 'Behaviours', rating: 3, maxRating: 4, evidence: 'CPD log' },
    ],
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const progressService = {
  async getAllProgress(): Promise<LearnerProgress[]> {
    await delay(400);
    return [...MOCK_PROGRESS];
  },

  async getLearnerProgress(learnerId: string): Promise<LearnerProgress | undefined> {
    await delay(300);
    return MOCK_PROGRESS.find((p) => p.learnerId === learnerId);
  },
};

export const scorecardService = {
  async getAll(): Promise<ScorecardEntry[]> {
    await delay(400);
    return [...MOCK_SCORECARD];
  },

  async getByLearner(learnerId: string): Promise<ScorecardEntry | undefined> {
    await delay(300);
    return MOCK_SCORECARD.find((s) => s.learnerId === learnerId);
  },
};
