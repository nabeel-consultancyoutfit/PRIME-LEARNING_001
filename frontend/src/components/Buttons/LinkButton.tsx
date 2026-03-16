import React from 'react';
import Link from 'next/link';
import {
  Button,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

interface LinkButtonProps extends Omit<MuiButtonProps, 'variant' | 'children'> {
  label: string;
  href: string;
  startIcon?: React.ReactNode;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  label,
  href,
  startIcon,
  color = 'primary',
  sx,
  ...props
}) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <Button
        variant="text"
        color={color}
        startIcon={startIcon}
        component="a"
        sx={sx}
        {...props}
      >
        {label}
      </Button>
    </Link>
  );
};
