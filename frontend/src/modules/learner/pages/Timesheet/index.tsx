import React from 'react';
import { Box, Typography } from '@mui/material';
import { CalendarTodayOutlined } from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

const Timesheet: React.FC = () => {
  return (
    <LearnerLayout pageTitle="Timesheet">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 320,
          gap: 2,
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(28,28,28,0.1)',
          padding: '40px',
        }}
      >
        <CalendarTodayOutlined sx={{ fontSize: 48, color: 'rgba(28,28,28,0.2)' }} />
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#1C1C1C',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Timesheet
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            color: 'rgba(28,28,28,0.5)',
            fontFamily: "'Inter', sans-serif",
            textAlign: 'center',
          }}
        >
          Your timesheet records will appear here.
        </Typography>
      </Box>
    </LearnerLayout>
  );
};

export default Timesheet;
