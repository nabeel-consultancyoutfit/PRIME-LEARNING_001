import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

function IqaDashboard() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4">IQA Dashboard</Typography>
    </Box>
  );
}

IqaDashboard.getLayout = (page: ReactNode) => page;

export default IqaDashboard;
