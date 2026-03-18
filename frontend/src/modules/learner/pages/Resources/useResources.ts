/**
 * Hook for Resources page state management
 */

import { useState } from 'react';
import { ResourcesState } from './Resources.interface';
import { MOCK_FOLDERS } from './Resources.data';

const initialState: ResourcesState = {
  folders: MOCK_FOLDERS,
  viewMode: 'icons',
  sortBy: 'name_asc',
  searchTerm: '',
};

export const useResources = () => {
  const [state, setState] = useState<ResourcesState>(initialState);

  const setViewMode = (value: string) => {
    setState((prev) => ({ ...prev, viewMode: value }));
  };

  const setSortBy = (value: string) => {
    setState((prev) => ({ ...prev, sortBy: value }));
  };

  const setSearchTerm = (value: string) => {
    setState((prev) => ({ ...prev, searchTerm: value }));
  };

  const handleBack = () => {
    console.log('Go back');
  };

  const handleFolderClick = (folderId: string) => {
    console.log('Open folder:', folderId);
  };

  return {
    state,
    setViewMode,
    setSortBy,
    setSearchTerm,
    handleBack,
    handleFolderClick,
  };
};
