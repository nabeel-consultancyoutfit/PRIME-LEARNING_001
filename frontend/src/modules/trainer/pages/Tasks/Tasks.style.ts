/**
 * Trainer — Tasks page styled components
 * Pixel-perfect to Figma node 2095:158833
 */

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { COLORS, BORDER_RADIUS, TYPOGRAPHY } from '@/modules/trainer/theme/tokens';

// ─── Page layout ──────────────────────────────────────────────────────────────

export const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  minHeight: '100%',
});

export const PageHeader = styled(Box)({
  padding: '18px 24px 16px',
  fontSize: '20px',
  fontWeight: 700,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  backgroundColor: '#FFFFFF',
});

// ─── Filters bar ──────────────────────────────────────────────────────────────

export const FiltersBar = styled(Box)({
  padding: '10px 24px',
  borderTop: '1px solid rgba(28,28,28,0.07)',
  borderBottom: '1px solid rgba(28,28,28,0.07)',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  flexWrap: 'wrap',
  backgroundColor: '#FFFFFF',
});

export const FilterLabel = styled(Box)({
  fontSize: '13px',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  whiteSpace: 'nowrap',
  fontWeight: 500,
});

export const FilterSelect = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  border: '1px solid rgba(28,28,28,0.14)',
  borderRadius: '6px',
  padding: '5px 10px',
  fontSize: '13px',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  backgroundColor: '#FFFFFF',
  marginRight: '8px',
  '& svg': { fontSize: '15px', color: 'rgba(28,28,28,0.45)', marginLeft: '2px' },
  '&:hover': { borderColor: 'rgba(28,28,28,0.3)' },
});

export const PendingBadge = styled(Box)({
  marginLeft: 'auto',
  backgroundColor: '#F5A623',
  color: '#1C1C1C',
  borderRadius: '6px',
  padding: '6px 14px',
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: TYPOGRAPHY.fontFamily,
  whiteSpace: 'nowrap',
});

// ─── Table ────────────────────────────────────────────────────────────────────

export const TableWrapper = styled(Box)({
  backgroundColor: '#FFFFFF',
  overflow: 'auto',
});

export const TableHeader = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '155px 1fr 155px 155px 120px 210px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
  padding: '0 24px',
  backgroundColor: '#FAFAFA',
});

export const TableHeaderCell = styled(Box)({
  padding: '10px 8px',
  fontSize: '12px',
  fontWeight: 600,
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  letterSpacing: '0.2px',
  textTransform: 'uppercase',
});

export const TaskRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '155px 1fr 155px 155px 120px 210px',
  borderBottom: '1px solid rgba(28,28,28,0.055)',
  padding: '0 24px',
  alignItems: 'center',
  '&:hover': { backgroundColor: 'rgba(0,0,0,0.012)' },
  '&:last-child': { borderBottom: 'none' },
});

export const TaskCell = styled(Box)({
  padding: '14px 8px',
  fontSize: '13px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: 1.45,
});

// Blue clickable task link
export const TaskLinkCell = styled(Box)({
  padding: '14px 8px',
  fontSize: '13px',
  color: '#4A90D9',
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  lineHeight: 1.45,
  '&:hover': { textDecoration: 'underline' },
});

// Red warning text for overdue warning tasks
export const TaskOverdueCell = styled(Box)({
  padding: '14px 8px',
  fontSize: '13px',
  color: '#E53935',
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: 1.45,
});

// ─── Status badge ─────────────────────────────────────────────────────────────

export const StatusBadge = styled(Box)<{ status: string }>(({ status }) => {
  const map: Record<string, { bg: string; color: string }> = {
    'In Progress': { bg: 'rgba(74,144,217,0.12)', color: '#2B7AC5' },
    Complete:      { bg: 'rgba(67,160,71,0.12)',  color: '#2E7D32' },
    Pending:       { bg: 'rgba(249,168,37,0.12)', color: '#F57F17' },
    Overdue:       { bg: 'rgba(229,57,53,0.12)',  color: '#C62828' },
    Rejected:      { bg: 'rgba(0,0,0,0.06)',      color: '#757575' },
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

// ─── Action buttons (pill-shaped, Figma style) ────────────────────────────────

export const ReassignButton = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  borderRadius: '20px',
  padding: '6px 14px',
  fontSize: '12px',
  fontWeight: 500,
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'opacity 0.15s',
  '&:hover': { opacity: 0.82 },
});

export const HideButton = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  borderRadius: '20px',
  padding: '6px 14px',
  fontSize: '12px',
  fontWeight: 500,
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'opacity 0.15s',
  '&:hover': { opacity: 0.82 },
});

export const ActionsCell = styled(Box)({
  padding: '10px 8px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  flexWrap: 'wrap',
});

// ─── Reassign Task Modal ───────────────────────────────────────────────────────

export const ModalOverlay = styled(Box)({
  position: 'fixed',
  inset: 0,
  zIndex: 1300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.45)',
});

export const ModalCard = styled(Box)({
  backgroundColor: '#FFFFFF',
  borderRadius: '10px',
  width: '100%',
  maxWidth: '520px',
  boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
  overflow: 'hidden',
});

export const ModalHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '18px 22px 16px',
  borderBottom: '1px solid rgba(28,28,28,0.09)',
});

export const ModalTitle = styled(Box)({
  fontSize: '16px',
  fontWeight: 700,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ModalCloseBtn = styled(Box)({
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '50%',
  color: 'rgba(28,28,28,0.5)',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.07)', color: COLORS.text.primary },
});

export const ModalBody = styled(Box)({
  padding: '20px 22px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const ModalBanner = styled(Box)({
  backgroundColor: '#FFF9E6',
  border: '1px solid #F5C842',
  borderRadius: '6px',
  padding: '12px 14px',
  fontSize: '13px',
  color: '#7A5D00',
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: 1.5,
});

export const ModalInfoText = styled(Box)({
  fontSize: '13px',
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: 1.6,
});

export const ModalLabel = styled(Box)({
  fontSize: '13px',
  fontWeight: 600,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  marginBottom: '8px',
});

export const RadioRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap',
});

export const RadioOption = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  cursor: 'pointer',
  fontSize: '13px',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  userSelect: 'none',
});

export const ModalTextarea = styled('textarea')({
  width: '100%',
  minHeight: '82px',
  border: '1px solid rgba(28,28,28,0.18)',
  borderRadius: '6px',
  padding: '10px 12px',
  fontSize: '13px',
  fontFamily: TYPOGRAPHY.fontFamily,
  color: COLORS.text.primary,
  resize: 'vertical',
  outline: 'none',
  boxSizing: 'border-box',
  '&:focus': { borderColor: 'rgba(28,28,28,0.4)' },
});

export const ModalFooter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '12px',
  padding: '14px 22px 18px',
  borderTop: '1px solid rgba(28,28,28,0.08)',
});

export const ModalCancelBtn = styled(Box)({
  fontSize: '14px',
  fontWeight: 500,
  color: COLORS.text.secondary,
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',
  padding: '8px 14px',
  borderRadius: '6px',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.05)', color: COLORS.text.primary },
});

export const ModalConfirmBtn = styled(Box)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#FFFFFF',
  fontFamily: TYPOGRAPHY.fontFamily,
  backgroundColor: '#1C1C1C',
  cursor: 'pointer',
  padding: '9px 20px',
  borderRadius: '7px',
  transition: 'opacity 0.15s',
  '&:hover': { opacity: 0.86 },
});
