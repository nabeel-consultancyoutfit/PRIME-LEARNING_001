/**
 * ViewPlanModal styled components
 * Figma node: 40000074-43727  ("Set Criteria" modal)
 *
 * Tokens (same Inter design system as TaskDetail):
 *   Text:        #1C1C1C
 *   Surface:     rgba(28,28,28,0.05)  ≈ #f4f4f4
 *   Border:      rgba(28,28,28,0.1)
 *   Shadow:      0px 2px 6px rgba(13,10,44,0.08)
 *   Modal bg:    #FFFFFF
 *   Header bg:   rgba(28,28,28,0.05)
 *   Black btn:   #1C1C1C
 */

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const F = {
  fontFamily: "'Inter', sans-serif",
  text: '#1C1C1C',
  textMuted: 'rgba(28,28,28,0.4)',
  textPlaceholder: 'rgba(28,28,28,0.2)',
  surface: 'rgba(28,28,28,0.05)',
  border: 'rgba(28,28,28,0.1)',
  shadow: '0px 2px 6px rgba(13,10,44,0.08)',
  black: '#1C1C1C',
  white: '#FFFFFF',
};

// ─── Backdrop ─────────────────────────────────────────────────────────────────
export const Backdrop = styled(Box)({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.45)',
  zIndex: 1300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px 16px',
});

// ─── Modal container ──────────────────────────────────────────────────────────
export const ModalContainer = styled(Box)({
  width: '100%',
  maxWidth: '800px',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  boxShadow: '0px 8px 32px rgba(13,10,44,0.18)',
  overflow: 'hidden',
  backgroundColor: F.white,
});

// ─── Modal header ─────────────────────────────────────────────────────────────
export const ModalHeader = styled(Box)({
  backgroundColor: F.surface,
  minHeight: '52px',
  padding: '0 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  flexShrink: 0,
  borderBottom: `1px solid ${F.border}`,
});

export const ModalTitle = styled(Box)({
  fontSize: '18px',
  fontWeight: 700,
  color: F.black,
  fontFamily: F.fontFamily,
  letterSpacing: '-0.36px',
  lineHeight: '24px',
});

export const CloseBtn = styled('button')({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '6px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: F.textMuted,
  flexShrink: 0,
  '&:hover': {
    backgroundColor: F.border,
    color: F.black,
  },
});

// ─── Modal body (scrollable) ──────────────────────────────────────────────────
export const ModalBody = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '20px 20px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  backgroundColor: F.white,
  // Scrollbar styling
  '&::-webkit-scrollbar': { width: '6px' },
  '&::-webkit-scrollbar-track': { background: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    background: F.border,
    borderRadius: '3px',
  },
});

// ─── Expand all button ────────────────────────────────────────────────────────
export const ExpandAllBtn = styled('button')({
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
  alignSelf: 'flex-start',
  '&:hover': { opacity: 0.85 },
});

// ─── Criteria list wrapper ────────────────────────────────────────────────────
export const CriteriaListBox = styled(Box)({
  border: `1px solid ${F.border}`,
  borderRadius: '12px',
  overflow: 'hidden',
});

// ─── Single criteria item ─────────────────────────────────────────────────────
export const CriteriaItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 16px',
  cursor: 'pointer',
  borderBottom: `1px solid ${F.border}`,
  backgroundColor: F.white,
  transition: 'background-color 0.12s',
  '&:last-child': { borderBottom: 'none' },
  '&:hover': { backgroundColor: F.surface },
});

export const CriteriaItemLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: 1,
  minWidth: 0,
});

export const CriteriaItemText = styled(Box)({
  fontSize: '14px',
  fontWeight: 400,
  color: F.black,
  fontFamily: F.fontFamily,
  lineHeight: '20px',
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const CriteriaItemArrow = styled(Box)({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  color: F.textMuted,
});

// ─── Criteria expanded content ────────────────────────────────────────────────
export const CriteriaExpandedContent = styled(Box)({
  backgroundColor: F.surface,
  borderBottom: `1px solid ${F.border}`,
  padding: '12px 16px 12px 52px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const SubCriteriaItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '13px',
  color: F.black,
  fontFamily: F.fontFamily,
  lineHeight: '18px',
  padding: '4px 0',
  cursor: 'pointer',
  '&:hover': { color: '#5689F5' },
});

// ─── Evidence section header ──────────────────────────────────────────────────
export const EvidenceSectionHeader = styled(Box)({
  backgroundColor: F.surface,
  padding: '14px 16px',
  borderRadius: '12px 12px 0 0',
  borderBottom: `1px solid ${F.border}`,
  flexShrink: 0,
});

export const EvidenceSectionTitle = styled(Box)({
  fontSize: '18px',
  fontWeight: 700,
  color: F.black,
  fontFamily: F.fontFamily,
  letterSpacing: '-0.36px',
  lineHeight: '24px',
});

// ─── Evidence editor wrapper ──────────────────────────────────────────────────
export const EvidenceWrapper = styled(Box)({
  border: `1px solid ${F.border}`,
  borderRadius: '12px',
  overflow: 'hidden',
  flexShrink: 0,
});

// ─── Editor toolbar ───────────────────────────────────────────────────────────
export const EditorToolbar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  height: '40px',
  borderBottom: `1px solid ${F.border}`,
  backgroundColor: F.white,
  overflowX: 'auto',
  gap: 0,
  '&::-webkit-scrollbar': { display: 'none' },
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
  color: F.black,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '28px',
  minWidth: '24px',
  flexShrink: 0,
  '&:hover': { backgroundColor: F.surface },
});

export const FontSizeBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  fontSize: '13px',
  color: '#334155',
  fontFamily: "'Roboto', 'Inter', sans-serif",
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

// ─── Editor textarea ──────────────────────────────────────────────────────────
export const EditorTextArea = styled('textarea')({
  width: '100%',
  minHeight: '120px',
  backgroundColor: F.surface,
  border: 'none',
  padding: '16px 20px',
  fontSize: '14px',
  color: F.black,
  fontFamily: F.fontFamily,
  lineHeight: '20px',
  resize: 'vertical',
  outline: 'none',
  boxSizing: 'border-box',
  '&::placeholder': { color: F.textPlaceholder },
});

// ─── Modal footer ─────────────────────────────────────────────────────────────
export const ModalFooter = styled(Box)({
  padding: '16px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '8px',
  borderTop: `1px solid ${F.border}`,
  flexShrink: 0,
  backgroundColor: F.white,
});

export const BlackBtn = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: F.black,
  color: F.white,
  border: 'none',
  borderRadius: '8px',
  padding: '4px 12px',
  height: '32px',
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: F.fontFamily,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '&:hover': { opacity: 0.85 },
});

export const OutlineBtn = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: 'transparent',
  color: F.black,
  border: `1px solid ${F.border}`,
  borderRadius: '8px',
  padding: '4px 12px',
  height: '32px',
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: F.fontFamily,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '&:hover': { backgroundColor: F.surface },
});
