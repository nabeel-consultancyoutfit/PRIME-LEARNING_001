/**
 * Hook for Tasks page state management
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import { TasksState } from './Tasks.interface';
import { MOCK_TASKS } from './Tasks.data';

const initialState: TasksState = {
  tasks: MOCK_TASKS,
  periodFilter: 'all',
  statusFilter: 'all',
};

export const useTasks = () => {
  const router = useRouter();
  const [state, setState] = useState<TasksState>(initialState);

  const setPeriodFilter = (value: string) => {
    setState((prev) => ({ ...prev, periodFilter: value }));
  };

  const setStatusFilter = (value: string) => {
    setState((prev) => ({ ...prev, statusFilter: value }));
  };

  const handleMoreDetails = (taskId: string) => {
    router.push(`/learner-dashboard/tasks/${taskId}`);
  };

  return {
    state,
    setPeriodFilter,
    setStatusFilter,
    handleMoreDetails,
  };
};
