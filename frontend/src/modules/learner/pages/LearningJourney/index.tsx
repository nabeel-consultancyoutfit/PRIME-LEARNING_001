import React, { useState } from 'react';
import { Box, Typography, Checkbox, FormControlLabel, styled } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { useRouter } from 'next/router';

/* ─── Styled components ─── */

const PageWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
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

/* Controls bar */
const ControlsBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '12px',
  padding: '12px 20px',
  flexWrap: 'wrap',
});

const DateLabel = styled(Typography)({
  fontSize: '13px',
  fontWeight: 600,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  whiteSpace: 'nowrap',
});

const DateInput = styled('input')({
  border: '1px solid rgba(28,28,28,0.15)',
  borderRadius: '6px',
  padding: '6px 10px',
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
  color: '#1C1C1C',
  outline: 'none',
  '&:focus': { borderColor: '#1C1C1C' },
});

const ShowButton = styled(Box)({
  backgroundColor: '#1C1C1C',
  color: '#fff',
  borderRadius: '8px',
  padding: '7px 20px',
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
  cursor: 'pointer',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
});

const CheckboxesGroup = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginLeft: 'auto',
  flexWrap: 'wrap',
});

/* Chart card */
const ChartCard = styled(Box)({
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '12px',
  padding: '24px',
});

/* Legend */
const LegendRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap',
  marginBottom: '24px',
});

const LegendItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '12px',
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

const LegendDot = styled(Box)<{ color: string }>(({ color }) => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: color,
  flexShrink: 0,
}));

/* ─── Chart data ─── */

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

interface LineDataset {
  label: string;
  color: string;
  values: number[];
}

const DATASETS: LineDataset[] = [
  {
    label: 'Learning Activity',
    color: '#7C6BC4',
    values: [0, 30, 60, 80, 55, 45, 40, 20, 25, 55, 60, 20],
  },
  {
    label: 'Plan Of Activity/action',
    color: '#E91E8C',
    values: [0, 35, 75, 100, 70, 50, 20, 30, 45, 65, 75, 10],
  },
  {
    label: 'Review',
    color: '#42A5F5',
    values: [0, 20, 45, 60, 50, 40, 25, 35, 50, 60, 45, 15],
  },
  {
    label: 'Unit',
    color: '#B39DDB',
    values: [0, 15, 35, 55, 45, 30, 20, 30, 40, 55, 35, 10],
  },
  {
    label: 'Progress',
    color: '#3F51B5',
    values: [0, 10, 25, 40, 35, 25, 15, 25, 35, 45, 30, 5],
  },
  {
    label: 'Target Progress',
    color: '#4CAF50',
    values: [0, 20, 40, 60, 50, 35, 25, 40, 50, 60, 40, 10],
  },
  {
    label: 'Red-Amber threshold',
    color: '#FF9800',
    values: [0, 18, 30, 50, 42, 28, 20, 32, 42, 50, 35, 8],
  },
];

/* ─── SVG Chart ─── */

const SVGChart: React.FC = () => {
  const svgWidth = 900;
  const svgHeight = 320;
  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartW = svgWidth - paddingLeft - paddingRight;
  const chartH = svgHeight - paddingTop - paddingBottom;

  const yLabels = [0, 20, 40, 60, 80, 100];
  const maxY = 100;

  const xOf = (idx: number) => paddingLeft + (idx / (MONTHS.length - 1)) * chartW;
  const yOf = (val: number) => paddingTop + chartH - (val / maxY) * chartH;

  const toPath = (values: number[]) =>
    values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xOf(i)} ${yOf(v)}`).join(' ');

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      style={{ width: '100%', overflow: 'visible' }}
    >
      {/* Grid lines */}
      {yLabels.map((y) => (
        <g key={`grid-${y}`}>
          <line
            x1={paddingLeft}
            y1={yOf(y)}
            x2={svgWidth - paddingRight}
            y2={yOf(y)}
            stroke="rgba(28,28,28,0.08)"
            strokeWidth="1"
          />
          <text
            x={paddingLeft - 8}
            y={yOf(y) + 4}
            textAnchor="end"
            fontSize="11"
            fill="rgba(28,28,28,0.45)"
            fontFamily="Inter, sans-serif"
          >
            {y === 0 ? '0' : `${y}%`}
          </text>
        </g>
      ))}

      {/* X-axis labels */}
      {MONTHS.map((m, i) => (
        <text
          key={m}
          x={xOf(i)}
          y={svgHeight - paddingBottom + 18}
          textAnchor="middle"
          fontSize="11"
          fill="rgba(28,28,28,0.45)"
          fontFamily="Inter, sans-serif"
        >
          {m}
        </text>
      ))}

      {/* Data lines */}
      {DATASETS.map((ds) => (
        <path
          key={ds.label}
          d={toPath(ds.values)}
          fill="none"
          stroke={ds.color}
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
};

/* ─── Component ─── */

const LearningJourney: React.FC = () => {
  const router = useRouter();
  const [dateFrom, setDateFrom] = useState('2025-12-12');
  const [dateTo, setDateTo] = useState('2025-12-18');
  const [showActual, setShowActual] = useState(false);
  const [showTarget, setShowTarget] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <LearnerLayout pageTitle="Learning Journey">
      <PageWrapper>
        {/* Header */}
        <PageHeader>
          <BackButton onClick={() => router.back()}>
            <ArrowBackIos sx={{ fontSize: '12px', color: '#fff', ml: '4px' }} />
          </BackButton>
          <PageTitle>Learning Journey</PageTitle>
        </PageHeader>

        {/* Controls */}
        <ControlsBar>
          <DateLabel>Date From:</DateLabel>
          <DateInput
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <DateLabel>Date To:</DateLabel>
          <DateInput
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
          <ShowButton>Show</ShowButton>

          <CheckboxesGroup>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={showActual}
                  onChange={(e) => setShowActual(e.target.checked)}
                  sx={{ padding: '4px' }}
                />
              }
              label={
                <Typography sx={{ fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>
                  Show actual progress
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={showTarget}
                  onChange={(e) => setShowTarget(e.target.checked)}
                  sx={{ padding: '4px' }}
                />
              }
              label={
                <Typography sx={{ fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>
                  Show target progress
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={showActivities}
                  onChange={(e) => setShowActivities(e.target.checked)}
                  sx={{ padding: '4px' }}
                />
              }
              label={
                <Typography sx={{ fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>
                  Show activities
                </Typography>
              }
            />
          </CheckboxesGroup>
        </ControlsBar>

        {/* Chart Card */}
        <ChartCard>
          {/* Legend */}
          <LegendRow>
            {DATASETS.map((ds) => (
              <LegendItem key={ds.label}>
                <LegendDot color={ds.color} />
                {ds.label}
              </LegendItem>
            ))}
          </LegendRow>

          {/* Chart */}
          <SVGChart />
        </ChartCard>
      </PageWrapper>
    </LearnerLayout>
  );
};

export default LearningJourney;
