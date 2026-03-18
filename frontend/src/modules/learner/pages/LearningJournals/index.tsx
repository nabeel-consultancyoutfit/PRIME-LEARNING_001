/**
 * Learning Journals Page Component
 * Displays learner's journal entries with timeline and expandable forms
 */

import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import {
  GetApp as ExportIcon,
  FilterList as FilterIcon,
  CloudUpload as UploadIcon,
  Lock as LockIcon,
  Description as FileIcon,
  Lightbulb as LightbulbIcon,
  CheckCircle as CriteriaIcon,
  Help as HelpIcon,
  CheckBox as CheckSquareIcon,
  Link as LinkActivityIcon,
  CalendarToday as CalendarIcon,
  UnfoldMore as ArrowUpDownIcon,
} from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { useLearningJournals } from './useLearningJournals';
import { JOURNAL_CATEGORIES, ACTIVITY_TYPES } from './LearningJournals.data';
import {
  JournalsContainer,
  TopBar,
  TopBarLeft,
  TopBarRight,
  ShowTimesheetButton,
  BarButton,
  TimelineContainer,
  TimelineMarker,
  TimelinePoint,
  TimelineCircleColumn,
  TimelineConnector,
  TimelineDate,
  TimelineDateDay,
  TimelineDateMonth,
  TimelineDateYear,
  JournalCard,
  JournalHeader,
  HeaderLeft,
  UserAvatar,
  UserName,
  WelcomeText,
  ChevronIcon as ChevronIconStyled,
  JournalForm,
  FormRow,
  FormGroup,
  StyledTextField,
  StyledSelect,
  CheckboxGroup,
  ReflectionField,
  BottomToolbar,
  ToolbarLeft,
  ToolbarItem,
  UploadButton,
  CancelButton,
  CreateButton,
  FormLabel,
  ExpandableSection,
  CountBadge,
  DateFieldContainer,
  TimeDurationContainer,
  TimeBox,
  TimeSeparator,
  AMPMButton,
  ActivityTypeContainer,
  FieldSubLabel,
} from './LearningJournals.style';

interface TimelineEntryData {
  day: string;
  month: string;
  year: string;
}

const parseDate = (dateStr: string): TimelineEntryData => {
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    return { day: parts[0], month: parts[1], year: parts[2] };
  }
  return { day: '1', month: 'Jan', year: '2025' };
};

const LearningJournals: React.FC = () => {
  const { state, toggleExpanded, toggleTimesheet, handleExport, handleFilters } = useLearningJournals();
  const [formData, setFormData] = useState<any>({});

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleActivityTypeChange = (type: string) => {
    const types = formData.activityTypes || [];
    const updated = types.includes(type)
      ? types.filter((t: string) => t !== type)
      : [...types, type];
    handleFormChange('activityTypes', updated);
  };

  return (
    <LearnerLayout pageTitle="Learning Journals">
      <JournalsContainer>
        {/* Top Bar */}
        <TopBar>
          <TopBarLeft>
            <ShowTimesheetButton onClick={toggleTimesheet}>Show Timesheet</ShowTimesheetButton>
          </TopBarLeft>
          <TopBarRight>
            <BarButton onClick={handleExport}>
              <ExportIcon sx={{ fontSize: '16px' }} />
              Export
            </BarButton>
            <BarButton onClick={handleFilters}>
              <FilterIcon sx={{ fontSize: '16px' }} />
              Filters
            </BarButton>
          </TopBarRight>
        </TopBar>

        {/* Timeline */}
        <TimelineContainer>
          {state.entries.map((entry) => {
            const dateInfo = parseDate(entry.date);
            const isWelcome = entry.id === '1';
            const isNewForm = entry.id === '2';

            return (
              <TimelineMarker key={entry.id}>
                {/* Date column */}
                <TimelineDate>
                  <TimelineDateDay>{dateInfo.day}</TimelineDateDay>
                  <TimelineDateMonth>{dateInfo.month}</TimelineDateMonth>
                  <TimelineDateYear>{dateInfo.year}</TimelineDateYear>
                </TimelineDate>

                {/* Circle + vertical connector column */}
                <TimelineCircleColumn>
                  <TimelinePoint />
                  <TimelineConnector />
                </TimelineCircleColumn>

                {/* Card column */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <JournalCard>
                    <JournalHeader onClick={() => toggleExpanded(entry.id)}>
                      <HeaderLeft>
                        <UserAvatar>JD</UserAvatar>
                        <UserName>John Doe</UserName>
                        {isWelcome && <WelcomeText>{entry.reflection}</WelcomeText>}
                      </HeaderLeft>
                      {!isWelcome && (
                        <ChevronIconStyled className={entry.isExpanded ? 'expanded' : ''}>
                          {entry.isExpanded ? '▲' : '▼'}
                        </ChevronIconStyled>
                      )}
                    </JournalHeader>

                    {!isWelcome && entry.isExpanded && (
                      <JournalForm>
                        {/* Title Field */}
                        <FormRow className="full">
                          <FormGroup>
                            <FormLabel>Title</FormLabel>
                            <StyledTextField
                              fullWidth
                              size="small"
                              placeholder="Text"
                              value={formData.title || entry.title}
                              onChange={(e) => handleFormChange('title', e.target.value)}
                            />
                          </FormGroup>
                        </FormRow>

                        {/* Category Field */}
                        <FormRow className="full">
                          <FormGroup>
                            <FormLabel>Select a category</FormLabel>
                            <StyledSelect
                              value={formData.category || entry.category}
                              onChange={(e) => handleFormChange('category', e.target.value)}
                            >
                              <option value="">-- Select --</option>
                              {JOURNAL_CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </StyledSelect>
                          </FormGroup>
                        </FormRow>

                        {/* Date / Time+Duration / Activity Type Row (3 sections, Figma-accurate) */}
                        <FormRow className="three">

                          {/* Date field — grey bg container with calendar icon */}
                          <DateFieldContainer>
                            <FieldSubLabel>Date</FieldSubLabel>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(28,28,28,0.25)' }}>
                                <CalendarIcon sx={{ fontSize: '16px' }} />
                                <Box sx={{ fontSize: '14px' }}>
                                  {formData.date || 'Pick a date'}
                                </Box>
                              </Box>
                              <ArrowUpDownIcon sx={{ fontSize: '18px', color: 'rgba(28,28,28,0.3)' }} />
                            </Box>
                          </DateFieldContainer>

                          {/* Time started + Duration — paired labels with separate HH/MM boxes */}
                          <TimeDurationContainer>
                            <Box sx={{ display: 'flex' }}>
                              <Box sx={{ flex: 1 }}>
                                <FieldSubLabel>Time started</FieldSubLabel>
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <FieldSubLabel>Duration</FieldSubLabel>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                              <TimeBox
                                placeholder="HH"
                                maxLength={2}
                                value={formData.timeHH || ''}
                                onChange={(e) => handleFormChange('timeHH', e.target.value)}
                              />
                              <TimeSeparator>:</TimeSeparator>
                              <TimeBox
                                placeholder="MM"
                                maxLength={2}
                                value={formData.timeMM || ''}
                                onChange={(e) => handleFormChange('timeMM', e.target.value)}
                              />
                              <AMPMButton>AM</AMPMButton>
                              <Box sx={{ flex: 1, minWidth: '6px' }} />
                              <TimeBox
                                placeholder="HH"
                                maxLength={2}
                                value={formData.durationHH || ''}
                                onChange={(e) => handleFormChange('durationHH', e.target.value)}
                              />
                              <TimeSeparator>:</TimeSeparator>
                              <TimeBox
                                placeholder="MM"
                                maxLength={2}
                                value={formData.durationMM || ''}
                                onChange={(e) => handleFormChange('durationMM', e.target.value)}
                              />
                            </Box>
                          </TimeDurationContainer>

                          {/* Activity type — grey bg container with 32px checkboxes */}
                          <ActivityTypeContainer>
                            <FieldSubLabel>Activity type</FieldSubLabel>
                            <CheckboxGroup>
                              {ACTIVITY_TYPES.map((type) => (
                                <FormControlLabel
                                  key={type}
                                  control={
                                    <Checkbox
                                      checked={(formData.activityTypes || entry.activityTypes).includes(type)}
                                      onChange={() => handleActivityTypeChange(type)}
                                      sx={{ p: '2px', '& .MuiSvgIcon-root': { fontSize: '28px' } }}
                                    />
                                  }
                                  label={<Box sx={{ fontSize: '13px' }}>{type}</Box>}
                                  sx={{ m: 0 }}
                                />
                              ))}
                            </CheckboxGroup>
                          </ActivityTypeContainer>

                        </FormRow>

                        {/* Reflection Field */}
                        <FormRow className="full">
                          <FormGroup>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <FormLabel>Reflection</FormLabel>
                              <IconButton size="small" sx={{ p: '2px', color: '#A0A0A0' }}>
                                <HelpIcon fontSize="small" />
                              </IconButton>
                            </Box>
                            <ReflectionField
                              fullWidth
                              size="small"
                              placeholder="Type your reflection here"
                              multiline
                              rows={3}
                              value={formData.reflection || entry.reflection}
                              onChange={(e) => handleFormChange('reflection', e.target.value)}
                            />
                          </FormGroup>
                        </FormRow>

                        {/* Bottom Toolbar (for new form, empty; for existing, shows expandable sections) */}
                        {!isNewForm && (
                          <Box>
                            {/* Expandable Sections */}
                            {entry.filesCount !== undefined && (
                              <ExpandableSection>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <FileIcon sx={{ fontSize: '18px' }} />
                                  Files
                                </Box>
                                <CountBadge>{entry.filesCount}</CountBadge>
                              </ExpandableSection>
                            )}

                            {entry.learningActivitiesCount !== undefined && (
                              <ExpandableSection>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <LightbulbIcon sx={{ fontSize: '18px' }} />
                                  Learning Activities
                                </Box>
                                <CountBadge>{entry.learningActivitiesCount}</CountBadge>
                              </ExpandableSection>
                            )}

                            {entry.criteriaCount !== undefined && (
                              <ExpandableSection>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <CriteriaIcon sx={{ fontSize: '18px' }} />
                                  Criteria
                                </Box>
                                <CountBadge>{entry.criteriaCount}</CountBadge>
                              </ExpandableSection>
                            )}
                          </Box>
                        )}

                        {/* Bottom Toolbar — single row with actions on right (Figma-accurate) */}
                        <BottomToolbar>
                          {isNewForm ? (
                            <>
                              <ToolbarLeft>
                                <ToolbarItem>
                                  <CheckSquareIcon sx={{ fontSize: '16px' }} />
                                  Criteria
                                </ToolbarItem>
                                <ToolbarItem>
                                  <LinkActivityIcon sx={{ fontSize: '16px' }} />
                                  Link activity
                                </ToolbarItem>
                                <ToolbarItem>
                                  <LockIcon sx={{ fontSize: '16px' }} />
                                  Privacy: {entry.privacy || 'Only me'}
                                </ToolbarItem>
                                <UploadButton>
                                  <UploadIcon sx={{ fontSize: '16px' }} />
                                  Upload file
                                </UploadButton>
                              </ToolbarLeft>
                              <Box sx={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                <CancelButton onClick={() => toggleExpanded(entry.id)}>
                                  Cancel
                                </CancelButton>
                                <CreateButton onClick={() => toggleExpanded(entry.id)}>
                                  Create
                                </CreateButton>
                              </Box>
                            </>
                          ) : (
                            <>
                              <ToolbarLeft>
                                <ToolbarItem>
                                  <LockIcon sx={{ fontSize: '16px' }} />
                                  Privacy: {entry.privacy || 'Only me'}
                                </ToolbarItem>
                              </ToolbarLeft>
                              <Box sx={{ display: 'flex', gap: '8px' }}>
                                <IconButton size="small" sx={{ p: '6px' }}>
                                  ✏️
                                </IconButton>
                                <IconButton size="small" sx={{ p: '6px' }}>
                                  🗑️
                                </IconButton>
                              </Box>
                            </>
                          )}
                        </BottomToolbar>
                      </JournalForm>
                    )}
                  </JournalCard>
                </Box>
              </TimelineMarker>
            );
          })}
        </TimelineContainer>
      </JournalsContainer>
    </LearnerLayout>
  );
};

export default LearningJournals;
