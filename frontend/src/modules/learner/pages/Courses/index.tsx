/**
 * Courses Page Component
 * Displays courses assigned to the learner
 */

import React from 'react';
import Box from '@mui/material/Box';
import MonitorIcon from '@mui/icons-material/Monitor';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { useCourses } from './useCourses';
import { ORDER_OPTIONS } from './Courses.data';
import {
  CoursesContainer,
  EmptyStateCard,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateText,
  CoursesHeader,
  CoursesLabel,
  OrderSelect,
  SearchInput,
  CoursesGrid,
  CourseCardWrapper,
  CourseIcon,
  CourseTitle,
  CourseStatus,
  StartButton,
  ProgressLabel,
  StyledLinearProgress,
} from './Courses.style';

const Courses: React.FC = () => {
  const { state, setOrderBy, setSearchTerm, handleStartCourse } = useCourses();

  return (
    <LearnerLayout pageTitle="Courses">
      <CoursesContainer>
        {/* Empty State Card */}
        <EmptyStateCard>
          <EmptyStateIcon>📚</EmptyStateIcon>
          <EmptyStateTitle>You currently have no courses assigned to you.</EmptyStateTitle>
          <EmptyStateText>
            Courses will appear when your tutor assigns them to you!
          </EmptyStateText>
        </EmptyStateCard>

        {/* Courses Section */}
        <Box>
          <CoursesHeader>
            <CoursesLabel>Courses</CoursesLabel>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CoursesLabel htmlFor="order-select">Order:</CoursesLabel>
              <OrderSelect
                id="order-select"
                value={state.orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              >
                {ORDER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </OrderSelect>
            </Box>
            <SearchInput
              type="text"
              placeholder="Search for courses"
              value={state.searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CoursesHeader>

          {/* Courses Grid */}
          <CoursesGrid>
            {state.courses.map((course) => (
              <CourseCardWrapper key={course.id}>
                {/* Course Icon */}
                <CourseIcon>💻</CourseIcon>

                {/* Course Title */}
                <CourseTitle>{course.title}</CourseTitle>

                {/* Course Status */}
                <CourseStatus>{course.status}</CourseStatus>

                {/* Start Button */}
                <StartButton onClick={() => handleStartCourse(course.id)}>
                  Start
                </StartButton>

                {/* Progress Bar */}
                <ProgressLabel>Course Progress</ProgressLabel>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <StyledLinearProgress variant="determinate" value={course.progress} />
                  <Box sx={{ fontSize: '0.8rem', fontWeight: 600, minWidth: '35px' }}>
                    {course.progress}%
                  </Box>
                </Box>
              </CourseCardWrapper>
            ))}
          </CoursesGrid>
        </Box>
      </CoursesContainer>
    </LearnerLayout>
  );
};

export default Courses;
