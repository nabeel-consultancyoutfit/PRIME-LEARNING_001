import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, SHADOWS } from '@/modules/trainer/theme/tokens';

export const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  backgroundColor: '#F5F5F5',
  minHeight: '100%',
});

// ---- Learner's Activity Top Section ----
export const ActivitySection = styled(Box)({
  backgroundColor: '#FFFFFF',
  padding: '20px 24px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 12,
});

export const ActivitySectionTitle = styled(Box)({
  fontSize: '16px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  flex: '0 0 auto',
  marginRight: 24,
});

export const ActivityFiltersRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  flex: 1,
  flexWrap: 'wrap',
});

export const FilterLabel = styled(Box)({
  fontSize: '13px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  whiteSpace: 'nowrap',
});

export const FilterSelect = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  border: '1px solid rgba(28,28,28,0.12)',
  borderRadius: 8,
  padding: '6px 10px',
  fontSize: '13px',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  backgroundColor: '#FFFFFF',
  minWidth: 120,
  '& svg': { fontSize: '16px', color: '#888' },
  '&:hover': { borderColor: 'rgba(28,28,28,0.3)' },
});

export const LearnerSearchBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  border: '1px solid rgba(28,28,28,0.12)',
  borderRadius: 8,
  padding: '6px 12px',
  fontSize: '13px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'text',
  backgroundColor: '#FFFFFF',
  minWidth: 180,
  '& svg': { fontSize: '16px', color: '#AAA' },
  '&:hover': { borderColor: 'rgba(28,28,28,0.3)' },
});

export const ViewPortfolioButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  backgroundColor: COLORS.sidebar.activeBg,
  color: '#FFFFFF',
  borderRadius: 8,
  padding: '8px 18px',
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  '&:hover': { opacity: 0.9 },
  '& svg': { fontSize: '16px' },
});

// ---- Accordion Sections ----
export const AccordionSection = styled(Box)({
  backgroundColor: '#FFFFFF',
  marginTop: 1,
  borderBottom: '1px solid rgba(28,28,28,0.06)',
});

export const AccordionHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 24px',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': { backgroundColor: 'rgba(0,0,0,0.01)' },
});

export const AccordionTitle = styled(Box)({
  fontSize: '15px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const AccordionContent = styled(Box)({
  padding: '0 24px 24px',
  borderTop: '1px solid rgba(28,28,28,0.06)',
});

// ---- Dashboard Stats Grid ----
export const StatsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 16,
  marginTop: 20,
});

export const StatCard = styled(Paper)({
  borderRadius: BORDER_RADIUS.card,
  border: `1px solid ${COLORS.card.border}`,
  backgroundColor: '#FFFFFF',
  boxShadow: 'none',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const StatCardLabel = styled(Box)({
  fontSize: '11px',
  fontWeight: 500,
  color: COLORS.text.muted,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const StatCardTitle = styled(Box)({
  fontSize: '14px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

// ---- Calendar Section ----
export const CalendarCard = styled(Box)({
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: BORDER_RADIUS.card,
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',
});

export const CalendarHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 14px',
  borderBottom: `1px solid ${COLORS.card.border}`,
  fontSize: '13px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const CalendarGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  padding: '8px',
  gap: 2,
});

export const CalendarDayHeader = styled(Box)({
  fontSize: '11px',
  color: COLORS.text.muted,
  textAlign: 'center',
  fontFamily: TYPOGRAPHY.fontFamily,
  padding: '4px 0',
  fontWeight: 500,
});

export const CalendarDay = styled(Box)<{ isToday?: boolean; hasEvent?: boolean; isHighlighted?: boolean }>(
  ({ isToday, hasEvent, isHighlighted }) => ({
    fontSize: '12px',
    textAlign: 'center',
    padding: '5px 0',
    borderRadius: 6,
    cursor: 'pointer',
    fontFamily: TYPOGRAPHY.fontFamily,
    color: isToday ? '#FFFFFF' : COLORS.text.primary,
    backgroundColor: isToday
      ? COLORS.sidebar.activeBg
      : isHighlighted
      ? `${COLORS.sidebar.activeBg}18`
      : 'transparent',
    fontWeight: isToday ? 700 : 400,
    position: 'relative',
    '&:hover': { backgroundColor: isToday ? COLORS.sidebar.activeBg : 'rgba(0,0,0,0.04)' },
    '&::after': hasEvent
      ? {
          content: '""',
          display: 'block',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: '#F44336',
          margin: '2px auto 0',
        }
      : {},
  })
);

// ---- Circular Progress ----
export const DonutChartCard = styled(Box)({
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: BORDER_RADIUS.card,
  backgroundColor: '#FFFFFF',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
});

export const DonutChartLabel = styled(Box)({
  fontSize: '11px',
  fontWeight: 500,
  color: COLORS.text.muted,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  fontFamily: TYPOGRAPHY.fontFamily,
  alignSelf: 'flex-start',
});

export const DonutChartTitle = styled(Box)({
  fontSize: '14px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  alignSelf: 'flex-start',
});

export const DonutWrapper = styled(Box)({
  position: 'relative',
  width: 100,
  height: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const DonutCenter = styled(Box)({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const DonutPercent = styled(Box)({
  fontSize: '18px',
  fontWeight: 700,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: 1,
});

export const DonutLegend = styled(Box)({
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  justifyContent: 'center',
});

export const DonutLegendItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: '11px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const DonutLegendDot = styled(Box)<{ color: string }>(({ color }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: color,
  flexShrink: 0,
}));

// ---- Table Stats ----
export const TableStatCard = styled(Box)({
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: BORDER_RADIUS.card,
  backgroundColor: '#FFFFFF',
  overflow: 'hidden',
});

export const TableStatHeader = styled(Box)({
  padding: '10px 14px',
  borderBottom: `1px solid ${COLORS.card.border}`,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

export const TableStatRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  borderBottom: `1px solid ${COLORS.card.border}`,
  '&:last-child': { borderBottom: 'none' },
});

export const TableStatCell = styled(Box)({
  padding: '8px 14px',
  fontSize: '12px',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  borderRight: `1px solid ${COLORS.card.border}`,
  '&:last-child': { borderRight: 'none' },
});

// ---- Bar Chart ----
export const BarChartCard = styled(Box)({
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: BORDER_RADIUS.card,
  backgroundColor: '#FFFFFF',
  padding: '16px',
});

export const BarChartBars = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 6,
  height: 80,
  marginTop: 12,
});

export const BarChartBar = styled(Box)<{ height: number; color: string }>(({ height, color }) => ({
  flex: 1,
  height: `${height}%`,
  backgroundColor: color,
  borderRadius: '3px 3px 0 0',
  minHeight: 4,
}));

// ---- Progress bars ----
export const ProgressBarsCard = styled(Box)({
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: BORDER_RADIUS.card,
  backgroundColor: '#FFFFFF',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const ProgressBarRow = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const ProgressBarMeta = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '12px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ProgressBarTrack = styled(Box)({
  height: 8,
  borderRadius: 4,
  backgroundColor: COLORS.progress.track,
  overflow: 'hidden',
});

export const ProgressBarFill = styled(Box)<{ fillColor: string; width: number }>(({ fillColor, width }) => ({
  height: '100%',
  width: `${width}%`,
  borderRadius: 4,
  backgroundColor: fillColor,
}));
