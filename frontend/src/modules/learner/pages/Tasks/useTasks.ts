/**
 * Hook for Tasks page state management — uses real backend API.
 */

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { tasksService, Task } from '@/services/tasks/tasksService';

export interface TasksState {
  tasks: Task[];
  periodFilter: string;
  statusFilter: string;
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageSize: number;
}

const initialState: TasksState = {
  tasks: [],
  periodFilter: 'all',
  statusFilter: 'all',
  isLoading: false,
  error: null,
  total: 0,
  page: 1,
  pageSize: 20,
};

export const useTasks = () => {
  const router = useRouter();
  const [state, setState] = useState<TasksState>(initialState);

  // ── Fetch tasks from backend ───────────────────────────────────────────
  const fetchTasks = useCallback(async (statusFilter: string, page: number, pageSize: number) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const params: any = { page, pageSize };
      if (statusFilter !== 'all') params.status = statusFilter;

      const res = await tasksService.getMyTasks(params);
      setState((prev) => ({
        ...prev,
        tasks: res.data ?? [],
        total: res.meta?.total ?? 0,
        isLoading: false,
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err?.message ?? 'Failed to load tasks',
      }));
    }
  }, []);

  // Fetch on mount and whenever filters/page change
  useEffect(() => {
    fetchTasks(state.statusFilter, state.page, state.pageSize);
  }, [state.statusFilter, state.page, state.pageSize, fetchTasks]);

  // ── Actions ───────────────────────────────────────────────────────────
  const setPeriodFilter = (value: string) => {
    setState((prev) => ({ ...prev, periodFilter: value }));
  };

  const setStatusFilter = (value: string) => {
    setState((prev) => ({ ...prev, statusFilter: value, page: 1 }));
  };

  const setPage = (page: number) => {
    setState((prev) => ({ ...prev, page }));
  };

  const handleMoreDetails = (taskId: string) => {
    router.push(`/learner-dashboard/tasks/${taskId}`);
  };

  const refresh = () => {
    fetchTasks(state.statusFilter, state.page, state.pageSize);
  };

  return {
    state,
    setPeriodFilter,
    setStatusFilter,
    setPage,
    handleMoreDetails,
    refresh,
  };
};
