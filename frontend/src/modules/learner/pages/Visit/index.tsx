/**
 * Visits Page
 * Pixel-perfect to Figma 40000068:37673
 */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, styled } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

// ─── Styled ───────────────────────────────────────────────────────────────────

const PageWrapper = styled(Box)({ display: 'flex', flexDirection: 'column', gap: '20px' });

const PageHeaderRow = styled(Box)({ display: 'flex', alignItems: 'center', gap: '10px' });

const BackBtn = styled(Box)({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#1C1C1C',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});

const PageTitle = styled(Typography)({
  fontSize: '22px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

const MainCard = styled(Box)({
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
});

const CardHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'rgba(28,28,28,0.04)',
  padding: '13px 20px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
});

const CardHeaderTitle = styled(Typography)({
  fontSize: '15px',
  fontWeight: 600,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

const ScheduleBtn = styled(Box)({
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '8px',
  padding: '7px 16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
});

const FiltersRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 20px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
  flexWrap: 'wrap',
});

const FilterLabel = styled(Typography)({
  fontSize: '13px',
  fontWeight: 500,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  whiteSpace: 'nowrap',
});

const DateInput = styled('input')({
  border: '1px solid rgba(28,28,28,0.2)',
  borderRadius: '6px',
  padding: '5px 10px',
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
  color: '#1C1C1C',
  outline: 'none',
  cursor: 'pointer',
  '&:focus': { borderColor: '#1C1C1C' },
});

const VisitTypeSelect = styled('select')({
  border: '1px solid rgba(28,28,28,0.2)',
  borderRadius: '6px',
  padding: '5px 24px 5px 10px',
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
  color: '#1C1C1C',
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  outline: 'none',
  appearance: 'auto',
  '&:focus': { borderColor: '#1C1C1C' },
});

// Table
const TableWrapper = styled(Box)({ width: '100%', overflowX: 'auto' });

const Table = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: "'Inter', sans-serif",
});

const THead = styled('thead')({
  backgroundColor: '#FAFAFA',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
});

const TH = styled('th')({
  padding: '10px 20px',
  fontSize: '12px',
  fontWeight: 600,
  color: 'rgba(28,28,28,0.45)',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  fontFamily: "'Inter', sans-serif",
});

const TR = styled('tr')({
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  '&:last-child': { borderBottom: 'none' },
});

const TD = styled('td')({
  padding: '14px 20px',
  fontSize: '13px',
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  verticalAlign: 'middle',
});

const ActivityLink = styled('a')({
  color: '#4A90D9',
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': { textDecoration: 'underline' },
});

// ─── Mock data ─────────────────────────────────────────────────────────────────

const VISIT_TYPE_OPTIONS = ['Face to face', 'Remote', 'Phone call', 'Online'];

interface VisitRow {
  id: string;
  dateTime: string;
  location: string;
  plannedActivity: string;
  plannedActivityLink?: boolean;
  actualActivity: string;
}

const MOCK_VISITS: VisitRow[] = [
  {
    id: '1',
    dateTime: '27/02/2025 00:00 - 00:00',
    location: 'Remote',
    plannedActivity: 'Progress Review',
    plannedActivityLink: true,
    actualActivity: '',
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

const Visit: React.FC = () => {
  const router = useRouter();
  const [dateFrom, setDateFrom] = useState('2025-12-12');
  const [dateTo, setDateTo] = useState('2025-12-18');
  const [visitType, setVisitType] = useState('Face to face');

  return (
    <LearnerLayout pageTitle="Visits">
      <PageWrapper>

        {/* Page header */}
        <PageHeaderRow>
          <BackBtn onClick={() => router.back()}>
            <ArrowBackIos sx={{ fontSize: '12px', color: '#fff', ml: '3px' }} />
          </BackBtn>
          <PageTitle>Visits</PageTitle>
        </PageHeaderRow>

        {/* Schedules card */}
        <MainCard>
          <CardHeader>
            <CardHeaderTitle>Schedules</CardHeaderTitle>
            <ScheduleBtn>
              Schedule an Appointment +
            </ScheduleBtn>
          </CardHeader>

          {/* Filters */}
          <FiltersRow>
            <FilterLabel>Date From:</FilterLabel>
            <DateInput
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <FilterLabel>Date To:</FilterLabel>
            <DateInput
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
            <FilterLabel>Visit Type:</FilterLabel>
            <VisitTypeSelect
              value={visitType}
              onChange={(e) => setVisitType(e.target.value)}
            >
              {VISIT_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </VisitTypeSelect>
          </FiltersRow>

          {/* Table */}
          <TableWrapper>
            <Table>
              <THead>
                <tr>
                  <TH>Date/ Time</TH>
                  <TH>Location</TH>
                  <TH>Planned Activities</TH>
                  <TH>Actual Activities</TH>
                </tr>
              </THead>
              <tbody>
                {MOCK_VISITS.length === 0 ? (
                  <TR>
                    <TD colSpan={4} style={{ textAlign: 'center', color: 'rgba(28,28,28,0.4)', padding: '40px' }}>
                      No visits scheduled.
                    </TD>
                  </TR>
                ) : (
                  MOCK_VISITS.map((row) => (
                    <TR key={row.id}>
                      <TD>{row.dateTime}</TD>
                      <TD>{row.location}</TD>
                      <TD>
                        {row.plannedActivityLink ? (
                          <ActivityLink>{row.plannedActivity}</ActivityLink>
                        ) : (
                          row.plannedActivity
                        )}
                      </TD>
                      <TD>{row.actualActivity}</TD>
                    </TR>
                  ))
                )}
              </tbody>
            </Table>
          </TableWrapper>
        </MainCard>

      </PageWrapper>
    </LearnerLayout>
  );
};

export default Visit;
