/**
 * Trainer — Scorecard / KSB Assessment Page
 */

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import {
  PageContainer,
  SectionCard,
  SectionHeader,
  LearnerAvatar,
  SectionTitle,
  SectionSub,
  ScorecardTable,
  CriteriaGroup,
  GroupLabel,
  CriteriaRow,
  CriteriaLabel,
  RatingDots,
  RatingDot,
  EvidenceText,
  LastAssessed,
} from './Scorecard.style';
import { scorecardService, ScorecardEntry } from '@/modules/trainer/services/progress.service';

const TrainerScorecard: React.FC = () => {
  const [data, setData] = useState<ScorecardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    scorecardService.getAll().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  return (
    <TrainerLayout pageTitle="Scorecard">
      <PageContainer>
        {loading ? (
          <Box sx={{ color: '#A0A0A0', fontSize: '14px', textAlign: 'center', py: 4 }}>Loading scorecard data...</Box>
        ) : (
          data.map((entry) => {
            const grouped: Record<string, typeof entry.criteria> = {};
            entry.criteria.forEach((c) => {
              if (!grouped[c.category]) grouped[c.category] = [];
              grouped[c.category].push(c);
            });

            return (
              <SectionCard key={entry.learnerId} elevation={0}>
                <SectionHeader>
                  <LearnerAvatar bgcolor={entry.avatarColor}>{entry.learnerInitials}</LearnerAvatar>
                  <Box>
                    <SectionTitle>{entry.learnerName}</SectionTitle>
                    <SectionSub>{entry.programme}</SectionSub>
                  </Box>
                </SectionHeader>

                <ScorecardTable>
                  {Object.entries(grouped).map(([category, criteria]) => (
                    <CriteriaGroup key={category}>
                      <GroupLabel>{category}</GroupLabel>
                      {criteria.map((c) => (
                        <CriteriaRow key={c.id}>
                          <CriteriaLabel>{c.label}</CriteriaLabel>
                          <RatingDots>
                            {Array.from({ length: c.maxRating }, (_, i) => (
                              <RatingDot key={i} filled={i < c.rating} />
                            ))}
                            <Box sx={{ fontSize: '11px', color: '#9291A5', ml: '4px' }}>
                              {c.rating}/{c.maxRating}
                            </Box>
                          </RatingDots>
                          <EvidenceText>{c.evidence}</EvidenceText>
                        </CriteriaRow>
                      ))}
                    </CriteriaGroup>
                  ))}
                </ScorecardTable>

                <LastAssessed>Last assessed: {entry.lastAssessed}</LastAssessed>
              </SectionCard>
            );
          })
        )}
      </PageContainer>
    </TrainerLayout>
  );
};

export default TrainerScorecard;
