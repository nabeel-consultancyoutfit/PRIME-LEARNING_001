/**
 * Learner — Activity Log page
 * Matches Figma node 235:136907
 */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  InputBase,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

// ─── Styled Components ────────────────────────────────────────────────────────

const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  fontFamily: "'Inter', sans-serif",
});

const PageHeaderRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const BackButton = styled(Box)({
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: '1px solid rgba(28,28,28,0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.05)' },
});

const PageTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

const ContentCard = styled(Box)({
  backgroundColor: '#FFFFFF',
  borderRadius: '16px',
  border: '1px solid rgba(28,28,28,0.1)',
  overflow: 'hidden',
});

const ControlsRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
  gap: '12px',
  flexWrap: 'wrap',
});

const ControlsLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const ControlsRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const ControlLabel = styled(Typography)({
  fontSize: '13px',
  color: 'rgba(28,28,28,0.6)',
  fontFamily: "'Inter', sans-serif",
  whiteSpace: 'nowrap',
});

const StyledSelect = styled(Select)({
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
  height: '32px',
  minWidth: '64px',
  backgroundColor: '#F5F5F5',
  borderRadius: '8px',
  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
  '& .MuiSelect-select': { padding: '4px 8px', paddingRight: '24px !important' },
});

const DateFilterRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 20px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
  flexWrap: 'wrap',
});

const DateInput = styled(InputBase)({
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
  height: '34px',
  padding: '0 10px',
  backgroundColor: '#F5F5F5',
  borderRadius: '8px',
  minWidth: '140px',
  '& input': { padding: 0 },
});

const DateLabel = styled(Typography)({
  fontSize: '13px',
  color: 'rgba(28,28,28,0.6)',
  fontFamily: "'Inter', sans-serif",
  whiteSpace: 'nowrap',
});

const SubmitButton = styled(Box)({
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '20px',
  padding: '6px 20px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '&:hover': { backgroundColor: '#333333' },
});

const StyledTable = styled(Table)({
  borderCollapse: 'collapse',
  width: '100%',
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#F9F9F9',
});

const StyledHeadCell = styled(TableCell)({
  fontSize: '12px',
  fontWeight: 600,
  color: 'rgba(28,28,28,0.5)',
  fontFamily: "'Inter', sans-serif",
  padding: '10px 16px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
  whiteSpace: 'nowrap',
});

const StyledBodyCell = styled(TableCell)({
  fontSize: '13px',
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  padding: '10px 16px',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  verticalAlign: 'middle',
});

const PaginationRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  padding: '16px 20px',
});

const PageBtn = styled(Box)<{ active?: boolean }>(({ active }) => ({
  minWidth: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
  cursor: 'pointer',
  fontWeight: active ? 600 : 400,
  backgroundColor: active ? '#1C1C1C' : 'transparent',
  color: active ? '#FFFFFF' : '#1C1C1C',
  '&:hover': { backgroundColor: active ? '#1C1C1C' : 'rgba(28,28,28,0.06)' },
}));

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface ActivityRow {
  id: string;
  dateTime: string;
  category: string;
  description: string;
  portfolio: string;
  user: string;
}

const MOCK_ACTIVITY_LOG: ActivityRow[] = [
  { id: '1',  dateTime: '17/11/2024 09:12',  category: 'Login',    description: 'User logged into the system',          portfolio: '—', user: 'JDOE62' },
  { id: '2',  dateTime: '17/11/2024 09:14',  category: 'Login',    description: 'Session started',                      portfolio: '—', user: 'JDOE62' },
  { id: '3',  dateTime: '16/11/2024 14:02',  category: 'Login',    description: 'User logged into the system',          portfolio: '—', user: 'JDOE62' },
  { id: '4',  dateTime: '16/11/2024 14:05',  category: 'Login',    description: 'Accessed activity log',                portfolio: '—', user: 'JDOE62' },
  { id: '5',  dateTime: '15/11/2024 10:30',  category: 'Login',    description: 'User logged into the system',          portfolio: '—', user: 'JDOE62' },
  { id: '6',  dateTime: '15/11/2024 10:45',  category: 'Activity', description: 'Submitted learning activity evidence', portfolio: 'Unit 1', user: 'JDOE62' },
  { id: '7',  dateTime: '14/11/2024 08:55',  category: 'Login',    description: 'User logged into the system',          portfolio: '—', user: 'JDOE62' },
  { id: '8',  dateTime: '14/11/2024 09:00',  category: 'Activity', description: 'Completed knowledge check',            portfolio: 'Unit 2', user: 'JDOE62' },
  { id: '9',  dateTime: '13/11/2024 11:20',  category: 'Login',    description: 'User logged into the system',          portfolio: '—', user: 'JDOE62' },
  { id: '10', dateTime: '13/11/2024 11:22',  category: 'Login',    description: 'Viewed dashboard',                     portfolio: '—', user: 'JDOE62' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const ActivityLog: React.FC = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const TOTAL_PAGES = 68;

  const renderPagination = () => {
    const pages: (number | string)[] = [1, 2, 3, '...', 67, 68];
    return pages.map((p, i) =>
      p === '...' ? (
        <PageBtn key={`ellipsis-${i}`} style={{ cursor: 'default' }}>…</PageBtn>
      ) : (
        <PageBtn
          key={p}
          active={currentPage === p}
          onClick={() => setCurrentPage(p as number)}
        >
          {p}
        </PageBtn>
      )
    );
  };

  return (
    <LearnerLayout pageTitle="Activity Log">
      <PageContainer>

        {/* Page Header */}
        <PageHeaderRow>
          <BackButton onClick={() => router.back()}>
            <ArrowBackIcon sx={{ fontSize: '18px', color: '#1C1C1C' }} />
          </BackButton>
          <PageTitle>Activity Log</PageTitle>
        </PageHeaderRow>

        {/* Main Content Card */}
        <ContentCard>

          {/* Controls Row — entries + page selector on left, records per page on right */}
          <ControlsRow>
            <ControlsLeft>
              <ControlLabel>Entries</ControlLabel>
              <StyledSelect
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                variant="outlined"
                size="small"
              >
                {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((n) => (
                  <MenuItem key={n} value={n} sx={{ fontSize: '13px' }}>{n}</MenuItem>
                ))}
              </StyledSelect>
              <ControlLabel>of {TOTAL_PAGES}</ControlLabel>
            </ControlsLeft>

            <ControlsRight>
              <ControlLabel>Records per page:</ControlLabel>
              <StyledSelect
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                variant="outlined"
                size="small"
              >
                {[10, 25, 50, 100].map((n) => (
                  <MenuItem key={n} value={n} sx={{ fontSize: '13px' }}>{n}</MenuItem>
                ))}
              </StyledSelect>
            </ControlsRight>
          </ControlsRow>

          {/* Date Filter Row */}
          <DateFilterRow>
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
            <SubmitButton>Submit</SubmitButton>
          </DateFilterRow>

          {/* Table */}
          <StyledTable>
            <StyledTableHead>
              <TableRow>
                <StyledHeadCell>Date / time</StyledHeadCell>
                <StyledHeadCell>Category</StyledHeadCell>
                <StyledHeadCell>Description</StyledHeadCell>
                <StyledHeadCell>Portfolio</StyledHeadCell>
                <StyledHeadCell>User</StyledHeadCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {MOCK_ACTIVITY_LOG.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:hover': { backgroundColor: 'rgba(28,28,28,0.02)' } }}
                >
                  <StyledBodyCell sx={{ color: 'rgba(28,28,28,0.55)', fontSize: '12px' }}>
                    {row.dateTime}
                  </StyledBodyCell>
                  <StyledBodyCell>{row.category}</StyledBodyCell>
                  <StyledBodyCell>{row.description}</StyledBodyCell>
                  <StyledBodyCell>{row.portfolio}</StyledBodyCell>
                  <StyledBodyCell sx={{ fontWeight: 500 }}>{row.user}</StyledBodyCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>

          {/* Pagination */}
          <PaginationRow>
            {renderPagination()}
          </PaginationRow>

        </ContentCard>
      </PageContainer>
    </LearnerLayout>
  );
};

export default ActivityLog;
