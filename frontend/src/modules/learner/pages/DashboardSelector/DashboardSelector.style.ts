import { styled } from '@mui/material/styles';
import { Box, InputBase } from '@mui/material';

/* ─── Page shell ─────────────────────────────────────────────── */
export const PageWrapper = styled(Box)({
  display: 'flex',
  height: '100vh',
  backgroundColor: '#FFFFFF',
  fontFamily: "'Inter', sans-serif",
  overflow: 'hidden',
});

/* ─── Sidebar ────────────────────────────────────────────────── */
export const SelectorSidebar = styled(Box)({
  width: 150,
  backgroundColor: '#FFFFFF',
  borderRight: '1px solid #F0F0F0',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  paddingTop: 16,
});

export const SidebarLogoArea = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '0 16px 20px',
});

export const SidebarLogoBox = styled(Box)({
  width: 32,
  height: 32,
  backgroundColor: '#1E1E2D',
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const SidebarLogoText = styled(Box)({
  fontSize: '13px',
  fontWeight: 700,
  color: '#1E1E2D',
  fontFamily: "'Inter', sans-serif",
  lineHeight: 1.2,
});

export const SidebarLogoSubtext = styled(Box)({
  fontSize: '9px',
  color: '#A0A0A0',
  fontFamily: "'Inter', sans-serif",
  lineHeight: 1.1,
});

export const SidebarSectionLabel = styled(Box)({
  fontSize: '11px',
  fontWeight: 500,
  color: '#B0B0B0',
  padding: '0 16px 8px',
  fontFamily: "'Inter', sans-serif",
  letterSpacing: '0.02em',
});

export const SidebarNavItem = styled(Box)<{ active?: boolean }>(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 12px',
  fontSize: '13px',
  fontWeight: active ? 600 : 400,
  color: active ? '#FFFFFF' : '#374151',
  cursor: 'pointer',
  borderRadius: 20,
  margin: '2px 8px',
  backgroundColor: active ? '#1E1E2D' : 'transparent',
  fontFamily: "'Inter', sans-serif",
  transition: 'background-color 0.15s ease',
  '&:hover': {
    backgroundColor: active ? '#1E1E2D' : '#F5F5F5',
  },
}));

/* ─── Main area ──────────────────────────────────────────────── */
export const MainContent = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',
});

/* ─── Top bar (breadcrumb + search + user) ───────────────────── */
export const TopBar = styled(Box)({
  height: 52,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 24px',
  borderBottom: '1px solid #F0F0F0',
  flexShrink: 0,
  backgroundColor: '#FFFFFF',
});

export const BreadcrumbRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
});

export const BreadcrumbItem = styled(Box)<{ active?: boolean }>(({ active }) => ({
  fontSize: '13px',
  fontWeight: active ? 500 : 400,
  color: active ? '#1E1E2D' : '#9CA3AF',
  fontFamily: "'Inter', sans-serif",
}));

export const BreadcrumbSep = styled(Box)({
  fontSize: '13px',
  color: '#9CA3AF',
  fontFamily: "'Inter', sans-serif",
});

export const TopBarRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

export const SearchBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  backgroundColor: '#F5F5F7',
  borderRadius: 8,
  padding: '6px 10px',
  width: 200,
});

export const SearchInput = styled(InputBase)({
  fontSize: '12px',
  color: '#9CA3AF',
  flex: 1,
  fontFamily: "'Inter', sans-serif",
  '& input': {
    padding: 0,
  },
  '& input::placeholder': {
    color: '#9CA3AF',
    opacity: 1,
  },
});

export const SearchShortcut = styled(Box)({
  fontSize: '11px',
  color: '#C4C4C4',
  backgroundColor: '#EBEBEB',
  borderRadius: 4,
  padding: '1px 5px',
  fontFamily: "'Inter', sans-serif",
  whiteSpace: 'nowrap' as const,
});

export const UserChip = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
});

export const UserAvatar = styled(Box)({
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #4DD9C0 0%, #1FA8C9 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  flexShrink: 0,
});

export const UserName = styled(Box)({
  fontSize: '13px',
  fontWeight: 500,
  color: '#1E1E2D',
  fontFamily: "'Inter', sans-serif",
});

/* ─── Content body ───────────────────────────────────────────── */
export const ContentBody = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '24px',
  backgroundColor: '#FFFFFF',
});

/* ─── Cards grid ─────────────────────────────────────────────── */
export const CardsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 16,
});

/* ─── Card — Figma node 55:12233 ──────────────────────────────
   bg: #F7F9FB (Primary/Light)
   border: 1px solid #95A4FC (Secondary/Purple A)
   radius: 16px
   padding: 23px 24px
*/
export const ProgramCard = styled(Box)({
  backgroundColor: '#F7F9FB',
  borderRadius: 16,
  border: '1px solid #95A4FC',
  padding: '23px 24px',
  cursor: 'pointer',
  transition: 'box-shadow 0.15s ease',
  position: 'relative',
  '&:hover': {
    boxShadow: '0 4px 16px rgba(149,164,252,0.25)',
  },
});

/* Card top row: title/subtitle left, large avatar right */
export const CardTitleRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 4,
});

/* Title: 14px Semi Bold, black — Figma: font-semibold text-black text-[14px] */
export const CardTitle = styled(Box)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#000000',
  lineHeight: '20px',
  fontFamily: "'Inter', sans-serif",
  maxWidth: 'calc(100% - 52px)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap' as const,
});

/* Large teal avatar top-right — 40px */
export const CardTealAvatar = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #5ECFBF 0%, #4498C5 100%)',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

/* Last activity: 12px Regular rgba(28,28,28,0.4) */
export const CardLastActivity = styled(Box)({
  fontSize: '12px',
  fontWeight: 400,
  color: 'rgba(28,28,28,0.4)',
  lineHeight: '18px',
  fontFamily: "'Inter', sans-serif",
  marginBottom: 12,
});

/* Middle row: small avatar left + status right */
export const CardStatusRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
});

/* Small teal avatar 24px */
export const CardUserIcon = styled(Box)({
  width: 24,
  height: 24,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #5ECFBF 0%, #4498C5 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  overflow: 'hidden',
});

/* Status text — Figma uses #8A8CD9 for In Progress; each status gets own color */
export const StatusText = styled(Box)<{ status: string }>(({ status }) => {
  const colors: Record<string, string> = {
    'In Progress':       '#8A8CD9',
    'Complete':          '#4CAF50',
    'Pending':           '#F59E0B',
    'Approved':          '#22C55E',
    'Not task Assigned': '#6B7280',
  };
  return {
    fontSize: '12px',
    fontWeight: 400,
    color: colors[status] ?? '#8A8CD9',
    lineHeight: '18px',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  };
});

/* Dot circle — Figma uses a Vector SVG; replicated as a colored circle */
export const StatusDot = styled('span')<{ status: string }>(({ status }) => {
  const colors: Record<string, string> = {
    'In Progress':       '#8A8CD9',
    'Complete':          '#4CAF50',
    'Pending':           '#F59E0B',
    'Approved':          '#22C55E',
    'Not task Assigned': '#EF4444',
  };
  return {
    display: 'inline-block',
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: colors[status] ?? '#8A8CD9',
    flexShrink: 0,
  };
});

/* Progress track — Figma: 4px high, rgba(28,28,28,0.1), radius 16px — NO fill */
export const CardProgressTrack = styled(Box)({
  height: 4,
  backgroundColor: 'rgba(28,28,28,0.1)',
  borderRadius: 16,
  marginBottom: 12,
});

/* Card bottom row: task count + percent */
export const CardBottomRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

/* Task count uses inline spans with different opacity levels */
export const TaskCountRow = styled(Box)({
  fontSize: '12px',
  lineHeight: '18px',
  fontFamily: "'Inter', sans-serif",
  color: '#1C1C1C',
  display: 'flex',
  alignItems: 'center',
  gap: 3,
});

/* "15" and "48" — black */
export const TaskNumber = styled('span')({
  fontWeight: 400,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  fontSize: '12px',
});

/* "/" separator — rgba(28,28,28,0.2) */
export const TaskSep = styled('span')({
  color: 'rgba(28,28,28,0.2)',
  fontFamily: "'Inter', sans-serif",
  fontSize: '12px',
});

/* "Total Tasks" label — rgba(28,28,28,0.4) */
export const TaskLabel = styled('span')({
  color: 'rgba(28,28,28,0.4)',
  fontFamily: "'Inter', sans-serif",
  fontSize: '12px',
});

/* "51%" right — 12px, black */
export const PercentText = styled(Box)({
  fontSize: '12px',
  fontWeight: 400,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '18px',
});
