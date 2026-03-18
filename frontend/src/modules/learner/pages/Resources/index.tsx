/**
 * Resources Page Component
 * Displays centre resources and folders
 */

import React from 'react';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { useResources } from './useResources';
import { VIEW_MODE_OPTIONS, SORT_OPTIONS } from './Resources.data';
import {
  ResourcesContainer,
  HeaderCard,
  HeaderTitle,
  FilterBar,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  SearchInput,
  BackButton,
  FoldersGrid,
  FolderItem,
  FolderIcon,
  FolderName,
} from './Resources.style';

const Resources: React.FC = () => {
  const { state, setViewMode, setSortBy, setSearchTerm, handleBack, handleFolderClick } = useResources();

  return (
    <LearnerLayout pageTitle="Resources">
      <ResourcesContainer>
        {/* Header Card */}
        <HeaderCard>
          <HeaderTitle>Centre Resources</HeaderTitle>
        </HeaderCard>

        {/* Filter Bar */}
        <FilterBar>
          <FilterGroup>
            <FilterLabel>View:</FilterLabel>
            <FilterSelect value={state.viewMode} onChange={(e) => setViewMode(e.target.value)}>
              {VIEW_MODE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Sort:</FilterLabel>
            <FilterSelect value={state.sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <SearchInput
            type="text"
            placeholder="Search resources"
            value={state.searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterBar>

        {/* Back Button */}
        <Box sx={{ marginBottom: '24px' }}>
          <BackButton onClick={handleBack}>
            <ArrowBackIcon sx={{ fontSize: '16px' }} />
            Back
          </BackButton>
        </Box>

        {/* Folders Grid */}
        <FoldersGrid>
          {state.folders.map((folder) => (
            <FolderItem key={folder.id} onClick={() => handleFolderClick(folder.id)}>
              <FolderIcon>📁</FolderIcon>
              <FolderName>{folder.name}</FolderName>
            </FolderItem>
          ))}
        </FoldersGrid>
      </ResourcesContainer>
    </LearnerLayout>
  );
};

export default Resources;
