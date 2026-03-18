/**
 * Styled components for Learning Journals module
 */

import { styled } from '@mui/material/styles';
import { Box, Button, Paper, TextField, Avatar } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '@/modules/learner/theme/tokens';

export const JournalsContainer = styled(Box)({
  padding: `${SPACING.contentPadding}px`,
});

export const TopBar = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  marginBottom: `${SPACING.sectionGap}px`,
});

export const TopBarLeft = styled(Box)({
  display: 'flex',
  gap: '12px',
});

export const TopBarRight = styled(Box)({
  display: 'flex',
  gap: '12px',
});

export const ShowTimesheetButton = styled(Button)({
  padding: '8px 20px',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: TYPOGRAPHY.fontFamily,

  '&:hover': {
    backgroundColor: 'rgba(28,28,28,0.85)',
  },
});

export const BarButton = styled(Button)({
  padding: '8px 16px',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  backgroundColor: COLORS.button.blackBg,
  color: '#FFFFFF',
  border: 'none',
  borderRadius: `${BORDER_RADIUS.input}px`,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: TYPOGRAPHY.fontFamily,

  '&:hover': {
    backgroundColor: '#2D2D3D',
  },
});

export const TimelineContainer = styled(Box)({
  position: 'relative',
});

export const TimelineMarker = styled(Box)({
  display: 'flex',
  gap: '16px',
  marginBottom: '32px',
  alignItems: 'flex-start',
});

export const TimelineDate = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '35px',
  minWidth: '35px',
  flexShrink: 0,
  paddingTop: '4px',
});

export const TimelineDateDay = styled(Box)({
  fontSize: '24px',
  fontWeight: 700,
  color: COLORS.button.blackBg,
  lineHeight: '1',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const TimelineDateMonth = styled(Box)({
  fontSize: '12px',
  fontWeight: 400,
  color: COLORS.text.secondary,
  lineHeight: '1.4',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const TimelineDateYear = styled(Box)({
  fontSize: '12px',
  fontWeight: 400,
  color: COLORS.text.secondary,
  lineHeight: '1.4',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const TimelinePoint = styled(Box)({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  border: `2px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,
  flexShrink: 0,
  marginTop: '6px',
  position: 'relative',
  zIndex: 1,
});

export const TimelineCircleColumn = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '23px',
  minWidth: '23px',
  flexShrink: 0,
  alignSelf: 'stretch',
});

export const TimelineConnector = styled(Box)({
  flex: 1,
  width: '2px',
  backgroundColor: COLORS.card.border,
  marginTop: '4px',
  minHeight: '16px',
});

export const JournalCard = styled(Paper)({
  overflow: 'hidden',
  backgroundColor: COLORS.card.bg,
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: `${BORDER_RADIUS.card}px`,
  transition: 'all 0.3s ease',
  boxShadow: 'none',
  fontFamily: TYPOGRAPHY.fontFamily,
  width: '100%',

  '&:hover': {
    borderColor: COLORS.text.primary,
  },
});

export const JournalHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: COLORS.button.blackBg,
  color: '#FFFFFF',
  padding: '12px 16px',
  cursor: 'pointer',
  borderRadius: '12px 12px 0 0',
  transition: 'background-color 0.3s ease',

  '&:hover': {
    backgroundColor: '#2D2D3D',
  },
});

export const HeaderLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: 1,
});

export const UserAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: '#FFFFFF',
  fontWeight: 600,
  fontSize: '12px',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const UserName = styled(Box)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#FFFFFF',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const WelcomeText = styled(Box)({
  display: 'inline-block',
  backgroundColor: 'rgba(76, 175, 80, 0.15)',
  color: COLORS.progress.green,
  padding: '4px 8px',
  borderRadius: `${BORDER_RADIUS.small}px`,
  fontSize: '14px',
  fontWeight: 500,
  fontFamily: TYPOGRAPHY.fontFamily,
  marginLeft: '8px',
});

export const ChevronIcon = styled(Box)({
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: '#FFFFFF',
  transition: 'transform 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&.expanded': {
    transform: 'rotate(180deg)',
  },
});

export const JournalForm = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '16px',
  backgroundColor: COLORS.card.bg,
});

export const FormRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap: '16px',

  '&.full': {
    gridTemplateColumns: '1fr',
  },

  '&.double': {
    gridTemplateColumns: '1fr 1fr',
  },

  '&.three': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
});

export const FormGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: `${BORDER_RADIUS.input}px`,
    borderColor: COLORS.card.border,
    fontSize: '14px',
    fontFamily: TYPOGRAPHY.fontFamily,

    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: COLORS.text.secondary,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 12px',
    fontSize: '14px',

    '&::placeholder': {
      color: COLORS.text.secondary,
      opacity: 0.7,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: COLORS.card.border,
  },
});

export const StyledSelect = styled('select')({
  padding: '10px 12px',
  borderRadius: `${BORDER_RADIUS.input}px`,
  border: `1px solid ${COLORS.card.border}`,
  backgroundColor: COLORS.card.bg,
  fontSize: '14px',
  fontWeight: 400,
  cursor: 'pointer',
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  width: '100%',

  '&:hover': {
    borderColor: COLORS.text.secondary,
  },

  '&:focus': {
    outline: 'none',
    borderColor: COLORS.text.primary,
  },
});

export const TimeInput = styled(TextField)({
  '& .MuiOutlinedInput-input': {
    textAlign: 'center',
    padding: '8px 4px',
    fontSize: '14px',
    fontFamily: 'monospace',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: `${BORDER_RADIUS.input}px`,
  },
});

export const AMPMToggle = styled(Button)({
  padding: '6px 12px',
  fontSize: '12px',
  fontWeight: 500,
  textTransform: 'uppercase',
  backgroundColor: COLORS.card.bg,
  color: COLORS.text.primary,
  border: `1px solid ${COLORS.card.border}`,
  borderRadius: `${BORDER_RADIUS.input}px`,
  cursor: 'pointer',
  fontFamily: TYPOGRAPHY.fontFamily,

  '&.active': {
    backgroundColor: COLORS.button.blackBg,
    color: '#FFFFFF',
  },
});

export const CheckboxGroup = styled(Box)({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const ReflectionField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: `${BORDER_RADIUS.input}px`,
    borderColor: COLORS.card.border,
    fontSize: '14px',
    fontFamily: TYPOGRAPHY.fontFamily,

    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: COLORS.text.secondary,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '12px',
    fontSize: '14px',

    '&::placeholder': {
      color: COLORS.text.secondary,
      opacity: 0.7,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: COLORS.card.border,
  },
});

export const BottomToolbar = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  paddingTop: '12px',
  borderTop: `1px solid ${COLORS.card.border}`,
});

export const ToolbarLeft = styled(Box)({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  flex: 1,
});

export const ToolbarItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '14px',
  fontWeight: 500,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  cursor: 'pointer',

  '&:hover': {
    color: COLORS.button.blackBg,
  },
});

export const UploadButton = styled(Button)({
  padding: '6px 12px',
  fontSize: '13px',
  fontWeight: 500,
  textTransform: 'none',
  backgroundColor: COLORS.button.blackBg,
  color: '#FFFFFF',
  border: 'none',
  borderRadius: `${BORDER_RADIUS.input}px`,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: TYPOGRAPHY.fontFamily,

  '&:hover': {
    backgroundColor: '#2D2D3D',
  },
});

export const ActionButtons = styled(Box)({
  display: 'flex',
  gap: '12px',
  justifyContent: 'flex-end',
  marginTop: '0',
});

export const CancelButton = styled(Button)({
  padding: '4px 8px',
  height: '28px',
  minHeight: '28px',
  fontSize: '13px',
  fontWeight: 500,
  textTransform: 'none',
  backgroundColor: 'transparent',
  color: COLORS.text.primary,
  border: `1px solid rgba(28, 28, 28, 0.1)`,
  borderRadius: `${BORDER_RADIUS.input}px`,
  cursor: 'pointer',
  fontFamily: TYPOGRAPHY.fontFamily,
  minWidth: 'unset',
  lineHeight: 1,

  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
});

export const CreateButton = styled(Button)({
  padding: '4px 8px',
  height: '28px',
  minHeight: '28px',
  fontSize: '13px',
  fontWeight: 500,
  textTransform: 'none',
  backgroundColor: COLORS.button.blackBg,
  color: '#FFFFFF',
  border: 'none',
  borderRadius: `${BORDER_RADIUS.input}px`,
  cursor: 'pointer',
  fontFamily: TYPOGRAPHY.fontFamily,
  minWidth: 'unset',
  lineHeight: 1,

  '&:hover': {
    backgroundColor: '#2D2D3D',
  },
});

export const FormLabel = styled('label')({
  fontSize: '12px',
  fontWeight: 500,
  color: COLORS.text.secondary,
  display: 'block',
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const ExpandableSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 0',
  borderTop: `1px solid ${COLORS.card.border}`,
  fontSize: '14px',
  fontWeight: 500,
  color: COLORS.text.primary,
  cursor: 'pointer',
  fontFamily: TYPOGRAPHY.fontFamily,

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
});

export const CountBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: COLORS.progress.green,
  color: '#FFFFFF',
  fontSize: '12px',
  fontWeight: 600,
  fontFamily: TYPOGRAPHY.fontFamily,
});

// --- Figma-accurate form field components ---

export const FieldSubLabel = styled('span')({
  fontSize: '12px',
  fontWeight: 400,
  color: 'rgba(28, 28, 28, 0.4)',
  fontFamily: TYPOGRAPHY.fontFamily,
  display: 'block',
});

export const DateFieldContainer = styled(Box)({
  backgroundColor: 'rgba(28, 28, 28, 0.05)',
  border: '1px solid rgba(28, 28, 28, 0.1)',
  borderRadius: '8px',
  padding: '12px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  cursor: 'pointer',
  minWidth: 0,

  '&:hover': {
    borderColor: 'rgba(28, 28, 28, 0.25)',
  },
});

export const ActivityTypeContainer = styled(Box)({
  backgroundColor: 'rgba(28, 28, 28, 0.05)',
  border: '1px solid rgba(28, 28, 28, 0.1)',
  borderRadius: '8px',
  padding: '12px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: 0,
});

export const TimeDurationContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: 0,
});

export const TimeBox = styled('input')({
  width: '50px',
  height: '34px',
  border: '1px solid rgba(28, 28, 28, 0.15)',
  borderRadius: '6px',
  textAlign: 'center',
  fontSize: '14px',
  fontFamily: TYPOGRAPHY.fontFamily,
  backgroundColor: '#FFFFFF',
  color: COLORS.text.primary,
  outline: 'none',
  flexShrink: 0,

  '&:focus': {
    borderColor: COLORS.text.primary,
  },

  '&::placeholder': {
    color: 'rgba(28, 28, 28, 0.3)',
  },
});

export const TimeSeparator = styled('span')({
  fontSize: '16px',
  fontWeight: 500,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: '34px',
  flexShrink: 0,
});

export const AMPMButton = styled(Button)({
  height: '28px',
  minHeight: '28px',
  minWidth: '38px',
  padding: '0 8px',
  fontSize: '12px',
  fontWeight: 500,
  textTransform: 'none',
  backgroundColor: COLORS.button.blackBg,
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontFamily: TYPOGRAPHY.fontFamily,
  lineHeight: 1,
  flexShrink: 0,

  '&:hover': {
    backgroundColor: '#2D2D3D',
  },
});
