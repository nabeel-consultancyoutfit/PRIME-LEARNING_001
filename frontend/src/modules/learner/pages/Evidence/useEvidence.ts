/**
 * Hook for Evidence page state management — uses real backend API.
 */

import { useState, useEffect, useCallback } from 'react';
import { evidenceService, Evidence, EvidenceStatus } from '@/services/evidence/evidenceService';

export interface EvidenceState {
  evidenceItems: Evidence[];
  filterShow: string;
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
}

const initialState: EvidenceState = {
  evidenceItems: [],
  filterShow: 'all',
  isLoading: false,
  error: null,
  total: 0,
  page: 1,
};

export const useEvidence = () => {
  const [state, setState] = useState<EvidenceState>(initialState);

  const fetchEvidence = useCallback(async (filterShow: string, page: number) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const params: any = { page, pageSize: 20 };
      if (filterShow !== 'all') params.status = filterShow as EvidenceStatus;

      const res = await evidenceService.getMyEvidence(params);
      setState((prev) => ({
        ...prev,
        evidenceItems: res.data ?? [],
        total: res.meta?.total ?? 0,
        isLoading: false,
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err?.message ?? 'Failed to load evidence',
      }));
    }
  }, []);

  useEffect(() => {
    fetchEvidence(state.filterShow, state.page);
  }, [state.filterShow, state.page, fetchEvidence]);

  const setFilterShow = (value: string) => {
    setState((prev) => ({ ...prev, filterShow: value, page: 1 }));
  };

  const handleCreateActivity = () => {
    // Navigate to create evidence page or open modal
  };

  const handleSubmitEvidence = async (id: string) => {
    try {
      await evidenceService.submit(id);
      fetchEvidence(state.filterShow, state.page);
    } catch (err: any) {
      setState((prev) => ({ ...prev, error: err?.message }));
    }
  };

  const toggleShowcase = (_itemId: string) => {
    // Showcase is a local UI toggle; no backend equivalent
    setState((prev) => ({ ...prev }));
  };

  return {
    state,
    setFilterShow,
    handleCreateActivity,
    handleSubmitEvidence,
    toggleShowcase,
    refresh: () => fetchEvidence(state.filterShow, state.page),
  };
};
