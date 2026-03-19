/**
 * Set a Status Modal — Shared Component
 * Pixel-perfect match to Figma node 342:36086
 *
 * Modal contents:
 *  • Header bar: "Set a Status" title + × close
 *  • Toggle: "Show my online status"
 *  • Radio-style checkboxes: Online | Available | Busy | Out of office
 *  • Out of office message textarea
 *  • Save / Cancel buttons
 */
import React, { useState } from 'react';
import { Box, Typography, Modal, Switch, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';

// ─── Types ─────────────────────────────────────────────────────────────────

type StatusOption = 'Online' | 'Available' | 'Busy' | 'Out of office';

export interface SetStatusModalProps {
  open: boolean;
  onClose: () => void;
}

// ─── Styled Components ──────────────────────────────────────────────────────

const Backdrop = styled(Box)({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1400,
});

const ModalCard = styled(Box)({
  width: 496,
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  boxShadow: '0px 2px 6px 0px rgba(13,10,44,0.08)',
  overflow: 'hidden',
  fontFamily: "'Inter', sans-serif",
  animation: 'statusModalIn 0.15s ease',
  '@keyframes statusModalIn': {
    from: { opacity: 0, transform: 'scale(0.96) translateY(-8px)' },
    to:   { opacity: 1, transform: 'scale(1)   translateY(0)' },
  },
});

const TitleBar = styled(Box)({
  backgroundColor: '#F4F4F4',
  height: 45,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
  borderRadius: '12px 12px 0 0',
});

const TitleText = styled(Typography)({
  fontSize: 18,
  fontWeight: 700,
  color: '#000000',
  fontFamily: "'Inter', sans-serif",
  letterSpacing: '-0.36px',
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
});

const CloseButton = styled(Box)({
  width: 32,
  height: 32,
  borderRadius: '50%',
  border: '1.5px solid #1C1C1C',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '#1C1C1C',
  flexShrink: 0,
  transition: 'background-color 0.12s ease',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.06)' },
});

const ModalBody = styled(Box)({
  backgroundColor: '#FFFFFF',
  padding: '24px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  borderRadius: '0 0 12px 12px',
});

const InnerContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
  paddingTop: 8,
  paddingBottom: 8,
});

const ToggleRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

const ToggleLabel = styled(Typography)({
  fontSize: 12,
  fontWeight: 400,
  color: 'rgba(28,28,28,0.8)',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '18px',
  whiteSpace: 'nowrap',
});

const StatusSwitch = styled(Switch)({
  width: 36,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#22C55E',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 16,
    height: 16,
    boxShadow: 'none',
  },
  '& .MuiSwitch-track': {
    borderRadius: 10,
    backgroundColor: 'rgba(28,28,28,0.2)',
    opacity: 1,
  },
});

const OptionsWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

const OptionRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 0,
  cursor: 'pointer',
  userSelect: 'none',
});

const CheckboxBox = styled(Box)<{ checked: boolean }>(({ checked }) => ({
  width: 18,
  height: 18,
  border: checked ? 'none' : '1.5px solid rgba(28,28,28,0.35)',
  borderRadius: '3px',
  backgroundColor: checked ? '#1C1C1C' : 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 10,
  flexShrink: 0,
  transition: 'background-color 0.1s ease',
}));

const CheckMark = () => (
  <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
    <path d="M1 3.5L4 6.5L10 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OptionLabel = styled(Typography)({
  fontSize: 14,
  fontWeight: 400,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '20px',
  whiteSpace: 'nowrap',
});

const OOOSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  height: 76,
  width: '100%',
});

const OOOLabel = styled(Typography)({
  fontSize: 12,
  fontWeight: 400,
  color: 'rgba(28,28,28,0.8)',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '18px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
});

const OOOInput = styled(InputBase)({
  flex: 1,
  border: '1px solid rgba(28,28,28,0.4)',
  borderRadius: '4px',
  width: '100%',
  fontSize: 14,
  fontFamily: "'Inter', sans-serif",
  padding: '4px 8px',
  alignItems: 'flex-start',
  '& .MuiInputBase-input': {
    padding: 0,
    height: '100%',
  },
});

const ButtonsRow = styled(Box)({
  display: 'flex',
  gap: 4,
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
});

const PillButton = styled(Box)({
  backgroundColor: '#000000',
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: 400,
  fontFamily: "'Inter', sans-serif",
  lineHeight: '20px',
  borderRadius: 16,
  padding: '2px 9px',
  minHeight: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '&:hover': { opacity: 0.85 },
});

// ─── STATUS OPTIONS ─────────────────────────────────────────────────────────

const STATUS_OPTIONS: StatusOption[] = ['Online', 'Available', 'Busy', 'Out of office'];

// ─── Component ──────────────────────────────────────────────────────────────

const SetStatusModal: React.FC<SetStatusModalProps> = ({ open, onClose }) => {
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [selectedStatus, setSelectedStatus]     = useState<StatusOption>('Online');
  const [oooMessage, setOooMessage]             = useState('');

  const handleSave = () => {
    onClose();
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} disableAutoFocus>
      <Backdrop onClick={onClose}>
        <ModalCard onClick={(e) => e.stopPropagation()}>

          {/* Title bar */}
          <TitleBar>
            <TitleText>Set a Status</TitleText>
            <CloseButton onClick={onClose}>
              <CloseIcon sx={{ fontSize: '16px' }} />
            </CloseButton>
          </TitleBar>

          {/* Body */}
          <ModalBody>
            <InnerContent>

              {/* Toggle */}
              <ToggleRow>
                <ToggleLabel>Show my online status:</ToggleLabel>
                <StatusSwitch
                  checked={showOnlineStatus}
                  onChange={(e) => setShowOnlineStatus(e.target.checked)}
                  size="small"
                />
              </ToggleRow>

              {/* Status checkboxes — single select */}
              <OptionsWrapper>
                {STATUS_OPTIONS.map((opt) => (
                  <OptionRow key={opt} onClick={() => setSelectedStatus(opt)}>
                    <CheckboxBox checked={selectedStatus === opt}>
                      {selectedStatus === opt && <CheckMark />}
                    </CheckboxBox>
                    <OptionLabel>{opt}</OptionLabel>
                  </OptionRow>
                ))}
              </OptionsWrapper>

              {/* Out of office message */}
              <OOOSection>
                <OOOLabel>Out of office message:</OOOLabel>
                <OOOInput
                  multiline
                  rows={2}
                  value={oooMessage}
                  onChange={(e) => setOooMessage(e.target.value)}
                />
              </OOOSection>

            </InnerContent>

            {/* Buttons */}
            <ButtonsRow>
              <PillButton onClick={handleSave}>Save</PillButton>
              <PillButton onClick={onClose}>Cancel</PillButton>
            </ButtonsRow>
          </ModalBody>

        </ModalCard>
      </Backdrop>
    </Modal>
  );
};

export default SetStatusModal;
