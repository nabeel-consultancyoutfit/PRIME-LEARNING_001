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

export interface AssessmentCriterion {
  code: string;
  label: string;
}

export interface TaskResource {
  name: string;
  url: string;
}

export interface TaskDetail {
  id: string;
  title: string;
  subtitle: string;
  isTrainerAssigned: boolean;
  primaryMethod: string;
  date: string;
  reference: string;
  secondaryMethods: string[];
  assessmentCriteria: AssessmentCriterion[];
  skillTags: string[];
  associatedResources: TaskResource[];
  evidence: string;
  feedbackComments: string;
  dateSet: string;
  dateDue: string;
  dateCompleted: string | null;
  status: 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected';
}

export type InfoTab = 'evidence' | 'feedback' | 'timesheet' | 'declaration';
