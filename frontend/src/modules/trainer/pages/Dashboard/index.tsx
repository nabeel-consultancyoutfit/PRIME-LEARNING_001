/**
 * Trainer Dashboard Page — matches Figma design
 * Accordion layout: Learner's Activity | Trainer's Dashboard | Learner Dashboard | Forms & Templates
 */

import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  ArrowForward,
  SearchOutlined,
  UnfoldMore,
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
  StatCard,
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

// Calendar data — May 2025
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

// Learners due to complete
const LEARNERS_DUE = [
  { name: 'John Doe', days: '1 Days' },
  { name: 'Abdul Abd', '14 days': '14 Days' },
  { name: 'Ruby Fletcher', days: '10 Days' },
];

// Donut chart SVG helper
const DonutSVG: React.FC<{ percent: number; color: string; size?: number }> = ({
  percent,
  color,
  size = 100,
}) => {
  const r = 38;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F5E8E8" strokeWidth={10} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={10}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
      />
    </svg>
  );
};

// Pie chart SVG helper
const PieSVG: React.FC<{ slices: { percent: number; color: string }[]; size?: number }> = ({
  slices,
  size = 100,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;
  let cumulative = 0;
  const paths = slices.map((s, i) => {
    const startAngle = (cumulative / 100) * 360 - 90;
    cumulative += s.percent;
    const endAngle = (cumulative / 100) * 360 - 90;
    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const large = s.percent > 50 ? 1 : 0;
    return (
      <path
        key={i}
        d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
        fill={s.color}
      />
    );
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {paths}
    </svg>
  );
};

const TrainerDashboard: React.FC = () => {
  const [trainerDashOpen, setTrainerDashOpen] = useState(true);
  const [learnerDashOpen, setLearnerDashOpen] = useState(false);
  const [formsOpen, setFormsOpen] = useState(false);

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
              <UnfoldMore sx={{ ml: 'auto' }} />
            </FilterSelect>
            <FilterLabel>Learner:</FilterLabel>
            <LearnerSearchBox>
              <SearchOutlined />
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
              <KeyboardArrowUp sx={{ color: '#888' }} />
            ) : (
              <KeyboardArrowDown sx={{ color: '#888' }} />
            )}
          </AccordionHeader>

          {trainerDashOpen && (
            <AccordionContent>
              {/* Row 1: Calendar + Completed visits + Planned visits */}
              <StatsGrid>
                {/* Calendar */}
                <CalendarCard>
                  <CalendarHeader>
                    <Box sx={{ fontSize: '11px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>
                      Statistics
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      May 2025
                      <KeyboardArrowDown sx={{ fontSize: '16px' }} />
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
                    <DonutSVG percent={70} color="#E53935" />
                    <DonutCenter>
                      <DonutPercent>70%</DonutPercent>
                      <Box sx={{ fontSize: '9px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>
                        Total progress
                      </Box>
                    </DonutCenter>
                  </DonutWrapper>
                  <DonutLegend>
                    <DonutLegendItem>
                      <DonutLegendDot color="#E53935" /> Planned: 10
                    </DonutLegendItem>
                    <DonutLegendItem>
                      <DonutLegendDot color="#F5E8E8" /> Learner: UES
                    </DonutLegendItem>
                    <DonutLegendItem>
                      <DonutLegendDot color="#FFA726" /> ARK 50%
                    </DonutLegendItem>
                  </DonutLegend>
                </DonutChartCard>

                {/* Planned visits donut */}
                <DonutChartCard>
                  <DonutChartLabel>Statistics</DonutChartLabel>
                  <DonutChartTitle>Planned visit in next 30 Days</DonutChartTitle>
                  <DonutWrapper>
                    <DonutSVG percent={70} color="#E53935" />
                    <DonutCenter>
                      <DonutPercent>70%</DonutPercent>
                      <Box sx={{ fontSize: '9px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>
                        Total success
                      </Box>
                    </DonutCenter>
                  </DonutWrapper>
                  <DonutLegend>
                    <DonutLegendItem>
                      <DonutLegendDot color="#E53935" /> On Target: 7
                    </DonutLegendItem>
                    <DonutLegendItem>
                      <DonutLegendDot color="#F5E8E8" /> Learner: 4
                    </DonutLegendItem>
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
                    {[30, 60, 45, 80, 55, 40, 70].map((h, i) => (
                      <BarChartBar key={i} height={h} color={COLORS.sidebar.activeBg} />
                    ))}
                  </BarChartBars>
                  <DonutLegend sx={{ mt: 1 }}>
                    <DonutLegendItem>
                      <DonutLegendDot color={COLORS.sidebar.activeBg} /> IQA actions due: 1
                    </DonutLegendItem>
                  </DonutLegend>
                </BarChartCard>

                {/* Learners due to complete */}
                <TableStatCard>
                  <TableStatHeader>
                    <StatCardLabel>Data</StatCardLabel>
                    <StatCardTitle>Learners Due to Complete next 90 Days</StatCardTitle>
                  </TableStatHeader>
                  <TableStatRow>
                    <TableStatCell sx={{ fontWeight: 600 }}>Name</TableStatCell>
                    <TableStatCell sx={{ fontWeight: 600 }}>Days Remaining</TableStatCell>
                  </TableStatRow>
                  {[
                    { name: 'John Doe', days: '1 Days' },
                    { name: 'Abdul Abd', days: '14 Days' },
                    { name: 'Ruby Fletcher', days: '10 Days' },
                  ].map((r, i) => (
                    <TableStatRow key={i}>
                      <TableStatCell>{r.name}</TableStatCell>
                      <TableStatCell>{r.days}</TableStatCell>
                    </TableStatRow>
                  ))}
                  <Box sx={{ p: '10px 14px', fontSize: '11px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>
                    Important: learner data, learner attendance, eligibility to be directed and confirmed by learner.
                  </Box>
                </TableStatCard>

                {/* Learners Last Logged In pie */}
                <DonutChartCard>
                  <DonutChartLabel>Statistics</DonutChartLabel>
                  <DonutChartTitle>Learners Last Logged in</DonutChartTitle>
                  <PieSVG
                    size={100}
                    slices={[
                      { percent: 35, color: '#E53935' },
                      { percent: 30, color: '#43A047' },
                      { percent: 35, color: '#FB8C00' },
                    ]}
                  />
                  <DonutLegend>
                    <DonutLegendItem><DonutLegendDot color="#E53935" /> 1-14 days: 4</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#43A047" /> 15-30 days: 5</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#FB8C00" /> 30+ days: 5</DonutLegendItem>
                  </DonutLegend>
                </DonutChartCard>
              </StatsGrid>

              {/* Row 3: Learners on Target + Learners on Target (OTJ) + No OTJ Activity */}
              <StatsGrid sx={{ mt: 2 }}>
                <DonutChartCard>
                  <DonutChartLabel>Statistics</DonutChartLabel>
                  <DonutChartTitle>Learners on Target</DonutChartTitle>
                  <PieSVG
                    size={100}
                    slices={[
                      { percent: 45, color: '#43A047' },
                      { percent: 30, color: '#FB8C00' },
                      { percent: 25, color: '#E53935' },
                    ]}
                  />
                  <DonutLegend>
                    <DonutLegendItem><DonutLegendDot color="#43A047" /> On target: 2</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#FB8C00" /> On target: 6</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#E53935" /> Ahead of target: 6</DonutLegendItem>
                  </DonutLegend>
                </DonutChartCard>

                <DonutChartCard>
                  <DonutChartLabel>Statistics</DonutChartLabel>
                  <DonutChartTitle>Learners on Target (Off-The-Job)</DonutChartTitle>
                  <PieSVG
                    size={100}
                    slices={[
                      { percent: 50, color: '#43A047' },
                      { percent: 30, color: '#FB8C00' },
                      { percent: 20, color: '#E53935' },
                    ]}
                  />
                  <DonutLegend>
                    <DonutLegendItem><DonutLegendDot color="#43A047" /> On target: 2</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#FB8C00" /> On target: 6</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#E53935" /> Ahead of target: 6</DonutLegendItem>
                  </DonutLegend>
                </DonutChartCard>

                <DonutChartCard>
                  <DonutChartLabel>Statistics</DonutChartLabel>
                  <DonutChartTitle>No Off-The-Job Activity</DonutChartTitle>
                  <PieSVG
                    size={100}
                    slices={[
                      { percent: 25, color: '#43A047' },
                      { percent: 35, color: '#FB8C00' },
                      { percent: 20, color: '#4A90D9' },
                      { percent: 20, color: '#AB47BC' },
                    ]}
                  />
                  <DonutLegend>
                    <DonutLegendItem><DonutLegendDot color="#43A047" /> 0-14 days: 4</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#FB8C00" /> 15-30 days: 5</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#4A90D9" /> 31-60 days: 4</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#AB47BC" /> Leave: not active: 4</DonutLegendItem>
                  </DonutLegend>
                </DonutChartCard>
              </StatsGrid>

              {/* Row 4: Progress reviews due + Task Due */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
                <DonutChartCard>
                  <DonutChartLabel>Statistics</DonutChartLabel>
                  <DonutChartTitle>Progress review due</DonutChartTitle>
                  <PieSVG
                    size={100}
                    slices={[
                      { percent: 30, color: '#E53935' },
                      { percent: 25, color: '#43A047' },
                      { percent: 25, color: '#FB8C00' },
                      { percent: 20, color: '#AB47BC' },
                    ]}
                  />
                  <DonutLegend>
                    <DonutLegendItem><DonutLegendDot color="#E53935" /> Overdue: 3</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#43A047" /> Due in 7 days: 4</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#FB8C00" /> Due in 14 days: 4</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#AB47BC" /> Due in 30+ days: 11</DonutLegendItem>
                  </DonutLegend>
                </DonutChartCard>

                <ProgressBarsCard>
                  <StatCardLabel>Statistics</StatCardLabel>
                  <StatCardTitle>Task Due</StatCardTitle>
                  {[
                    { label: 'Trainer tasks', value: 80, color: '#AB47BC' },
                    { label: 'IQA tasks', value: 30, color: '#FB8C00' },
                    { label: 'Task tasks', value: 60, color: '#4A90D9' },
                  ].map((bar) => (
                    <ProgressBarRow key={bar.label}>
                      <ProgressBarMeta>
                        <span>{bar.label}</span>
                      </ProgressBarMeta>
                      <ProgressBarTrack>
                        <ProgressBarFill fillColor={bar.color} width={bar.value} />
                      </ProgressBarTrack>
                    </ProgressBarRow>
                  ))}
                  <DonutLegend sx={{ mt: 1 }}>
                    <DonutLegendItem><DonutLegendDot color="#AB47BC" /> There are: 7</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#FB8C00" /> In 7 days: 3</DonutLegendItem>
                    <DonutLegendItem><DonutLegendDot color="#4A90D9" /> Ahead of target: 5</DonutLegendItem>
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
              <KeyboardArrowUp sx={{ color: '#888' }} />
            ) : (
              <KeyboardArrowDown sx={{ color: '#888' }} />
            )}
          </AccordionHeader>
          {learnerDashOpen && (
            <AccordionContent>
              <Box sx={{ py: 2, color: COLORS.text.muted, fontSize: '14px', fontFamily: TYPOGRAPHY.fontFamily }}>
                Select a learner to view their dashboard.
              </Box>
            </AccordionContent>
          )}
        </AccordionSection>

        {/* ── Forms & Templates (accordion) ── */}
        <AccordionSection>
          <AccordionHeader onClick={() => setFormsOpen(!formsOpen)}>
            <AccordionTitle>Forms & Templates</AccordionTitle>
            {formsOpen ? (
              <KeyboardArrowUp sx={{ color: '#888' }} />
            ) : (
              <KeyboardArrowDown sx={{ color: '#888' }} />
            )}
          </AccordionHeader>
          {formsOpen && (
            <AccordionContent>
              <Box sx={{ py: 2, color: COLORS.text.muted, fontSize: '14px', fontFamily: TYPOGRAPHY.fontFamily }}>
                No forms or templates available.
              </Box>
            </AccordionContent>
          )}
        </AccordionSection>
      </PageContainer>
    </TrainerLayout>
  );
};

export default TrainerDashboard;
