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
