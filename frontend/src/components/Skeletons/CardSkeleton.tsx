import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Box,
} from '@mui/material';

interface CardSkeletonProps {
  variant?: 'text' | 'rectangular';
  showHeader?: boolean;
  lines?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  variant = 'rectangular',
  showHeader = true,
  lines = 3,
}) => {
  return (
    <Card>
      {showHeader && (
        <CardHeader
          avatar={<Skeleton variant="circular" width={40} height={40} />}
          title={<Skeleton variant="text" width={200} height={24} />}
          subheader={<Skeleton variant="text" width={150} height={16} />}
        />
      )}
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {Array.from({ length: lines }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant={variant}
              height={16}
              width={idx === lines - 1 ? '80%' : '100%'}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
