import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Button,
  CardHeaderProps,
} from '@mui/material';

interface InfoCardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  cardHeaderProps?: Partial<CardHeaderProps>;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  subtitle,
  children,
  actionButton,
  cardHeaderProps,
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={title}
        subheader={subtitle}
        action={
          actionButton && (
            <Button
              size="small"
              variant="outlined"
              onClick={actionButton.onClick}
            >
              {actionButton.label}
            </Button>
          )
        }
        {...cardHeaderProps}
      />
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
};
