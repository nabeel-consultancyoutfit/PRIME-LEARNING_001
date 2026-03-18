/**
 * Progress Page Component
 * Pixel-perfect to Figma node 102:10047 / 102:10827
 */

import React from 'react';
import { Checkbox } from '@mui/material';
import { MenuBook, ExpandMore } from '@mui/icons-material';
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
  UnitFilterLabel,
  FilterDropdown,
  ViewMoreLink,
  UnitsGrid,
  UnitCardWrapper,
  CardTopRow,
  UnitIconBox,
  UnitTitle,
  CardBottomRow,
  ActualSection,
  UnitProgressSection,
  MetricLabel,
  MetricValue,
  ProgressBarWrapper,
  ProgressBarFill,
  ProgressBarText,
} from './Progress.style';

const Progress: React.FC = () => {
  const { state, setIncludePending, setShowDetailed, handleViewMore } = useProgress();

  return (
    <LearnerLayout pageTitle="Progress">
      <ProgressContainer>

        {/* ── Top bar ── */}
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
                sx={{ padding: '4px', color: 'rgba(28,28,28,0.35)', '&.Mui-checked': { color: '#1C1C1C' } }}
              />
              Include pending learning activities
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox
                checked={state.showDetailed}
                onChange={(e) => setShowDetailed(e.target.checked)}
                size="small"
                sx={{ padding: '4px', color: 'rgba(28,28,28,0.35)', '&.Mui-checked': { color: '#1C1C1C' } }}
              />
              Show detailed view
            </CheckboxLabel>
          </CheckboxGroup>
        </TopBar>

        {/* ── Unit filter row ── */}
        <UnitFilterSection>
          <UnitFilterLabel>Unit:</UnitFilterLabel>
          <FilterDropdown>
            {state.unitFilter} <ExpandMore sx={{ fontSize: '16px', color: 'rgba(28,28,28,0.5)', ml: '2px' }} />
          </FilterDropdown>
          <ViewMoreLink onClick={handleViewMore}>View more</ViewMoreLink>
        </UnitFilterSection>

        {/* ── Cards grid ── */}
        <UnitsGrid>
          {state.units.map((unit) => (
            <UnitCardWrapper key={unit.id}>

              {/* Icon + Title */}
              <CardTopRow>
                <UnitIconBox>
                  <MenuBook sx={{ fontSize: '22px', color: '#1C1C1C' }} />
                </UnitIconBox>
                <UnitTitle>{unit.title}</UnitTitle>
              </CardTopRow>

              {/* Actual + Unit Progress bar */}
              <CardBottomRow>
                <ActualSection>
                  <MetricLabel>Actual:</MetricLabel>
                  <MetricValue>{unit.actualProgress}%</MetricValue>
                </ActualSection>

                <UnitProgressSection>
                  <MetricLabel>Unit Progress</MetricLabel>
                  <ProgressBarWrapper>
                    <ProgressBarFill value={unit.unitProgress} />
                    <ProgressBarText>{unit.unitProgress}%</ProgressBarText>
                  </ProgressBarWrapper>
                </UnitProgressSection>
              </CardBottomRow>

            </UnitCardWrapper>
          ))}
        </UnitsGrid>

      </ProgressContainer>
    </LearnerLayout>
  );
};

export default Progress;
