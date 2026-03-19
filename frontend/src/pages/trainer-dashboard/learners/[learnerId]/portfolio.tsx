/**
 * Trainer Dashboard — Learner Portfolio Page
 * Shows a specific learner's dashboard/portfolio from trainer perspective
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import { learnersService, Learner } from '@/modules/trainer/services/learners.service';
import { COLORS, TYPOGRAPHY } from '@/modules/trainer/theme/tokens';

const LearnerPortfolioPage: React.FC = () => {
  const router = useRouter();
  const { learnerId } = router.query;
  const [learner, setLearner] = useState<Learner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!learnerId) return;

    learnersService.getAll().then((learners) => {
      const found = learners.find((l) => l.id === learnerId);
      if (found) {
        setLearner(found);
      }
      setLoading(false);
    });
  }, [learnerId]);

  if (loading) {
    return (
      <TrainerLayout pageTitle="Portfolio">
        <Box sx={{ p: 3, color: COLORS.text.muted, textAlign: 'center' }}>
          Loading learner portfolio...
        </Box>
      </TrainerLayout>
    );
  }

  if (!learner) {
    return (
      <TrainerLayout pageTitle="Portfolio">
        <Box sx={{ p: 3, color: COLORS.text.muted, textAlign: 'center' }}>
          Learner not found
        </Box>
      </TrainerLayout>
    );
  }

  return (
    <TrainerLayout pageTitle={`${learner.name} - Portfolio`}>
      <Box sx={{ p: 3 }}>
        {/* Back button */}
        <Box
          onClick={() => router.back()}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            mb: 2,
            color: COLORS.text.secondary,
            fontSize: '14px',
            fontFamily: TYPOGRAPHY.fontFamily,
            '&:hover': { color: COLORS.text.primary },
          }}
        >
          <ArrowBack sx={{ fontSize: '18px' }} />
          Back to Dashboard
        </Box>

        {/* Learner header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 4,
            p: 2,
            backgroundColor: '#F5F5F5',
            borderRadius: '8px',
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: learner.avatarColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontWeight: 600,
              fontSize: '18px',
            }}
          >
            {learner.initials}
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                color: COLORS.text.primary,
                fontFamily: TYPOGRAPHY.fontFamily,
              }}
            >
              {learner.name}
            </Typography>
            <Typography
              sx={{
                fontSize: '13px',
                color: COLORS.text.secondary,
                fontFamily: TYPOGRAPHY.fontFamily,
              }}
            >
              {learner.programme}
            </Typography>
            <Typography
              sx={{
                fontSize: '12px',
                color: COLORS.text.muted,
                fontFamily: TYPOGRAPHY.fontFamily,
                mt: 0.5,
              }}
            >
              {learner.employer}
            </Typography>
          </Box>
        </Box>

        {/* Portfolio info grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 2,
          }}
        >
          {/* Status */}
          <Box sx={{ p: 2, border: `1px solid ${COLORS.card.border}`, borderRadius: '8px' }}>
            <Typography
              sx={{
                fontSize: '12px',
                color: COLORS.text.muted,
                fontFamily: TYPOGRAPHY.fontFamily,
                mb: 1,
              }}
            >
              Status
            </Typography>
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor:
                  learner.status === 'On Track'
                    ? '#E8F5E9'
                    : learner.status === 'Behind'
                      ? '#FFF3E0'
                      : '#FFEBEE',
                color:
                  learner.status === 'On Track'
                    ? '#43A047'
                    : learner.status === 'Behind'
                      ? '#FB8C00'
                      : '#E53935',
                px: 2,
                py: 1,
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: TYPOGRAPHY.fontFamily,
              }}
            >
              {learner.status}
            </Box>
          </Box>

          {/* Progress */}
          <Box sx={{ p: 2, border: `1px solid ${COLORS.card.border}`, borderRadius: '8px' }}>
            <Typography
              sx={{
                fontSize: '12px',
                color: COLORS.text.muted,
                fontFamily: TYPOGRAPHY.fontFamily,
                mb: 1,
              }}
            >
              Overall Progress
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 700,
                color: COLORS.text.primary,
                fontFamily: TYPOGRAPHY.fontFamily,
              }}
            >
              {learner.progressPercent}%
            </Typography>
          </Box>

          {/* Completed Units */}
          <Box sx={{ p: 2, border: `1px solid ${COLORS.card.border}`, borderRadius: '8px' }}>
            <Typography
              sx={{
                fontSize: '12px',
                color: COLORS.text.muted,
                fontFamily: TYPOGRAPHY.fontFamily,
                mb: 1,
              }}
            >
              Units Completed
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 700,
                color: COLORS.text.primary,
                fontFamily: TYPOGRAPHY.fontFamily,
              }}
            >
              {learner.completedUnits}/{learner.totalUnits}
            </Typography>
          </Box>

          {/* Pending Tasks */}
          <Box sx={{ p: 2, border: `1px solid ${COLORS.card.border}`, borderRadius: '8px' }}>
            <Typography
              sx={{
                fontSize: '12px',
                color: COLORS.text.muted,
                fontFamily: TYPOGRAPHY.fontFamily,
                mb: 1,
              }}
            >
              Pending Tasks
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 700,
                color: COLORS.text.primary,
                fontFamily: TYPOGRAPHY.fontFamily,
              }}
            >
              {learner.pendingTasks}
            </Typography>
          </Box>

          {/* Unread Messages */}
          <Box sx={{ p: 2, border: `1px solid ${COLORS.card.border}`, borderRadius: '8px' }}>
            <Typography
              sx={{
                fontSize: '12px',
                color: COLORS.text.muted,
                fontFamily: TYPOGRAPHY.fontFamily,
                mb: 1,
              }}
            >
              Unread Messages
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 700,
                color: COLORS.text.primary,
                fontFamily: TYPOGRAPHY.fontFamily,
              }}
            >
              {learner.unreadMessages}
            </Typography>
          </Box>

          {/* Last Activity */}
          <Box sx={{ p: 2, border: `1px solid ${COLORS.card.border}`, borderRadius: '8px' }}>
            <Typography
              sx={{
                fontSize: '12px',
                color: COLORS.text.muted,
                fontFamily: TYPOGRAPHY.fontFamily,
                mb: 1,
              }}
            >
              Last Activity
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: COLORS.text.primary,
                fontFamily: TYPOGRAPHY.fontFamily,
              }}
            >
              {learner.lastActivity}
            </Typography>
          </Box>
        </Box>

        {/* Info section */}
        <Box sx={{ mt: 4, p: 2, backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
          <Typography
            sx={{
              fontSize: '12px',
              color: COLORS.text.muted,
              fontFamily: TYPOGRAPHY.fontFamily,
              mb: 2,
            }}
          >
            Additional Details
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography
                sx={{
                  fontSize: '11px',
                  color: COLORS.text.muted,
                  fontFamily: TYPOGRAPHY.fontFamily,
                  mb: 0.5,
                }}
              >
                Start Date
              </Typography>
              <Typography
                sx={{
                  fontSize: '13px',
                  color: COLORS.text.primary,
                  fontFamily: TYPOGRAPHY.fontFamily,
                }}
              >
                {learner.startDate}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '11px',
                  color: COLORS.text.muted,
                  fontFamily: TYPOGRAPHY.fontFamily,
                  mb: 0.5,
                }}
              >
                End Date
              </Typography>
              <Typography
                sx={{
                  fontSize: '13px',
                  color: COLORS.text.primary,
                  fontFamily: TYPOGRAPHY.fontFamily,
                }}
              >
                {learner.endDate}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </TrainerLayout>
  );
};

export default LearnerPortfolioPage;
