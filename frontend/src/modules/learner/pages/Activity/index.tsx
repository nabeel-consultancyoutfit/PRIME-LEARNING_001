/**
 * Learner — Activity Log page
 * Matches Figma node 235:136907
 * Fetches audit log from /users/me/activity when available.
 */
import React, { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { apiClient } from '@/services/api';

// ─── Styled Components ────────────────────────────────────────────────────────

const PageContainer = styled(Box)({ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif" });
const PageHeaderRow = styled(Box)({ display: 'flex', alignItems: 'center', gap: '12px' });
const BackButton = styled(Box)({
  width: 36, height: 36, borderRadius: '50%',
  border: '1px solid rgba(28,28,28,0.15)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.05)' },
});
const PageTitle = styled(Typography)({ fontSize: '20px', fontWeight: 700, color: '#1C1C1C', fontFamily: "'Inter', sans-serif" });
const ContentCard = styled(Box)({ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(28,28,28,0.1)', overflow: 'hidden' });
const ControlsRow = styled(Box)({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(28,28,28,0.08)', gap: '12px', flexWrap: 'wrap' });
const ControlsLeft = styled(Box)({ display: 'flex', alignItems: 'center', gap: '8px' });
const ControlsRight = styled(Box)({ display: 'flex', alignItems: 'center', gap: '8px' });
const ControlLabel = styled(Typography)({ fontSize: '13px', color: 'rgba(28,28,28,0.6)', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' });
const StyledSelect = styled(Select)({
  fontSize: '13px', fontFamily: "'Inter', sans-serif", height: '32px', minWidth: '64px',
  backgroundColor: '#F5F5F5', borderRadius: '8px',
  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
  '& .MuiSelect-select': { padding: '4px 8px', paddingRight: '24px !important' },
});
const DateFilterRow = styled(Box)({ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderBottom: '1px solid rgba(28,28,28,0.08)', flexWrap: 'wrap' });
const DateInput = styled(InputBase)({ fontSize: '13px', fontFamily: "'Inter', sans-serif", height: '34px', padding: '0 10px', backgroundColor: '#F5F5F5', borderRadius: '8px', minWidth: '140px', '& input': { padding: 0 } });
const DateLabel = styled(Typography)({ fontSize: '13px', color: 'rgba(28,28,28,0.6)', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' });
const SubmitButton = styled(Box)({ backgroundColor: '#1C1C1C', color: '#FFFFFF', fontSize: '13px', fontWeight: 500, fontFamily: "'Inter', sans-serif", borderRadius: '20px', padding: '6px 20px', cursor: 'pointer', whiteSpace: 'nowrap', '&:hover': { backgroundColor: '#333333' } });
const StyledTable = styled(Table)({ borderCollapse: 'collapse', width: '100%' });
const StyledTableHead = styled(TableHead)({ backgroundColor: '#F9F9F9' });
const StyledHeadCell = styled(TableCell)({ fontSize: '12px', fontWeight: 600, color: 'rgba(28,28,28,0.5)', fontFamily: "'Inter', sans-serif", padding: '10px 16px', borderBottom: '1px solid rgba(28,28,28,0.08)', whiteSpace: 'nowrap' });
const StyledBodyCell = styled(TableCell)({ fontSize: '13px', color: '#1C1C1C', fontFamily: "'Inter', sans-serif", padding: '10px 16px', borderBottom: '1px solid rgba(28,28,28,0.06)', verticalAlign: 'middle' });
const PaginationRow = styled(Box)({ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '16px 20px' });
const PageBtn = styled(Box)<{ active?: boolean }>(({ active }) => ({
  minWidth: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: '8px', fontSize: '13px', fontFamily: "'Inter', sans-serif", cursor: 'pointer',
  fontWeight: active ? 600 : 400,
  backgroundColor: active ? '#1C1C1C' : 'transparent',
  color: active ? '#FFFFFF' : '#1C1C1C',
  '&:hover': { backgroundColor: active ? '#1C1C1C' : 'rgba(28,28,28,0.06)' },
}));

interface ActivityRow {
  id: string;
  dateTime: string;
  category: string;
  description: string;
  portfolio: string;
  user: string;
}

function formatDateTime(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

const ActivityLog: React.FC = () => {
  const router = useRouter();
  const [rows, setRows] = useState<ActivityRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const qs = new URLSearchParams({ page: String(currentPage), pageSize: String(pageSize) });
        if (dateFrom) qs.set('dateFrom', dateFrom);
        if (dateTo) qs.set('dateTo', dateTo);
        const res = await apiClient.get<any>(`/users/me/activity?${qs}`);
        const list: any[] = Array.isArray(res) ? res : (res as any)?.data ?? [];
        setTotalPages((res as any)?.meta?.totalPages ?? 1);
        setRows(list.map((r: any, i: number) => ({
          id: r._id ?? String(i),
          dateTime: r.createdAt ? formatDateTime(r.createdAt) : '—',
          category: r.category ?? r.action ?? 'Activity',
          description: r.description ?? r.details ?? '—',
          portfolio: r.portfolio ?? '—',
          user: r.username ?? r.email ?? '—',
        })));
      } catch {
        setRows([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPage, pageSize, dateFrom, dateTo]);

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages: (number | string)[] = totalPages <= 5
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : [1, 2, 3, '...', totalPages - 1, totalPages];
    return pages.map((p, i) =>
      p === '...' ? (
        <PageBtn key={`ellipsis-${i}`} style={{ cursor: 'default' }}>…</PageBtn>
      ) : (
        <PageBtn key={p} active={currentPage === p} onClick={() => setCurrentPage(p as number)}>
          {p}
        </PageBtn>
      )
    );
  };

  return (
    <LearnerLayout pageTitle="Activity Log">
      <PageContainer>
        <PageHeaderRow>
          <BackButton onClick={() => router.back()}>
            <ArrowBackIcon sx={{ fontSize: '18px', color: '#1C1C1C' }} />
          </BackButton>
          <PageTitle>Activity Log</PageTitle>
        </PageHeaderRow>

        <ContentCard>
          <ControlsRow>
            <ControlsLeft>
              <ControlLabel>Entries</ControlLabel>
              <StyledSelect value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))} variant="outlined" size="small">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <MenuItem key={n} value={n} sx={{ fontSize: '13px' }}>{n}</MenuItem>
                ))}
              </StyledSelect>
              <ControlLabel>of {totalPages}</ControlLabel>
            </ControlsLeft>
            <ControlsRight>
              <ControlLabel>Records per page:</ControlLabel>
              <StyledSelect value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} variant="outlined" size="small">
                {[10, 25, 50, 100].map((n) => (
                  <MenuItem key={n} value={n} sx={{ fontSize: '13px' }}>{n}</MenuItem>
                ))}
              </StyledSelect>
            </ControlsRight>
          </ControlsRow>

          <DateFilterRow>
            <DateLabel>Date From:</DateLabel>
            <DateInput type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            <DateLabel>Date To:</DateLabel>
            <DateInput type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            <SubmitButton onClick={() => setCurrentPage(1)}>Submit</SubmitButton>
          </DateFilterRow>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <CircularProgress size={28} sx={{ color: '#7B61FF' }} />
            </Box>
          ) : rows.length === 0 ? (
            <Box sx={{ padding: '40px 20px', textAlign: 'center', color: 'rgba(28,28,28,0.4)', fontSize: '13px', fontFamily: "'Inter', sans-serif" }}>
              No activity records found.
            </Box>
          ) : (
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
                {rows.map((row) => (
                  <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: 'rgba(28,28,28,0.02)' } }}>
                    <StyledBodyCell sx={{ color: 'rgba(28,28,28,0.55)', fontSize: '12px' }}>{row.dateTime}</StyledBodyCell>
                    <StyledBodyCell>{row.category}</StyledBodyCell>
                    <StyledBodyCell>{row.description}</StyledBodyCell>
                    <StyledBodyCell>{row.portfolio}</StyledBodyCell>
                    <StyledBodyCell sx={{ fontWeight: 500 }}>{row.user}</StyledBodyCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
          )}

          {totalPages > 1 && (
            <PaginationRow>{renderPagination()}</PaginationRow>
          )}
        </ContentCard>
      </PageContainer>
    </LearnerLayout>
  );
};

export default ActivityLog;
