import { styled } from '@mui/material/styles';
import { Box, Container, Paper, Tab } from '@mui/material';

export const SettingsContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const SettingsHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SettingsWrapper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const SettingsTabs = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '1rem',
  padding: theme.spacing(2),
  minWidth: 'auto',
  '&.Mui-selected': {
    fontWeight: 600,
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },
}));

export const SettingsTabContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const AvatarUploadArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: theme.palette.action.hover,
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    borderColor: theme.palette.primary.main,
  },
  minHeight: 200,
}));

export const AvatarPreview = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: theme.spacing(2),
  border: `3px solid ${theme.palette.primary.main}`,
}));

export const ProfileFormSection = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

export const ProfileFormBioSection = styled(Box)(({ theme }) => ({
  gridColumn: '1 / -1',
  marginBottom: theme.spacing(3),
}));

export const ProfileFormActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'stretch',
  },
}));

export const NotificationItemWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

export const NotificationItemLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

export const SecurityFormSection = styled(Box)(({ theme }) => ({
  maxWidth: 500,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const SecurityFormActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

export const SuccessAlert = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));
