/**
 * Hook for Progress page state management
 */

import { useState } from 'react';
import { ProgressState } from './Progress.interface';
import { MOCK_UNITS } from './Progress.data';

const initialState: ProgressState = {
  overallProgress: 0,
  units: MOCK_UNITS,
  unitFilter: '1',
  includePending: false,
  showDetailed: false,
};

export const useProgress = () => {
  const [state, setState] = useState<ProgressState>(initialState);

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
    console.log('View more units');
  };

  return {
    state,
    setUnitFilter,
    setIncludePending,
    setShowDetailed,
    handleViewMore,
  };
};
