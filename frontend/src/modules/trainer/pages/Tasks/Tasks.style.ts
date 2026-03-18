import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { COLORS, BORDER_RADIUS, TYPOGRAPHY } from '@/modules/trainer/theme/tokens';

export const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  minHeight: '100%',
});

export const PageHeader = styled(Box)({
  padding: '16px 24px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
  fontSize: '18px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  backgroundColor: '#FFFFFF',
});

export const FiltersBar = styled(Box)({
  padding: '10px 24px',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  flexWrap: 'wrap',
  backgroundColor: '#FFFFFF',
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
  gap: 4,
  border: '1px solid rgba(28,28,28,0.12)',
  borderRadius: 6,
  padding: '5px 10px',
  fontSize: '13px',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  backgroundColor: '#FFFFFF',
  minWidth: 90,
  '& svg': { fontSize: '14px', color: '#888', marginLeft: 'auto' },
  '&:hover': { borderColor: 'rgba(28,28,28,0.3)' },
});

export const PendingBadge = styled(Box)({
  marginLeft: 'auto',
  backgroundColor: '#FFC107',
  color: '#1C1C1C',
  borderRadius: 6,
  padding: '5px 14px',
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: TYPOGRAPHY.fontFamily,
  whiteSpace: 'nowrap',
});

export const TableWrapper = styled(Box)({
  backgroundColor: '#FFFFFF',
  overflow: 'auto',
});

export const TableHeader = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '160px 1fr 170px 170px 130px 220px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
  padding: '0 24px',
  backgroundColor: '#FAFAFA',
});

export const TableHeaderCell = styled(Box)({
  padding: '11px 8px',
  fontSize: '12px',
  fontWeight: 600,
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  letterSpacing: '0.2px',
});

export const TaskRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '160px 1fr 170px 170px 130px 220px',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  padding: '0 24px',
  alignItems: 'center',
  '&:hover': { backgroundColor: 'rgba(0,0,0,0.01)' },
  '&:last-child': { borderBottom: 'none' },
});

export const TaskCell = styled(Box)({
  padding: '14px 8px',
  fontSize: '13px',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const TaskLinkCell = styled(Box)({
  padding: '14px 8px',
  fontSize: '13px',
  color: '#4A90D9',
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  lineHeight: '1.4',
  '&:hover': { textDecoration: 'underline' },
});

export const TaskOverdueCell = styled(Box)({
  padding: '14px 8px',
  fontSize: '13px',
  color: '#E53935',
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: '1.4',
});

export const StatusBadge = styled(Box)<{ status: string }>(({ status }) => {
  const map: Record<string, { bg: string; color: string }> = {
    'In Progress': { bg: 'rgba(74,144,217,0.1)', color: '#4A90D9' },
    Complete: { bg: 'rgba(67,160,71,0.1)', color: '#43A047' },
    Pending: { bg: 'rgba(255,165,0,0.1)', color: '#FB8C00' },
    Overdue: { bg: 'rgba(229,57,53,0.1)', color: '#E53935' },
    Finished: { bg: 'rgba(100,100,100,0.1)', color: '#616161' },
  };
  const s = map[status] || { bg: 'rgba(0,0,0,0.06)', color: '#888' };
  return {
    padding: '4px 12px',
    borderRadius: 20,
    backgroundColor: s.bg,
    color: s.color,
    fontSize: '12px',
    fontWeight: 500,
    fontFamily: TYPOGRAPHY.fontFamily,
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    margin: '14px 8px',
  };
});

export const ReassignButton = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: COLORS.sidebar.activeBg,
  color: '#FFFFFF',
  borderRadius: 6,
  padding: '5px 10px',
  fontSize: '12px',
  fontWeight: 500,
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '&:hover': { opacity: 0.88 },
});

export const HideButton = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: '#3A3A3A',
  color: '#FFFFFF',
  borderRadius: 6,
  padding: '5px 10px',
  fontSize: '12px',
  fontWeight: 500,
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '&:hover': { opacity: 0.88 },
});

export const ActionsCell = styled(Box)({
  padding: '10px 8px',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  flexWrap: 'wrap',
});
