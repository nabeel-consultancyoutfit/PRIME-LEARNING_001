/**
 * Scorecard Page Component
 * Displays learner scorecards and learning growth chart
 */

import React from 'react';
import { Box } from '@mui/material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { useScorecard } from './useScorecard';
import { COLORS } from '@/modules/learner/theme/tokens';
import {
  ScorecardContainer,
  PanelGrid,
  Panel,
  PanelTitle,
  CreateButton,
  SubmitButton,
  DateFromGroup,
  DateLabel,
  DateInput,
  EmptyStateMessage,
  ChartContainer,
  ChartHeader,
  FilterSelect,
  FilterGroup,
  FilterLabel,
  ChartSVGWrapper,
  ChartLegend,
} from './Scorecard.style';

const Scorecard: React.FC = () => {
  const { state, setDateFromValue, setDateRangeFilter, handleCreateScorecard, handleSubmitDateFrom } =
    useScorecard();

  // Render line chart using SVG
  const renderLearningGrowthChart = () => {
    const data = state.learningGrowthData;
    const padding = 40;
    const width = 600;
    const height = 300;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Find min and max for scaling
    const maxValue = 8;
    const minValue = 0;
    const scale = chartHeight / (maxValue - minValue);

    // Generate polyline points
    const points = data.map((item, idx) => {
      const x = padding + (idx / (data.length - 1)) * chartWidth;
      const y = height - padding - (item.value - minValue) * scale;
      return [x, y];
    });

    const polylineString = points.map((p) => `${p[0]},${p[1]}`).join(' ');

    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        {/* Grid lines */}
        {[0, 2, 4, 6, 8].map((val) => {
          const y = height - padding - ((val - minValue) / (maxValue - minValue)) * chartHeight;
          return (
            <line
              key={`grid-${val}`}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#e0e0e0"
              strokeWidth="1"
            />
          );
        })}

        {/* Y-axis */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#000000"
          strokeWidth="2"
        />

        {/* X-axis */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#000000"
          strokeWidth="2"
        />

        {/* Y-axis labels */}
        {[0, 2, 4, 6, 8].map((val) => {
          const y = height - padding - ((val - minValue) / (maxValue - minValue)) * chartHeight;
          return (
            <text
              key={`y-label-${val}`}
              x={padding - 10}
              y={y + 5}
              textAnchor="end"
              fontSize="12"
              fill="#999999"
            >
              {val}
            </text>
          );
        })}

        {/* X-axis labels */}
        {data.map((item, idx) => {
          const x = padding + (idx / (data.length - 1)) * chartWidth;
          return (
            <text
              key={`x-label-${item.month}`}
              x={x}
              y={height - padding + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#999999"
            >
              {item.month}
            </text>
          );
        })}

        {/* Polyline chart */}
        <polyline
          points={polylineString}
          fill="none"
          stroke="#7c6bc4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((point, idx) => (
          <circle
            key={`point-${idx}`}
            cx={point[0]}
            cy={point[1]}
            r="4"
            fill="#7c6bc4"
            stroke="#ffffff"
            strokeWidth="2"
          />
        ))}
      </svg>
    );
  };

  return (
    <LearnerLayout pageTitle="Scorecard">
      <ScorecardContainer>
        <PanelGrid>
          {/* Left Panel: Scorecards */}
          <Panel>
            <PanelTitle>Scorecards</PanelTitle>

            <Box sx={{ marginBottom: '16px' }}>
              <CreateButton onClick={handleCreateScorecard}>
                + Create New Scorecard
              </CreateButton>
            </Box>

            {/* Date From Filter */}
            <DateFromGroup>
              <DateLabel>Date From:</DateLabel>
              <DateInput
                type="date"
                value={state.dateFromValue}
                onChange={(e) => setDateFromValue(e.target.value)}
              />
              <SubmitButton onClick={handleSubmitDateFrom}>Submit</SubmitButton>
            </DateFromGroup>

            {/* Empty State */}
            <EmptyStateMessage>
              There are no records to display
            </EmptyStateMessage>
          </Panel>

          {/* Right Panel: Learning Growth Chart */}
          <Panel>
            <PanelTitle>Learning Growth</PanelTitle>

            {/* Chart Header with Filters */}
            <ChartHeader>
              <FilterGroup>
                <FilterLabel>Date range</FilterLabel>
                <FilterSelect
                  value={state.dateRangeFilter}
                  onChange={(e) => setDateRangeFilter(e.target.value)}
                >
                  <option value="1m">Last 1 Month</option>
                  <option value="3m">Last 3 Months</option>
                  <option value="6m">Last 6 Months</option>
                  <option value="1y">Last 1 Year</option>
                  <option value="all">All Time</option>
                </FilterSelect>
              </FilterGroup>

              <FilterGroup>
                <FilterLabel>Show units</FilterLabel>
                <FilterSelect value="no">
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </FilterSelect>
              </FilterGroup>
            </ChartHeader>

            {/* Chart */}
            <ChartContainer>
              <ChartSVGWrapper>
                {renderLearningGrowthChart()}
              </ChartSVGWrapper>

              {/* Legend */}
              <ChartLegend>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Box
                    sx={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: COLORS.accent.purple,
                      borderRadius: '2px',
                    }}
                  />
                  <span>Learning Growth</span>
                </Box>
              </ChartLegend>
            </ChartContainer>
          </Panel>
        </PanelGrid>
      </ScorecardContainer>
    </LearnerLayout>
  );
};

export default Scorecard;
