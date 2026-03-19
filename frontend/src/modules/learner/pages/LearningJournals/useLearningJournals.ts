/**
 * Hook for Learning Journals page state management — uses real backend API.
 */

import { useState, useEffect, useCallback } from 'react';
import { journalsService, Journal, JournalStatus } from '@/services/journals/journalsService';

export interface LearningJournalsState {
  entries: (Journal & { isExpanded?: boolean })[];
  showTimesheet: boolean;
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  statusFilter: JournalStatus | 'all';
}

const initialState: LearningJournalsState = {
  entries: [],
  showTimesheet: false,
  isLoading: false,
  error: null,
  total: 0,
  page: 1,
  statusFilter: 'all',
};

export const useLearningJournals = () => {
  const [state, setState] = useState<LearningJournalsState>(initialState);

  const fetchJournals = useCallback(async (statusFilter: string, page: number) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const params: any = { page, pageSize: 20 };
      if (statusFilter !== 'all') params.status = statusFilter as JournalStatus;

      const res = await journalsService.getMyJournals(params);
      setState((prev) => ({
        ...prev,
        entries: (res.data ?? []).map((j) => ({ ...j, isExpanded: false })),
        total: res.meta?.total ?? 0,
        isLoading: false,
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err?.message ?? 'Failed to load journals',
      }));
    }
  }, []);

  useEffect(() => {
    fetchJournals(state.statusFilter, state.page);
  }, [state.statusFilter, state.page, fetchJournals]);

  const toggleExpanded = (entryId: string) => {
    setState((prev) => ({
      ...prev,
      entries: prev.entries.map((entry) =>
        entry._id === entryId ? { ...entry, isExpanded: !entry.isExpanded } : entry
      ),
    }));
  };

  const toggleTimesheet = () => {
    setState((prev) => ({ ...prev, showTimesheet: !prev.showTimesheet }));
  };

  const handleExport = () => {
    // Export logic (future)
  };

  const handleFilters = () => {
    // Filter modal (future)
  };

  const saveEntry = async (entryId: string, data: { title?: string; content?: string; tags?: string[] }) => {
    try {
      const updated = await journalsService.update(entryId, data);
      setState((prev) => ({
        ...prev,
        entries: prev.entries.map((e) =>
          e._id === entryId ? { ...updated, isExpanded: e.isExpanded } : e
        ),
      }));
    } catch (err: any) {
      setState((prev) => ({ ...prev, error: err?.message }));
    }
  };

  const createEntry = async (data: { title: string; content: string; tags?: string[]; ksbTags?: string[] }) => {
    try {
      const created = await journalsService.create({ ...data, status: 'draft' });
      setState((prev) => ({
        ...prev,
        entries: [{ ...created, isExpanded: true }, ...prev.entries],
        total: prev.total + 1,
      }));
      return created;
    } catch (err: any) {
      setState((prev) => ({ ...prev, error: err?.message }));
    }
  };

  const publishEntry = async (entryId: string) => {
    try {
      const updated = await journalsService.publish(entryId);
      setState((prev) => ({
        ...prev,
        entries: prev.entries.map((e) =>
          e._id === entryId ? { ...updated, isExpanded: e.isExpanded } : e
        ),
      }));
    } catch (err: any) {
      setState((prev) => ({ ...prev, error: err?.message }));
    }
  };

  const deleteEntry = async (entryId: string) => {
    try {
      await journalsService.delete(entryId);
      setState((prev) => ({
        ...prev,
        entries: prev.entries.filter((e) => e._id !== entryId),
        total: Math.max(0, prev.total - 1),
      }));
    } catch (err: any) {
      setState((prev) => ({ ...prev, error: err?.message }));
    }
  };

  const setStatusFilter = (value: JournalStatus | 'all') => {
    setState((prev) => ({ ...prev, statusFilter: value, page: 1 }));
  };

  return {
    state,
    toggleExpanded,
    toggleTimesheet,
    handleExport,
    handleFilters,
    saveEntry,
    createEntry,
    publishEntry,
    deleteEntry,
    setStatusFilter,
    refresh: () => fetchJournals(state.statusFilter, state.page),
  };
};
