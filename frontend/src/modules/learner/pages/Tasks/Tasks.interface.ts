/**
 * Tasks module interfaces and types
 */

export interface TaskRow {
  id: string;
  dateSet: string;
  description: string;
  dateDue: string;
  dateCompleted: string | null;
  status: 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected';
}

export interface TasksState {
  tasks: TaskRow[];
  periodFilter: string;
  statusFilter: string;
}

export interface TasksFilterOptions {
  periods: { value: string; label: string }[];
  statuses: { value: string; label: string }[];
}
