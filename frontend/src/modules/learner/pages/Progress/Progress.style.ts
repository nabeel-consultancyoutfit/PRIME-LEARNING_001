/**
 * Styled components for Progress module
 * Pixel-perfect to Figma nodes 102:10047 (page) and 102:10827 (card)
 */

import { styled } from '@mui/material/styles';
import { Box, LinearProgress } from '@mui/material';
import { TYPOGRAPHY } from '@/modules/learner/theme/tokens';

/* ─── Page wrapper ─── */

export const ProgressContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

/* ─── Top bar: "Over all Progress: 0%" + checkboxes ─── */

export const TopBar = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
});

export const ProgressInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const ProgressLabel = styled('label')({
  fontSize: '16px',
  fontWeight: 600,
  color: '#1C1C1C',
  fontFamily: TYPOGRAPHY.fontFamily,
  whiteSpace: 'nowrap',
});

export const ProgressBadge = styled(Box)({
  padding: '3px 12px',
  backgroundColor: '#E8F5E9',
  color: '#2E7D32',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: '20px',
});

export const CheckboxGroup = styled(Box)({
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const CheckboxLabel = styled('label')({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '13px',
  fontWeight: 400,
  color: '#1C1C1C',
  cursor: 'pointer',
  fontFamily: TYPOGRAPHY.fontFamily,
  whiteSpace: 'nowrap',
});

/* ─── Unit filter row ─── */

export const UnitFilterSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '12px',
  padding: '12px 20px',
});

export const UnitFilterLabel = styled('span')({
  fontSize: '14px',
  fontWeight: 500,
  color: '#1C1C1C',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const FilterDropdown = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
  fontWeight: 500,
  color: '#1C1C1C',
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
});

export const ViewMoreLink = styled('a')({
  color: '#0057FF',
  textDecoration: 'none',
  fontSize: '13px',
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: TYPOGRAPHY.fontFamily,
  marginLeft: 'auto',
  '&:hover': { textDecoration: 'underline' },
});

/* Legacy – kept so old index.tsx still compiles if not fully replaced */
export const FilterSelect = styled('select')({
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid rgba(28,28,28,0.15)',
  backgroundColor: '#fff',
  fontSize: '14px',
  color: '#1C1C1C',
  cursor: 'pointer',
  fontFamily: TYPOGRAPHY.fontFamily,
  outline: 'none',
});

/* ─── Cards grid ─── */

export const UnitsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',

  '@media (max-width: 1100px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
  },
});

/* ─── Unit card ─── */

export const UnitCardWrapper = styled(Box)({
  backgroundColor: 'rgba(28, 28, 28, 0.05)',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: 'none',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
});

/* Top row: icon box + title */
export const CardTopRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '14px',
  marginBottom: '20px',
});

export const UnitIconBox = styled(Box)({
  width: '44px',
  height: '44px',
  minWidth: '44px',
  backgroundColor: 'rgba(28, 28, 28, 0.08)',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#1C1C1C',
});

export const UnitTitle = styled(Box)({
  fontSize: '16px',
  fontWeight: 600,
  color: '#1C1C1C',
  lineHeight: '1.35',
  fontFamily: TYPOGRAPHY.fontFamily,
  paddingTop: '4px',
});

/* Bottom row: Actual (left) + Unit Progress bar (right) */
export const CardBottomRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '20px',
});

export const ActualSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flexShrink: 0,
});

export const UnitProgressSection = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: 0,
});

export const MetricLabel = styled(Box)({
  fontSize: '12px',
  fontWeight: 400,
  color: 'rgba(28,28,28,0.5)',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const MetricValue = styled(Box)({
  fontSize: '20px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: '1',
});

/* Custom progress bar: pill-shaped, lavender fill, percentage text inside */
export const ProgressBarWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '24px',
  borderRadius: '12px',
  backgroundColor: 'rgba(28,28,28,0.08)',
  overflow: 'hidden',
});

export const ProgressBarFill = styled(Box)<{ value: number }>(({ value }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: `${Math.min(value, 100)}%`,
  backgroundColor: '#C6C7F8',
  borderRadius: '12px',
  minWidth: value > 0 ? '36px' : '0px',
}));

export const ProgressBarText = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '12px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: TYPOGRAPHY.fontFamily,
  whiteSpace: 'nowrap',
  zIndex: 1,
});

/* ─── Legacy stubs – keep exports so old imports don't break ─── */
export const UnitIcon = styled(Box)({});
export const UnitProgress = styled(Box)({});
export const ProgressMetric = styled(Box)({});
export const ProgressValue = styled(Box)({});
export const StyledLinearProgress = styled(LinearProgress)({
  height: '24px',
  borderRadius: '12px',
  backgroundColor: 'rgba(28,28,28,0.08)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#C6C7F8',
    borderRadius: '12px',
  },
});
