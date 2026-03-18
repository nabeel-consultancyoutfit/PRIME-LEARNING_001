/**
 * Progress Page Component
 * Displays learner overall progress and unit-specific progress
 */

import React from 'react';
import { Box, Checkbox } from '@mui/material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { useProgress } from './useProgress';
import {
  ProgressContainer,
  TopBar,
  ProgressInfo,
  ProgressLabel,
  ProgressBadge,
  CheckboxGroup,
  CheckboxLabel,
  UnitFilterSection,
  FilterSelect,
  ViewMoreLink,
  UnitsGrid,
  UnitCardWrapper,
  UnitIcon,
  UnitTitle,
  UnitProgress,
  ProgressMetric,
  ProgressValue,
  StyledLinearProgress,
} from './Progress.style';

const Progress: React.FC = () => {
  const { state, setUnitFilter, setIncludePending, setShowDetailed, handleViewMore } = useProgress();

  return (
    <LearnerLayout pageTitle="Progress">
      <ProgressContainer>
        {/* Top Bar */}
        <TopBar>
          <ProgressInfo>
            <ProgressLabel>Over all Progress:</ProgressLabel>
            <ProgressBadge>{state.overallProgress}%</ProgressBadge>
          </ProgressInfo>

          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox
                checked={state.includePending}
                onChange={(e) => setIncludePending(e.target.checked)}
                size="small"
              />
              Include pending learning activities
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox
                checked={state.showDetailed}
                onChange={(e) => setShowDetailed(e.target.checked)}
                size="small"
              />
              Show detailed view
            </CheckboxLabel>
          </CheckboxGroup>
        </TopBar>

        {/* Unit Filter Section */}
        <UnitFilterSection>
          <ProgressLabel htmlFor="unit-select">Unit:</ProgressLabel>
          <FilterSelect
            id="unit-select"
            value={state.unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </FilterSelect>
          <ViewMoreLink onClick={handleViewMore}>View more</ViewMoreLink>
        </UnitFilterSection>

        {/* Units Grid */}
        <UnitsGrid>
          {state.units.map((unit) => (
            <UnitCardWrapper key={unit.id}>
              {/* Unit Icon */}
              <UnitIcon>💻</UnitIcon>

              {/* Unit Title */}
              <UnitTitle>{unit.title}</UnitTitle>

              {/* Progress Metrics */}
              <UnitProgress>
                <ProgressMetric>
                  <span>Actual:</span>
                  <ProgressValue>{unit.actualProgress}%</ProgressValue>
                </ProgressMetric>

                <ProgressMetric>
                  <span>Unit Progress:</span>
                  <ProgressValue>{unit.unitProgress}%</ProgressValue>
                </ProgressMetric>

                <Box sx={{ marginTop: '8px' }}>
                  <StyledLinearProgress
                    variant="determinate"
                    value={unit.unitProgress}
                  />
                </Box>
              </UnitProgress>
            </UnitCardWrapper>
          ))}
        </UnitsGrid>
      </ProgressContainer>
    </LearnerLayout>
  );
};

export default Progress;
