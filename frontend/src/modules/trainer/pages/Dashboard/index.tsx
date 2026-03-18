/**
 * Trainer Dashboard Page — pixel-perfect to Figma
 * Nodes: 2010:2035 (overview) | 230:15992 (trainer expanded) | 526:36687 (learner expanded) | 2010:2682 (forms)
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  ArrowForward,
  SearchOutlined,
  UnfoldMore,
  ChevronRight,
  CalendarTodayOutlined,
  InsertDriveFileOutlined,
} from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import {
  PageContainer,
  ActivitySection,
  ActivitySectionTitle,
  ActivityFiltersRow,
  FilterLabel,
  FilterSelect,
  LearnerSearchBox,
  ViewPortfolioButton,
  AccordionSection,
  AccordionHeader,
  AccordionTitle,
  AccordionContent,
  StatsGrid,
  StatCardLabel,
  StatCardTitle,
  CalendarCard,
  CalendarHeader,
  CalendarGrid,
  CalendarDayHeader,
  CalendarDay,
  DonutChartCard,
  DonutChartLabel,
  DonutChartTitle,
  DonutWrapper,
  DonutCenter,
  DonutPercent,
  DonutLegend,
  DonutLegendItem,
  DonutLegendDot,
  TableStatCard,
  TableStatHeader,
  TableStatRow,
  TableStatCell,
  BarChartCard,
  BarChartBars,
  BarChartBar,
  ProgressBarsCard,
  ProgressBarRow,
  ProgressBarMeta,
  ProgressBarTrack,
  ProgressBarFill,
} from './Dashboard.style';
import { COLORS, TYPOGRAPHY } from '@/modules/trainer/theme/tokens';

// ─── Calendar data — May 2025 ─────────────────────────────────────────────────
const CALENDAR_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const CALENDAR_DATES = [
  [null, null, null, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, null],
];
const HIGHLIGHTED_DAYS = [22, 23, 24, 25, 26, 27];
const TODAY = 27;

// ─── SVG Chart helpers ────────────────────────────────────────────────────────

const DonutSVG: React.FC<{ percent: number; color: string; trackColor?: string; size?: number }> = ({
  percent,
  color,
  trackColor = '#F2E9E9',
  size = 110,
}) => {
  const r = 40;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={trackColor} strokeWidth={12} />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke={color} strokeWidth={12}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
      />
    </svg>
  );
};

const PieSVG: React.FC<{ slices: { percent: number; color: string }[]; size?: number }> = ({
  slices,
  size = 110,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 5;
  let cum = 0;
  const paths = slices.map((s, i) => {
    const start = (cum / 100) * 360 - 90;
    cum += s.percent;
    const end = (cum / 100) * 360 - 90;
    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(start));
    const y1 = cy + r * Math.sin(toRad(start));
    const x2 = cx + r * Math.cos(toRad(end));
    const y2 = cy + r * Math.sin(toRad(end));
    const large = s.percent > 50 ? 1 : 0;
    return (
      <path key={i} d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`} fill={s.color} />
    );
  });
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{paths}</svg>;
};

// ─── Mini progress bar for Learner Dashboard table ────────────────────────────
const MiniBar: React.FC<{ value: number; color: string; label?: string }> = ({ value, color, label }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    {label && (
      <Box sx={{ fontSize: '11px', color: COLORS.text.secondary, fontFamily: TYPOGRAPHY.fontFamily, minWidth: '40px' }}>
        {label}
      </Box>
    )}
    <Box sx={{ flex: 1, height: '6px', borderRadius: '3px', backgroundColor: '#E8E8E8', minWidth: '60px' }}>
      <Box sx={{ height: '100%', width: `${value}%`, borderRadius: '3px', backgroundColor: color }} />
    </Box>
    <Box sx={{ fontSize: '11px', fontWeight: 600, color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily, minWidth: '28px' }}>
      {value}%
    </Box>
  </Box>
);

// ─── Learner table row data ───────────────────────────────────────────────────
const LEARNER_ROWS = [
  {
    name: 'John Doe',
    role: 'Business Admin',
    aim: 'Business Administrator\nApprenticeship Standard',
    progress: 12,
    target: 51,
    endDate: '19/04/2026',
    deviation: '+31%',
    deviationRed: false,
    reviewDate: 'None Scheduled',
    reviewRed: false,
    units: '0/7',
    tasks: 3,
  },
  {
    name: 'John Doe',
    role: 'Business Admin',
    aim: 'Business Administrator\nApprenticeship Standard',
    progress: 12,
    target: 51,
    endDate: '19/04/2026',
    deviation: '-41%',
    deviationRed: true,
    reviewDate: '19/04/2025',
    reviewRed: true,
    units: '0/7',
    tasks: 2,
  },
  {
    name: 'John Doe',
    role: 'Business Admin',
    aim: 'Business Administrator\nApprenticeship Standard',
    progress: 12,
    target: 51,
    endDate: '19/04/2026',
    deviation: '-41%',
    deviationRed: true,
    reviewDate: '14/04/2025',
    reviewRed: true,
    units: '0/7',
    tasks: 1,
  },
];

// ─── Forms items ──────────────────────────────────────────────────────────────
const FORMS_ITEMS = [
  { label: 'Learner Forms', path: '/trainer-dashboard/learner-forms' },
  { label: 'Learning Activity Templates', path: '/trainer-dashboard/learning-activity-templates' },
  { label: 'Plan Of Activity/action Templates', path: '/trainer-dashboard/plan-of-activity-templates' },
  { label: 'Written Question Forms', path: '/trainer-dashboard/written-question-forms' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const TrainerDashboard: React.FC = () => {
  const router = useRouter();
  const [trainerDashOpen, setTrainerDashOpen] = useState(false);
  const [learnerDashOpen, setLearnerDashOpen] = useState(false);
  const [formsOpen, setFormsOpen] = useState(false);
  const [showMyLearners, setShowMyLearners] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  return (
    <TrainerLayout pageTitle="Dashboard">
      <PageContainer>

        {/* ── Learner's Activity ── */}
        <ActivitySection>
          <ActivitySectionTitle>Learner's Activity</ActivitySectionTitle>
          <ActivityFiltersRow>
            <FilterLabel>Cohort:</FilterLabel>
            <FilterSelect>
              Any cohort
              <UnfoldMore sx={{ ml: 'auto', fontSize: '16px' }} />
            </FilterSelect>
            <FilterLabel>Learner:</FilterLabel>
            <LearnerSearchBox>
              <SearchOutlined sx={{ fontSize: '16px', color: '#AAA' }} />
              Search a learner
            </LearnerSearchBox>
          </ActivityFiltersRow>
          <ViewPortfolioButton>
            View Portfolio
            <ArrowForward sx={{ fontSize: '14px' }} />
          </ViewPortfolioButton>
        </ActivitySection>

        {/* ── Trainer's Dashboard (accordion) ── */}
        <AccordionSection>
          <AccordionHeader onClick={() => setTrainerDashOpen(!trainerDashOpen)}>
            <AccordionTitle>Trainer's Dashboard</AccordionTitle>
            {trainerDashOpen ? (
              <KeyboardArrowUp sx={{ color: '#888', fontSize: '20px' }} />
            ) : (
              <KeyboardArrowDown sx={{ color: '#888', fontSize: '20px' }} />
            )}
          </AccordionHeader>

          {trainerDashOpen && (
            <AccordionContent>

              {/* Row 1: Calendar + Completed visits + Planned visits */}
              <StatsGrid>

                {/* Calendar */}
                <CalendarCard>
                  <CalendarHeader>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <Box sx={{ fontSize: '10px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Calendar
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Box sx={{ cursor: 'pointer', color: COLORS.text.muted, fontSize: '18px', fontWeight: 300, lineHeight: 1 }}>{'‹'}</Box>
                      <Box sx={{ fontSize: '13px', fontWeight: 600, fontFamily: TYPOGRAPHY.fontFamily, color: COLORS.text.primary }}>
                        May 2025
                      </Box>
                      <Box sx={{ cursor: 'pointer', color: COLORS.text.muted, fontSize: '18px', fontWeight: 300, lineHeight: 1 }}>{'›'}</Box>
                    </Box>
                  </CalendarHeader>
                  <CalendarGrid>
                    {CALENDAR_DAYS.map((d) => (
                      <CalendarDayHeader key={d}>{d}</CalendarDayHeader>
                    ))}
                    {CALENDAR_DATES.flat().map((day, i) => (
                      <CalendarDay
                        key={i}
                        isToday={day === TODAY}
                        isHighlighted={day !== null && HIGHLIGHTED_DAYS.includes(day as number)}
                      >
                        {day || ''}
                      </CalendarDay>
                    ))}
                  </CalendarGrid>
                </CalendarCard>

                {/* Completed visits donut */}
                <DonutChartCard>
                  <DonutChartLabel>Statistics</DonutChartLabel>
                  <DonutChartTitle>Completed visit in last 30 Days</DonutChartTitle>
                  <DonutWrapper>
                    <DonutSVG percent={70} color="#E53935" trackColor="#F2E9E9" />
                    <DonutCenter>
                      <DonutPercent>70%</DonutPercent>
                      <Box sx={{ fontSize: '9px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>
                        Total Progress
                      </Box>
                    </DonutCenter>
                  </DonutWrapper>
                  <DonutLegend sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                    <DonutLegendItem><DonutLegendDot color="#43A047" /> 90% or above</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#E53935" /> Less than 80%</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#FB8C00" /> 20%-50%</DonutLegendItem>
                  </DonutLegend>
                </DonutChartCard>

                {/* Planned visits donut */}
                <DonutChartCard>
                  <DonutChartLabel>Statistics</DonutChartLabel>
                  <DonutChartTitle>Planned visit in next 30 Days</DonutChartTitle>
                  <DonutWrapper>
                    <DonutSVG percent={70} color="#E53935" trackColor="#F2E9E9" />
                    <DonutCenter>
                      <DonutPercent>70%</DonutPercent>
                      <Box sx={{ fontSize: '9px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>
                        Total Progress
                      </Box>
                    </DonutCenter>
                  </DonutWrapper>
                  <DonutLegend sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                    <DonutLegendItem><DonutLegendDot color="#43A047" /> 90% or above</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#E53935" /> Less than 80%</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#FB8C00" /> 60%-90%</DonutLegendItem>
                  </DonutLegend>
                </DonutChartCard>

              </StatsGrid>

              {/* Row 2: IQA Action + Learners Due + Learners Last Logged In */}
              <StatsGrid sx={{ mt: 2 }}>

                {/* IQA Action bar chart */}
                <BarChartCard>
                  <StatCardLabel>Statistics</StatCardLabel>
                  <StatCardTitle>IQA Action</StatCardTitle>
                  <BarChartBars>
                    {[15, 65, 40, 80, 55].map((h, i) => (
                      <BarChartBar key={i} height={h} color={COLORS.sidebar.activeBg} />
                    ))}
                  </BarChartBars>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', px: '2px', mt: '4px' }}>
                    {[0, 1, 2, 3, 4].map((n) => (
                      <Box key={n} sx={{ fontSize: '10px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>
                        {n}
                      </Box>
                    ))}
                  </Box>
                  <DonutLegend sx={{ mt: 1, justifyContent: 'flex-start' }}>
                    <DonutLegendItem><DonutLegendDot color={COLORS.sidebar.activeBg} /> IQA action required: 1</DonutLegendItem>
                  </DonutLegend>
                </BarChartCard>

                {/* Learners due to complete */}
                <TableStatCard>
                  <TableStatHeader>
                    <StatCardLabel>Data</StatCardLabel>
                    <StatCardTitle>Learners Due to Complete next 90 days</StatCardTitle>
                  </TableStatHeader>
                  <TableStatRow>
                    <TableStatCell sx={{ fontWeight: 600, fontSize: '11px' }}>Name</TableStatCell>
                    <TableStatCell sx={{ fontWeight: 600, fontSize: '11px' }}>Days Remaining</TableStatCell>
                  </TableStatRow>
                  {[
                    { name: 'John Doe', days: '-7 Days', red: true },
                    { name: 'Rasid Joe', days: '13 Days', red: false },
                    { name: 'Rusty Thorburn', days: '45 Days', red: false },
                  ].map((r, i) => (
                    <TableStatRow key={i}>
                      <TableStatCell>{r.name}</TableStatCell>
                      <TableStatCell sx={{ color: r.red ? '#E53935' : COLORS.text.primary, fontWeight: r.red ? 600 : 400 }}>
                        {r.days}
                      </TableStatCell>
                    </TableStatRow>
                  ))}
                  <Box sx={{ p: '10px 14px', fontSize: '10px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily, lineHeight: 1.5 }}>
                    Student with negative days count are overdue to complete the task ask with positive days count are on track
                  </Box>
                </TableStatCard>

                {/* Learners Last Logged In */}
                <DonutChartCard>
                  <DonutChartLabel>Statistics</DonutChartLabel>
                  <DonutChartTitle>Learners Last Logged In</DonutChartTitle>
                  <PieSVG
                    size={110}
                    slices={[
                      { percent: 20, color: '#E53935' },
                      { percent: 40, color: '#43A047' },
                      { percent: 40, color: '#FB8C00' },
                    ]}
                  />
                  <DonutLegend sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                    <DonutLegendItem><DonutLegendDot color="#E53935" /> Over 30 days: 3</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#43A047" /> 6-30 days: 6</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#FB8C00" /> Within last 7 Days: 6</DonutLegendItem>
                  </DonutLegend>
                </DonutChartCard>

              </StatsGrid>

              {/* Row 3: Learners on Target + OTJ + No OTJ */}
              <StatsGrid sx={{ mt: 2 }}>

                <DonutChartCard>
                  <DonutChartLabel>Statistics</DonutChartLabel>
                  <DonutChartTitle>Learners on Target</DonutChartTitle>
                  <PieSVG
                    size={110}
                    slices={[
                      { percent: 20, color: '#E53935' },
                      { percent: 40, color: '#43A047' },
                      { percent: 40, color: '#FB8C00' },
                    ]}
                  />
                  <DonutLegend sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                    <DonutLegendItem><DonutLegendDot color="#E53935" /> Behind target: 3</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#43A047" /> On target: 6</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#FB8C00" /> Ahead of target: 6</DonutLegendItem>
                  </DonutLegend>
                </DonutChartCard>

                <DonutChartCard>
                  <DonutChartLabel>Statistics</DonutChartLabel>
                  <DonutChartTitle>Learners on Target (Off-The-Job)</DonutChartTitle>
                  <PieSVG
                    size={110}
                    slices={[
                      { percent: 20, color: '#E53935' },
                      { percent: 40, color: '#43A047' },
                      { percent: 40, color: '#FB8C00' },
                    ]}
                  />
                  <DonutLegend sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                    <DonutLegendItem><DonutLegendDot color="#E53935" /> Behind target: 3</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#43A047" /> On target: 6</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#FB8C00" /> Ahead of target: 6</DonutLegendItem>
                  </DonutLegend>
                </DonutChartCard>

                <DonutChartCard>
                  <DonutChartLabel>Statistics</DonutChartLabel>
                  <DonutChartTitle>No Off-The-Job Activity</DonutChartTitle>
                  <PieSVG
                    size={110}
                    slices={[
                      { percent: 16, color: '#FB8C00' },
                      { percent: 16, color: '#4A90D9' },
                      { percent: 32, color: '#43A047' },
                      { percent: 20, color: '#AB8C5A' },
                      { percent: 16, color: '#5C6BC0' },
                    ]}
                  />
                  <DonutLegend sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                    <DonutLegendItem><DonutLegendDot color="#FB8C00" /> Over 4 Weeks: 3</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#4A90D9" /> 1 to 2 Weeks: 3</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#43A047" /> 3 to 4 Weeks: 6</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#AB8C5A" /> 2 to 3 Weeks: 6</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#5C6BC0" /> Learning Breaks: 6</DonutLegendItem>
                  </DonutLegend>
                </DonutChartCard>

              </StatsGrid>

              {/* Row 4: Progress reviews due + Task Due */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>

                <DonutChartCard>
                  <DonutChartLabel>Statistics</DonutChartLabel>
                  <DonutChartTitle>Progress review due</DonutChartTitle>
                  <PieSVG
                    size={110}
                    slices={[
                      { percent: 12, color: '#E53935' },
                      { percent: 24, color: '#43A047' },
                      { percent: 24, color: '#FB8C00' },
                      { percent: 40, color: '#AB47BC' },
                    ]}
                  />
                  <DonutLegend sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                    <DonutLegendItem><DonutLegendDot color="#E53935" /> Overdue: 3</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#43A047" /> Due in next 7 Days: 6</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#FB8C00" /> Due between 7-13 days: 6</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#AB47BC" /> Due between 14-28 days: 12</DonutLegendItem>
                  </DonutLegend>
                </DonutChartCard>

                {/* Task Due — horizontal bars */}
                <ProgressBarsCard>
                  <StatCardLabel>Statistics</StatCardLabel>
                  <StatCardTitle>Task Due</StatCardTitle>
                  <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { label: 'Immediately', value: 50, color: '#AB47BC' },
                      { label: 'This week', value: 0, color: '#FB8C00' },
                      { label: 'Next week', value: 70, color: '#43A047' },
                      { label: 'In two weeks', value: 25, color: '#43A047' },
                    ].map((bar) => (
                      <Box key={bar.label}>
                        <Box sx={{ fontSize: '11px', color: COLORS.text.secondary, fontFamily: TYPOGRAPHY.fontFamily, mb: '3px' }}>
                          {bar.label}
                        </Box>
                        <Box sx={{ height: '10px', borderRadius: '5px', backgroundColor: '#E8E8E8', overflow: 'hidden' }}>
                          <Box sx={{ height: '100%', width: `${bar.value}%`, borderRadius: '5px', backgroundColor: bar.color }} />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', gap: '2px', justifyContent: 'space-between', mt: '6px' }}>
                    {[0, 1, 2, 3, 4].map((n) => (
                      <Box key={n} sx={{ fontSize: '10px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>{n}</Box>
                    ))}
                  </Box>
                  <DonutLegend sx={{ mt: 1, justifyContent: 'flex-start', flexDirection: 'column', gap: '4px' }}>
                    <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <DonutLegendItem><DonutLegendDot color="#AB47BC" /> Immediately: 2</DonutLegendItem>
                      <DonutLegendItem><DonutLegendDot color="#FB8C00" /> This week: 0</DonutLegendItem>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <DonutLegendItem><DonutLegendDot color="#43A047" /> Next week: 3</DonutLegendItem>
                      <DonutLegendItem><DonutLegendDot color="#43A047" /> In two weeks: 1</DonutLegendItem>
                    </Box>
                  </DonutLegend>
                </ProgressBarsCard>

              </Box>
            </AccordionContent>
          )}
        </AccordionSection>

        {/* ── Learner Dashboard (accordion) ── */}
        <AccordionSection>
          <AccordionHeader onClick={() => setLearnerDashOpen(!learnerDashOpen)}>
            <AccordionTitle>Learner Dashboard</AccordionTitle>
            {learnerDashOpen ? (
              <KeyboardArrowUp sx={{ color: '#888', fontSize: '20px' }} />
            ) : (
              <KeyboardArrowDown sx={{ color: '#888', fontSize: '20px' }} />
            )}
          </AccordionHeader>

          {learnerDashOpen && (
            <AccordionContent>
              {/* Filter row */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', mt: 2, mb: 1 }}>
                {/* Cohort */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Box sx={{ fontSize: '12px', color: COLORS.text.secondary, fontFamily: TYPOGRAPHY.fontFamily }}>Cohort:</Box>
                  <Box sx={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    border: '1px solid rgba(28,28,28,0.12)', borderRadius: '6px',
                    padding: '5px 10px', fontSize: '12px', fontFamily: TYPOGRAPHY.fontFamily,
                    color: COLORS.text.primary, cursor: 'pointer', minWidth: '110px',
                  }}>
                    Any cohort <KeyboardArrowDown sx={{ fontSize: '14px', ml: 'auto', color: '#888' }} />
                  </Box>
                </Box>
                {/* Date */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Box sx={{ fontSize: '12px', color: COLORS.text.secondary, fontFamily: TYPOGRAPHY.fontFamily }}>Date:</Box>
                  <Box sx={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    border: '1px solid rgba(28,28,28,0.12)', borderRadius: '6px',
                    padding: '5px 10px', fontSize: '12px', fontFamily: TYPOGRAPHY.fontFamily,
                    color: COLORS.text.muted, cursor: 'pointer',
                  }}>
                    Pick a date <CalendarTodayOutlined sx={{ fontSize: '13px', color: '#AAA' }} />
                  </Box>
                </Box>
                {/* Search */}
                <Box sx={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  border: '1px solid rgba(28,28,28,0.12)', borderRadius: '6px',
                  padding: '5px 10px', fontSize: '12px', fontFamily: TYPOGRAPHY.fontFamily,
                  color: COLORS.text.muted, cursor: 'text', minWidth: '160px',
                }}>
                  <SearchOutlined sx={{ fontSize: '14px', color: '#AAA' }} />
                  Search
                  <Box sx={{ ml: 'auto', fontSize: '10px', color: '#CCC', border: '1px solid #DDD', borderRadius: '4px', px: '4px', py: '1px' }}>
                    ⌘/
                  </Box>
                </Box>
                {/* Apply Filter */}
                <Box sx={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  backgroundColor: COLORS.sidebar.activeBg, color: '#FFF',
                  borderRadius: '6px', padding: '6px 14px', fontSize: '12px',
                  fontWeight: 600, fontFamily: TYPOGRAPHY.fontFamily, cursor: 'pointer',
                }}>
                  Apply Filter
                  <Box sx={{ fontSize: '12px' }}>▼</Box>
                </Box>
                {/* Checkboxes */}
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={showMyLearners}
                      onChange={(e) => setShowMyLearners(e.target.checked)}
                      sx={{ p: '4px' }}
                    />
                  }
                  label={<Box sx={{ fontSize: '12px', fontFamily: TYPOGRAPHY.fontFamily, color: COLORS.text.primary }}>Show my learners only</Box>}
                  sx={{ ml: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={showArchived}
                      onChange={(e) => setShowArchived(e.target.checked)}
                      sx={{ p: '4px' }}
                    />
                  }
                  label={<Box sx={{ fontSize: '12px', fontFamily: TYPOGRAPHY.fontFamily, color: COLORS.text.primary }}>Show Archived learners</Box>}
                  sx={{ ml: 0 }}
                />
              </Box>

              {/* Learner table */}
              <Box sx={{ overflowX: 'auto', mt: 1 }}>
                <Box sx={{ minWidth: '1000px' }}>
                  {/* Table header */}
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '160px 180px 140px 120px 110px 140px 90px 60px 220px',
                    borderBottom: '1px solid rgba(28,28,28,0.1)',
                    py: '8px',
                  }}>
                    {['Learner', 'Learning aim ↓', 'Progress\n(Target)% ↓', 'Planned\nEnd Date ↓', 'Target\nDeviation ↓', 'Next Progress\nReview Date', 'Units\nSigned Off', 'Task', 'Portfolio Options'].map((col, i) => (
                      <Box key={i} sx={{
                        fontSize: '11px', fontWeight: 600, color: COLORS.text.secondary,
                        fontFamily: TYPOGRAPHY.fontFamily, px: '8px', whiteSpace: 'pre-line', lineHeight: 1.3,
                      }}>
                        {col}
                      </Box>
                    ))}
                  </Box>

                  {/* Table rows */}
                  {LEARNER_ROWS.map((row, i) => (
                    <Box key={i} sx={{
                      display: 'grid',
                      gridTemplateColumns: '160px 180px 140px 120px 110px 140px 90px 60px 220px',
                      borderBottom: '1px solid rgba(28,28,28,0.06)',
                      py: '10px',
                      alignItems: 'center',
                      '&:hover': { backgroundColor: 'rgba(28,28,28,0.02)' },
                    }}>
                      {/* Learner */}
                      <Box sx={{ px: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Box sx={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          backgroundColor: '#E8E8E8', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', flexShrink: 0,
                        }}>
                          <Box sx={{ fontSize: '12px', color: COLORS.text.muted }}>👤</Box>
                        </Box>
                        <Box>
                          <Box sx={{ fontSize: '12px', fontWeight: 600, color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily }}>{row.name}</Box>
                          <Box sx={{ fontSize: '11px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>{row.role}</Box>
                        </Box>
                      </Box>

                      {/* Learning aim */}
                      <Box sx={{ px: '8px', fontSize: '11px', color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily, lineHeight: 1.4 }}>
                        {row.aim}
                      </Box>

                      {/* Progress (Target)% */}
                      <Box sx={{ px: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <MiniBar value={row.progress} color="#4A90D9" label="Progress:" />
                        <MiniBar value={row.target} color="#C6C7F8" label="Target:" />
                      </Box>

                      {/* Planned End Date */}
                      <Box sx={{ px: '8px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily }}>
                        <CalendarTodayOutlined sx={{ fontSize: '13px', color: '#AAA' }} />
                        {row.endDate}
                      </Box>

                      {/* Target Deviation */}
                      <Box sx={{ px: '8px', fontSize: '12px', fontWeight: 600, color: row.deviationRed ? '#E53935' : '#43A047', fontFamily: TYPOGRAPHY.fontFamily }}>
                        {row.deviation}
                      </Box>

                      {/* Next Progress Review Date */}
                      <Box sx={{ px: '8px', fontSize: '11px', color: row.reviewRed ? '#E53935' : COLORS.text.secondary, fontFamily: TYPOGRAPHY.fontFamily, fontWeight: row.reviewRed ? 600 : 400 }}>
                        {row.reviewDate}
                      </Box>

                      {/* Units Signed Off */}
                      <Box sx={{ px: '8px', fontSize: '12px', color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily }}>
                        {row.units}
                      </Box>

                      {/* Task badge */}
                      <Box sx={{ px: '8px', display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{
                          width: '22px', height: '22px', borderRadius: '50%',
                          backgroundColor: '#FB8C00', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#FFF',
                          fontFamily: TYPOGRAPHY.fontFamily,
                        }}>
                          {row.tasks}
                        </Box>
                      </Box>

                      {/* Portfolio Options chips */}
                      <Box sx={{ px: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {['Learning Activities', 'Activity/action', 'Gap Analysis'].map((chip) => (
                          <Box key={chip} sx={{
                            backgroundColor: COLORS.sidebar.activeBg, color: '#FFF',
                            borderRadius: '12px', padding: '3px 10px',
                            fontSize: '10px', fontWeight: 500, fontFamily: TYPOGRAPHY.fontFamily,
                            cursor: 'pointer', whiteSpace: 'nowrap',
                            '&:hover': { opacity: 0.85 },
                          }}>
                            {chip}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </AccordionContent>
          )}
        </AccordionSection>

        {/* ── Forms & Templates (accordion) ── */}
        <AccordionSection>
          <AccordionHeader onClick={() => setFormsOpen(!formsOpen)}>
            <AccordionTitle>Forms &amp; Templates</AccordionTitle>
            {formsOpen ? (
              <KeyboardArrowUp sx={{ color: '#888', fontSize: '20px' }} />
            ) : (
              <KeyboardArrowDown sx={{ color: '#888', fontSize: '20px' }} />
            )}
          </AccordionHeader>

          {formsOpen && (
            <AccordionContent>
              <Box sx={{ display: 'flex', gap: '12px', flexWrap: 'wrap', pt: 2 }}>
                {FORMS_ITEMS.map((item) => (
                  <Box
                    key={item.label}
                    onClick={() => router.push(item.path)}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      border: '1px solid rgba(28,28,28,0.12)', borderRadius: '8px',
                      padding: '10px 14px', cursor: 'pointer', backgroundColor: '#FAFAFA',
                      minWidth: '200px',
                      '&:hover': { backgroundColor: 'rgba(28,28,28,0.04)', borderColor: 'rgba(28,28,28,0.25)' },
                      transition: 'all 0.15s',
                    }}
                  >
                    <InsertDriveFileOutlined sx={{ fontSize: '18px', color: COLORS.text.muted }} />
                    <Box sx={{ flex: 1, fontSize: '13px', fontWeight: 500, color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily }}>
                      {item.label}
                    </Box>
                    <ChevronRight sx={{ fontSize: '16px', color: COLORS.text.muted }} />
                  </Box>
                ))}
              </Box>
            </AccordionContent>
          )}
        </AccordionSection>

      </PageContainer>
    </TrainerLayout>
  );
};

export default TrainerDashboard;
