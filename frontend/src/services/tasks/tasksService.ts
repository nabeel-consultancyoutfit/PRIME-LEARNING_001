/**
 * Tasks service — wraps the backend /tasks API.
 */

import { apiClient } from '@/services/api';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TaskStatus = 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected';

export interface AssessmentCriterion {
  id: string;
  title: string;
  subItems: Array<{ id: string; text: string; checked: boolean }>;
}

export interface TaskResource {
  id: string;
  title: string;
  url: string;
  type: string;
}

export interface Task {
  _id: string;
  id?: string;
  learnerId: string | any;
  trainerId?: string | any;
  programmeId?: string | any;
  title: string;
  subtitle?: string;
  primaryMethod: string;
  secondaryMethods: string[];
  assessmentCriteria: AssessmentCriterion[];
  skillTags: string[];
  associatedResources: TaskResource[];
  reference?: string;
  dateSet?: string;
  dateDue?: string;
  dateCompleted?: string | null;
  status: TaskStatus;
  isTrainerAssigned: boolean;
  evidence?: string;
  feedbackComments?: string;
  declaration?: string;
  otjHours?: number;
  rejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

export interface CreateTaskDto {
  learnerId: string;
  trainerId?: string;
  programmeId?: string;
  title: string;
  subtitle?: string;
  primaryMethod: string;
  secondaryMethods?: string[];
  assessmentCriteria?: AssessmentCriterion[];
  skillTags?: string[];
  associatedResources?: TaskResource[];
  reference?: string;
  dateSet?: string;
  dateDue?: string;
  isTrainerAssigned?: boolean;
  otjHours?: number;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  status?: TaskStatus;
  evidence?: string;
  feedbackComments?: string;
  declaration?: string;
  rejectionReason?: string;
  dateCompleted?: string;
}

// ── Helper ────────────────────────────────────────────────────────────────────

const unwrap = (res: any) => (res && 'data' in res ? res : { data: res, meta: null });

// ── Service ───────────────────────────────────────────────────────────────────

export const tasksService = {
  // Learner: get my tasks
  getMyTasks: async (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
  }): Promise<PaginatedResponse<Task>> => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    if (params?.status) qs.set('status', params.status);
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/tasks/my${query}`);
  },

  // Get single task by ID
  getById: async (id: string): Promise<Task> => {
    const res = await apiClient.get<any>(`/tasks/${id}`);
    return unwrap(res).data ?? res;
  },

  // Create task (trainer/admin)
  create: async (dto: CreateTaskDto): Promise<Task> => {
    const res = await apiClient.post<any>('/tasks', dto);
    return unwrap(res).data ?? res;
  },

  // Update task
  update: async (id: string, dto: UpdateTaskDto): Promise<Task> => {
    const res = await apiClient.patch<any>(`/tasks/${id}`, dto);
    return unwrap(res).data ?? res;
  },

  // Learner submits task for review
  submit: async (id: string): Promise<Task> => {
    const res = await apiClient.post<any>(`/tasks/${id}/submit`);
    return unwrap(res).data ?? res;
  },

  // Trainer approves task
  approve: async (id: string): Promise<Task> => {
    const res = await apiClient.post<any>(`/tasks/${id}/approve`);
    return unwrap(res).data ?? res;
  },

  // Trainer rejects task
  reject: async (id: string, reason: string): Promise<Task> => {
    const res = await apiClient.post<any>(`/tasks/${id}/reject`, { reason });
    return unwrap(res).data ?? res;
  },

  // Trainer: get tasks for their learners
  getTrainerTasks: async (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
  }): Promise<PaginatedResponse<Task>> => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    if (params?.status) qs.set('status', params.status);
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/tasks/trainer${query}`);
  },

  // Admin: list all tasks
  listAll: async (params?: {
    learnerId?: string;
    trainerId?: string;
    status?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<Task>> => {
    const qs = new URLSearchParams();
    if (params?.learnerId) qs.set('learnerId', params.learnerId);
    if (params?.trainerId) qs.set('trainerId', params.trainerId);
    if (params?.status) qs.set('status', params.status);
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/tasks${query}`);
  },

  // Save evidence / declaration on a task
  saveEvidence: async (id: string, content: string): Promise<Task> => {
    return tasksService.update(id, { evidence: content });
  },

  saveFeedback: async (id: string, content: string): Promise<Task> => {
    return tasksService.update(id, { feedbackComments: content });
  },

  saveDeclaration: async (id: string, content: string): Promise<Task> => {
    return tasksService.update(id, { declaration: content });
  },
};
