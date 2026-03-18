/**
 * Trainer — Courses Page (Figma-accurate)
 * Empty state: no access to course module
 */

import React from 'react';
import { Box } from '@mui/material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import { COLORS, TYPOGRAPHY } from '@/modules/trainer/theme/tokens';

const TrainerCourses: React.FC = () => {
  return (
    <TrainerLayout pageTitle="Course">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          backgroundColor: '#FFFFFF',
          gap: 2,
          px: 3,
        }}
      >
        {/* Illustration */}
        <Box sx={{ mb: 2 }}>
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stack of books / plates illustration */}
            <ellipse cx="60" cy="90" rx="38" ry="8" fill="#E8E8E8" />
            <rect x="28" y="68" width="64" height="24" rx="4" fill="#D0D0D0" />
            <rect x="32" y="52" width="56" height="20" rx="4" fill="#C0C0C0" />
            <rect x="36" y="38" width="48" height="18" rx="4" fill="#B0B0B0" />
            {/* Straw/pick */}
            <line x1="80" y1="20" x2="70" y2="60" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="80" cy="18" r="4" fill="#FFC107" />
            {/* Stars */}
            <circle cx="30" cy="30" r="3" fill="#E0E0E0" />
            <circle cx="90" cy="45" r="2" fill="#E0E0E0" />
            <circle cx="25" cy="60" r="2.5" fill="#E0E0E0" />
          </svg>
        </Box>

        <Box
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            color: COLORS.text.primary,
            fontFamily: TYPOGRAPHY.fontFamily,
            textAlign: 'center',
          }}
        >
          You currently don't have the access to course module
        </Box>
        <Box
          sx={{
            fontSize: '14px',
            color: COLORS.text.secondary,
            fontFamily: TYPOGRAPHY.fontFamily,
            textAlign: 'center',
          }}
        >
          Courses will appear when you buy subscription module!
        </Box>

        <Box
          sx={{
            mt: 1,
            backgroundColor: COLORS.sidebar.activeBg,
            color: '#FFFFFF',
            borderRadius: 2,
            padding: '10px 28px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: TYPOGRAPHY.fontFamily,
            cursor: 'pointer',
            '&:hover': { opacity: 0.9 },
          }}
        >
          Buy Subscription
        </Box>
      </Box>
    </TrainerLayout>
  );
};

export default TrainerCourses;
