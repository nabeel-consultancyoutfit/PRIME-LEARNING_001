/**
 * Trainer — Reports Page
 * Figma: node 2097-161464
 *
 * Landing: 3-row grid of 10 clickable report-type cards
 * Detail:  Filter criteria panel + paginated results table
 */

import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  InsertChartOutlined,
  FileUploadOutlined,
  ArrowBackOutlined,
} from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import {
  PageContainer,
  CardsRow,
  ReportCard,
  CardIconBox,
  CardLabel,
  DetailContainer,
  DetailTopBar,
  DetailTitle,
  RecordsPerPageBox,
  RecordsSelect,
  CriteriaPanel,
  CriteriaTitle,
  CriteriaFields,
  CriteriaField,
  FieldLabel,
  DateInput,
  ApplyButton,
  ResultsBar,
  ResultsCount,
  ExportButton,
  TableWrapper,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell,
  TableLinkCell,
  BackLink,
} from './Reports.style';

/* ─── Report type definitions ────────────────────────────── */
interface ReportType {
  id: string;
  label: string;
  columns: string[];
  rows: string[][];
}

const REPORTS: ReportType[] = [
  {
    id: 'tasks-due',
    label: 'Tasks Due',
    columns: ['Learner', 'Task', 'Date Due', 'Status'],
    rows: [
      ['Mr Rakker Joe', 'Reflective Account', '15/03/2025', 'Overdue'],
      ['Ms Pippins McGray', 'Progress Review', '18/03/2025', 'Pending'],
    ],
  },
  {
    id: 'learners-on-target',
    label: 'Learners on Target',
    columns: ['Learner', 'Programme', 'Target Progress', 'Actual Progress', 'Status'],
    rows: [
      ['Mr Rakker Joe', 'Customer Service L3', '65%', '68%', 'On Target'],
      ['Ms Pippins McGray', 'Team Leader L3', '50%', '47%', 'Slightly Behind'],
    ],
  },
  {
    id: 'learners-last-logged-in',
    label: 'Learners Last Logged In',
    columns: ['Learner', 'Last Logged In'],
    rows: [
      ['Mr Rakker Joe', '24/06/2025 14:53:19'],
    ],
  },
  {
    id: 'progress-reviews-due',
    label: 'Progress Reviews Due',
    columns: ['Learner', 'Programme', 'Review Due Date', 'Last Review'],
    rows: [
      ['Mr Rakker Joe', 'Customer Service L3', '20/03/2025', '20/01/2025'],
      ['Ms Pippins McGray', 'Team Leader L3', '25/03/2025', '25/01/2025'],
    ],
  },
  {
    id: 'due-to-complete-90',
    label: 'Due to Complete next 90 days',
    columns: ['Learner', 'Programme', 'End Date', 'Progress'],
    rows: [
      ['Mr Rakker Joe', 'Customer Service L3', '15/05/2025', '82%'],
    ],
  },
  {
    id: 'completed-visits-30',
    label: 'Completed Visits in Last 30 Days',
    columns: ['Learner', 'Visit Date', 'Visit Type', 'Location', 'Status'],
    rows: [
      ['Mr Rakker Joe', '05/03/2025', 'Progress Review', 'Remote', 'Completed'],
      ['Ms Pippins McGray', '08/03/2025', 'Observation', 'Workplace', 'Completed'],
    ],
  },
  {
    id: 'iqa-actions',
    label: 'IQA Actions',
    columns: ['Learner', 'Task Name', 'Count'],
    rows: [
      ['Mr Rakker Joe', 'Two Peas in a Pod', '0'],
      ['Mr Rakker Joe', 'Four Corners 001', '0'],
      ['Mr Rakker Joe', 'Customer Service Training', '0'],
    ],
  },
  {
    id: 'planned-visit-30',
    label: 'Planned visit in next 30 Days',
    columns: ['Visit Type', 'Trainer', 'Individual/Group', 'Visit Month', 'History'],
    rows: [
      ['Progress Review', 'Joanna Trimble', 'Away for 7 days', 'May 2025', '2/2 Remaining'],
      ['Observation', 'Joanna Trimble', 'Away for 7 days', 'Apr 2025', '1/1 Remaining'],
    ],
  },
  {
    id: 'learners-on-target-otj',
    label: 'Learners on Target (Off-The-Job)',
    columns: ['Learner', 'Cohort', 'Workplace', 'Target Progress', 'OTJ Hours', 'Status'],
    rows: [
      ['Mr Rakker Joe', 'Business', 'Default Workplace', 'Houns Trimble', 'PROG/CS', '0'],
      ['Ms Pippins McGray', 'Business', 'Default Workplace', 'Houns Trimble', 'TRAL/CS', '0'],
    ],
  },
  {
    id: 'no-otj-activity',
    label: 'No Off-The-Job Activity',
    columns: ['Learner', 'Cohort', 'Workplace', 'Programme', 'Last Activity'],
    rows: [
      ['Mr Rakker Joe', 'Business', 'Default Workplace', 'Customer Service L3', 'Never'],
    ],
  },
];

/* ─── Row 1 = 4 cards, Row 2 = 3 cards, Row 3 = 3 cards ── */
const ROW1 = REPORTS.slice(0, 4);
const ROW2 = REPORTS.slice(4, 7);
const ROW3 = REPORTS.slice(7, 10);

/* ─── Component ───────────────────────────────────────────── */
const TrainerReports: React.FC = () => {
  const [activeReport, setActiveReport] = useState<ReportType | null>(null);
  const [dateFrom, setDateFrom] = useState('2025-01-06');
  const [dateTo, setDateTo] = useState('2025-01-06');
  const [recordsPerPage, setRecordsPerPage] = useState('50');

  /* ── Landing view — 10 report cards ── */
  if (!activeReport) {
    return (
      <TrainerLayout pageTitle="Reports">
        <PageContainer>
          <CardsRow>
            {ROW1.map((r) => (
              <ReportCard key={r.id} onClick={() => setActiveReport(r)}>
                <CardIconBox>
                  <InsertChartOutlined sx={{ fontSize: 22 }} />
                </CardIconBox>
                <CardLabel>{r.label}</CardLabel>
              </ReportCard>
            ))}
          </CardsRow>

          <CardsRow>
            {ROW2.map((r) => (
              <ReportCard key={r.id} onClick={() => setActiveReport(r)}>
                <CardIconBox>
                  <InsertChartOutlined sx={{ fontSize: 22 }} />
                </CardIconBox>
                <CardLabel>{r.label}</CardLabel>
              </ReportCard>
            ))}
          </CardsRow>

          <CardsRow>
            {ROW3.map((r) => (
              <ReportCard key={r.id} onClick={() => setActiveReport(r)}>
                <CardIconBox>
                  <InsertChartOutlined sx={{ fontSize: 22 }} />
                </CardIconBox>
                <CardLabel>{r.label}</CardLabel>
              </ReportCard>
            ))}
          </CardsRow>
        </PageContainer>
      </TrainerLayout>
    );
  }

  /* ── Detail view ── */
  const { label, columns, rows } = activeReport;

  return (
    <TrainerLayout pageTitle="Reports">
      <DetailContainer>
        {/* Back link */}
        <BackLink onClick={() => setActiveReport(null)}>
          <ArrowBackOutlined sx={{ fontSize: 16 }} />
          Back to Reports
        </BackLink>

        {/* Top bar: title + records per page */}
        <DetailTopBar>
          <DetailTitle>{label}</DetailTitle>
          <RecordsPerPageBox>
            Records per page:
            <RecordsSelect
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </RecordsSelect>
          </RecordsPerPageBox>
        </DetailTopBar>

        {/* Select Report Criteria */}
        <CriteriaPanel>
          <CriteriaTitle>Select Report Criteria</CriteriaTitle>
          <CriteriaFields>
            <CriteriaField>
              <FieldLabel>Date form</FieldLabel>
              <DateInput
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </CriteriaField>
            <CriteriaField>
              <FieldLabel>Date to</FieldLabel>
              <DateInput
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </CriteriaField>
            <ApplyButton>Apply</ApplyButton>
          </CriteriaFields>
        </CriteriaPanel>

        {/* Results bar */}
        <ResultsBar>
          <ResultsCount>
            Showing 1 – {rows.length} of {rows.length} records
          </ResultsCount>
          <ExportButton>
            <FileUploadOutlined sx={{ fontSize: 16 }} />
            Export
          </ExportButton>
        </ResultsBar>

        {/* Table */}
        <TableWrapper>
          <TableHead>
            {columns.map((col) => (
              <TableHeadCell key={col} sx={{ flex: 1 }}>
                {col}
              </TableHeadCell>
            ))}
          </TableHead>

          {rows.map((row, ri) => (
            <TableRow key={ri}>
              {row.map((cell, ci) => (
                ci === 0 ? (
                  <TableLinkCell key={ci} sx={{ flex: 1 }}>{cell}</TableLinkCell>
                ) : (
                  <TableCell key={ci} sx={{ flex: 1 }}>{cell}</TableCell>
                )
              ))}
            </TableRow>
          ))}
        </TableWrapper>
      </DetailContainer>
    </TrainerLayout>
  );
};

export default TrainerReports;
