/**
 * Styled components for Dashboard module
 * Using design tokens from @/modules/learner/theme/tokens
 */

import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Table } from '@mui/material';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/modules/learner/theme/tokens';

// ============================================================================
// Section 1: Welcome Banner & Safeguarding
// ============================================================================

export const WelcomeBannerWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
}));

export const WelcomeHeading = styled(Typography)(({ theme }) => ({
  fontSize: '30px',
  fontWeight: TYPOGRAPHY.h4.fontWeight,
  color: COLORS.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  letterSpacing: '-0.6px',
  lineHeight: '40px',
}));

export const HelpIconStyled = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: `1.5px solid ${COLORS.text.secondary}`,
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
  color: COLORS.text.secondary,
  flexShrink: 0,
}));

export const SafeguardingRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
  fontSize: TYPOGRAPHY.body2.fontSize,
  color: COLORS.text.primary,
}));

export const SafeguardingContact = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  '& a': {
    color: COLORS.text.primary,
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 500,

    '&:hover': {
      opacity: 0.8,
    },
  },
}));

// ============================================================================
// Section 2: Content Tabs & Trainer Card Row
// ============================================================================

export const TabsAndTrainerWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: SPACING.sectionGap,
  alignItems: 'start',

  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const TabsCardWrapper = styled(Paper)(({ theme }) => ({
  padding: SPACING.card.padding,
  backgroundColor: COLORS.card.bg,
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: BORDER_RADIUS.card,
}));

export const TabBarWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '4px',
}));

export const TabItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  padding: '4px 8px',
  fontSize: '16px',
  fontWeight: isActive ? 700 : 400,
  color: isActive ? COLORS.text.primary : COLORS.text.secondary,
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  borderBottom: isActive ? `2px solid ${COLORS.text.primary}` : 'transparent',

  '&:hover': {
    color: COLORS.text.primary,
  },
}));

export const QuickAccessChipsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
}));

export const QuickAccessChip = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px',
  backgroundColor: COLORS.chip.bg,
  border: `1px solid ${COLORS.chip.border}`,
  borderRadius: '16px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 500,
  color: COLORS.text.primary,
  transition: 'all 0.2s ease',

  '& svg': {
    fontSize: '18px',
    color: COLORS.text.secondary,
  },

  '&:hover': {
    borderColor: COLORS.progress.green,
    backgroundColor: '#F0F9F0',
  },
}));

export const TrainerCardWrapper = styled(Paper)(({ theme }) => ({
  padding: '8px',
  backgroundColor: COLORS.card.bg,
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flexShrink: 0,
  width: '184px',
}));

export const TrainerAvatar = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: '#4DB8A8',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  flexShrink: 0,
}));

export const TrainerInfoColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}));

export const TrainerName = styled(Typography)(({ theme }) => ({
  fontSize: TYPOGRAPHY.body1.fontSize,
  fontWeight: 700,
  color: COLORS.text.primary,
  lineHeight: 1.2,
}));

export const TrainerTitle = styled(Typography)(({ theme }) => ({
  fontSize: TYPOGRAPHY.caption.fontSize,
  fontWeight: 400,
  color: COLORS.text.secondary,
  lineHeight: 1.2,
}));

export const OnlineStatus = styled(Typography)(({ theme }) => ({
  fontSize: TYPOGRAPHY.caption.fontSize,
  fontWeight: 600,
  color: COLORS.status.online,
  lineHeight: 1.2,
}));

// ============================================================================
// Section 3: Statistics Row (3 columns in one card with dividers)
// ============================================================================

export const StatisticsCardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '20px',

  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
  },
}));

export const StatCardWrapper = styled(Paper)(({ theme }) => ({
  padding: '30px',
  backgroundColor: '#FFFFFF',
  borderRadius: '20px',
  boxShadow: '0px 2px 6px rgba(13, 10, 44, 0.08)',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  border: 'none',
}));

export const ColumnDivider = styled(Box)(({ theme }) => ({
  backgroundColor: COLORS.card.border,
  height: 'auto',
}));

export const StatColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: `0 ${SPACING.card.padding}px`,

  '&:first-of-type': {
    paddingLeft: 0,
  },

  '&:last-of-type': {
    paddingRight: 0,
  },
}));

export const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 400,
  color: '#9291A5',
  marginBottom: '4px',
}));

export const StatTitle = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  fontWeight: 700,
  color: '#1E1B39',
  marginBottom: '16px',
  paddingBottom: '16px',
  borderBottom: '1px solid #E5E5EF',
}));

// Donut Chart Section
export const DonutChartWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: SPACING.sectionGap,
}));

export const DonutChartSvg = styled('svg')(({ theme }) => ({
  width: '200px',
  height: '200px',
}));

export const DonutChartCenter = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  pointerEvents: 'none',
}));

export const DonutPercentage = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  fontWeight: 700,
  color: '#1E1B39',
}));

export const DonutLabel = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  color: '#615E83',
}));

export const LegendWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  justifyContent: 'center',
  width: '100%',
}));

export const LegendItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  color: '#9291A5',
}));

export const LegendDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: string }>(({ color }) => ({
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  backgroundColor: color,
  flexShrink: 0,
}));

// Calendar Section
export const CalendarWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export const CalendarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',
}));

export const CalendarMonthDisplay = styled(Typography)(({ theme }) => ({
  fontSize: TYPOGRAPHY.h6.fontSize,
  fontWeight: 700,
  color: COLORS.text.primary,
}));

export const CalendarNavButton = styled(Box)(({ theme }) => ({
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '18px',
  color: COLORS.text.secondary,
  userSelect: 'none',

  '&:hover': {
    color: COLORS.text.primary,
  },
}));

export const CalendarGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '2px',
}));

export const CalendarDayHeader = styled(Box)(({ theme }) => ({
  padding: '4px 0',
  textAlign: 'center',
  fontSize: TYPOGRAPHY.caption.fontSize,
  fontWeight: 600,
  color: COLORS.text.secondary,
}));

export const CalendarDayCell = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'isToday' && prop !== 'hasEvent' && prop !== 'isCurrentMonth' && prop !== 'isHighlighted',
})<{ isToday: boolean; hasEvent: boolean; isCurrentMonth: boolean; isHighlighted: boolean }>(
  ({ isToday, hasEvent, isCurrentMonth, isHighlighted }) => {
    let bgColor = 'transparent';
    let textColor = COLORS.text.primary;
    let borderRadius = '0';

    if (!isCurrentMonth) {
      textColor = COLORS.text.secondary;
    } else if (isToday) {
      bgColor = COLORS.calendar.todayBg;
      textColor = '#FFFFFF';
      borderRadius = '50%';
    } else if (hasEvent) {
      bgColor = COLORS.calendar.eventBg;
      textColor = '#FFFFFF';
      borderRadius = '50%';
    } else if (isHighlighted) {
      bgColor = COLORS.calendar.highlightBg;
      textColor = '#2DB54A';
    }

    return {
      padding: '4px 0',
      textAlign: 'center' as const,
      fontSize: TYPOGRAPHY.body1.fontSize,
      fontWeight: 500,
      color: textColor,
      backgroundColor: bgColor,
      borderRadius: borderRadius === '50%' ? '50%' : '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '32px',
      cursor: 'pointer',
    };
  }
);

// Task Bar Chart Section
export const TaskDueWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export const TaskDueRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

export const TaskDueLabel = styled(Typography)(({ theme }) => ({
  fontSize: TYPOGRAPHY.caption.fontSize,
  fontWeight: 500,
  color: COLORS.text.secondary,
  minWidth: '90px',
  flexShrink: 0,
}));

export const TaskDueBarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'lightColor',
})<{ lightColor?: string }>(({ lightColor }) => ({
  flex: 1,
  height: '20px',
  backgroundColor: lightColor || '#F5F5F5',
  borderRadius: '4px',
  overflow: 'hidden',
  display: 'flex',
  position: 'relative',
}));

export const TaskDueBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'filledPercent' && prop !== 'color' && prop !== 'lightColor',
})<{ filledPercent: number; color: string; lightColor: string }>(({ filledPercent, color, lightColor }) => ({
  height: '100%',
  width: `${filledPercent}%`,
  backgroundColor: color,
  borderRadius: '4px',
  flexShrink: 0,
}));

export const TaskDueCount = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '30px',
  fontSize: TYPOGRAPHY.caption.fontSize,
  fontWeight: 600,
  color: COLORS.text.primary,
  flexShrink: 0,
}));

export const TaskDueScale = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: TYPOGRAPHY.caption.fontSize,
  color: '#999999',
  marginTop: '8px',
  marginLeft: '102px',
  marginRight: '42px',
}));

export const TaskDueLegend = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '6px',
  marginTop: '12px',
}));

export const TaskDueLegendItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: TYPOGRAPHY.caption.fontSize,
  color: COLORS.text.secondary,
}));

// ============================================================================
// Section 4: Info Cards Row
// ============================================================================

export const InfoCardsRowWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '30px',

  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const InfoCardWrapper = styled(Paper)(({ theme }) => ({
  padding: '30px',
  backgroundColor: COLORS.card.bg,
  border: 'none',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  boxShadow: '0px 2px 6px rgba(13, 10, 44, 0.08)',
}));

export const InfoCardIcon = styled(Box)(({ theme }) => ({
  width: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  borderRadius: '8px',
  padding: '8px',
}));

export const InfoCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 600,
  color: COLORS.text.primary,
}));

export const InfoCardDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: 'rgba(28, 28, 28, 0.6)',
  lineHeight: 1.5,
}));

export const InfoCardStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  marginTop: '8px',
}));

export const InfoCardStatGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}));

export const InfoCardStatLabel = styled(Typography)(({ theme }) => ({
  fontSize: TYPOGRAPHY.caption.fontSize,
  fontWeight: 400,
  color: COLORS.text.secondary,
}));

export const InfoCardStatValue = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 700,
  color: COLORS.text.primary,
}));

// ============================================================================
// Section 5: Workplace Bar
// ============================================================================

export const WorkplaceBarWrapper = styled(Box)(({ theme }) => ({
  padding: '8px 0',
  backgroundColor: COLORS.workplace.bg,
  color: COLORS.workplace.text,
  borderRadius: '8px',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: SPACING.sectionGap,

  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const WorkplaceInfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0px',
  justifyContent: 'center',
  padding: '8px 16px',
}));

export const WorkplaceInfoLabel = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  color: COLORS.workplace.text,
  textAlign: 'center',
}));

export const WorkplaceInfoValue = styled(Typography)(({ theme }) => ({
  fontSize: TYPOGRAPHY.body1.fontSize,
  fontWeight: 700,
  color: COLORS.workplace.text,

  '& a': {
    color: COLORS.workplace.text,
    textDecoration: 'underline',
    cursor: 'pointer',

    '&:hover': {
      opacity: 0.8,
    },
  },
}));

// ============================================================================
// Section 6: Learning Aims Table & Information Options
// ============================================================================

export const BottomSectionWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2.3fr 1fr',
  gap: SPACING.sectionGap,

  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const LearningAimsTableWrapper = styled(Paper)(({ theme }) => ({
  padding: '12px',
  backgroundColor: COLORS.card.bg,
  border: 'none',
  borderRadius: BORDER_RADIUS.card,
  overflowX: 'auto',
  boxShadow: '0px 2px 6px rgba(13, 10, 44, 0.08)',
}));

export const LearningAimsTableTitle = styled(Typography)(({ theme }) => ({
  fontSize: TYPOGRAPHY.h6.fontSize,
  fontWeight: TYPOGRAPHY.h6.fontWeight,
  color: COLORS.text.primary,
  marginBottom: SPACING.sectionGap,
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  '& thead': {
    backgroundColor: 'transparent',
  },

  '& th': {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 400,
    color: 'rgba(28, 28, 28, 0.6)',
    borderBottom: `1px solid ${COLORS.card.border}`,
    textAlign: 'left',
  },

  '& td': {
    padding: '12px',
    fontSize: TYPOGRAPHY.body2.fontSize,
    color: COLORS.text.primary,
    borderBottom: `1px solid ${COLORS.card.border}`,

    '&:last-child': {
      textAlign: 'center',
    },
  },

  '& tbody tr': {
    '&:hover': {
      backgroundColor: '#FAFAFA',
    },
  },
}));

export const ActionChevron = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  color: COLORS.text.secondary,
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    color: COLORS.text.primary,
  },
}));

export const InformationOptionsWrapper = styled(Paper)(({ theme }) => ({
  padding: '0',
  backgroundColor: COLORS.card.bg,
  border: 'none',
  borderRadius: BORDER_RADIUS.card,
  boxShadow: '0px 2px 6px rgba(13, 10, 44, 0.08)',
  overflow: 'hidden',
}));

export const InformationOptionsTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 700,
  color: COLORS.text.primary,
  marginBottom: '0',
  padding: '16px',
  backgroundColor: 'rgba(28, 28, 28, 0.05)',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
}));

export const InformationOptionsList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
}));

export const InformationOptionItem = styled(Box)(({ theme }) => ({
  padding: '16px 12px',
  borderBottom: `1px solid ${COLORS.card.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minHeight: '48px',

  '&:last-child': {
    borderBottom: 'none',
  },

  '&:hover': {
    backgroundColor: '#FAFAFA',
  },
}));

export const InformationOptionLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: TYPOGRAPHY.body1.fontSize,
  color: COLORS.text.primary,
  fontWeight: 500,

  '& svg': {
    fontSize: '18px',
    color: COLORS.text.primary,
  },
}));

export const InformationOptionRight = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

export const InformationOptionCount = styled(Box)(({ theme }) => ({
  fontSize: TYPOGRAPHY.caption.fontSize,
  fontWeight: 600,
  color: COLORS.text.secondary,
  minWidth: '20px',
  textAlign: 'right',
}));

export const InformationOptionChevron = styled(Box)(({ theme }) => ({
  fontSize: '18px',
  color: COLORS.text.secondary,
  display: 'flex',
  alignItems: 'center',
}));
