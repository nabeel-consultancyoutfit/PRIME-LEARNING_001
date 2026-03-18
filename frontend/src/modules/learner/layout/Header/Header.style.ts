import { styled } from '@mui/material/styles';
import { Box, InputBase, Breadcrumbs, Typography, Avatar } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS } from '@/modules/learner/theme/tokens';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  height: SPACING.header.height,
  backgroundColor: COLORS.header.bg,
  borderBottom: `1px solid ${COLORS.header.borderColor}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: SPACING.header.paddingX,
  paddingRight: SPACING.header.paddingX,
  gap: theme.spacing(2),
}));

export const HeaderLeftSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 0.5,
  minWidth: 0,
}));

export const HeaderBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  fontSize: '14px',
  color: COLORS.breadcrumb.inactive,

  '& .MuiBreadcrumbs-separator': {
    color: COLORS.breadcrumb.inactive,
  },

  '& a': {
    color: COLORS.breadcrumb.inactive,
    textDecoration: 'none',
    cursor: 'pointer',

    '&:hover': {
      color: COLORS.breadcrumb.active,
    },
  },

  '& .MuiBreadcrumbs-li': {
    '&:last-child': {
      color: COLORS.breadcrumb.active,
      fontWeight: 500,
    },
  },
}));

export const HeaderCenterSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
  position: 'relative',
}));

export const SearchInputContainer = styled(Box)(({ theme }) => ({
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

  '&:hover': {
    borderColor: COLORS.text.secondary,
  },

  '&:focus-within': {
    borderColor: COLORS.text.primary,
    backgroundColor: COLORS.header.bg,
  },
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  fontSize: '14px',
  color: COLORS.text.primary,

  '& .MuiInputBase-input': {
    padding: 0,
    fontSize: '14px',

    '&::placeholder': {
      color: COLORS.text.secondary,
      opacity: 1,
    },
  },
}));

export const SearchClearButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: COLORS.text.secondary,
  transition: 'color 0.2s ease',
  flexShrink: 0,

  '&:hover': {
    color: COLORS.text.primary,
  },
}));

export const SearchKeyboardHint = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: COLORS.text.secondary,
  marginLeft: 'auto',
  flexShrink: 0,
}));

export const HeaderRightSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginLeft: theme.spacing(2),
  flex: 0.5,
  justifyContent: 'flex-end',
}));

export const HeaderIconButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  position: 'relative',
}));

export const NotificationDot = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: '#FF0000',
  top: 4,
  right: 4,
}));

export const UserProfileSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  borderLeft: `1px solid ${COLORS.header.borderColor}`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',

  '&:hover': {
    opacity: 0.8,
  },
}));

export const UserAvatarBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(0.25),
}));

export const UserName = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: COLORS.text.primary,
  lineHeight: 1,
}));

export const UserRole = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: COLORS.text.secondary,
  lineHeight: 1,
}));

export const HeaderAvatar = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  backgroundColor: '#7B61FF',
  fontSize: '14px',
  fontWeight: 600,
  color: COLORS.header.bg,
}));

export const DropdownChevron = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: COLORS.text.primary,
  flexShrink: 0,
}));

// ─── Profile Dropdown ─────────────────────────────────────────────────────────

/** Outer wrapper so the profile section + menu are stacked in a relative container */
export const ProfileDropdownWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

/**
 * The dropdown card — matches Figma node 61:11971
 * Width: 217px, white bg, rounded 16px, shadow
 * Appears below-right of the profile chip
 */
export const ProfileMenuCard = styled(Box)(({ theme }) => ({
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
  // entrance animation
  animation: 'profileMenuIn 0.15s ease',
  '@keyframes profileMenuIn': {
    from: { opacity: 0, transform: 'translateY(-6px) scale(0.97)' },
    to:   { opacity: 1, transform: 'translateY(0)  scale(1)' },
  },
}));

/**
 * Each menu row — 209px wide, 36px tall
 * Padding: 8px top/bottom, 12px left/right — matches Figma _Sidebar Item
 */
export const ProfileMenuItem = styled(Box)<{ active?: boolean }>(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  backgroundColor: active ? 'rgba(28,28,28,0.05)' : 'transparent',
  transition: 'background-color 0.12s ease',
  '&:hover': {
    backgroundColor: 'rgba(28,28,28,0.06)',
  },
}));

export const ProfileMenuItemLabel = styled(Box)({
  fontSize: '14px',
  fontWeight: 400,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '20px',
  whiteSpace: 'nowrap',
  letterSpacing: 0,
});

export const ProfileMenuItemArrow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: 'rgba(28,28,28,0.4)',
  fontSize: '14px',
});
