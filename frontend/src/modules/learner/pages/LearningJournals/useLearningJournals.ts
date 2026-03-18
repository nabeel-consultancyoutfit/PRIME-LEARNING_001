/**
 * Hook for Learning Journals page state management
 */

import { useState } from 'react';
import { LearningJournalsState, JournalEntry } from './LearningJournals.interface';
import { MOCK_JOURNAL_ENTRIES } from './LearningJournals.data';

const initialState: LearningJournalsState = {
  entries: MOCK_JOURNAL_ENTRIES,
  showTimesheet: false,
};

export const useLearningJournals = () => {
  const [state, setState] = useState<LearningJournalsState>(initialState);

  const toggleExpanded = (entryId: string) => {
    setState((prev) => ({
      ...prev,
      entries: prev.entries.map((entry) =>
        entry.id === entryId ? { ...entry, isExpanded: !entry.isExpanded } : entry
      ),
    }));
  };

  const toggleTimesheet = () => {
    setState((prev) => ({
      ...prev,
      showTimesheet: !prev.showTimesheet,
    }));
  };

  const handleExport = () => {
    console.log('Export journal entries');
  };

  const handleFilters = () => {
    console.log('Open filters dialog');
  };

  const saveEntry = (entryId: string, data: any) => {
    console.log('Save entry:', entryId, data);
  };

  return {
    state,
    toggleExpanded,
    toggleTimesheet,
    handleExport,
    handleFilters,
    saveEntry,
  };
};
