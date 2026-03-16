import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Breakpoint,
} from '@mui/material';

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  maxWidth?: Breakpoint;
  children: React.ReactNode;
}

export const FormModal: React.FC<FormModalProps> = ({
  open,
  onClose,
  title,
  maxWidth = 'sm',
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
