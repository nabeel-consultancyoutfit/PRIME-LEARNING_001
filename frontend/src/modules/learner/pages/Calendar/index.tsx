/**
 * Calendar Page — Full view
 * Pixel-perfect to Figma node 40000068:34660
 */
import React, { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import {
  ArrowBackIos,
  NavigateBefore,
  NavigateNext,
  Search as SearchIcon,
  Add as AddIcon,
  Menu as MenuIcon,
  KeyboardArrowDown,
  CelebrationOutlined,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

/* ─── Helpers ─── */

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_HEADERS = ['m','t','w','t','f','s','s'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOffset(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Mon=0
}

function buildMiniCalendar(year: number, month: number) {
  const totalDays = getDaysInMonth(year, month);
  const offset = getFirstDayOffset(year, month);
  const prevDays = getDaysInMonth(year, month - 1 < 0 ? 11 : month - 1);
  const cells: { day: number; currentMonth: boolean }[] = [];

  for (let i = offset - 1; i >= 0; i--) {
    cells.push({ day: prevDays - i, currentMonth: false });
  }
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ day: d, currentMonth: true });
  }
  const remaining = 35 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, currentMonth: false });
  }
  return cells;
}

const TIME_SLOTS = Array.from({ length: 12 }, (_, i) => `${String(i * 2).padStart(2,'0')}:00`);

/* ─── Layout ─── */

const PageWrapper = styled(Box)({ display: 'flex', flexDirection: 'column', gap: '16px' });

const PageHeader = styled(Box)({ display: 'flex', alignItems: 'center', gap: '10px' });

const BackButton = styled(Box)({
  width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1C1C1C',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});

const PageTitle = styled(Typography)({
  fontSize: '22px', fontWeight: 700, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

const ContentRow = styled(Box)({
  display: 'flex',
  gap: '0',
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
  minHeight: '680px',
});

/* ─── Left sidebar ─── */

const Sidebar = styled(Box)({
  width: '210px',
  minWidth: '210px',
  borderRight: '1px solid rgba(28,28,28,0.08)',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 16px',
  gap: '20px',
});

/* Mini calendar */
const MiniCalHeader = styled(Box)({
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px',
});

const MiniCalTitle = styled(Typography)({
  fontSize: '13px', fontWeight: 700, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

const MiniNavBtn = styled(Box)({
  width: '20px', height: '20px', borderRadius: '50%', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'rgba(28,28,28,0.4)',
  '&:hover': { color: '#1C1C1C', backgroundColor: 'rgba(28,28,28,0.06)' },
});

const MiniGrid = styled(Box)({
  display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px',
});

const MiniDayHeader = styled(Box)({
  textAlign: 'center', fontSize: '10px', fontWeight: 600,
  color: 'rgba(28,28,28,0.4)', fontFamily: "'Inter', sans-serif",
  padding: '2px 0', marginBottom: '2px',
});

const MiniDayCell = styled(Box)<{ today?: boolean; otherMonth?: boolean }>(
  ({ today, otherMonth }) => ({
    width: '24px', height: '24px', margin: '0 auto',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '50%', fontSize: '11px',
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
    color: otherMonth ? 'rgba(28,28,28,0.25)' : today ? '#fff' : '#1C1C1C',
    backgroundColor: today ? '#1C1C1C' : 'transparent',
    fontWeight: today ? 700 : 400,
    '&:hover': !today ? { backgroundColor: 'rgba(28,28,28,0.06)' } : {},
  })
);

/* Upcoming events */
const UpcomingLabel = styled(Typography)({
  fontSize: '13px', fontWeight: 700, color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif", marginBottom: '12px',
});

const EmptyEventsBox = styled(Box)({
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', paddingTop: '8px',
});

const EmptyEventsText = styled(Typography)({
  fontSize: '12px', color: 'rgba(28,28,28,0.4)', fontFamily: "'Inter', sans-serif",
});

/* ─── Right main panel ─── */

const MainPanel = styled(Box)({
  flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden',
});

const MainHeader = styled(Box)({
  display: 'flex', alignItems: 'center', gap: '12px',
  padding: '14px 20px', borderBottom: '1px solid rgba(28,28,28,0.08)',
});

const DateTitle = styled(Typography)({
  fontSize: '16px', fontWeight: 700, color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif", flex: 1,
});

const ViewDropdown = styled(Box)({
  display: 'flex', alignItems: 'center', gap: '4px',
  border: '1px solid rgba(28,28,28,0.15)', borderRadius: '6px',
  padding: '5px 10px', fontSize: '13px', fontFamily: "'Inter', sans-serif",
  color: '#1C1C1C', cursor: 'pointer',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.04)' },
});

const IconBtn = styled(Box)({
  width: '32px', height: '32px', borderRadius: '6px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: 'rgba(28,28,28,0.5)',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.06)', color: '#1C1C1C' },
});

const AddEventBtn = styled(Box)({
  backgroundColor: '#1C1C1C', color: '#fff',
  borderRadius: '8px', padding: '7px 14px',
  fontSize: '13px', fontWeight: 600, fontFamily: "'Inter', sans-serif",
  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
});

/* Time slots */
const TimeSlotsArea = styled(Box)({ flex: 1, overflowY: 'auto' });

const TimeSlotRow = styled(Box)({
  display: 'flex', alignItems: 'flex-start',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  minHeight: '52px',
});

const TimeLabel = styled(Box)({
  width: '56px', minWidth: '56px', padding: '8px 8px 0 16px',
  fontSize: '11px', color: 'rgba(28,28,28,0.4)', fontFamily: "'Inter', sans-serif",
  textAlign: 'right', userSelect: 'none',
});

const SlotContent = styled(Box)({
  flex: 1, borderLeft: '1px solid rgba(28,28,28,0.06)', minHeight: '52px',
});

/* ─── Component ─── */

const CalendarPage: React.FC = () => {
  const router = useRouter();
  const today = new Date();
  const [miniYear, setMiniYear] = useState(today.getFullYear());
  const [miniMonth, setMiniMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today);
  const [view, setView] = useState<'Day' | 'Week' | 'Month'>('Day');

  const miniDays = buildMiniCalendar(miniYear, miniMonth);

  const displayDateStr = selectedDate.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  return (
    <LearnerLayout pageTitle="Calendar">
      <PageWrapper>

        {/* Page header */}
        <PageHeader>
          <BackButton onClick={() => router.back()}>
            <ArrowBackIos sx={{ fontSize: '12px', color: '#fff', ml: '4px' }} />
          </BackButton>
          <PageTitle>Calendar</PageTitle>
        </PageHeader>

        <ContentRow>
          {/* ── Left Sidebar ── */}
          <Sidebar>

            {/* Mini month calendar */}
            <Box>
              <MiniCalHeader>
                <MiniCalTitle>{MONTHS[miniMonth]}</MiniCalTitle>
                <Box sx={{ display: 'flex', gap: '2px' }}>
                  <MiniNavBtn onClick={() => {
                    if (miniMonth === 0) { setMiniMonth(11); setMiniYear(y => y - 1); }
                    else setMiniMonth(m => m - 1);
                  }}>
                    <NavigateBefore sx={{ fontSize: '14px' }} />
                  </MiniNavBtn>
                  <MiniNavBtn onClick={() => {
                    if (miniMonth === 11) { setMiniMonth(0); setMiniYear(y => y + 1); }
                    else setMiniMonth(m => m + 1);
                  }}>
                    <NavigateNext sx={{ fontSize: '14px' }} />
                  </MiniNavBtn>
                </Box>
              </MiniCalHeader>

              <MiniGrid>
                {DAY_HEADERS.map((h, i) => (
                  <MiniDayHeader key={`h-${i}`}>{h}</MiniDayHeader>
                ))}
                {miniDays.map((cell, idx) => {
                  const isToday =
                    cell.currentMonth &&
                    cell.day === today.getDate() &&
                    miniMonth === today.getMonth() &&
                    miniYear === today.getFullYear();
                  return (
                    <MiniDayCell
                      key={idx}
                      today={isToday}
                      otherMonth={!cell.currentMonth}
                      onClick={() => {
                        if (cell.currentMonth) {
                          setSelectedDate(new Date(miniYear, miniMonth, cell.day));
                        }
                      }}
                    >
                      {cell.day}
                    </MiniDayCell>
                  );
                })}
              </MiniGrid>
            </Box>

            {/* Upcoming events */}
            <Box>
              <UpcomingLabel>Upcoming events</UpcomingLabel>
              <EmptyEventsBox>
                <CelebrationOutlined sx={{ fontSize: '40px', color: 'rgba(28,28,28,0.2)' }} />
                <EmptyEventsText>No upcoming events</EmptyEventsText>
              </EmptyEventsBox>
            </Box>

          </Sidebar>

          {/* ── Right Main Panel ── */}
          <MainPanel>

            {/* Header bar */}
            <MainHeader>
              <IconBtn>
                <MenuIcon sx={{ fontSize: '18px' }} />
              </IconBtn>
              <DateTitle>{displayDateStr}</DateTitle>
              <ViewDropdown>
                {view} <KeyboardArrowDown sx={{ fontSize: '16px' }} />
              </ViewDropdown>
              <IconBtn>
                <SearchIcon sx={{ fontSize: '18px' }} />
              </IconBtn>
              <AddEventBtn>
                <AddIcon sx={{ fontSize: '16px' }} />
                Add event
              </AddEventBtn>
            </MainHeader>

            {/* Day view time slots */}
            <TimeSlotsArea>
              {TIME_SLOTS.map((t) => (
                <TimeSlotRow key={t}>
                  <TimeLabel>{t}</TimeLabel>
                  <SlotContent />
                </TimeSlotRow>
              ))}
            </TimeSlotsArea>

          </MainPanel>
        </ContentRow>

      </PageWrapper>
    </LearnerLayout>
  );
};

export default CalendarPage;
