import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  trend?: number;
  trendDirection?: 'up' | 'down';
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  trend,
  trendDirection,
}) => {
  const isTrendUp = trendDirection === 'up';
  const trendColor = isTrendUp ? 'success' : 'error';
  const trendIcon = isTrendUp ? (
    <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
  ) : (
    <TrendingDownIcon sx={{ fontSize: 16, mr: 0.5 }} />
  );

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ color: 'primary.main' }}>{icon}</Box>
          {trend !== undefined && (
            <Chip
              icon={trendIcon}
              label={`${isTrendUp ? '+' : '-'}${Math.abs(trend)}%`}
              color={trendColor}
              variant="outlined"
              size="small"
            />
          )}
        </Box>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};
