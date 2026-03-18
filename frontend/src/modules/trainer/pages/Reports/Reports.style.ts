import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { COLORS, BORDER_RADIUS, TYPOGRAPHY } from '@/modules/trainer/theme/tokens';

/* ─── Landing: Report Cards Grid ───────────────────────────── */
export const PageContainer = styled(Box)({
  padding: '30px',
  backgroundColor: '#FFFFFF',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const CardsRow = styled(Box)({
  display: 'flex',
  gap: 16,
});

export const ReportCard = styled(Box)({
  flex: 1,
  backgroundColor: '#F5F5F7',
  borderRadius: 12,
  padding: '10px 30px',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
  minHeight: 64,
  '&:hover': {
    backgroundColor: '#EBEBEF',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
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
});

export const CardLabel = styled(Box)({
  fontSize: '14px',
  fontWeight: 500,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: 1.3,
});

/* ─── Detail View ───────────────────────────────────────────── */
export const DetailContainer = styled(Box)({
  padding: '24px 30px',
  backgroundColor: '#FFFFFF',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const DetailTopBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const DetailTitle = styled(Box)({
  fontSize: '20px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const RecordsPerPageBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: '13px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const RecordsSelect = styled('select')({
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: 6,
  padding: '4px 8px',
  fontSize: '13px',
  fontFamily: TYPOGRAPHY.fontFamily,
  color: COLORS.text.primary,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  outline: 'none',
});

export const CriteriaPanel = styled(Box)({
  backgroundColor: '#F5F5F7',
  borderRadius: BORDER_RADIUS.card,
  padding: '16px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const CriteriaTitle = styled(Box)({
  fontSize: '14px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  marginBottom: 4,
});

export const CriteriaFields = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  flexWrap: 'wrap' as const,
});

export const CriteriaField = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const FieldLabel = styled(Box)({
  fontSize: '12px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const DateInput = styled('input')({
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: 6,
  padding: '6px 10px',
  fontSize: '13px',
  fontFamily: TYPOGRAPHY.fontFamily,
  color: COLORS.text.primary,
  backgroundColor: '#FFFFFF',
  outline: 'none',
  minWidth: 140,
  cursor: 'pointer',
  '&:focus': { borderColor: '#5B4FCF' },
});

export const ApplyButton = styled(Box)({
  height: 34,
  padding: '0 20px',
  backgroundColor: '#1E1E2D',
  color: '#FFFFFF',
  borderRadius: 6,
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: TYPOGRAPHY.fontFamily,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  alignSelf: 'flex-end',
  '&:hover': { backgroundColor: '#2D2D3D' },
});

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

export const TableWrapper = styled(Box)({
  backgroundColor: '#FFFFFF',
  borderRadius: BORDER_RADIUS.card,
  border: `1px solid ${COLORS.card.border}`,
  overflow: 'hidden',
});

export const TableHead = styled(Box)({
  display: 'flex',
  borderBottom: `1px solid ${COLORS.card.border}`,
  padding: '12px 20px',
  backgroundColor: '#FAFAFA',
});

export const TableHeadCell = styled(Box)({
  fontSize: '12px',
  fontWeight: 500,
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.03em',
});

export const TableRow = styled(Box)({
  display: 'flex',
  padding: '14px 20px',
  borderBottom: `1px solid ${COLORS.card.border}`,
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
