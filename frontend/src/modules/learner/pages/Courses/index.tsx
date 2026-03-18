/**
 * Courses Page
 * Pixel-perfect to Figma 40000068:36557
 */
import React, { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

// ─── Styled ───────────────────────────────────────────────────────────────────

const PageWrapper = styled(Box)({ display: 'flex', flexDirection: 'column', gap: '16px' });

const SectionCard = styled(Box)({
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
});

const SectionHeader = styled(Box)({
  backgroundColor: 'rgba(28,28,28,0.04)',
  padding: '14px 20px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
});

const SectionTitle = styled(Typography)({
  fontSize: '15px',
  fontWeight: 600,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

// Empty state illustration (inline SVG matching Figma bowl/spaghetti art)
const EmptyIllustration = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', pt: '40px', pb: '12px' }}>
    <svg width="160" height="130" viewBox="0 0 160 130" fill="none">
      {/* Bowl */}
      <ellipse cx="80" cy="90" rx="52" ry="14" fill="none" stroke="#1C1C1C" strokeWidth="1.8"/>
      <path d="M28 90 Q28 116 80 116 Q132 116 132 90" fill="none" stroke="#1C1C1C" strokeWidth="1.8"/>
      {/* Noodles / loops on top */}
      <path d="M55 78 Q58 62 68 68 Q78 74 72 58 Q66 44 78 46 Q90 48 84 62 Q78 76 90 72 Q102 68 98 54" fill="none" stroke="#1C1C1C" strokeWidth="1.6" strokeLinecap="round"/>
      {/* Chopsticks */}
      <line x1="68" y1="30" x2="90" y2="82" stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="78" y1="26" x2="98" y2="78" stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Sparkles */}
      <path d="M44 36 L45.5 31 L47 36 L52 37.5 L47 39 L45.5 44 L44 39 L39 37.5 Z" fill="none" stroke="#1C1C1C" strokeWidth="1.2"/>
      <path d="M110 28 L111 24.5 L112 28 L115.5 29 L112 30 L111 33.5 L110 30 L106.5 29 Z" fill="none" stroke="#1C1C1C" strokeWidth="1.2"/>
      <circle cx="118" cy="46" r="2" fill="#1C1C1C"/>
      <circle cx="38" cy="52" r="1.5" fill="#1C1C1C"/>
      <path d="M125 62 L126 58 L127 62 L131 63 L127 64 L126 68 L125 64 L121 63 Z" fill="none" stroke="#1C1C1C" strokeWidth="1.2"/>
    </svg>
  </Box>
);

const EmptyText = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  textAlign: 'center',
});

const EmptySubText = styled(Typography)({
  fontSize: '13px',
  color: 'rgba(28,28,28,0.5)',
  fontFamily: "'Inter', sans-serif",
  textAlign: 'center',
  marginTop: '4px',
  paddingBottom: '40px',
});

// Courses list section header
const CoursesListHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 20px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
  backgroundColor: '#FFFFFF',
});

const CoursesTabLabel = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  whiteSpace: 'nowrap',
});

const OrderLabel = styled(Typography)({
  fontSize: '13px',
  color: 'rgba(28,28,28,0.6)',
  fontFamily: "'Inter', sans-serif",
  whiteSpace: 'nowrap',
});

const OrderSelect = styled('select')({
  border: '1px solid rgba(28,28,28,0.18)',
  borderRadius: '6px',
  padding: '5px 10px',
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
  color: '#1C1C1C',
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  outline: 'none',
  '&:focus': { borderColor: '#1C1C1C' },
});

const SearchWrap = styled(Box)({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  border: '1px solid rgba(28,28,28,0.18)',
  borderRadius: '8px',
  padding: '5px 12px',
  gap: '6px',
  backgroundColor: '#FAFAFA',
  minWidth: '180px',
});

const SearchInputEl = styled('input')({
  border: 'none',
  outline: 'none',
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
  color: '#1C1C1C',
  backgroundColor: 'transparent',
  width: '100%',
  '&::placeholder': { color: 'rgba(28,28,28,0.35)' },
});

// Course cards grid
const CoursesGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',
  padding: '20px',
  '@media (max-width: 900px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 600px)': { gridTemplateColumns: '1fr' },
});

// Card: light gray bg, no border — matches Figma
const CourseCard = styled(Box)({
  backgroundColor: 'rgba(28,28,28,0.05)',
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  transition: 'box-shadow 0.15s ease',
  '&:hover': { boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
});

// Top row: icon box + title/status
const CourseCardTop = styled(Box)({ display: 'flex', alignItems: 'flex-start', gap: '12px' });

const CourseIconBox = styled(Box)({
  width: '40px',
  height: '40px',
  flexShrink: 0,
  backgroundColor: 'rgba(28,28,28,0.08)',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Open-book SVG matching Figma icon
const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 4.5C3 3.7 3.7 3 4.5 3H9.5V14H4.5C3.7 14 3 13.3 3 12.5V4.5Z" fill="none" stroke="#1C1C1C" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M17 4.5C17 3.7 16.3 3 15.5 3H10.5V14H15.5C16.3 14 17 13.3 17 12.5V4.5Z" fill="none" stroke="#1C1C1C" strokeWidth="1.4" strokeLinejoin="round"/>
    <line x1="3" y1="14" x2="17" y2="14" stroke="#1C1C1C" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="10" y1="3" x2="10" y2="14" stroke="#1C1C1C" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const CourseName = styled(Typography)({
  fontSize: '14px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  textTransform: 'uppercase',
  letterSpacing: '0.2px',
  lineHeight: 1.3,
});

const CourseStatusText = styled(Typography)({
  fontSize: '12px',
  color: 'rgba(28,28,28,0.5)',
  fontFamily: "'Inter', sans-serif",
  marginTop: '2px',
});

// Bottom row: Start btn (left) + progress section (right), side-by-side
const CardBottomRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '16px',
});

const StartBtn = styled(Box)({
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  fontSize: '14px',
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '8px',
  padding: '10px 22px',
  cursor: 'pointer',
  flexShrink: 0,
  lineHeight: 1,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
});

// Progress section: label + bar-with-text stacked
const ProgressSection = styled(Box)({ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' });

const ProgressLabel = styled(Typography)({
  fontSize: '11px',
  fontWeight: 500,
  color: 'rgba(28,28,28,0.55)',
  fontFamily: "'Inter', sans-serif",
  textAlign: 'center',
});

// Tall bar with percentage text overlaid inside
const ProgressBarOuter = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '28px',
  borderRadius: '8px',
  backgroundColor: 'rgba(198,199,248,0.3)',
  overflow: 'hidden',
});

const ProgressBarFill = styled(Box)<{ value: number }>(({ value }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: `${Math.min(value, 100)}%`,
  backgroundColor: '#C6C7F8',
  borderRadius: '8px',
}));

const ProgressBarText = styled(Typography)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '13px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  lineHeight: 1,
  zIndex: 1,
  pointerEvents: 'none',
});

// ─── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_COURSES = [
  { id: '1', title: 'BRITISH VALUES', status: 'You have not started this course', progress: 51 },
  { id: '2', title: 'BRITISH VALUES', status: 'You have not started this course', progress: 51 },
  { id: '3', title: 'BRITISH VALUES', status: 'You have not started this course', progress: 51 },
];

const ORDER_OPTIONS = [
  { value: 'name_asc', label: 'Name Ascending' },
  { value: 'name_desc', label: 'Name Descending' },
  { value: 'progress_asc', label: 'Progress Ascending' },
  { value: 'progress_desc', label: 'Progress Descending' },
];

// ─── Component ─────────────────────────────────────────────────────────────────

const Courses: React.FC = () => {
  const [order, setOrder] = useState('name_asc');
  const [search, setSearch] = useState('');

  const filtered = MOCK_COURSES.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <LearnerLayout pageTitle="Courses">
      <PageWrapper>

        {/* Empty state card */}
        <SectionCard>
          <SectionHeader>
            <SectionTitle>Courses</SectionTitle>
          </SectionHeader>
          <EmptyIllustration />
          <EmptyText>You currently have no courses assigned to you.</EmptyText>
          <EmptySubText>Courses will appear when your tutor assigns them to you!</EmptySubText>
        </SectionCard>

        {/* Courses list card */}
        <SectionCard>
          <CoursesListHeader>
            <CoursesTabLabel>Courses</CoursesTabLabel>
            <OrderLabel>Order:</OrderLabel>
            <OrderSelect value={order} onChange={(e) => setOrder(e.target.value)}>
              {ORDER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </OrderSelect>
            <SearchWrap>
              <SearchIcon sx={{ fontSize: '15px', color: 'rgba(28,28,28,0.35)', flexShrink: 0 }} />
              <SearchInputEl
                placeholder="Search for courses"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Typography sx={{ fontSize: '11px', color: 'rgba(28,28,28,0.3)', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' }}>
                ⌘/
              </Typography>
            </SearchWrap>
          </CoursesListHeader>

          <CoursesGrid>
            {filtered.map((course) => (
              <CourseCard key={course.id}>

                {/* Top: icon + title/status */}
                <CourseCardTop>
                  <CourseIconBox>
                    <BookIcon />
                  </CourseIconBox>
                  <Box>
                    <CourseName>{course.title}</CourseName>
                    <CourseStatusText>{course.status}</CourseStatusText>
                  </Box>
                </CourseCardTop>

                {/* Bottom: Start btn (left) | progress (right) */}
                <CardBottomRow>
                  <StartBtn>Start</StartBtn>

                  <ProgressSection>
                    <ProgressLabel>Course Progress</ProgressLabel>
                    <ProgressBarOuter>
                      <ProgressBarFill value={course.progress} />
                      <ProgressBarText>{course.progress}%</ProgressBarText>
                    </ProgressBarOuter>
                  </ProgressSection>
                </CardBottomRow>

              </CourseCard>
            ))}
          </CoursesGrid>
        </SectionCard>

      </PageWrapper>
    </LearnerLayout>
  );
};

export default Courses;
