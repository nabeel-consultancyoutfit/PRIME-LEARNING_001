import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { COLORS, BORDER_RADIUS, TYPOGRAPHY } from '@/modules/trainer/theme/tokens';

/* ══════════════════════════════════════════════════════════
   LANDING PAGE — Report Cards Grid
   Figma: 2097:161465 — 3 rows of 4 / 3 / 3 cards
   ══════════════════════════════════════════════════════════ */

export const PageContainer = styled(Box)({
  padding: '30px 30px',
  backgroundColor: '#FFFFFF',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
});

/** Grid: auto-flow 3 rows of cards */
export const CardsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: 'auto auto auto',
  gap: 16,
  /* Row 2 and 3 only have 3 items — force them to span further */
  '& > :nth-of-type(5), & > :nth-of-type(6), & > :nth-of-type(7)': {
    gridColumn: 'span 1',
  },
  /* Rows 2+3 are a 3-column sub-grid — we re-lay with a custom rule */
});

/**
 * Since CSS grid with different row widths needs careful handling,
 * we expose three separate row helpers for the template
 */
export const CardsRow = styled(Box)({
  display: 'flex',
  gap: 16,
  marginBottom: 16,
  '&:last-child': { marginBottom: 0 },
});

export const ReportCard = styled(Box)({
  flex: 1,
  backgroundColor: '#F5F5F7',
  borderRadius: 10,
  padding: '0 24px',
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  cursor: 'pointer',
  minHeight: 104,
  transition: 'background-color 0.15s, box-shadow 0.15s',
  border: '1px solid transparent',
  '&:hover': {
    backgroundColor: '#EBEBEF',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    border: '1px solid #E0E0E8',
  },
});

export const CardIconBox = styled(Box)({
  width: 44,
  height: 44,
  borderRadius: 8,
  backgroundColor: '#EBEBEF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: '#9291A5',
  transition: 'background-color 0.15s',
  '.MuiBox-root:hover &': {
    backgroundColor: '#DDDDE8',
  },
});

export const CardLabel = styled(Box)({
  fontSize: '14px',
  fontWeight: 500,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: 1.35,
});

/* ══════════════════════════════════════════════════════════
   DETAIL PAGE — Report Detail View
   Figma: each sub-report screen
   ══════════════════════════════════════════════════════════ */

export const DetailContainer = styled(Box)({
  padding: '24px 30px',
  backgroundColor: '#FFFFFF',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

/** Title row */
export const DetailTopBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 0,
});

export const DetailTitle = styled(Box)({
  fontSize: '20px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

/** Records per page selector */
export const RecordsPerPageBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: '13px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const RecordsSelect = styled('select')({
  border: `1px solid ${COLORS.card?.border ?? '#E8E8E8'}`,
  borderRadius: 6,
  padding: '5px 28px 5px 10px',
  fontSize: '13px',
  fontFamily: TYPOGRAPHY.fontFamily,
  color: COLORS.text.primary,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  outline: 'none',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23888' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px center',
});

/** Criteria Panel */
export const CriteriaPanel = styled(Box)({
  backgroundColor: '#F5F5F7',
  borderRadius: BORDER_RADIUS?.card ?? 10,
  padding: '16px 20px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const CriteriaTitle = styled(Box)({
  fontSize: '14px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const CriteriaRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 16,
  flexWrap: 'wrap' as const,
});

export const CriteriaField = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  minWidth: 130,
});

export const FieldLabel = styled(Box)({
  fontSize: '12px',
  fontWeight: 500,
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

/** Shared input styling */
const inputBase = {
  border: `1px solid ${COLORS.card?.border ?? '#E8E8E8'}`,
  borderRadius: 6,
  padding: '6px 10px',
  fontSize: '13px',
  fontFamily: TYPOGRAPHY.fontFamily,
  color: COLORS.text.primary,
  backgroundColor: '#FFFFFF',
  outline: 'none',
  height: 34,
  '&:focus': { borderColor: '#1E1E2D' },
};

export const DateInput = styled('input')({
  ...inputBase,
  minWidth: 130,
  cursor: 'pointer',
});

export const SelectInput = styled('select')({
  ...inputBase,
  minWidth: 130,
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23888' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px center',
  paddingRight: 28,
});

export const ApplyButton = styled(Box)({
  height: 34,
  padding: '0 22px',
  backgroundColor: '#1E1E2D',
  color: '#FFFFFF',
  borderRadius: 6,
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: TYPOGRAPHY.fontFamily,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  flexShrink: 0,
  '&:hover': { backgroundColor: '#2D2D3D' },
});

/** Results bar */
export const ResultsBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const ResultsCount = styled(Box)({
  fontSize: '13px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ExportButton = styled(Box)({
  height: 34,
  padding: '0 16px',
  backgroundColor: '#1E1E2D',
  color: '#FFFFFF',
  borderRadius: 6,
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: TYPOGRAPHY.fontFamily,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  cursor: 'pointer',
  '&:hover': { backgroundColor: '#2D2D3D' },
});

/** Table */
export const TableWrapper = styled(Box)({
  backgroundColor: '#FFFFFF',
  borderRadius: BORDER_RADIUS?.card ?? 10,
  border: `1px solid ${COLORS.card?.border ?? '#E8E8E8'}`,
  overflow: 'hidden',
});

export const TableHead = styled(Box)({
  display: 'flex',
  borderBottom: `1px solid ${COLORS.card?.border ?? '#E8E8E8'}`,
  padding: '11px 20px',
  backgroundColor: '#FAFAFA',
});

export const TableHeadCell = styled(Box)({
  fontSize: '12px',
  fontWeight: 500,
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: 1.3,
});

export const TableRow = styled(Box)({
  display: 'flex',
  padding: '13px 20px',
  borderBottom: `1px solid ${COLORS.card?.border ?? '#E8E8E8'}`,
  alignItems: 'center',
  '&:last-child': { borderBottom: 'none' },
  '&:hover': { backgroundColor: '#FAFAFA' },
});

export const TableCell = styled(Box)({
  fontSize: '13px',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const TableLinkCell = styled(Box)({
  fontSize: '13px',
  color: '#4A7FD6',
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  '&:hover': { textDecoration: 'underline' },
});

/** Back link (kept for compatibility) */
export const BackLink = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: '13px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  width: 'fit-content',
  '&:hover': { color: COLORS.text.primary },
});
