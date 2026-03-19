/**
 * TaskDetail styled components — pixel-perfect match to Figma 40000068-35569
 *
 * Design tokens from Figma:
 *   - Font family: Inter
 *   - Primary text: #1C1C1C
 *   - Secondary text: rgba(28,28,28,0.6)
 *   - Muted text: rgba(28,28,28,0.4)
 *   - Card bg: #FFFFFF
 *   - Surface bg: rgba(28,28,28,0.05)
 *   - Border: 1px solid rgba(28,28,28,0.1)
 *   - Card border-radius: 12px
 *   - Card shadow: 0px 2px 6px rgba(13,10,44,0.08)
 *   - Active tab bg: #1C1C1C
 *   - Red badge bg: rgba(255,71,71,0.1), text: #FF4747
 *   - Link blue: #5689F5
 *   - Purple tag A: #C6C7F8
 *   - Purple tag B: #E5ECF6
 */

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ─── Design tokens ────────────────────────────────────────────────────────────
const F = {
  fontFamily: "'Inter', sans-serif",
  text: '#1C1C1C',
  textSub: 'rgba(28,28,28,0.6)',
  textMuted: 'rgba(28,28,28,0.4)',
  textPlaceholder: 'rgba(28,28,28,0.2)',
  surface: 'rgba(28,28,28,0.05)',
  border: 'rgba(28,28,28,0.1)',
  cardBg: '#FFFFFF',
  cardRadius: '12px',
  cardShadow: '0px 2px 6px rgba(13,10,44,0.08)',
  red: '#FF4747',
  redBg: 'rgba(255,71,71,0.1)',
  blue: '#5689F5',
  purpleA: '#C6C7F8',
  purpleB: '#E5ECF6',
  black: '#1C1C1C',
  white: '#FFFFFF',
};

// ─── Page shell ────────────────────────────────────────────────────────────────
export const DetailPage = styled(Box)({
  backgroundColor: F.surface,
  minHeight: '100%',
  padding: '24px 24px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  fontFamily: F.fontFamily,
  boxSizing: 'border-box',
});

// ─── Breadcrumb ────────────────────────────────────────────────────────────────
export const Breadcrumbs = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  fontFamily: F.fontFamily,
  fontSize: '14px',
  lineHeight: '20px',
});

export const BreadcrumbBtn = styled('button')({
  background: 'none',
  border: 'none',
  padding: '4px 8px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontFamily: F.fontFamily,
  fontSize: '14px',
  color: F.textMuted,
  lineHeight: '20px',
  '&:hover': { backgroundColor: F.border, color: F.text },
});

export const BreadcrumbSep = styled('span')({
  color: F.textMuted,
  fontSize: '14px',
  padding: '0 2px',
  userSelect: 'none',
});

export const BreadcrumbCurrent = styled('span')({
  padding: '4px 8px',
  fontSize: '14px',
  color: F.text,
  fontWeight: 400,
  lineHeight: '20px',
});

// ─── Card (white rounded shadow box) ─────────────────────────────────────────
export const Card = styled(Box)({
  backgroundColor: F.cardBg,
  borderRadius: F.cardRadius,
  boxShadow: F.cardShadow,
  overflow: 'hidden',
});

// ─── Card section header band ─────────────────────────────────────────────────
export const CardHeader = styled(Box)({
  backgroundColor: F.surface,
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '48px',
  gap: '12px',
  borderBottom: `1px solid ${F.border}`,
});

export const CardHeaderLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: 1,
  minWidth: 0,
});

// ─── Task circle badge ────────────────────────────────────────────────────────
export const TaskBadge = styled(Box)({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: F.black,
  color: F.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '13px',
  fontWeight: 700,
  fontFamily: F.fontFamily,
  flexShrink: 0,
  letterSpacing: '-0.26px',
});

export const PageTitle = styled(Box)({
  fontSize: '24px',
  fontWeight: 700,
  color: F.text,
  fontFamily: F.fontFamily,
  letterSpacing: '-0.48px',
  lineHeight: '28px',
});

// ─── Red warning badge (inline in header) ────────────────────────────────────
export const WarningBadge = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: F.redBg,
  color: F.red,
  borderRadius: '4px',
  padding: '4px 10px',
  fontSize: '12px',
  fontWeight: 600,
  fontFamily: F.fontFamily,
  lineHeight: '16px',
  flexShrink: 0,
  maxWidth: '480px',
});

// ─── Black pill button ────────────────────────────────────────────────────────
export const BlackBtn = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: F.black,
  color: F.white,
  border: 'none',
  borderRadius: '8px',
  padding: '4px 12px',
  height: '28px',
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: F.fontFamily,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  '&:hover': { opacity: 0.85 },
});

export const OutlineBtn = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: 'transparent',
  color: F.text,
  border: `1px solid ${F.border}`,
  borderRadius: '8px',
  padding: '4px 12px',
  height: '28px',
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: F.fontFamily,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '&:hover': { backgroundColor: F.surface },
});

// ─── Card content body ────────────────────────────────────────────────────────
export const CardBody = styled(Box)({
  padding: '16px 24px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

// ─── Small descriptor text above form fields ──────────────────────────────────
export const DetailsLabel = styled(Box)({
  fontSize: '12px',
  color: F.text,
  fontFamily: F.fontFamily,
  lineHeight: '18px',
  fontWeight: 400,
});

export const DetailsSubtitle = styled(Box)({
  fontSize: '14px',
  color: F.textSub,
  fontFamily: F.fontFamily,
  lineHeight: '20px',
  marginTop: '2px',
});

// ─── Form field row ───────────────────────────────────────────────────────────
export const FieldRow = styled(Box)({
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
});

// ─── Individual field box (label + value) ─────────────────────────────────────
export const FieldBox = styled(Box)({
  backgroundColor: F.surface,
  border: `1px solid ${F.border}`,
  borderRadius: '8px',
  padding: '10px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: '120px',
});

export const FieldLabel = styled(Box)({
  fontSize: '12px',
  fontWeight: 400,
  color: F.text,
  fontFamily: F.fontFamily,
  lineHeight: '18px',
});

export const FieldValue = styled(Box)({
  fontSize: '14px',
  fontWeight: 400,
  color: F.text,
  fontFamily: F.fontFamily,
  lineHeight: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

export const FieldSelectEl = styled('select')({
  fontSize: '14px',
  fontWeight: 400,
  color: F.text,
  fontFamily: F.fontFamily,
  lineHeight: '20px',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: 0,
  WebkitAppearance: 'none' as 'none',
  MozAppearance: 'none' as 'none',
  appearance: 'none' as 'none',
  width: '100%',
});

// ─── Learning resource row ────────────────────────────────────────────────────
export const ResourceRow = styled('a')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 10px',
  borderRadius: '6px',
  backgroundColor: F.surface,
  border: `1px solid ${F.border}`,
  textDecoration: 'none',
  cursor: 'pointer',
  maxWidth: '320px',
  '&:hover': { backgroundColor: F.border },
});

export const ResourceIconBox = styled(Box)({
  width: '28px',
  height: '28px',
  borderRadius: '5px',
  backgroundColor: F.purpleB,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  fontSize: '10px',
  fontWeight: 700,
  color: '#4A6FA5',
  fontFamily: F.fontFamily,
  letterSpacing: '-0.1px',
});

export const ResourceName = styled(Box)({
  fontSize: '14px',
  color: F.text,
  fontFamily: F.fontFamily,
  lineHeight: '20px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '220px',
});

// ─── Secondary methods card ───────────────────────────────────────────────────
export const SubSectionTitle = styled(Box)({
  fontSize: '14px',
  fontWeight: 600,
  color: F.text,
  fontFamily: F.fontFamily,
  lineHeight: '20px',
});

export const CheckboxRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px 20px',
});

export const CheckboxItem = styled('label')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '14px',
  color: F.text,
  fontFamily: F.fontFamily,
  lineHeight: '20px',
  cursor: 'pointer',
  userSelect: 'none',
});

// ─── Assessment criteria card ─────────────────────────────────────────────────
export const CriteriaLayout = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '24px',
  justifyContent: 'space-between',
});

export const CriteriaList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  flex: 1,
  minWidth: 0,
});

export const CriteriaLink = styled('a')({
  fontSize: '13px',
  color: F.blue,
  fontFamily: F.fontFamily,
  lineHeight: '18px',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': { textDecoration: 'underline' },
});

export const TagsColumn = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flexShrink: 0,
});

export const TagPurpleA = styled(Box)({
  backgroundColor: F.purpleA,
  color: F.text,
  padding: '5px 8px',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: 400,
  fontFamily: F.fontFamily,
  lineHeight: '18px',
  whiteSpace: 'nowrap',
});

export const TagPurpleB = styled(Box)({
  backgroundColor: F.purpleB,
  color: F.text,
  padding: '5px 8px',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: 400,
  fontFamily: F.fontFamily,
  lineHeight: '18px',
  whiteSpace: 'nowrap',
});

// ─── Bottom two-column row ────────────────────────────────────────────────────
export const BottomRow = styled(Box)({
  display: 'flex',
  gap: '16px',
  alignItems: 'flex-start',
});

// ─── Information & Options panel (left in bottom row) ─────────────────────────
export const InfoPanel = styled(Card)({
  width: '280px',
  flexShrink: 0,
});

export const InfoTabsList = styled(Box)({
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const InfoTabItem = styled(Box, {
  shouldForwardProp: (p) => p !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '12px 12px',
  borderRadius: '12px',
  cursor: 'pointer',
  fontFamily: F.fontFamily,
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: active ? 500 : 400,
  color: active ? F.white : F.text,
  backgroundColor: active ? F.black : 'transparent',
  transition: 'background-color 0.15s, color 0.15s',
  '&:hover': {
    backgroundColor: active ? F.black : F.surface,
  },
}));

export const InfoTabIconWrap = styled(Box)({
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const InfoTabLabel = styled(Box)({
  flex: 1,
  minWidth: 0,
});

export const InfoTabArrow = styled(Box)({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
});

// ─── Evidence / content panel (right in bottom row) ───────────────────────────
export const ContentPanel = styled(Card)({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
});

export const EditorToolbar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0px',
  padding: '0 16px',
  height: '40px',
  borderBottom: `1px solid ${F.border}`,
  flexShrink: 0,
  overflowX: 'auto',
});

export const ToolbarDivider = styled(Box)({
  width: '1px',
  height: '20px',
  backgroundColor: F.border,
  flexShrink: 0,
  margin: '0 6px',
});

export const ToolbarBtn = styled('button')({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '2px 5px',
  borderRadius: '4px',
  fontFamily: F.fontFamily,
  fontSize: '13px',
  color: F.text,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '28px',
  minWidth: '24px',
  flexShrink: 0,
  '&:hover': { backgroundColor: F.surface },
});

export const FontSizeBtn = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  fontSize: '13px',
  color: F.text,
  fontFamily: F.fontFamily,
  cursor: 'pointer',
  padding: '2px 6px',
  borderRadius: '4px',
  height: '28px',
  flexShrink: 0,
  '&:hover': { backgroundColor: F.surface },
});

export const ColorDot = styled(Box)({
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  backgroundColor: '#334155',
  flexShrink: 0,
});

export const EditorBody = styled(Box)({
  padding: '16px 24px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const EditorTextArea = styled('textarea')({
  backgroundColor: F.surface,
  border: `1px solid ${F.border}`,
  borderRadius: '8px',
  padding: '16px 20px',
  fontSize: '14px',
  color: F.text,
  fontFamily: F.fontFamily,
  lineHeight: '20px',
  resize: 'vertical',
  outline: 'none',
  minHeight: '140px',
  boxSizing: 'border-box',
  width: '100%',
  '&::placeholder': { color: F.textPlaceholder },
  '&:focus': { borderColor: 'rgba(28,28,28,0.3)' },
});

export const ActionRow = styled(Box)({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  flexWrap: 'wrap',
});

// ─── Status color helper ───────────────────────────────────────────────────────
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'In Progress': return '#4A90D9';
    case 'Complete':    return '#4CAF50';
    case 'Pending':     return '#F5A623';
    case 'Approved':    return '#4CAF50';
    case 'Rejected':    return '#FF4747';
    default:            return F.text;
  }
};
