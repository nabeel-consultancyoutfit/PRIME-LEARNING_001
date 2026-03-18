/**
 * Timesheets Page
 * Pixel-perfect to Figma node 40000068:36076
 */
import React, { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { useRouter } from 'next/router';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

/* ─── Styled Components ─── */

const PageWrapper = styled(Box)({ display: 'flex', flexDirection: 'column', gap: '24px' });

const PageHeader = styled(Box)({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' });

const HeaderLeft = styled(Box)({ display: 'flex', alignItems: 'center', gap: '10px' });

const BackButton = styled(Box)({
  width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1C1C1C',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});

const PageTitle = styled(Typography)({
  fontSize: '22px', fontWeight: 700, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

const ExportBtn = styled(Box)({
  backgroundColor: '#1C1C1C', color: '#fff', borderRadius: '8px',
  padding: '8px 18px', fontSize: '13px', fontWeight: 600,
  fontFamily: "'Inter', sans-serif", cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
});

const Card = styled(Box)({
  backgroundColor: '#FFFFFF', border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '12px', overflow: 'hidden',
});

const SectionHeader = styled(Box)({
  backgroundColor: 'rgba(28,28,28,0.04)', padding: '14px 20px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
});

const SectionTitle = styled(Typography)({
  fontSize: '15px', fontWeight: 600, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

/* Off The Job metrics row */
const MetricsRow = styled(Box)({
  display: 'flex', padding: '16px 20px', flexWrap: 'wrap', gap: '12px',
});

const MetricCard = styled(Box)({
  backgroundColor: '#FAFAFA', border: '1px solid rgba(28,28,28,0.08)',
  borderRadius: '8px', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '4px',
  minWidth: '120px', flex: '1 1 auto',
});

const MetricLabel = styled(Typography)({
  fontSize: '12px', fontWeight: 500, color: 'rgba(28,28,28,0.5)', fontFamily: "'Inter', sans-serif",
  lineHeight: 1.3,
});

const MetricValue = styled(Typography)({
  fontSize: '14px', fontWeight: 700, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

/* Filters row */
const FiltersRow = styled(Box)({
  display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
  borderBottom: '1px solid rgba(28,28,28,0.08)', flexWrap: 'wrap',
});

const FilterLabel = styled(Typography)({
  fontSize: '13px', fontWeight: 500, color: '#1C1C1C', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap',
});

const DateInput = styled('input')({
  border: '1px solid rgba(28,28,28,0.2)', borderRadius: '6px', padding: '5px 8px',
  fontSize: '13px', fontFamily: "'Inter', sans-serif", color: '#1C1C1C', outline: 'none',
  '&:focus': { borderColor: '#1C1C1C' },
});

const SubmitBtn = styled(Box)({
  backgroundColor: '#1C1C1C', color: '#fff', borderRadius: '6px',
  padding: '6px 18px', fontSize: '13px', fontWeight: 600,
  fontFamily: "'Inter', sans-serif", cursor: 'pointer',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
});

/* Timesheets table */
const Table = styled(Box)({ width: '100%' });

const TSTableHead = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 140px 140px',
  padding: '10px 20px', backgroundColor: '#FAFAFA',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
});

const TSTableRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 140px 140px',
  padding: '14px 20px', alignItems: 'center',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  '&:last-child': { borderBottom: 'none' },
});

const TableHeadCell = styled(Typography)({
  fontSize: '12px', fontWeight: 600, color: 'rgba(28,28,28,0.5)', fontFamily: "'Inter', sans-serif",
});

const TableCell = styled(Typography)({
  fontSize: '13px', color: '#1C1C1C', fontFamily: "'Inter', sans-serif", lineHeight: 1.4,
});

/* Entries section */
const EntriesHeader = styled(Box)({
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  backgroundColor: 'rgba(28,28,28,0.04)', padding: '12px 20px',
  borderBottom: '1px solid rgba(28,28,28,0.08)', flexWrap: 'wrap', gap: '8px',
});

const EntriesHeaderLeft = styled(Box)({ display: 'flex', alignItems: 'center', gap: '8px' });

const EntriesHeaderRight = styled(Box)({ display: 'flex', alignItems: 'center', gap: '8px' });

const EntHeaderLabel = styled(Typography)({
  fontSize: '14px', fontWeight: 600, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

const PageSelect = styled('select')({
  border: '1px solid rgba(28,28,28,0.2)', borderRadius: '6px', padding: '4px 8px',
  fontSize: '13px', fontFamily: "'Inter', sans-serif", color: '#1C1C1C', cursor: 'pointer',
  outline: 'none', backgroundColor: '#fff',
});

const EntTableHead = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '100px 110px 110px 100px 100px 1fr 90px 70px 120px',
  padding: '10px 20px', backgroundColor: '#FAFAFA',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
});

const EntTableRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '100px 110px 110px 100px 100px 1fr 90px 70px 120px',
  padding: '12px 20px', alignItems: 'center',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  '&:last-child': { borderBottom: 'none' },
});

const ActionBtns = styled(Box)({ display: 'flex', gap: '6px' });

const EditBtn = styled(Box)({
  backgroundColor: '#1C1C1C', color: '#fff', borderRadius: '6px',
  padding: '4px 12px', fontSize: '12px', fontWeight: 600,
  fontFamily: "'Inter', sans-serif", cursor: 'pointer',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});

const DeleteBtn = styled(Box)({
  backgroundColor: '#D32F2F', color: '#fff', borderRadius: '6px',
  padding: '4px 12px', fontSize: '12px', fontWeight: 600,
  fontFamily: "'Inter', sans-serif", cursor: 'pointer',
  '&:hover': { backgroundColor: '#B71C1C' },
});

const CheckIcon = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="rgba(28,28,28,0.3)" strokeWidth="1.5" />
      <path d="M6 10l2.5 2.5L14 7.5" stroke="rgba(28,28,28,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Box>
);

/* ─── Data ─── */

const OTJ_METRICS = [
  { label: 'Planned OTJ (Hrs):', value: 'Not Set' },
  { label: 'Actual OTJ (Hrs):', value: 'Not Set' },
  { label: '% of Planned OTJ:', value: 'Not Set' },
  { label: 'Last OTJ Activity:', value: 'Not Set' },
  { label: 'Expected OTJ To Date (Hrs):', value: 'Not Set' },
  { label: 'Duration (Wks):', value: 'Not Set' },
  { label: 'Minimum OTJ (Hrs):', value: 'Not Set' },
];

const TS_ROWS = [
  { id: 1, category: 'Classroom delivery', offTheJob: '37h 3m', total: '37h 3m' },
  { id: 2, category: 'Competition', offTheJob: '40h 17m', total: '40h 17m' },
  { id: 3, category: 'Learning Activity(Assignment)', offTheJob: 'None', total: '30m' },
];

const ENTRY_ROWS = [
  { id: 1, spentBy: 'John Doe', recordedBy: 'John Doe', category: 'Classroom delivery', dateFrom: '07/02/25 08:15', dateTo: '08/02/25 18:15', description: 'Lorem ipsum is a dummy text commonly used in graphic design', time: 2040 },
  { id: 2, spentBy: 'John Doe', recordedBy: 'John Doe', category: 'Learning Activity', dateFrom: '07/02/25 08:15', dateTo: '08/02/25 18:15', description: 'Lorem ipsum', time: 2040 },
  { id: 3, spentBy: 'John Doe', recordedBy: 'John Doe', category: 'Competition', dateFrom: '07/02/25 08:15', dateTo: '08/02/25 18:15', description: 'Title', time: 2040 },
  { id: 4, spentBy: 'John Doe', recordedBy: 'John Doe', category: 'Classroom delivery', dateFrom: '07/02/25 08:15', dateTo: '08/02/25 18:15', description: 'UI Design', time: 2040 },
];

/* ─── Component ─── */

const Timesheets: React.FC = () => {
  const router = useRouter();
  const [tsDateFrom, setTsDateFrom] = useState('2025-12-12');
  const [tsDateTo, setTsDateTo] = useState('2025-12-18');
  const [entDateFrom, setEntDateFrom] = useState('2025-12-12');
  const [entDateTo, setEntDateTo] = useState('2025-12-18');

  return (
    <LearnerLayout pageTitle="Timesheets">
      <PageWrapper>

        {/* Header */}
        <PageHeader>
          <HeaderLeft>
            <BackButton onClick={() => router.back()}>
              <ArrowBackIos sx={{ fontSize: '12px', color: '#fff', ml: '4px' }} />
            </BackButton>
            <PageTitle>Timesheets</PageTitle>
          </HeaderLeft>
          <ExportBtn>
            Export
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ExportBtn>
        </PageHeader>

        {/* Off The Job */}
        <Card>
          <SectionHeader>
            <SectionTitle>Off The Job</SectionTitle>
          </SectionHeader>
          <MetricsRow>
            {OTJ_METRICS.map((m) => (
              <MetricCard key={m.label}>
                <MetricLabel>{m.label}</MetricLabel>
                <MetricValue>{m.value}</MetricValue>
              </MetricCard>
            ))}
          </MetricsRow>
        </Card>

        {/* Timesheets */}
        <Card>
          <SectionHeader>
            <SectionTitle>Timesheets</SectionTitle>
          </SectionHeader>

          <FiltersRow>
            <FilterLabel>Date From:</FilterLabel>
            <DateInput type="date" value={tsDateFrom} onChange={(e) => setTsDateFrom(e.target.value)} />
            <FilterLabel>Date To:</FilterLabel>
            <DateInput type="date" value={tsDateTo} onChange={(e) => setTsDateTo(e.target.value)} />
            <SubmitBtn>Submit</SubmitBtn>
          </FiltersRow>

          <Table>
            <TSTableHead>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Off-the-job</TableHeadCell>
              <TableHeadCell>Total</TableHeadCell>
            </TSTableHead>
            {TS_ROWS.map((row) => (
              <TSTableRow key={row.id}>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.offTheJob}</TableCell>
                <TableCell>{row.total}</TableCell>
              </TSTableRow>
            ))}
          </Table>
        </Card>

        {/* Entries */}
        <Card>
          <EntriesHeader>
            <EntriesHeaderLeft>
              <EntHeaderLabel>Entries</EntHeaderLabel>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Typography sx={{ fontSize: '13px', color: 'rgba(28,28,28,0.6)', fontFamily: "'Inter', sans-serif" }}>
                  Page number:
                </Typography>
                <PageSelect defaultValue="1">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </PageSelect>
              </Box>
            </EntriesHeaderLeft>
            <EntriesHeaderRight>
              <Typography sx={{ fontSize: '13px', color: 'rgba(28,28,28,0.6)', fontFamily: "'Inter', sans-serif" }}>
                Records per page:
              </Typography>
              <PageSelect defaultValue="50">
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </PageSelect>
            </EntriesHeaderRight>
          </EntriesHeader>

          <FiltersRow>
            <FilterLabel>Date From:</FilterLabel>
            <DateInput type="date" value={entDateFrom} onChange={(e) => setEntDateFrom(e.target.value)} />
            <FilterLabel>Date To:</FilterLabel>
            <DateInput type="date" value={entDateTo} onChange={(e) => setEntDateTo(e.target.value)} />
            <SubmitBtn>Submit</SubmitBtn>
          </FiltersRow>

          <Table>
            <EntTableHead>
              <TableHeadCell>Spent by</TableHeadCell>
              <TableHeadCell>Recorded by</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Date from</TableHeadCell>
              <TableHeadCell>Date to</TableHeadCell>
              <TableHeadCell>Description</TableHeadCell>
              <TableHeadCell>Time (minutes)</TableHeadCell>
              <TableHeadCell>Off-the-job</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </EntTableHead>
            {ENTRY_ROWS.map((row) => (
              <EntTableRow key={row.id}>
                <TableCell>{row.spentBy}</TableCell>
                <TableCell>{row.recordedBy}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.dateFrom}</TableCell>
                <TableCell>{row.dateTo}</TableCell>
                <TableCell sx={{ pr: '8px', lineHeight: 1.35 }}>{row.description}</TableCell>
                <TableCell>{row.time}</TableCell>
                <CheckIcon />
                <ActionBtns>
                  <EditBtn>Edit</EditBtn>
                  <DeleteBtn>Delete</DeleteBtn>
                </ActionBtns>
              </EntTableRow>
            ))}
          </Table>
        </Card>

      </PageWrapper>
    </LearnerLayout>
  );
};

export default Timesheets;
