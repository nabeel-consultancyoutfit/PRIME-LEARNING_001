/**
 * Trainer — Report Detail Page (shared shell for all 9 report types)
 * Each report has its own: title, filter fields, table columns + rows
 * Figma nodes: 2100:47427 · 2100:48015 · 2102:48502 · 2102:49069
 *              2105:51543 · 2102:50009 · 2103:50582 · 2105:51093 · 2102:49551
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { FileUploadOutlined } from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import {
  DetailContainer,
  DetailTopBar,
  DetailTitle,
  RecordsPerPageBox,
  RecordsSelect,
  CriteriaPanel,
  CriteriaTitle,
  CriteriaRow,
  CriteriaField,
  FieldLabel,
  DateInput,
  SelectInput,
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
} from './Reports.style';
import { COLORS, TYPOGRAPHY } from '@/modules/trainer/theme/tokens';

/* ─── Types ──────────────────────────────────────────────── */
type FilterField =
  | { type: 'date';   label: string; key: string; defaultValue?: string }
  | { type: 'select'; label: string; key: string; options: string[]; defaultValue?: string };

interface Column {
  key: string;
  label: string;
  width?: string;
  isLink?: boolean;
  isProgress?: boolean; // renders mini Progress + Target bars
  isRed?: boolean;       // renders value in red if negative
}

interface ReportConfig {
  title: string;
  breadcrumb: string;
  filters: FilterField[];
  columns: Column[];
  rows: Record<string, string>[];
  resultsSuffix?: string; // e.g. "of 1 records"
}

/* ─── Mini progress bar ───────────────────────────────────── */
const MiniBar: React.FC<{ progress: number; target: number }> = ({ progress, target }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 120 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <Box sx={{ fontSize: '11px', color: COLORS.text.secondary, fontFamily: TYPOGRAPHY.fontFamily, minWidth: 54 }}>
        Progress:
      </Box>
      <Box sx={{ flex: 1, height: '6px', borderRadius: '3px', backgroundColor: '#E8E8E8', minWidth: 60 }}>
        <Box sx={{ height: '100%', width: `${progress}%`, borderRadius: '3px', backgroundColor: '#4A90D9' }} />
      </Box>
      <Box sx={{ fontSize: '11px', fontWeight: 600, color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily, minWidth: 30 }}>
        {progress}%
      </Box>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <Box sx={{ fontSize: '11px', color: COLORS.text.secondary, fontFamily: TYPOGRAPHY.fontFamily, minWidth: 54 }}>
        Target:
      </Box>
      <Box sx={{ flex: 1, height: '6px', borderRadius: '3px', backgroundColor: '#E8E8E8', minWidth: 60 }}>
        <Box sx={{ height: '100%', width: `${target}%`, borderRadius: '3px', backgroundColor: '#C6C7F8' }} />
      </Box>
      <Box sx={{ fontSize: '11px', fontWeight: 600, color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily, minWidth: 30 }}>
        {target}%
      </Box>
    </Box>
  </Box>
);

/* ─── Report configurations ──────────────────────────────── */
const REPORT_CONFIGS: Record<string, ReportConfig> = {

  /* 1 ── Learners Last Logged In */
  'learners-last-logged-in': {
    title: 'Learners Last Logged In',
    breadcrumb: 'Dashboard',
    filters: [
      { type: 'date',   label: 'Date form', key: 'dateFrom', defaultValue: '2025-06-01' },
      { type: 'date',   label: 'Date to',   key: 'dateTo',   defaultValue: '2025-06-01' },
    ],
    columns: [
      { key: 'learner',      label: 'Learner',        width: '50%', isLink: true },
      { key: 'lastLoggedIn', label: 'Last Logged In', width: '50%' },
    ],
    rows: [
      { learner: 'Mr Rakker Joe', lastLoggedIn: '24/06/2025 14:53:19' },
    ],
  },

  /* 2 ── Progress Reviews Due */
  'progress-reviews-due': {
    title: 'Progress ReviewsDue',
    breadcrumb: 'Progress ReviewsDue',
    filters: [
      { type: 'select', label: 'Report Groups:',    key: 'reportGroup',     options: ['Select report group'], defaultValue: 'Select report group' },
      { type: 'select', label: 'Learner:',          key: 'learner',         options: ['Hide Archived'], defaultValue: 'Hide Archived' },
      { type: 'select', label: 'Cohort:',           key: 'cohort',          options: ['Show All'], defaultValue: 'Show All' },
      { type: 'select', label: 'Workplace:',        key: 'workplace',       options: ['Select a workplace'], defaultValue: 'Select a workplace' },
      { type: 'select', label: 'Tutor:',            key: 'tutor',           options: ['All Tutors'], defaultValue: 'All Tutors' },
      { type: 'select', label: 'Completion date:',  key: 'completionDate',  options: ['Show All'], defaultValue: 'Show All' },
    ],
    columns: [
      { key: 'learner',           label: 'Learner',                       isLink: true },
      { key: 'tutorName',         label: 'Tutor Name' },
      { key: 'uln',               label: 'ULN' },
      { key: 'scheduledDate',     label: 'Scheduled Progress Review Date' },
      { key: 'actualDate',        label: 'Actual Progress Review Date',    isLink: true },
      { key: 'tutorSigned',       label: 'Tutor Signed Date' },
      { key: 'learnerSigned',     label: 'Learner Signed Date' },
      { key: 'employerSigned',    label: 'Employer Signed Date' },
    ],
    rows: [
      { learner: 'Mr Rakker Joe', tutorName: 'Mr Rakker Joe', uln: '', scheduledDate: '27/02/2025', actualDate: '19/06/2025', tutorSigned: '19/06/2025', learnerSigned: '19/06/2025', employerSigned: '24/06/2025' },
      { learner: 'Mr Rakker Joe', tutorName: 'Mr Rakker Joe', uln: '', scheduledDate: '27/02/2025', actualDate: '19/06/2025', tutorSigned: '19/06/2025', learnerSigned: '19/06/2025', employerSigned: '24/06/2025' },
      { learner: 'Mr Rakker Joe', tutorName: 'Mr Rakker Joe', uln: '', scheduledDate: '27/02/2025', actualDate: '19/06/2025', tutorSigned: '19/06/2025', learnerSigned: '19/06/2025', employerSigned: '24/06/2025' },
    ],
  },

  /* 3 ── Learners Due to Complete next 90 days */
  'due-to-complete': {
    title: 'Learners Due to Complete next 90 days',
    breadcrumb: 'Learners Due to Complete next 90 days',
    filters: [
      { type: 'select', label: 'Report Groups:', key: 'reportGroup', options: ['Select report group'], defaultValue: 'Select report group' },
      { type: 'select', label: 'Tutor:',         key: 'tutor',       options: ['All Tutors'], defaultValue: 'All Tutors' },
      { type: 'date',   label: 'Date form',      key: 'dateFrom',    defaultValue: '2025-06-01' },
      { type: 'date',   label: 'Date to',        key: 'dateTo',      defaultValue: '2025-06-01' },
    ],
    columns: [
      { key: 'learner',          label: 'Learner',                        isLink: true },
      { key: 'cohort',           label: 'Cohort' },
      { key: 'workplace',        label: 'Workplace' },
      { key: 'tutorName',        label: 'Tutor name' },
      { key: 'plannedEndDate',   label: 'Planne dend date' },
      { key: 'progress',         label: 'Progress (click for breakdown)', isProgress: true },
      { key: 'actualProgress',   label: 'Actual Progress(%)' },
      { key: 'expectedProgress', label: 'Expected Progress(%)' },
    ],
    rows: [
      { learner: 'Mr Rakker Joe', cohort: 'Business Admin', workplace: 'Default Placement', tutorName: 'Hassan Tahmidul', plannedEndDate: '19/06/2025', progress: '12|51', actualProgress: '0', expectedProgress: '52' },
      { learner: 'Mr Rakker Joe', cohort: 'Business Admin', workplace: 'Default Placement', tutorName: 'Hassan Tahmidul', plannedEndDate: '19/06/2025', progress: '12|51', actualProgress: '0', expectedProgress: '52' },
      { learner: 'Mr Rakker Joe', cohort: 'Business Admin', workplace: 'Default Placement', tutorName: 'Hassan Tahmidul', plannedEndDate: '19/06/2025', progress: '12|51', actualProgress: '0', expectedProgress: '52' },
    ],
  },

  /* 4 ── Completed Visits in Last 30 Days */
  'completed-visits': {
    title: 'Completed visit in last 30 Days',
    breadcrumb: 'Learner Visits',
    filters: [
      { type: 'select', label: 'Visit Type:',       key: 'visitType',        options: ['Remote session', 'Face-to-face visit'], defaultValue: 'Remote session' },
      { type: 'select', label: 'Tutor:',            key: 'tutor',            options: ['All Tutors'], defaultValue: 'All Tutors' },
      { type: 'select', label: 'Cancelled Filter:', key: 'cancelledFilter',  options: ['Hide Cancelled visits', 'Show all'], defaultValue: 'Hide Cancelled visits' },
      { type: 'date',   label: 'Date form',         key: 'dateFrom',         defaultValue: '2025-06-01' },
      { type: 'date',   label: 'Date to',           key: 'dateTo',           defaultValue: '2025-06-01' },
    ],
    columns: [
      { key: 'learner',          label: 'Learner',               isLink: true },
      { key: 'tutorName',        label: 'Tutor name' },
      { key: 'visitType',        label: 'Visit type' },
      { key: 'date',             label: 'Date' },
      { key: 'location',         label: 'Location' },
      { key: 'expectedProgress', label: 'Expected Progress(%)' },
    ],
    rows: [
      { learner: 'Mr Rakker Joe', tutorName: 'Hassan Tahmidul', visitType: 'Face-to-face visit', date: '19/06/2025', location: '242 Pennyall rd', expectedProgress: '' },
      { learner: 'Mr Rakker Joe', tutorName: 'Hassan Tahmidul', visitType: 'Face-to-face visit', date: '19/06/2025', location: '242 Pennyall rd', expectedProgress: '' },
    ],
    resultsSuffix: '2 - 2 of 1 records',
  },

  /* 5 ── IQA Action */
  'iqa-actions': {
    title: 'IQA Action',
    breadcrumb: 'IQA Action',
    filters: [
      { type: 'date', label: 'Date form', key: 'dateFrom', defaultValue: '2025-06-01' },
      { type: 'date', label: 'Date to',   key: 'dateTo',   defaultValue: '2025-06-01' },
    ],
    columns: [
      { key: 'actionDescription', label: 'Action Desciption', isLink: true, width: '70%' },
      { key: 'timesUsed',         label: 'Times Used',        width: '30%' },
    ],
    rows: [
      { actionDescription: 'Insufficient Feedback', timesUsed: '0' },
      { actionDescription: 'Insufficient Feedback', timesUsed: '0' },
      { actionDescription: 'Evidence not present',  timesUsed: '0' },
      { actionDescription: 'Feedback not present',  timesUsed: '0' },
      { actionDescription: 'Good Judgement',        timesUsed: '0' },
    ],
    resultsSuffix: '5 - 5 of 1 records',
  },

  /* 6 ── Planned Visit in next 30 Days */
  'planned-visits': {
    title: 'Planned visit in next 30 Days',
    breadcrumb: 'Learner Visits',
    filters: [
      { type: 'select', label: 'Visit Type:',       key: 'visitType',       options: ['Remote session', 'Face-to-face visit'], defaultValue: 'Remote session' },
      { type: 'select', label: 'Tutor:',            key: 'tutor',           options: ['All Tutors'], defaultValue: 'All Tutors' },
      { type: 'select', label: 'Cancelled Filter:', key: 'cancelledFilter', options: ['Hide Cancelled visits', 'Show all'], defaultValue: 'Hide Cancelled visits' },
      { type: 'date',   label: 'Date form',         key: 'dateFrom',        defaultValue: '2025-06-01' },
      { type: 'date',   label: 'Date to',           key: 'dateTo',          defaultValue: '2025-06-01' },
    ],
    columns: [
      { key: 'learner',          label: 'Learner',               isLink: true },
      { key: 'tutorName',        label: 'Tutor name' },
      { key: 'visitType',        label: 'Visit type' },
      { key: 'date',             label: 'Date' },
      { key: 'location',         label: 'Location' },
      { key: 'expectedProgress', label: 'Expected Progress(%)' },
    ],
    rows: [
      { learner: 'Mr Rakker Joe', tutorName: 'Hassan Tahmidul', visitType: 'Face-to-face visit', date: '19/06/2025', location: '242 Pennyall rd', expectedProgress: '' },
      { learner: 'Mr Rakker Joe', tutorName: 'Hassan Tahmidul', visitType: 'Face-to-face visit', date: '19/06/2025', location: '242 Pennyall rd', expectedProgress: '' },
    ],
    resultsSuffix: '2 - 2 of 1 records',
  },

  /* 7 ── Learners on Target */
  'learners-on-target': {
    title: 'Learners on Target',
    breadcrumb: 'Learners on Target',
    filters: [
      { type: 'select', label: 'Report Groups:',  key: 'reportGroup',    options: ['Select Report group'], defaultValue: 'Select Report group' },
      { type: 'select', label: 'Tutor:',          key: 'tutor',          options: ['All Tutors'], defaultValue: 'All Tutors' },
      { type: 'select', label: 'Target Progress:',key: 'targetProgress', options: ['Any Target', 'On Target', 'Behind', 'Ahead'], defaultValue: 'Any Target' },
    ],
    columns: [
      { key: 'learner',          label: 'Learner',                        isLink: true },
      { key: 'cohort',           label: 'Cohort' },
      { key: 'workplace',        label: 'Workplace' },
      { key: 'tutorName',        label: 'Tutor name' },
      { key: 'plannedEndDate',   label: 'Planne dend date' },
      { key: 'progress',         label: 'Progress (click for breakdown)', isProgress: true },
      { key: 'actualProgress',   label: 'Actual Progress(%)' },
      { key: 'expectedProgress', label: 'Expected Progress(%)' },
      { key: 'targetDeviation',  label: 'Target Deviation' },
    ],
    rows: [
      { learner: 'Mr Rakker Joe', cohort: 'Business Admin', workplace: 'Default Placement', tutorName: 'Hassan Tahmidul', plannedEndDate: '19/06/2025', progress: '12|51', actualProgress: '0', expectedProgress: '52', targetDeviation: '-52' },
      { learner: 'Mr Rakker Joe', cohort: 'Business Admin', workplace: 'Default Placement', tutorName: 'Hassan Tahmidul', plannedEndDate: '19/06/2025', progress: '12|51', actualProgress: '0', expectedProgress: '52', targetDeviation: '-52' },
    ],
    resultsSuffix: '2 - 2 of 1 records',
  },

  /* 8 ── Learners on Target (Off-The-Job) */
  'learners-on-target-otj': {
    title: 'Learners on Target (Off-The-Job)',
    breadcrumb: 'Learners on Target',
    filters: [
      { type: 'select', label: 'Report Groups:',  key: 'reportGroup',    options: ['Select Report group'], defaultValue: 'Select Report group' },
      { type: 'select', label: 'Tutor:',          key: 'tutor',          options: ['Select All'], defaultValue: 'Select All' },
      { key: 'cohort',    type: 'select', label: 'Cohort:',          options: ['Select All'], defaultValue: 'Select All' },
      { key: 'workplace', type: 'select', label: 'Workplace:',       options: ['Select All'], defaultValue: 'Select All' },
      { key: 'targetProgress', type: 'select', label: 'Target Progress:', options: ['Select All'], defaultValue: 'Select All' },
    ],
    columns: [
      { key: 'learner',          label: 'Learner',                    isLink: true },
      { key: 'className',        label: 'Class Name' },
      { key: 'placement',        label: 'Placement' },
      { key: 'targetOtjHours',   label: 'Target OTJ Hours' },
      { key: 'assessorName',     label: 'Assessor Name' },
      { key: 'plannedOtjHours',  label: 'Planned OTJ Hours' },
      { key: 'actualOtjHours',   label: 'Actual OTJ Hours' },
      { key: 'expectedOtjHrs',   label: 'Expected OTJ Hrs (to date)' },
      { key: 'deviation',        label: 'Deviation' },
      { key: 'targetDeviation',  label: 'Target Deviation' },
    ],
    rows: [
      { learner: 'Mr Rakker Joe', className: 'Business Admin', placement: 'Default Placement', targetOtjHours: '0', assessorName: 'Hassan Rakker', plannedOtjHours: '400', actualOtjHours: '77.3', expectedOtjHrs: '206.59', deviation: '-129.29', targetDeviation: '51.92' },
      { learner: 'Mr Rakker Joe', className: 'Business Admin', placement: 'Default Placement', targetOtjHours: '0', assessorName: 'Hassan Rakker', plannedOtjHours: '400', actualOtjHours: '77.3', expectedOtjHrs: '206.59', deviation: '-129.29', targetDeviation: '51.92' },
    ],
    resultsSuffix: '2 - 2 of 1 records',
  },

  /* 9 ── No Off-The-Job Activity */
  'no-otj-activity': {
    title: 'Learners on Target (Off-The-Job)',
    breadcrumb: 'Learners on Target',
    filters: [
      { type: 'select', label: 'Report Groups:', key: 'reportGroup', options: ['Select Report group'], defaultValue: 'Select Report group' },
      { type: 'select', label: 'Tutor:',         key: 'tutor',       options: ['Select All'], defaultValue: 'Select All' },
      { type: 'select', label: 'Cohort:',        key: 'cohort',      options: ['Select All'], defaultValue: 'Select All' },
      { type: 'select', label: 'Workplace:',     key: 'workplace',   options: ['Select All'], defaultValue: 'Select All' },
      { type: 'select', label: 'Status:',        key: 'status',      options: ['Over 4 weeks', '1-2 Weeks', '2-3 Weeks', '3-4 Weeks'], defaultValue: 'Over 4 weeks' },
    ],
    columns: [
      { key: 'learner',             label: 'Learner',                          isLink: true },
      { key: 'uln',                 label: 'ULN' },
      { key: 'mainLearningAim',     label: 'Main Learning Aim' },
      { key: 'learnerStatus',       label: 'Learner Status' },
      { key: 'progressGrade',       label: 'Progress /Grade' },
      { key: 'lastLearningDate',    label: 'Last Learning Activity Date' },
      { key: 'lastActivityPlan',    label: 'Last Learning Activity Plan Date' },
      { key: 'lastProgressReview',  label: 'Last Completed Progress Review Date' },
      { key: 'lastOtjActivity',     label: 'Last OTJ Activity' },
      { key: 'daysSinceOtj',        label: 'Days Since OTJ Activity' },
      { key: 'breakInLearning',     label: 'Break in Learning' },
    ],
    rows: [
      {
        learner: 'Mr Rokker Joe',
        uln: '',
        mainLearningAim: 'Business Administrator Apprenticeship Standard',
        learnerStatus: '01. Active on Target',
        progressGrade: '0%',
        lastLearningDate: '10/02/2025 19:29:09',
        lastActivityPlan: '10/02/2025 00:00:00',
        lastProgressReview: '10/02/2025 20:00:34',
        lastOtjActivity: '08/02/2025 18:15:00',
        daysSinceOtj: '136',
        breakInLearning: 'NO',
      },
    ],
  },
};

/* ─── Component ───────────────────────────────────────────── */
interface Props { slug: string; }

const ReportDetail: React.FC<Props> = ({ slug }) => {
  const router = useRouter();
  const config = REPORT_CONFIGS[slug];
  const [recordsPerPage, setRecordsPerPage] = useState('50');

  /* Build initial filter state from config defaults */
  const initFilters: Record<string, string> = {};
  config?.filters.forEach((f) => { initFilters[f.key] = f.defaultValue ?? ''; });
  const [filters, setFilters] = useState<Record<string, string>>(initFilters);

  if (!config) {
    return (
      <TrainerLayout pageTitle="Reports">
        <DetailContainer>
          <Box sx={{ fontSize: 14, color: '#888', fontFamily: TYPOGRAPHY.fontFamily }}>
            Report not found.
          </Box>
        </DetailContainer>
      </TrainerLayout>
    );
  }

  const { title, columns, rows, resultsSuffix } = config;
  const showCount = resultsSuffix ?? `1 - ${rows.length} of ${rows.length} records`;

  return (
    <TrainerLayout pageTitle={title}>
      <DetailContainer>

        {/* ── Top bar: title + records per page ── */}
        <DetailTopBar>
          <DetailTitle>{title}</DetailTitle>
          <RecordsPerPageBox>
            Records per page:
            <RecordsSelect
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(e.target.value)}
            >
              {['10', '25', '50', '100'].map((v) => <option key={v} value={v}>{v}</option>)}
            </RecordsSelect>
          </RecordsPerPageBox>
        </DetailTopBar>

        {/* ── Select Report Criteria ── */}
        <CriteriaPanel>
          <CriteriaTitle>Select Report Criteria</CriteriaTitle>
          <CriteriaRow>
            {config.filters.map((field) => (
              <CriteriaField key={field.key}>
                <FieldLabel>{field.label}</FieldLabel>
                {field.type === 'date' ? (
                  <DateInput
                    type="date"
                    value={filters[field.key] ?? ''}
                    onChange={(e) => setFilters((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  />
                ) : (
                  <SelectInput
                    value={filters[field.key] ?? ''}
                    onChange={(e) => setFilters((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  >
                    {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </SelectInput>
                )}
              </CriteriaField>
            ))}
            <ApplyButton>Apply</ApplyButton>
          </CriteriaRow>
        </CriteriaPanel>

        {/* ── Results bar ── */}
        <ResultsBar>
          <ResultsCount>Showing {showCount}</ResultsCount>
          <ExportButton>
            <FileUploadOutlined sx={{ fontSize: 16 }} />
            Export
          </ExportButton>
        </ResultsBar>

        {/* ── Table ── */}
        <TableWrapper>
          <TableHead>
            {columns.map((col) => (
              <TableHeadCell key={col.key} sx={{ flex: col.width ? undefined : 1, width: col.width }}>
                {col.label}
              </TableHeadCell>
            ))}
          </TableHead>

          {rows.map((row, ri) => (
            <TableRow key={ri}>
              {columns.map((col) => {
                const val = row[col.key] ?? '';

                /* Progress bars cell */
                if (col.isProgress && val.includes('|')) {
                  const [prog, tgt] = val.split('|').map(Number);
                  return (
                    <TableCell key={col.key} sx={{ flex: 1 }}>
                      <MiniBar progress={prog} target={tgt} />
                    </TableCell>
                  );
                }

                /* Link cell */
                if (col.isLink) {
                  return (
                    <TableLinkCell key={col.key} sx={{ flex: col.width ? undefined : 1, width: col.width }}>
                      {val}
                    </TableLinkCell>
                  );
                }

                /* Deviation — red if negative */
                const isNeg = col.key.toLowerCase().includes('deviation') && val.startsWith('-');

                return (
                  <TableCell
                    key={col.key}
                    sx={{
                      flex: col.width ? undefined : 1,
                      width: col.width,
                      color: isNeg ? '#E53935' : undefined,
                      fontWeight: isNeg ? 600 : undefined,
                    }}
                  >
                    {val}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableWrapper>

      </DetailContainer>
    </TrainerLayout>
  );
};

export default ReportDetail;
