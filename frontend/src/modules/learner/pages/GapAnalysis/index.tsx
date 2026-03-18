import React, { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { ArrowBackIos, ExpandMore, KeyboardArrowUp, KeyboardArrowDown, Add, Remove } from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { useRouter } from 'next/router';

/* ─── Styled components ─── */

const PageWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const PageHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '4px',
});

const BackButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  backgroundColor: '#1C1C1C',
  borderRadius: '50%',
  cursor: 'pointer',
  flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});

const PageTitle = styled(Typography)({
  fontSize: '24px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

/* Filters bar */
const FiltersBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '12px',
  padding: '12px 20px',
});

const FiltersLabel = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

const FilterControls = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

const FilterDropdown = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '13px',
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '6px',
  border: '1px solid rgba(28,28,28,0.15)',
  backgroundColor: '#fff',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.04)' },
});

/* Legend */
const LegendGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '12px',
  padding: '16px 20px',
});

const LegendItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '13px',
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

const LegendBadge = styled(Box)<{ color: string }>(({ color }) => ({
  width: '22px',
  height: '22px',
  borderRadius: '50%',
  backgroundColor: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '11px',
  fontWeight: 700,
  flexShrink: 0,
}));

/* Expand all button */
const ExpandAllBtn = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: '#1C1C1C',
  color: '#fff',
  borderRadius: '20px',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: "'Inter', sans-serif",
  cursor: 'pointer',
  alignSelf: 'flex-start',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
});

/* Accordion */
const AccordionWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
});

const AccordionRow = styled(Box)<{ level?: number; active?: boolean }>(({ level = 0, active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: `10px ${12 + level * 20}px`,
  backgroundColor: active ? 'rgba(28,28,28,0.04)' : 'transparent',
  cursor: 'pointer',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  '&:last-child': { borderBottom: 'none' },
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.04)' },
}));

const AccordionLabel = styled(Typography)<{ bold?: boolean }>(({ bold }) => ({
  flex: 1,
  fontSize: '13px',
  fontWeight: bold ? 600 : 400,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
}));

const CircleIconBtn = styled(Box)({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: '2px solid #1C1C1C',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

/* Criteria Table */
const CriteriaTable = styled(Box)({
  paddingLeft: '100px',
  paddingRight: '20px',
  paddingBottom: '8px',
});

const TableHeader = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 200px 100px',
  padding: '8px 12px',
  backgroundColor: 'rgba(28,28,28,0.04)',
  borderRadius: '6px',
  marginBottom: '4px',
});

const TableHeaderCell = styled(Typography)({
  fontSize: '12px',
  fontWeight: 600,
  color: 'rgba(28,28,28,0.5)',
  fontFamily: "'Inter', sans-serif",
});

const TableRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 200px 100px',
  padding: '10px 12px',
  alignItems: 'center',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  '&:last-child': { borderBottom: 'none' },
});

const CriteriaText = styled(Typography)({
  fontSize: '12px',
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  lineHeight: 1.4,
});

const EvidenceBadges = styled(Box)({
  display: 'flex',
  gap: '4px',
  flexWrap: 'wrap',
});

const EvidenceBadge = styled(Box)({
  backgroundColor: '#1C1C1C',
  color: '#fff',
  borderRadius: '4px',
  padding: '2px 6px',
  fontSize: '10px',
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
});

const ProgressDot = styled(Box)<{ color: string }>(({ color }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '11px',
  fontWeight: 700,
}));

/* ─── Data ─── */

interface CriteriaRow {
  id: string;
  text: string;
  evidence: string[];
  progress: 'C' | 'N' | 'X' | 'P';
}

interface SubUnit {
  id: string;
  label: string;
  criteria?: CriteriaRow[];
}

interface Unit {
  id: string;
  label: string;
  subUnits?: SubUnit[];
}

interface MainSection {
  id: string;
  label: string;
  units?: Unit[];
}

const PROGRESS_COLORS: Record<string, string> = {
  C: '#4CAF50',
  N: '#E57373',
  X: '#9E9E9E',
  P: '#FFB300',
};

const sections: MainSection[] = [
  {
    id: 'business-admin',
    label: 'Business Administrator Apprenticeship Standard',
    units: [
      {
        id: 'unit-01',
        label: '[Unit 01] Skills',
        subUnits: [
          {
            id: 'sub-1',
            label: '[1] IT',
            criteria: [
              {
                id: 'c1',
                text: '1.1a. Skilled in the use of multiple IT packages and systems relevant to the organisation in order to: Write letters or email',
                evidence: ['PRJ 1', 'Q1'],
                progress: 'C',
              },
              {
                id: 'c2',
                text: '1.1b Create proposals',
                evidence: ['AS 2'],
                progress: 'N',
              },
              {
                id: 'c3',
                text: '1.1c Perform financial processes',
                evidence: ['PRJ 1', 'Q1', 'AS 1'],
                progress: 'X',
              },
              {
                id: 'c4',
                text: '1.1d Record and analyse data',
                evidence: ['PRJ 1'],
                progress: 'P',
              },
            ],
          },
          { id: 'sub-2', label: '[2] Record and Document Production' },
          { id: 'sub-3', label: '[3] Decision Making' },
        ],
      },
      { id: 'unit-02', label: '[Unit 02] Knowledge' },
      { id: 'unit-03', label: '[Unit 03] Behaviours' },
    ],
  },
  { id: 'gateway', label: 'Business Administrator Gateway to End Point' },
  { id: 'ncfe-english', label: 'NCFE Level 2 Functional Skills Qualification in English (September 2019)' },
  { id: 'ncfe-math', label: 'NCFE Level 2 Functional Skills Qualification in Mathematics (September 2019)' },
  { id: 'epa', label: '~ Business Administrator End Point Assessment' },
];

/* ─── Component ─── */

const GapAnalysis: React.FC = () => {
  const router = useRouter();

  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['business-admin'])
  );
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(
    new Set(['unit-01'])
  );
  const [expandedSubUnits, setExpandedSubUnits] = useState<Set<string>>(
    new Set(['sub-1'])
  );

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleUnit = (id: string) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSubUnit = (id: string) => {
    setExpandedSubUnits((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSections(new Set(sections.map((s) => s.id)));
    setExpandedUnits(new Set(sections.flatMap((s) => (s.units || []).map((u) => u.id))));
    setExpandedSubUnits(
      new Set(
        sections.flatMap((s) =>
          (s.units || []).flatMap((u) => (u.subUnits || []).map((su) => su.id))
        )
      )
    );
  };

  return (
    <LearnerLayout pageTitle="Gap Analysis">
      <PageWrapper>
        {/* Header */}
        <PageHeader>
          <BackButton onClick={() => router.back()}>
            <ArrowBackIos sx={{ fontSize: '12px', color: '#fff', ml: '4px' }} />
          </BackButton>
          <PageTitle>Gap Analysis</PageTitle>
        </PageHeader>

        {/* Filters bar */}
        <FiltersBar>
          <FiltersLabel>Filters</FiltersLabel>
          <FilterControls>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontFamily: "'Inter', sans-serif" }}>
              <Typography sx={{ fontSize: '13px', color: 'rgba(28,28,28,0.5)', fontFamily: "'Inter', sans-serif" }}>
                Based on:
              </Typography>
              <FilterDropdown>
                All <ExpandMore sx={{ fontSize: '14px' }} />
              </FilterDropdown>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Typography sx={{ fontSize: '13px', color: 'rgba(28,28,28,0.5)', fontFamily: "'Inter', sans-serif" }}>
                Status:
              </Typography>
              <FilterDropdown>
                Not Complete <ExpandMore sx={{ fontSize: '14px' }} />
              </FilterDropdown>
            </Box>
          </FilterControls>
        </FiltersBar>

        {/* Legend */}
        <LegendGrid>
          <LegendItem>
            <LegendBadge color="#4CAF50">C</LegendBadge>
            <span>Counting towards progress</span>
          </LegendItem>
          <LegendItem>
            <LegendBadge color="#E57373">N</LegendBadge>
            <span>Not required to count towards progress</span>
          </LegendItem>
          <LegendItem>
            <LegendBadge color="#FFB300">P</LegendBadge>
            <span>Progress pending (Covered by an learning activity but not yet signed)</span>
          </LegendItem>
          <LegendItem>
            <LegendBadge color="#9E9E9E">X</LegendBadge>
            <span>No progress (Not covered by an learning activity)</span>
          </LegendItem>
        </LegendGrid>

        {/* Expand All */}
        <ExpandAllBtn onClick={expandAll}>
          Expand all <ExpandMore sx={{ fontSize: '16px' }} />
        </ExpandAllBtn>

        {/* Accordion */}
        <AccordionWrapper>
          {sections.map((section) => {
            const isSectionOpen = expandedSections.has(section.id);
            return (
              <Box key={section.id}>
                {/* Section row */}
                <AccordionRow onClick={() => toggleSection(section.id)}>
                  <CircleIconBtn>
                    {isSectionOpen ? (
                      <Remove sx={{ fontSize: '12px' }} />
                    ) : (
                      <Add sx={{ fontSize: '12px' }} />
                    )}
                  </CircleIconBtn>
                  <AccordionLabel bold>{section.label}</AccordionLabel>
                  {isSectionOpen ? (
                    <KeyboardArrowUp sx={{ fontSize: '18px', color: 'rgba(28,28,28,0.4)' }} />
                  ) : (
                    <KeyboardArrowDown sx={{ fontSize: '18px', color: 'rgba(28,28,28,0.4)' }} />
                  )}
                </AccordionRow>

                {/* Units */}
                {isSectionOpen && section.units && section.units.map((unit) => {
                  const isUnitOpen = expandedUnits.has(unit.id);
                  return (
                    <Box key={unit.id}>
                      <AccordionRow level={1} onClick={() => toggleUnit(unit.id)}>
                        <CircleIconBtn>
                          <Add sx={{ fontSize: '12px' }} />
                        </CircleIconBtn>
                        <AccordionLabel bold>{unit.label}</AccordionLabel>
                        {isUnitOpen ? (
                          <KeyboardArrowUp sx={{ fontSize: '18px', color: 'rgba(28,28,28,0.4)' }} />
                        ) : (
                          <KeyboardArrowDown sx={{ fontSize: '18px', color: 'rgba(28,28,28,0.4)' }} />
                        )}
                      </AccordionRow>

                      {/* SubUnits */}
                      {isUnitOpen && unit.subUnits && unit.subUnits.map((sub) => {
                        const isSubOpen = expandedSubUnits.has(sub.id);
                        return (
                          <Box key={sub.id}>
                            <AccordionRow level={2} onClick={() => toggleSubUnit(sub.id)}>
                              <CircleIconBtn>
                                <Add sx={{ fontSize: '12px' }} />
                              </CircleIconBtn>
                              <AccordionLabel>{sub.label}</AccordionLabel>
                              {isSubOpen ? (
                                <KeyboardArrowUp sx={{ fontSize: '18px', color: 'rgba(28,28,28,0.4)' }} />
                              ) : (
                                <KeyboardArrowDown sx={{ fontSize: '18px', color: 'rgba(28,28,28,0.4)' }} />
                              )}
                            </AccordionRow>

                            {/* Criteria table */}
                            {isSubOpen && sub.criteria && (
                              <CriteriaTable>
                                <TableHeader>
                                  <TableHeaderCell>Criteria</TableHeaderCell>
                                  <TableHeaderCell>Supporting Evidence</TableHeaderCell>
                                  <TableHeaderCell>Progress</TableHeaderCell>
                                </TableHeader>
                                {sub.criteria.map((row) => (
                                  <TableRow key={row.id}>
                                    <CriteriaText>{row.text}</CriteriaText>
                                    <EvidenceBadges>
                                      {row.evidence.map((e) => (
                                        <EvidenceBadge key={e}>{e}</EvidenceBadge>
                                      ))}
                                    </EvidenceBadges>
                                    <ProgressDot color={PROGRESS_COLORS[row.progress]}>
                                      {row.progress}
                                    </ProgressDot>
                                  </TableRow>
                                ))}
                              </CriteriaTable>
                            )}
                          </Box>
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </AccordionWrapper>
      </PageWrapper>
    </LearnerLayout>
  );
};

export default GapAnalysis;
