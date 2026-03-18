/**
 * Trainer — Learner Progress Page
 */

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import {
  PageContainer,
  SectionCard,
  SectionHeader,
  SectionTitle,
  ProgressList,
  LearnerProgressCard,
  LearnerRow,
  LearnerAvatar,
  LearnerName,
  LearnerProgramme,
  OverallProgress,
  ProgressValue,
  UnitsList,
  UnitRow,
  UnitName,
  UnitStatusBadge,
  UnitTrack,
  UnitFill,
} from './Progress.style';
import { progressService, LearnerProgress } from '@/modules/trainer/services/progress.service';

const TrainerProgress: React.FC = () => {
  const [data, setData] = useState<LearnerProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    progressService.getAllProgress().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  return (
    <TrainerLayout pageTitle="Progress">
      <PageContainer>
        <SectionCard elevation={0}>
          <SectionHeader>
            <SectionTitle>Learner Progress Tracker</SectionTitle>
            <Box sx={{ fontSize: '12px', color: '#9291A5' }}>
              Showing {data.length} learner{data.length !== 1 ? 's' : ''} with progress data
            </Box>
          </SectionHeader>

          {loading ? (
            <Box sx={{ color: '#A0A0A0', fontSize: '14px', textAlign: 'center', py: 4 }}>Loading progress data...</Box>
          ) : (
            <ProgressList>
              {data.map((lp) => (
                <LearnerProgressCard key={lp.learnerId}>
                  <LearnerRow>
                    <LearnerAvatar bgcolor={lp.avatarColor}>{lp.learnerInitials}</LearnerAvatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <LearnerName>{lp.learnerName}</LearnerName>
                      <LearnerProgramme>{lp.programme}</LearnerProgramme>
                    </Box>
                    <OverallProgress>
                      <ProgressValue>{lp.overallPercent}%</ProgressValue>
                      <Box sx={{ fontSize: '12px', color: '#9291A5' }}>overall</Box>
                    </OverallProgress>
                  </LearnerRow>

                  <UnitsList>
                    {lp.unitBreakdown.map((unit) => (
                      <UnitRow key={unit.unit}>
                        <UnitName>{unit.unit}</UnitName>
                        <UnitTrack>
                          <UnitFill percent={unit.percent} status={unit.status} />
                        </UnitTrack>
                        <UnitStatusBadge status={unit.status}>{unit.status}</UnitStatusBadge>
                      </UnitRow>
                    ))}
                  </UnitsList>

                  <Box sx={{ fontSize: '11px', color: '#9291A5', textAlign: 'right' }}>
                    Last updated: {lp.lastUpdated}
                  </Box>
                </LearnerProgressCard>
              ))}
            </ProgressList>
          )}
        </SectionCard>
      </PageContainer>
    </TrainerLayout>
  );
};

export default TrainerProgress;
