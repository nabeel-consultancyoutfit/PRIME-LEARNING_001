/**
 * Hook for Scorecard page state management — uses real backend API.
 */

import { useState, useEffect, useCallback } from 'react';
import { scorecardService, Scorecard, ScorecardEntry } from '@/services/scorecard/scorecardService';

export interface ScorecardState {
  scorecard: Scorecard | null;
  entries: ScorecardEntry[];
  dateFromValue: string;
  dateRangeFilter: string;
  showUnitsFilter: boolean;
  learningGrowthData: any[];
  isLoading: boolean;
  error: string | null;
  isSaving: boolean;
}

const initialState: ScorecardState = {
  scorecard: null,
  entries: [],
  dateFromValue: '',
  dateRangeFilter: '1y',
  showUnitsFilter: false,
  learningGrowthData: [],
  isLoading: false,
  error: null,
  isSaving: false,
};

export const useScorecard = () => {
  const [state, setState] = useState<ScorecardState>(initialState);

  const fetchScorecard = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await scorecardService.getMyScorecard();
      setState((prev) => ({
        ...prev,
        scorecard: data,
        entries: data.entries ?? [],
        isLoading: false,
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err?.message ?? 'Failed to load scorecard',
      }));
    }
  }, []);

  useEffect(() => { fetchScorecard(); }, [fetchScorecard]);

  const setDateFromValue = (value: string) => {
    setState((prev) => ({ ...prev, dateFromValue: value }));
  };

  const setDateRangeFilter = (value: string) => {
    setState((prev) => ({ ...prev, dateRangeFilter: value }));
  };

  const setShowUnitsFilter = (value: boolean) => {
    setState((prev) => ({ ...prev, showUnitsFilter: value }));
  };

  const handleSubmitDateFrom = () => {
    // Filter local data by date range
  };

  const handleCreateScorecard = () => {
    // Trigger self-assessment creation modal
  };

  const updateSelfAssessment = async (updatedEntries: Partial<ScorecardEntry>[]) => {
    setState((prev) => ({ ...prev, isSaving: true }));
    try {
      const updated = await scorecardService.updateSelfAssessment(updatedEntries);
      setState((prev) => ({
        ...prev,
        scorecard: updated,
        entries: updated.entries ?? [],
        isSaving: false,
      }));
    } catch (err: any) {
      setState((prev) => ({ ...prev, isSaving: false, error: err?.message }));
    }
  };

  return {
    state,
    setDateFromValue,
    setDateRangeFilter,
    setShowUnitsFilter,
    handleCreateScorecard,
    handleSubmitDateFrom,
    updateSelfAssessment,
    refresh: fetchScorecard,
  };
};
