import React from 'react';
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  Tooltip,
} from '@mui/material';

interface IconButtonProps extends Omit<MuiIconButtonProps, 'children'> {
  icon: React.ReactNode;
  tooltip?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  tooltip,
  onClick,
  color = 'default',
  size = 'medium',
  disabled = false,
  ...props
}) => {
  const button = (
    <MuiIconButton
      onClick={onClick}
      color={color}
      size={size}
      disabled={disabled}
      {...props}
    >
      {icon}
    </MuiIconButton>
  );

  if (tooltip) {
    return <Tooltip title={tooltip}>{button}</Tooltip>;
  }

  return button;
};
