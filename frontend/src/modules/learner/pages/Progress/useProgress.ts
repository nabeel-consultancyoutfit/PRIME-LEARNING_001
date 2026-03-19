/**
 * Hook for Progress page state management — uses real backend API.
 */

import { useState, useEffect, useCallback } from 'react';
import { progressService, ProgressRecord, KSBProgressItem } from '@/services/progress/progressService';

export interface ProgressState {
  overallProgress: number;
  units: KSBProgressItem[];
  unitFilter: string;
  includePending: boolean;
  showDetailed: boolean;
  otjHoursLogged: number;
  otjHoursTarget: number;
  tasksCompleted: number;
  tasksTotal: number;
  evidenceApproved: number;
  journalsPublished: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  overallProgress: 0,
  units: [],
  unitFilter: '1',
  includePending: false,
  showDetailed: false,
  otjHoursLogged: 0,
  otjHoursTarget: 0,
  tasksCompleted: 0,
  tasksTotal: 0,
  evidenceApproved: 0,
  journalsPublished: 0,
  isLoading: false,
  error: null,
};

export const useProgress = () => {
  const [state, setState] = useState<ProgressState>(initialState);

  const fetchProgress = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data: ProgressRecord = await progressService.getMyProgress();
      setState((prev) => ({
        ...prev,
        overallProgress: data.overallPercentage,
        units: data.ksbProgress ?? [],
        otjHoursLogged: data.otjHoursLogged,
        otjHoursTarget: data.otjHoursTarget,
        tasksCompleted: data.tasksCompleted,
        tasksTotal: data.tasksTotal,
        evidenceApproved: data.evidenceApproved,
        journalsPublished: data.journalsPublished,
        isLoading: false,
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err?.message ?? 'Failed to load progress',
      }));
    }
  }, []);

  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  const setUnitFilter = (value: string) => {
    setState((prev) => ({ ...prev, unitFilter: value }));
  };

  const setIncludePending = (value: boolean) => {
    setState((prev) => ({ ...prev, includePending: value }));
  };

  const setShowDetailed = (value: boolean) => {
    setState((prev) => ({ ...prev, showDetailed: value }));
  };

  const handleViewMore = () => {
    // can load next page of KSBs if paginated
  };

  return {
    state,
    setUnitFilter,
    setIncludePending,
    setShowDetailed,
    handleViewMore,
    refresh: fetchProgress,
  };
};
