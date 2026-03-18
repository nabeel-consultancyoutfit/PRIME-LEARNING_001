/**
 * Learner Feedback from Teach Sessions
 * Pixel-perfect to Figma node 40000068:38140
 */
import React, { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { useRouter } from 'next/router';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

/* ─── Styled ─── */

const PageWrapper = styled(Box)({ display: 'flex', flexDirection: 'column', gap: '20px' });

const PageHeader = styled(Box)({ display: 'flex', alignItems: 'center', gap: '10px' });

const BackButton = styled(Box)({
  width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1C1C1C',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});

const PageTitle = styled(Typography)({
  fontSize: '22px', fontWeight: 700, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

const Card = styled(Box)({
  backgroundColor: '#FFFFFF', border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '12px', overflow: 'hidden',
});

const InstancesHeader = styled(Box)({
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  backgroundColor: 'rgba(28,28,28,0.04)', padding: '14px 20px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
});

const InstancesTitle = styled(Typography)({
  fontSize: '15px', fontWeight: 600, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

const CreateBtn = styled(Box)({
  backgroundColor: '#1C1C1C', color: '#fff', borderRadius: '8px',
  padding: '8px 16px', fontSize: '13px', fontWeight: 600,
  fontFamily: "'Inter', sans-serif", cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
});

const FiltersRow = styled(Box)({
  display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 20px',
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

const FormSelect = styled(Box)({
  display: 'inline-flex', alignItems: 'center', gap: '6px',
  border: '1px solid rgba(28,28,28,0.2)', borderRadius: '6px', padding: '5px 10px',
  fontSize: '13px', fontFamily: "'Inter', sans-serif", color: '#1C1C1C', cursor: 'pointer',
});

/* Table */
const Table = styled(Box)({ width: '100%' });

const TableHead = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '200px 130px 1fr 130px 140px 90px 80px',
  padding: '10px 20px', backgroundColor: '#FAFAFA',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
});

const TableHeadCell = styled(Typography)({
  fontSize: '12px', fontWeight: 600, color: 'rgba(28,28,28,0.5)',
  fontFamily: "'Inter', sans-serif",
});

const TableRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '200px 130px 1fr 130px 140px 90px 80px',
  padding: '14px 20px', alignItems: 'center',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  '&:last-child': { borderBottom: 'none' },
});

const TableCell = styled(Typography)({
  fontSize: '13px', color: '#1C1C1C', fontFamily: "'Inter', sans-serif", lineHeight: 1.4,
});

const OpenBtn = styled(Box)({
  backgroundColor: '#1C1C1C', color: '#fff', borderRadius: '6px',
  padding: '5px 14px', fontSize: '12px', fontWeight: 600,
  fontFamily: "'Inter', sans-serif", cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});

const Checkbox = styled('input')({ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#1C1C1C' });

/* ─── Data ─── */

const ROWS = [
  { id: 1, formName: 'Learner feedback from teach sessions', learner: 'John Doe', instance: 'John doe - Learner feedback from teach sessions - 11/02/2025', created: '07/02/25 08:15', modified: '08/02/25 18:15' },
  { id: 2, formName: 'Learner feedback from teach sessions', learner: 'John Doe', instance: 'John doe - Learner feedback from teach sessions - 11/02/2025', created: '07/02/25 08:15', modified: '08/02/25 18:15' },
  { id: 3, formName: 'Learner feedback from teach sessions', learner: 'John Doe', instance: 'John doe - Learner feedback from teach sessions - 11/02/2025', created: '07/02/25 08:15', modified: '08/02/25 18:15' },
  { id: 4, formName: 'Learner feedback from teach sessions', learner: 'John Doe', instance: 'John doe - Learner feedback from teach sessions - 11/02/2025', created: '07/02/25 08:15', modified: '08/02/25 18:15' },
];

/* ─── Component ─── */

const LearnerFeedback: React.FC = () => {
  const router = useRouter();
  const [dateFrom, setDateFrom] = useState('2025-12-12');
  const [dateTo, setDateTo] = useState('2025-12-18');

  return (
    <LearnerLayout pageTitle="Learner Feedback">
      <PageWrapper>
        <PageHeader>
          <BackButton onClick={() => router.back()}>
            <ArrowBackIos sx={{ fontSize: '12px', color: '#fff', ml: '4px' }} />
          </BackButton>
          <PageTitle>Learner feedback from teach sessions</PageTitle>
        </PageHeader>

        <Card>
          {/* Header */}
          <InstancesHeader>
            <InstancesTitle>Instances</InstancesTitle>
            <CreateBtn onClick={() => router.push('/learner-dashboard/learner-feedback-create')}>
              Create New Instances +
            </CreateBtn>
          </InstancesHeader>

          {/* Filters */}
          <FiltersRow>
            <FilterLabel>Date From:</FilterLabel>
            <DateInput type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            <FilterLabel>Date To:</FilterLabel>
            <DateInput type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            <FilterLabel>Form:</FilterLabel>
            <FormSelect>
              Learner feedback from teach sessions
              <Box component="span" sx={{ fontSize: '12px', color: 'rgba(28,28,28,0.5)' }}>▾</Box>
            </FormSelect>
          </FiltersRow>

          {/* Table */}
          <Table>
            <TableHead>
              <TableHeadCell>Form Name</TableHeadCell>
              <TableHeadCell>Learner Name</TableHeadCell>
              <TableHeadCell>Instance Name</TableHeadCell>
              <TableHeadCell>Date Created</TableHeadCell>
              <TableHeadCell>Date Modified</TableHeadCell>
              <TableHeadCell>Signatures</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableHead>

            {ROWS.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.formName}</TableCell>
                <TableCell>{row.learner}</TableCell>
                <TableCell>{row.instance}</TableCell>
                <TableCell>{row.created}</TableCell>
                <TableCell>{row.modified}</TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox type="checkbox" />
                </Box>
                <Box>
                  <OpenBtn onClick={() => router.push('/learner-dashboard/learner-feedback-create')}>
                    Open
                  </OpenBtn>
                </Box>
              </TableRow>
            ))}
          </Table>
        </Card>
      </PageWrapper>
    </LearnerLayout>
  );
};

export default LearnerFeedback;
