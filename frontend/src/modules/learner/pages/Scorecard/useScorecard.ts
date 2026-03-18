/**
 * Hook for Scorecard page state management
 */

import { useState } from 'react';
import { ScorecardState } from './Scorecard.interface';
import { MOCK_LEARNING_GROWTH } from './Scorecard.data';

const initialState: ScorecardState = {
  scorecards: [],
  dateFromValue: '',
  dateRangeFilter: '1y',
  showUnitsFilter: false,
  learningGrowthData: MOCK_LEARNING_GROWTH,
};

export const useScorecard = () => {
  const [state, setState] = useState<ScorecardState>(initialState);

  const setDateFromValue = (value: string) => {
    setState((prev) => ({ ...prev, dateFromValue: value }));
  };

  const setDateRangeFilter = (value: string) => {
    setState((prev) => ({ ...prev, dateRangeFilter: value }));
  };

  const setShowUnitsFilter = (value: boolean) => {
    setState((prev) => ({ ...prev, showUnitsFilter: value }));
  };

  const handleCreateScorecard = () => {
    console.log('Create new scorecard');
  };

  const handleSubmitDateFrom = () => {
    console.log('Submit date from:', state.dateFromValue);
  };

  return {
    state,
    setDateFromValue,
    setDateRangeFilter,
    setShowUnitsFilter,
    handleCreateScorecard,
    handleSubmitDateFrom,
  };
};
