/**
 * Progress Page Component
 * Pixel-perfect to Figma 40000099:44976
 * Prototyping: Unit dropdown (36620), card click → Unit Details (39190)
 */

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Box, Checkbox, Popover } from '@mui/material';
import { MenuBook, ExpandMore, ChevronRight, ArrowBackIos } from '@mui/icons-material';
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
import { styled } from '@mui/material/styles';

// ─── Extra styled bits for new header + dropdown ─────────────────────────────

const PageHeaderRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '4px',
});

const BackBtn = styled(Box)({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#1C1C1C',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});

const PageTitle = styled(Box)({
  fontSize: '22px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

// Clickable card (adds cursor + hover shadow)
const ClickableCard = styled(UnitCardWrapper)({
  cursor: 'pointer',
  transition: 'box-shadow 0.15s ease, transform 0.1s ease',
  '&:hover': {
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    transform: 'translateY(-1px)',
  },
});

// Unit dropdown (Figma 40000068:36620)
const UnitDropdownItem = styled(Box)<{ selected?: boolean }>(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 20px',
  cursor: 'pointer',
  backgroundColor: selected ? '#1C1C1C' : '#FFFFFF',
  color: selected ? '#FFFFFF' : '#1C1C1C',
  fontSize: '14px',
  fontWeight: selected ? 600 : 400,
  fontFamily: "'Inter', sans-serif",
  '&:hover': {
    backgroundColor: selected ? '#1C1C1C' : 'rgba(28,28,28,0.04)',
  },
}));

// ─── Static unit list for dropdown ────────────────────────────────────────────

const UNIT_OPTIONS = [
  { id: '1', label: 'Unit 1' },
  { id: '2', label: 'Unit 2' },
  { id: '3', label: 'Unit 3' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Progress: React.FC = () => {
  const router = useRouter();
  const { state, setIncludePending, setShowDetailed, handleViewMore } = useProgress();

  const [unitAnchorEl, setUnitAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedUnit, setSelectedUnit] = useState('1');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unitDropdownOpen = Boolean(unitAnchorEl);

  const handleUnitDropdownOpen = (e: React.MouseEvent<HTMLElement>) => {
    setUnitAnchorEl(e.currentTarget);
  };

  const handleUnitSelect = (id: string) => {
    setSelectedUnit(id);
    setUnitAnchorEl(null);
  };

  const handleCardClick = (unitId: string) => {
    router.push(`/learner-dashboard/progress-unit-details?unit=${unitId}`);
  };

  return (
    <LearnerLayout pageTitle="Progress">
      <ProgressContainer>

        {/* ── Page header: back + "Progress:" ── */}
        <PageHeaderRow>
          <BackBtn onClick={() => router.back()}>
            <ArrowBackIos sx={{ fontSize: '12px', color: '#fff', ml: '3px' }} />
          </BackBtn>
          <PageTitle>Progress:</PageTitle>
        </PageHeaderRow>

        {/* ── Top bar: overall progress + checkboxes ── */}
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
          <FilterDropdown ref={dropdownRef} onClick={handleUnitDropdownOpen}>
            Unit: {selectedUnit}
            <ExpandMore sx={{ fontSize: '18px', color: 'rgba(28,28,28,0.5)', ml: '2px', verticalAlign: 'middle' }} />
          </FilterDropdown>
          <ViewMoreLink onClick={handleViewMore}>View more</ViewMoreLink>
        </UnitFilterSection>

        {/* Unit dropdown popover (Figma 40000068:36620) */}
        <Popover
          open={unitDropdownOpen}
          anchorEl={unitAnchorEl}
          onClose={() => setUnitAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            sx: {
              borderRadius: '12px',
              overflow: 'hidden',
              minWidth: '180px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
              mt: '6px',
            },
          }}
        >
          {UNIT_OPTIONS.map((unit) => (
            <UnitDropdownItem
              key={unit.id}
              selected={unit.id === selectedUnit}
              onClick={() => handleUnitSelect(unit.id)}
            >
              {unit.label}
              <ChevronRight sx={{ fontSize: '16px', opacity: 0.6 }} />
            </UnitDropdownItem>
          ))}
        </Popover>

        {/* ── Cards grid (clickable) ── */}
        <UnitsGrid>
          {state.units.map((unit) => (
            <ClickableCard
              key={unit.id}
              onClick={() => handleCardClick(unit.id)}
            >
              {/* Icon + Title */}
              <CardTopRow>
                <UnitIconBox>
                  <MenuBook sx={{ fontSize: '20px', color: '#1C1C1C' }} />
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

            </ClickableCard>
          ))}
        </UnitsGrid>

      </ProgressContainer>
    </LearnerLayout>
  );
};

export default Progress;
