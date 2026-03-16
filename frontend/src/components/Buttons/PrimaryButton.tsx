import React from 'react';
import {
  Button,
  ButtonProps as MuiButtonProps,
  CircularProgress,
  Box,
} from '@mui/material';

interface PrimaryButtonProps extends Omit<MuiButtonProps, 'variant'> {
  label: string;
  loading?: boolean;
  startIcon?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  loading = false,
  disabled,
  startIcon,
  fullWidth = false,
  size = 'medium',
  type = 'button',
  sx,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
      fullWidth={fullWidth}
      size={size}
      type={type}
      sx={sx}
      {...props}
    >
      {label}
    </Button>
  );
};
