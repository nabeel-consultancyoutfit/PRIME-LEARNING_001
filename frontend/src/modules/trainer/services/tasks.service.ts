/**
 * Trainer Tasks Service — wraps the real backend /tasks API.
 */

import { tasksService as coreTasksService, Task } from '@/services/tasks/tasksService';

export type { Task };
export type TaskStatus = 'Pending' | 'In Progress' | 'Complete' | 'Approved' | 'Rejected';

const unwrapData = (res: any): any[] => {
  if (res && Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
};

export const tasksService = {
  async getAll(params?: { page?: number; pageSize?: number }): Promise<Task[]> {
    const res = await coreTasksService.getTrainerTasks(params);
    return unwrapData(res);
  },

  async getByLearner(learnerId: string): Promise<Task[]> {
    const res = await coreTasksService.listAll({ learnerId });
    return unwrapData(res);
  },

  async getByStatus(status: string): Promise<Task[]> {
    const res = await coreTasksService.getTrainerTasks({ status });
    return unwrapData(res);
  },

  async getPendingReview(): Promise<Task[]> {
    const res = await coreTasksService.getTrainerTasks({ status: 'Complete' });
    return unwrapData(res);
  },

  async approve(taskId: string): Promise<Task> {
    return coreTasksService.approve(taskId);
  },

  async reject(taskId: string, reason: string): Promise<Task> {
    return coreTasksService.reject(taskId, reason);
  },
};
