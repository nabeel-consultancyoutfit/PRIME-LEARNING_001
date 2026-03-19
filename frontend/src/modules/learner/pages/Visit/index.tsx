/**
 * Visits Page — fetches scheduled visits from /learners/me/visits
 * Pixel-perfect to Figma 40000068:37673
 */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, CircularProgress, styled } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { apiClient } from '@/services/api';

// ─── Styled ───────────────────────────────────────────────────────────────────

const PageWrapper = styled(Box)({ display: 'flex', flexDirection: 'column', gap: '20px' });
const PageHeaderRow = styled(Box)({ display: 'flex', alignItems: 'center', gap: '10px' });
const BackBtn = styled(Box)({
  width: '32px', height: '32px', borderRadius: '50%',
  backgroundColor: '#1C1C1C', display: 'flex', alignItems: 'center',
  justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});
const PageTitle = styled(Typography)({ fontSize: '22px', fontWeight: 700, color: '#1C1C1C', fontFamily: "'Inter', sans-serif" });
const MainCard = styled(Box)({ backgroundColor: '#FFFFFF', border: '1px solid rgba(28,28,28,0.1)', borderRadius: '12px', overflow: 'hidden' });
const CardHeader = styled(Box)({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(28,28,28,0.04)', padding: '13px 20px', borderBottom: '1px solid rgba(28,28,28,0.08)' });
const CardHeaderTitle = styled(Typography)({ fontSize: '15px', fontWeight: 600, color: '#1C1C1C', fontFamily: "'Inter', sans-serif" });
const ScheduleBtn = styled(Box)({ backgroundColor: '#1C1C1C', color: '#FFFFFF', fontSize: '13px', fontWeight: 600, fontFamily: "'Inter', sans-serif", borderRadius: '8px', padding: '7px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' } });
const FiltersRow = styled(Box)({ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', borderBottom: '1px solid rgba(28,28,28,0.08)', flexWrap: 'wrap' });
const FilterLabel = styled(Typography)({ fontSize: '13px', fontWeight: 500, color: '#1C1C1C', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' });
const DateInput = styled('input')({ border: '1px solid rgba(28,28,28,0.2)', borderRadius: '6px', padding: '5px 10px', fontSize: '13px', fontFamily: "'Inter', sans-serif", color: '#1C1C1C', outline: 'none', cursor: 'pointer', '&:focus': { borderColor: '#1C1C1C' } });
const VisitTypeSelect = styled('select')({ border: '1px solid rgba(28,28,28,0.2)', borderRadius: '6px', padding: '5px 24px 5px 10px', fontSize: '13px', fontFamily: "'Inter', sans-serif", color: '#1C1C1C', backgroundColor: '#FFFFFF', cursor: 'pointer', outline: 'none', appearance: 'auto', '&:focus': { borderColor: '#1C1C1C' } });
const TableWrapper = styled(Box)({ width: '100%', overflowX: 'auto' });
const StyledTable = styled('table')({ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif" });
const THead = styled('thead')({ backgroundColor: '#FAFAFA', borderBottom: '1px solid rgba(28,28,28,0.08)' });
const TH = styled('th')({ padding: '10px 20px', fontSize: '12px', fontWeight: 600, color: 'rgba(28,28,28,0.45)', textAlign: 'left', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" });
const TR = styled('tr')({ borderBottom: '1px solid rgba(28,28,28,0.06)', '&:last-child': { borderBottom: 'none' } });
const TD = styled('td')({ padding: '14px 20px', fontSize: '13px', color: '#1C1C1C', fontFamily: "'Inter', sans-serif", verticalAlign: 'middle' });
const ActivityLink = styled('a')({ color: '#4A90D9', fontSize: '13px', fontFamily: "'Inter', sans-serif", textDecoration: 'none', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } });

const VISIT_TYPE_OPTIONS = ['Face to face', 'Remote', 'Phone call', 'Online'];

interface VisitRow {
  id: string;
  dateTime: string;
  location: string;
  plannedActivity: string;
  plannedActivityLink?: boolean;
  actualActivity: string;
}

function formatVisitDateTime(dateStr: string | undefined): string {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

const Visit: React.FC = () => {
  const router = useRouter();
  const [visits, setVisits] = useState<VisitRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [visitType, setVisitType] = useState('Face to face');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const qs = new URLSearchParams();
        if (dateFrom) qs.set('dateFrom', dateFrom);
        if (dateTo) qs.set('dateTo', dateTo);
        if (visitType) qs.set('type', visitType);
        const res = await apiClient.get<any>(`/learners/me/visits?${qs}`);
        const list: any[] = Array.isArray(res) ? res : (res as any)?.data ?? [];
        setVisits(list.map((v: any) => ({
          id: v._id ?? String(Math.random()),
          dateTime: `${formatVisitDateTime(v.scheduledAt)} — ${formatVisitDateTime(v.endAt)}`,
          location: v.location ?? v.type ?? '—',
          plannedActivity: v.plannedActivity ?? v.title ?? '—',
          plannedActivityLink: !!v.plannedActivityUrl,
          actualActivity: v.actualActivity ?? '',
        })));
      } catch {
        setVisits([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dateFrom, dateTo, visitType]);

  return (
    <LearnerLayout pageTitle="Visits">
      <PageWrapper>
        <PageHeaderRow>
          <BackBtn onClick={() => router.back()}>
            <ArrowBackIos sx={{ fontSize: '12px', color: '#fff', ml: '3px' }} />
          </BackBtn>
          <PageTitle>Visits</PageTitle>
        </PageHeaderRow>

        <MainCard>
          <CardHeader>
            <CardHeaderTitle>Schedules</CardHeaderTitle>
            <ScheduleBtn>Schedule an Appointment +</ScheduleBtn>
          </CardHeader>

          <FiltersRow>
            <FilterLabel>Date From:</FilterLabel>
            <DateInput type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            <FilterLabel>Date To:</FilterLabel>
            <DateInput type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            <FilterLabel>Visit Type:</FilterLabel>
            <VisitTypeSelect value={visitType} onChange={(e) => setVisitType(e.target.value)}>
              {VISIT_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </VisitTypeSelect>
          </FiltersRow>

          <TableWrapper>
            <StyledTable>
              <THead>
                <tr>
                  <TH>Date / Time</TH>
                  <TH>Location</TH>
                  <TH>Planned Activities</TH>
                  <TH>Actual Activities</TH>
                </tr>
              </THead>
              <tbody>
                {isLoading ? (
                  <TR>
                    <TD colSpan={4} style={{ textAlign: 'center', padding: '40px' }}>
                      <CircularProgress size={24} sx={{ color: '#7B61FF' }} />
                    </TD>
                  </TR>
                ) : visits.length === 0 ? (
                  <TR>
                    <TD colSpan={4} style={{ textAlign: 'center', color: 'rgba(28,28,28,0.4)', padding: '40px' }}>
                      No visits scheduled.
                    </TD>
                  </TR>
                ) : (
                  visits.map((row) => (
                    <TR key={row.id}>
                      <TD>{row.dateTime}</TD>
                      <TD>{row.location}</TD>
                      <TD>
                        {row.plannedActivityLink
                          ? <ActivityLink>{row.plannedActivity}</ActivityLink>
                          : row.plannedActivity}
                      </TD>
                      <TD>{row.actualActivity || '—'}</TD>
                    </TR>
                  ))
                )}
              </tbody>
            </StyledTable>
          </TableWrapper>
        </MainCard>
      </PageWrapper>
    </LearnerLayout>
  );
};

export default Visit;
