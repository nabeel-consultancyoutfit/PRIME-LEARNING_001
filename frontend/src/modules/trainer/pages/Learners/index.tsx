/**
 * Trainer — My Learners Page
 */

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {
  FilterListOutlined,
  AssignmentOutlined,
  ChatOutlined,
  AccessTimeOutlined,
} from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import {
  PageContainer,
  TopBar,
  TopBarLeft,
  TopBarRight,
  FilterButton,
  FilterGroup,
  FilterChip,
  LearnersGrid,
  LearnerCard,
  CardTopRow,
  LearnerAvatar,
  LearnerInfo,
  LearnerName,
  LearnerProgramme,
  LearnerEmployer,
  StatusBadge,
  ProgressSection,
  ProgressMeta,
  ProgressTrack,
  ProgressFill,
  CardBottomRow,
  CardMeta,
  MetaItem,
  MetaBadge,
  ViewProfileButton,
} from './Learners.style';
import { learnersService, Learner, LearnerStatus } from '@/modules/trainer/services/learners.service';

type FilterType = 'All' | LearnerStatus;
const FILTERS: FilterType[] = ['All', 'On Track', 'Behind', 'At Risk'];

const MyLearners: React.FC = () => {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [filtered, setFiltered] = useState<Learner[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    learnersService.getAll().then((data) => {
      setLearners(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  const handleFilter = (f: FilterType) => {
    setActiveFilter(f);
    setFiltered(f === 'All' ? learners : learners.filter((l) => l.status === f));
  };

  return (
    <TrainerLayout pageTitle="My Learners">
      <PageContainer>
        <TopBar>
          <TopBarLeft>
            <FilterGroup>
              {FILTERS.map((f) => (
                <FilterChip key={f} active={activeFilter === f} onClick={() => handleFilter(f)}>
                  {f}
                  {f !== 'All' && (
                    <Box component="span" sx={{ ml: '5px', opacity: 0.7, fontSize: '11px' }}>
                      ({learners.filter((l) => l.status === f).length})
                    </Box>
                  )}
                </FilterChip>
              ))}
            </FilterGroup>
          </TopBarLeft>
          <TopBarRight>
            <FilterButton startIcon={<FilterListOutlined sx={{ fontSize: '16px' }} />}>
              More filters
            </FilterButton>
          </TopBarRight>
        </TopBar>

        {loading ? (
          <Box sx={{ color: '#A0A0A0', fontSize: '14px', textAlign: 'center', py: 4 }}>
            Loading learners...
          </Box>
        ) : (
          <LearnersGrid>
            {filtered.map((learner) => (
              <LearnerCard key={learner.id} elevation={0}>
                <CardTopRow>
                  <LearnerAvatar bgcolor={learner.avatarColor}>
                    {learner.initials}
                  </LearnerAvatar>
                  <LearnerInfo>
                    <LearnerName>{learner.name}</LearnerName>
                    <LearnerProgramme>{learner.programme}</LearnerProgramme>
                    <LearnerEmployer>{learner.employer}</LearnerEmployer>
                  </LearnerInfo>
                  <StatusBadge status={learner.status}>{learner.status}</StatusBadge>
                </CardTopRow>

                <ProgressSection>
                  <ProgressMeta>
                    <span>Overall Progress</span>
                    <span>{learner.completedUnits}/{learner.totalUnits} units · {learner.progressPercent}%</span>
                  </ProgressMeta>
                  <ProgressTrack>
                    <ProgressFill percent={learner.progressPercent} status={learner.status} />
                  </ProgressTrack>
                </ProgressSection>

                <CardBottomRow>
                  <CardMeta>
                    <MetaItem>
                      <AssignmentOutlined sx={{ fontSize: '14px' }} />
                      {learner.pendingTasks} tasks
                      {learner.pendingTasks > 3 && <MetaBadge>!</MetaBadge>}
                    </MetaItem>
                    <MetaItem>
                      <ChatOutlined sx={{ fontSize: '14px' }} />
                      {learner.unreadMessages > 0 ? (
                        <>
                          {learner.unreadMessages} new
                          <MetaBadge>{learner.unreadMessages}</MetaBadge>
                        </>
                      ) : (
                        'No messages'
                      )}
                    </MetaItem>
                    <MetaItem>
                      <AccessTimeOutlined sx={{ fontSize: '14px' }} />
                      {learner.lastActivity}
                    </MetaItem>
                  </CardMeta>
                  <ViewProfileButton>View profile</ViewProfileButton>
                </CardBottomRow>
              </LearnerCard>
            ))}
          </LearnersGrid>
        )}
      </PageContainer>
    </TrainerLayout>
  );
};

export default MyLearners;
