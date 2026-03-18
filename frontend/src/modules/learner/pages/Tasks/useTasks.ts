/**
 * Hook for Tasks page state management
 */

import { useState } from 'react';
import { TasksState } from './Tasks.interface';
import { MOCK_TASKS } from './Tasks.data';

const initialState: TasksState = {
  tasks: MOCK_TASKS,
  periodFilter: 'all',
  statusFilter: 'all',
};

export const useTasks = () => {
  const [state, setState] = useState<TasksState>(initialState);

  const setPeriodFilter = (value: string) => {
    setState((prev) => ({ ...prev, periodFilter: value }));
  };

  const setStatusFilter = (value: string) => {
    setState((prev) => ({ ...prev, statusFilter: value }));
  };

  const handleMoreDetails = (taskId: string) => {
    // TODO: Navigate to task details page
    console.log('View details for task:', taskId);
  };

  return {
    state,
    setPeriodFilter,
    setStatusFilter,
    handleMoreDetails,
  };
};
