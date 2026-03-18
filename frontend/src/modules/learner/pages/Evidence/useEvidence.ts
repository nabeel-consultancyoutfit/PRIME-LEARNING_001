/**
 * Hook for Evidence page state management
 */

import { useState } from 'react';
import { EvidenceState } from './Evidence.interface';
import { MOCK_EVIDENCE } from './Evidence.data';

const initialState: EvidenceState = {
  evidenceItems: MOCK_EVIDENCE,
  filterShow: 'pending',
};

export const useEvidence = () => {
  const [state, setState] = useState<EvidenceState>(initialState);

  const setFilterShow = (value: string) => {
    setState((prev) => ({ ...prev, filterShow: value }));
  };

  const handleCreateActivity = () => {
    // TODO: Navigate to create activity page
    console.log('Create learning activity');
  };

  const toggleShowcase = (itemId: string) => {
    setState((prev) => ({
      ...prev,
      evidenceItems: prev.evidenceItems.map((item) =>
        item.id === itemId ? { ...item, addToShowcase: !item.addToShowcase } : item
      ),
    }));
  };

  return {
    state,
    setFilterShow,
    handleCreateActivity,
    toggleShowcase,
  };
};
