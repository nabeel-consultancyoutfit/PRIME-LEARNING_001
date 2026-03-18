/**
 * Tasks Mock Service
 */

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  learnerId: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  module: string;
  createdAt: string;
}

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete Unit 4 Reflective Account',
    description: 'Write a 500-word reflective account on your experience managing a team project.',
    assignedTo: 'James Wilson',
    learnerId: '1',
    dueDate: '20 Mar 2025',
    status: 'In Progress',
    priority: 'High',
    module: 'Team Leader / Supervisor L3',
    createdAt: '10 Mar 2025',
  },
  {
    id: '2',
    title: 'Submit Evidence for KSB 3.2',
    description: 'Gather and submit at least 3 pieces of workplace evidence demonstrating KSB 3.2.',
    assignedTo: 'Emma Clarke',
    learnerId: '2',
    dueDate: '22 Mar 2025',
    status: 'Pending',
    priority: 'High',
    module: 'Business Administrator L3',
    createdAt: '11 Mar 2025',
  },
  {
    id: '3',
    title: 'Retail Operations Analysis Report',
    description: 'Analyse your store\'s last quarter performance and propose 3 improvement strategies.',
    assignedTo: 'Olivia Brown',
    learnerId: '3',
    dueDate: '15 Mar 2025',
    status: 'Overdue',
    priority: 'High',
    module: 'Retail Manager L4',
    createdAt: '01 Mar 2025',
  },
  {
    id: '4',
    title: 'Customer Complaint Resolution Case Study',
    description: 'Document a recent customer complaint and explain the resolution process used.',
    assignedTo: 'Marcus Taylor',
    learnerId: '4',
    dueDate: '18 Mar 2025',
    status: 'Overdue',
    priority: 'Medium',
    module: 'Customer Service Specialist L3',
    createdAt: '01 Mar 2025',
  },
  {
    id: '5',
    title: 'Month-End Financial Reconciliation Log',
    description: 'Complete the financial reconciliation exercise using the provided dataset.',
    assignedTo: 'Priya Patel',
    learnerId: '5',
    dueDate: '25 Mar 2025',
    status: 'Pending',
    priority: 'Medium',
    module: 'Accounting / Finance L3',
    createdAt: '12 Mar 2025',
  },
  {
    id: '6',
    title: 'Python Data Cleaning Exercise',
    description: 'Clean and transform the provided dataset using pandas and submit the notebook.',
    assignedTo: 'Daniel Hughes',
    learnerId: '6',
    dueDate: '28 Mar 2025',
    status: 'In Progress',
    priority: 'Medium',
    module: 'Data Analyst L4',
    createdAt: '10 Mar 2025',
  },
  {
    id: '7',
    title: 'HR Policy Gap Analysis',
    description: 'Review your organisation\'s HR policies and identify gaps against best practice.',
    assignedTo: 'Sophie Mitchell',
    learnerId: '7',
    dueDate: '30 Mar 2025',
    status: 'Pending',
    priority: 'Low',
    module: 'HR Consultant / Partner L5',
    createdAt: '14 Mar 2025',
  },
  {
    id: '8',
    title: 'Operations Improvement Project Plan',
    description: 'Develop a project plan for a process improvement initiative at your workplace.',
    assignedTo: 'Aaron Okafor',
    learnerId: '8',
    dueDate: '01 Apr 2025',
    status: 'In Progress',
    priority: 'Low',
    module: 'Operations Manager L5',
    createdAt: '08 Mar 2025',
  },
  {
    id: '9',
    title: 'Leadership Styles Comparison Essay',
    description: 'Compare three leadership styles and reflect on your own preferred approach.',
    assignedTo: 'James Wilson',
    learnerId: '1',
    dueDate: '10 Apr 2025',
    status: 'Pending',
    priority: 'Medium',
    module: 'Team Leader / Supervisor L3',
    createdAt: '15 Mar 2025',
  },
  {
    id: '10',
    title: 'Completed: Induction Portfolio',
    description: 'Initial induction portfolio submitted and signed off.',
    assignedTo: 'Emma Clarke',
    learnerId: '2',
    dueDate: '01 Nov 2024',
    status: 'Completed',
    priority: 'Low',
    module: 'Business Administrator L3',
    createdAt: '15 Oct 2024',
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const tasksService = {
  async getAll(): Promise<Task[]> {
    await delay(400);
    return [...MOCK_TASKS];
  },

  async getByLearner(learnerId: string): Promise<Task[]> {
    await delay(350);
    return MOCK_TASKS.filter((t) => t.learnerId === learnerId);
  },

  async getByStatus(status: TaskStatus): Promise<Task[]> {
    await delay(300);
    return MOCK_TASKS.filter((t) => t.status === status);
  },
};
