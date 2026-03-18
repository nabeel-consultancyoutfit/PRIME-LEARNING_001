/**
 * Trainer — Learning Journals Review Page
 */

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ExpandMore, ExpandLess, RateReviewOutlined } from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import {
  PageContainer,
  TopBar,
  FilterGroup,
  FilterChip,
  JournalList,
  JournalCard,
  JournalCardHeader,
  HeaderLeft,
  LearnerAvatar,
  LearnerName,
  JournalTitle,
  HeaderRight,
  StatusBadge,
  ChevronBox,
  JournalBody,
  MetaRow,
  MetaItem,
  MetaLabel,
  MetaValue,
  ReflectionBox,
  CommentSection,
  ExistingComment,
  CommentText,
  CommentInput,
  CommentActions,
  ActionButton,
} from './LearningJournals.style';
import { journalsService, JournalEntry, JournalStatus } from '@/modules/trainer/services/journals.service';

type FilterType = 'All' | JournalStatus;
const FILTERS: FilterType[] = ['All', 'Pending Review', 'Reviewed', 'Needs Revision'];

const TrainerLearningJournals: React.FC = () => {
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [filtered, setFiltered] = useState<JournalEntry[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    journalsService.getAll().then((data) => {
      setJournals(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  const handleFilter = (f: FilterType) => {
    setActiveFilter(f);
    setFiltered(f === 'All' ? journals : journals.filter((j) => j.status === f));
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <TrainerLayout pageTitle="Learning Journals">
      <PageContainer>
        <TopBar>
          <FilterGroup>
            {FILTERS.map((f) => (
              <FilterChip key={f} active={activeFilter === f} onClick={() => handleFilter(f)}>
                {f}
                {f !== 'All' && (
                  <Box component="span" sx={{ ml: '5px', opacity: 0.7, fontSize: '11px' }}>
                    ({journals.filter((j) => j.status === f).length})
                  </Box>
                )}
              </FilterChip>
            ))}
          </FilterGroup>
        </TopBar>

        {loading ? (
          <Box sx={{ color: '#A0A0A0', fontSize: '14px', textAlign: 'center', py: 4 }}>
            Loading journals...
          </Box>
        ) : (
          <JournalList>
            {filtered.map((journal) => {
              const isOpen = expanded.has(journal.id);
              return (
                <JournalCard key={journal.id} elevation={0}>
                  <JournalCardHeader onClick={() => toggleExpand(journal.id)}>
                    <HeaderLeft>
                      <LearnerAvatar bgcolor={journal.avatarColor}>
                        {journal.learnerInitials}
                      </LearnerAvatar>
                      <Box>
                        <LearnerName>{journal.learnerName}</LearnerName>
                        <JournalTitle>{journal.title}</JournalTitle>
                      </Box>
                    </HeaderLeft>
                    <HeaderRight>
                      <Box sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                        {journal.submittedAt}
                      </Box>
                      <StatusBadge status={journal.status}>{journal.status}</StatusBadge>
                      <ChevronBox>
                        {isOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                      </ChevronBox>
                    </HeaderRight>
                  </JournalCardHeader>

                  {isOpen && (
                    <JournalBody>
                      {/* Meta info */}
                      <MetaRow>
                        <MetaItem>
                          <MetaLabel>Date</MetaLabel>
                          <MetaValue>{journal.date}</MetaValue>
                        </MetaItem>
                        <MetaItem>
                          <MetaLabel>Category</MetaLabel>
                          <MetaValue>{journal.category}</MetaValue>
                        </MetaItem>
                        <MetaItem>
                          <MetaLabel>Duration</MetaLabel>
                          <MetaValue>{journal.duration}</MetaValue>
                        </MetaItem>
                        <MetaItem>
                          <MetaLabel>Activity Type</MetaLabel>
                          <MetaValue>{journal.activityType}</MetaValue>
                        </MetaItem>
                      </MetaRow>

                      {/* Reflection */}
                      <Box>
                        <MetaLabel sx={{ mb: '6px', display: 'block' }}>Learner Reflection</MetaLabel>
                        <ReflectionBox>{journal.reflection}</ReflectionBox>
                      </Box>

                      {/* Trainer comment section */}
                      <CommentSection>
                        <Box sx={{ fontSize: '13px', fontWeight: 600, color: '#1E1E2D', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <RateReviewOutlined sx={{ fontSize: '16px' }} />
                          Trainer Feedback
                        </Box>

                        {journal.trainerComment && (
                          <ExistingComment>
                            <CommentText>{journal.trainerComment}</CommentText>
                          </ExistingComment>
                        )}

                        <CommentInput
                          fullWidth
                          size="small"
                          placeholder="Add or update your feedback..."
                          value={comments[journal.id] || ''}
                          onChange={(e) =>
                            setComments((prev) => ({ ...prev, [journal.id]: e.target.value }))
                          }
                          multiline
                          rows={2}
                        />

                        <CommentActions>
                          {journal.status !== 'Reviewed' && (
                            <ActionButton variant="outlined">
                              Request Revision
                            </ActionButton>
                          )}
                          <ActionButton variant="contained">
                            {journal.status === 'Reviewed' ? 'Update Feedback' : 'Mark as Reviewed'}
                          </ActionButton>
                        </CommentActions>
                      </CommentSection>
                    </JournalBody>
                  )}
                </JournalCard>
              );
            })}
          </JournalList>
        )}
      </PageContainer>
    </TrainerLayout>
  );
};

export default TrainerLearningJournals;
