import { styled } from '@mui/material/styles';
import { Box, Avatar, InputBase } from '@mui/material';
import { COLORS, SPACING, TYPOGRAPHY } from '@/modules/trainer/theme/tokens';

export const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  height: SPACING.header.height,
  padding: `0 ${SPACING.header.paddingX}px`,
  backgroundColor: COLORS.header.bg,
  gap: 16,
  width: '100%',
});

export const HeaderLeftSection = styled(Box)({
  flex: '0 0 auto',
  minWidth: 120,
});

export const HeaderBreadcrumbs = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: '14px',
  color: COLORS.text.muted,

  '& a': {
    color: COLORS.text.muted,
    textDecoration: 'none',
    '&:hover': { color: COLORS.text.primary },
  },
  '& span': {
    color: COLORS.text.primary,
    fontWeight: 500,
  },
  '& .sep': {
    color: COLORS.text.muted,
    fontSize: '12px',
  },
});

export const HeaderCenterSection = styled(Box)({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
});

export const SearchInputContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  backgroundColor: '#F8F8F8',
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: 8,
  padding: '6px 12px',
  width: '100%',
  maxWidth: 360,
});

export const SearchInput = styled(InputBase)({
  flex: 1,
  fontSize: '14px',
  color: COLORS.text.primary,

  '& input::placeholder': {
    color: COLORS.text.muted,
    opacity: 1,
  },
});

export const SearchClearButton = styled(Box)({
  cursor: 'pointer',
  color: COLORS.text.muted,
  display: 'flex',
  alignItems: 'center',
  '&:hover': { color: COLORS.text.primary },
});

export const SearchKeyboardHint = styled(Box)({
  fontSize: '11px',
  color: COLORS.text.muted,
  backgroundColor: '#EFEFEF',
  padding: '2px 5px',
  borderRadius: 4,
  fontFamily: 'monospace',
  flexShrink: 0,
});

export const HeaderRightSection = styled(Box)({
  flex: '0 0 auto',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const HeaderIconButtons = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
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

export const UserProfileSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: 8,
  '&:hover': { backgroundColor: '#F5F5F5' },
});

export const UserAvatarBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const HeaderAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  backgroundColor: COLORS.sidebar.activeBg,
  color: '#FFFFFF',
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const UserInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
});

export const UserName = styled(Box)({
  fontSize: '14px',
  fontWeight: 600,
  color: COLORS.text.primary,
  lineHeight: 1.2,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const UserRole = styled(Box)({
  fontSize: '12px',
  color: COLORS.text.muted,
  lineHeight: 1.2,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const DropdownChevron = styled(Box)({
  color: COLORS.text.muted,
  display: 'flex',
  alignItems: 'center',
});
