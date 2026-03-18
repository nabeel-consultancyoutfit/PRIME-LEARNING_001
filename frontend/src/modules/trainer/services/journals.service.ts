/**
 * Learning Journals Mock Service (Trainer view — review mode)
 */

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

const MOCK_JOURNALS: JournalEntry[] = [
  {
    id: '1',
    learnerId: '1',
    learnerName: 'James Wilson',
    learnerInitials: 'JW',
    avatarColor: '#7B61FF',
    title: 'Managing a difficult team meeting',
    category: 'Leadership',
    date: '14 Mar 2025',
    duration: '120 minutes',
    activityType: 'On the job',
    reflection:
      'Today I had to facilitate a tense team meeting where two colleagues had a conflict over task ownership. I used active listening and structured the agenda to give each person time to speak without interruption.',
    status: 'Pending Review',
    submittedAt: '14 Mar 2025, 4:22 PM',
  },
  {
    id: '2',
    learnerId: '2',
    learnerName: 'Emma Clarke',
    learnerInitials: 'EC',
    avatarColor: '#4CAF50',
    title: 'Process improvement in admin workflow',
    category: 'Business Operations',
    date: '13 Mar 2025',
    duration: '90 minutes',
    activityType: 'On the job',
    reflection:
      'I identified a bottleneck in the document approval process and suggested a new workflow using shared folders. This reduced turnaround time from 3 days to same day.',
    status: 'Reviewed',
    submittedAt: '13 Mar 2025, 2:15 PM',
    trainerComment:
      'Excellent reflection, Emma. This clearly demonstrates KSB 2.3 — process improvement. Well articulated.',
  },
  {
    id: '3',
    learnerId: '3',
    learnerName: 'Olivia Brown',
    learnerInitials: 'OB',
    avatarColor: '#F5A623',
    title: 'Customer service training delivery',
    category: 'Training & Development',
    date: '12 Mar 2025',
    duration: '180 minutes',
    activityType: 'Off the job',
    reflection:
      'I delivered a short training session to three new retail assistants on our customer returns policy.',
    status: 'Needs Revision',
    submittedAt: '12 Mar 2025, 11:00 AM',
    trainerComment:
      'Good effort, Olivia. Please expand on what specifically went well and what you would improve next time. The reflection is a bit brief.',
  },
  {
    id: '4',
    learnerId: '5',
    learnerName: 'Priya Patel',
    learnerInitials: 'PP',
    avatarColor: '#F44336',
    title: 'Month-end closing and reporting',
    category: 'Finance',
    date: '11 Mar 2025',
    duration: '240 minutes',
    activityType: 'On the job',
    reflection:
      'I independently managed the month-end closing process for the first time, reconciling all accounts and producing the management accounts report on time.',
    status: 'Reviewed',
    submittedAt: '11 Mar 2025, 5:30 PM',
    trainerComment:
      'Outstanding work. This demonstrates significant progression in your role. Excellent evidence for KSBs 4.1 and 4.2.',
  },
  {
    id: '5',
    learnerId: '6',
    learnerName: 'Daniel Hughes',
    learnerInitials: 'DH',
    avatarColor: '#00BCD4',
    title: 'Exploratory Data Analysis — Sales Dataset',
    category: 'Data Analysis',
    date: '10 Mar 2025',
    duration: '150 minutes',
    activityType: 'Off the job',
    reflection:
      'I completed an exploratory data analysis on the Q4 sales dataset. I used Python (pandas and matplotlib) to identify seasonal trends and outliers.',
    status: 'Pending Review',
    submittedAt: '10 Mar 2025, 3:00 PM',
  },
  {
    id: '6',
    learnerId: '4',
    learnerName: 'Marcus Taylor',
    learnerInitials: 'MT',
    avatarColor: '#4A90D9',
    title: 'Handling an escalated complaint',
    category: 'Customer Service',
    date: '09 Mar 2025',
    duration: '60 minutes',
    activityType: 'On the job',
    reflection: 'A customer escalated a complaint about a delayed transfer. I followed the escalation procedure.',
    status: 'Needs Revision',
    submittedAt: '09 Mar 2025, 4:45 PM',
    trainerComment:
      'Marcus, this is a good starting point but please reflect more deeply on the outcome, what you learned, and how you would handle this differently.',
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const journalsService = {
  async getAll(): Promise<JournalEntry[]> {
    await delay(400);
    return [...MOCK_JOURNALS];
  },

  async getByLearner(learnerId: string): Promise<JournalEntry[]> {
    await delay(350);
    return MOCK_JOURNALS.filter((j) => j.learnerId === learnerId);
  },

  async getByStatus(status: JournalStatus): Promise<JournalEntry[]> {
    await delay(300);
    return MOCK_JOURNALS.filter((j) => j.status === status);
  },
};
