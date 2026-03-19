import { styled } from '@mui/material/styles';
import { Box, InputBase, Breadcrumbs, Typography, Avatar } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS } from '@/theme/tokens';

export const HeaderContainer = styled(Box)({
  height: SPACING.header.height,
  backgroundColor: COLORS.header.bg,
  borderBottom: `1px solid ${COLORS.header.borderColor}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: SPACING.header.paddingX,
  paddingRight: SPACING.header.paddingX,
  gap: 16,
  width: '100%',
});

export const HeaderLeftSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flex: 0.5,
  minWidth: 0,
});

export const HeaderBreadcrumbs = styled(Breadcrumbs)({
  fontSize: '14px',
  color: COLORS.breadcrumb.inactive,

  '& .MuiBreadcrumbs-separator': {
    color: COLORS.breadcrumb.inactive,
  },

  '& a': {
    color: COLORS.breadcrumb.inactive,
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': { color: COLORS.breadcrumb.active },
  },

  '& .MuiBreadcrumbs-li:last-child': {
    color: COLORS.breadcrumb.active,
    fontWeight: 500,
  },
});

export const HeaderCenterSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
  position: 'relative',
});

export const SearchInputContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: 280,
  height: 36,
  border: `1px solid ${COLORS.sidebar.borderColor}`,
  borderRadius: BORDER_RADIUS.input,
  paddingLeft: 12,
  paddingRight: 8,
  backgroundColor: COLORS.contentArea.bg,
  transition: 'all 0.3s ease',
  gap: 8,

  '&:hover': { borderColor: COLORS.text.secondary },

  '&:focus-within': {
    borderColor: COLORS.text.primary,
    backgroundColor: COLORS.header.bg,
  },
});

export const SearchInput = styled(InputBase)({
  flex: 1,
  fontSize: '14px',
  color: COLORS.text.primary,

  '& .MuiInputBase-input': {
    padding: 0,
    fontSize: '14px',
    '&::placeholder': { color: COLORS.text.secondary, opacity: 1 },
  },
});

export const SearchClearButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: COLORS.text.secondary,
  transition: 'color 0.2s ease',
  flexShrink: 0,
  '&:hover': { color: COLORS.text.primary },
});

export const SearchKeyboardHint = styled(Typography)({
  fontSize: '12px',
  color: COLORS.text.secondary,
  marginLeft: 'auto',
  flexShrink: 0,
});

export const HeaderRightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  marginLeft: 16,
  flex: 0.5,
  justifyContent: 'flex-end',
});

export const HeaderIconButtons = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  position: 'relative',
});

export const NotificationDot = styled(Box)({
  position: 'absolute',
  top: 2,
  right: 2,
  width: 7,
  height: 7,
  borderRadius: '50%',
  backgroundColor: COLORS.status.onTrack,
  border: '1.5px solid white',
});

// ─── Profile dropdown ─────────────────────────────────────────────────────────

export const ProfileDropdownWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const UserProfileSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  paddingLeft: 16,
  borderLeft: `1px solid ${COLORS.header.borderColor}`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': { opacity: 0.8 },
});

export const UserAvatarBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const HeaderAvatar = styled(Avatar)({
  width: 36,
  height: 36,
  backgroundColor: COLORS.sidebar.activeBg,
  fontSize: '14px',
  fontWeight: 600,
  color: COLORS.header.bg,
});

export const UserInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 2,
});

export const UserName = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  color: COLORS.text.primary,
  lineHeight: 1,
});

export const UserRole = styled(Typography)({
  fontSize: '12px',
  color: COLORS.text.secondary,
  lineHeight: 1,
});

export const DropdownChevron = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  color: COLORS.text.primary,
  flexShrink: 0,
});

export const ProfileMenuCard = styled(Box)({
  position: 'absolute',
  top: 'calc(100% + 10px)',
  right: 0,
  width: '217px',
  backgroundColor: '#FFFFFF',
  borderRadius: '16px',
  boxShadow: '0px 8px 32px rgba(28,28,28,0.12), 0px 2px 8px rgba(28,28,28,0.06)',
  border: '1px solid rgba(28,28,28,0.06)',
  padding: '4px',
  zIndex: 1300,
  overflow: 'hidden',
  animation: 'profileMenuIn 0.15s ease',
  '@keyframes profileMenuIn': {
    from: { opacity: 0, transform: 'translateY(-6px) scale(0.97)' },
    to:   { opacity: 1, transform: 'translateY(0) scale(1)' },
  },
});

export const ProfileMenuItem = styled(Box)<{ active?: boolean; danger?: boolean }>(({ active, danger }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  backgroundColor: active ? 'rgba(28,28,28,0.05)' : 'transparent',
  transition: 'background-color 0.12s ease',
  '&:hover': {
    backgroundColor: danger ? 'rgba(211,47,47,0.07)' : 'rgba(28,28,28,0.06)',
  },
}));

export const ProfileMenuItemLabel = styled(Box)<{ danger?: boolean }>(({ danger }) => ({
  fontSize: '14px',
  fontWeight: danger ? 500 : 400,
  color: danger ? '#D32F2F' : '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '20px',
  whiteSpace: 'nowrap',
  letterSpacing: 0,
}));

export const ProfileMenuItemArrow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: 'rgba(28,28,28,0.4)',
  fontSize: '14px',
});

export const ProfileMenuDivider = styled(Box)({
  height: '1px',
  backgroundColor: 'rgba(28,28,28,0.08)',
  margin: '4px 0',
});
