/**
 * Mock data for Tasks module
 */

import { TaskRow, TasksFilterOptions } from './Tasks.interface';

export const MOCK_TASKS: TaskRow[] = [
  {
    id: '1',
    dateSet: '19/12/2024 01:59',
    description: 'Complete learning plan review',
    dateDue: '15/02/2025',
    dateCompleted: null,
    status: 'In Progress',
  },
  {
    id: '2',
    dateSet: '20/12/2024 10:30',
    description: 'Submit evidence of training activity',
    dateDue: '28/02/2025',
    dateCompleted: '27/02/2025',
    status: 'Complete',
  },
  {
    id: '3',
    dateSet: '21/12/2024 14:15',
    description: 'Attend workplace assessment',
    dateDue: '01/03/2025',
    dateCompleted: null,
    status: 'Pending',
  },
  {
    id: '4',
    dateSet: '22/12/2024 09:00',
    description: 'Review development plan with trainer',
    dateDue: '10/03/2025',
    dateCompleted: '10/03/2025',
    status: 'Approved',
  },
  {
    id: '5',
    dateSet: '23/12/2024 16:45',
    description: 'Resubmit portfolio documentation',
    dateDue: '05/03/2025',
    dateCompleted: null,
    status: 'Rejected',
  },
];

export const FILTER_OPTIONS: TasksFilterOptions = {
  periods: [
    { value: 'all', label: 'Show All' },
    { value: '1m', label: 'Last 1 Month' },
    { value: '3m', label: 'Last 3 Months' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last 1 Year' },
  ],
  statuses: [
    { value: 'pending', label: 'Pending task' },
    { value: 'completed', label: 'Completed' },
    { value: 'active', label: 'Active' },
    { value: 'all', label: 'All Statuses' },
  ],
};

export const PENDING_TASKS_COUNT = 4;
