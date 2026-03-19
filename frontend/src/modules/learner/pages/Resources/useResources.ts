/**
 * Hook for Resources page — fetches from /learners/me/resources API,
 * falls back to empty state gracefully if endpoint is not yet available.
 */

import { useState, useEffect, useCallback } from 'react';
import { ResourcesState, ResourceFolder } from './Resources.interface';
import { apiClient } from '@/services/api';

const initialState: ResourcesState = {
  folders: [],
  viewMode: 'icons',
  sortBy: 'name_asc',
  searchTerm: '',
};

export const useResources = () => {
  const [state, setState] = useState<ResourcesState>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiClient.get<any>('/learners/me/resources');
      const list: any[] = Array.isArray(res) ? res : (res as any)?.data ?? [];
      const folders: ResourceFolder[] = list.map((r: any) => ({
        id: r._id ?? String(Math.random()),
        name: r.name ?? r.title ?? 'Folder',
        type: 'folder',
      }));
      setState((prev) => ({ ...prev, folders }));
    } catch {
      // API endpoint not yet implemented — show empty state
      setState((prev) => ({ ...prev, folders: [] }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const setViewMode = (value: string) => {
    setState((prev) => ({ ...prev, viewMode: value }));
  };

  const setSortBy = (value: string) => {
    setState((prev) => {
      const sorted = [...prev.folders].sort((a, b) => {
        if (value === 'name_desc') return b.name.localeCompare(a.name);
        return a.name.localeCompare(b.name);
      });
      return { ...prev, sortBy: value, folders: sorted };
    });
  };

  const setSearchTerm = (value: string) => {
    setState((prev) => ({ ...prev, searchTerm: value }));
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleFolderClick = (folderId: string) => {
    console.log('Open folder:', folderId);
  };

  const filteredFolders = state.searchTerm
    ? state.folders.filter((f) =>
        f.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    : state.folders;

  return {
    state: { ...state, folders: filteredFolders },
    isLoading,
    error,
    setViewMode,
    setSortBy,
    setSearchTerm,
    handleBack,
    handleFolderClick,
    refresh: fetchResources,
  };
};
