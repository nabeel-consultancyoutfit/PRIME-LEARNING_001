/**
 * Progress Unit Details Page
 * Pixel-perfect to Figma 40000068:39190
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Popover } from '@mui/material';
import { ArrowBackIos, ExpandMore, ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

// ─── Styled components ────────────────────────────────────────────────────────

const PageWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const PageHeaderRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '4px',
});

const BackBtn = styled(Box)({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#1C1C1C',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});

const PageTitle = styled(Box)({
  fontSize: '22px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

// Main card
const DetailCard = styled(Box)({
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
});

// Unit selector bar
const UnitBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 20px',
  backgroundColor: 'rgba(28,28,28,0.04)',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
});

const UnitSelector = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
  fontWeight: 600,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  cursor: 'pointer',
  userSelect: 'none',
});

const SignedText = styled(Box)({
  fontSize: '13px',
  fontWeight: 500,
  color: '#2E7D32',
  fontFamily: "'Inter', sans-serif",
  fontStyle: 'italic',
});

// Tabs row
const TabsRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '12px 20px 0',
  borderBottom: '1px solid rgba(28,28,28,0.1)',
  overflowX: 'auto',
  flexWrap: 'nowrap',
});

const Tab = styled(Box)<{ active?: boolean }>(({ active }) => ({
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: active ? 600 : 400,
  color: active ? '#FFFFFF' : '#1C1C1C',
  backgroundColor: active ? '#1C1C1C' : 'transparent',
  borderRadius: '8px 8px 0 0',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  fontFamily: "'Inter', sans-serif",
  marginBottom: '-1px',
  border: active ? '1px solid rgba(28,28,28,0.1)' : '1px solid transparent',
  borderBottom: active ? '1px solid #1C1C1C' : '1px solid transparent',
  '&:hover': {
    backgroundColor: active ? '#1C1C1C' : 'rgba(28,28,28,0.04)',
  },
}));

// Tab content
const TabContent = styled(Box)({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

// 3-column info row
const InfoRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '16px',
  paddingBottom: '16px',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  '@media (max-width: 700px)': {
    gridTemplateColumns: '1fr',
  },
});

const InfoCol = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const InfoColLabel = styled(Box)({
  fontSize: '12px',
  fontWeight: 400,
  color: 'rgba(28,28,28,0.5)',
  fontFamily: "'Inter', sans-serif",
});

const InfoColValue = styled(Box)({
  fontSize: '14px',
  fontWeight: 400,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

// Section
const SectionHeading = styled(Box)({
  fontSize: '15px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  marginBottom: '8px',
});

// Progress items
const ProgressItemRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '6px',
});

const ProgressItemLabel = styled(Box)({
  fontSize: '13px',
  fontWeight: 500,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

const ProgressItemValue = styled(Box)({
  fontSize: '13px',
  fontWeight: 400,
  color: 'rgba(28,28,28,0.55)',
  fontFamily: "'Inter', sans-serif",
});

// Section body text
const SectionBodyText = styled(Box)({
  fontSize: '13px',
  color: 'rgba(28,28,28,0.65)',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '1.5',
});

const SectionMutedText = styled(Box)({
  fontSize: '13px',
  color: 'rgba(28,28,28,0.45)',
  fontFamily: "'Inter', sans-serif",
  fontStyle: 'italic',
});

// Feedback message
const FeedbackMsg = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  padding: '12px 0',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
});

const FeedbackMeta = styled(Box)({
  fontSize: '12px',
  color: 'rgba(28,28,28,0.5)',
  fontFamily: "'Inter', sans-serif",
});

const FeedbackBody = styled(Box)({
  fontSize: '13px',
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

// Rich text editor mock
const EditorWrapper = styled(Box)({
  border: '1px solid rgba(28,28,28,0.15)',
  borderRadius: '8px',
  overflow: 'hidden',
  marginTop: '8px',
});

const EditorArea = styled(Box)({
  padding: '14px 16px',
  minHeight: '80px',
  fontSize: '13px',
  color: 'rgba(28,28,28,0.35)',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
  backgroundColor: '#FFFFFF',
  cursor: 'text',
});

const EditorToolbar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 12px',
  borderTop: '1px solid rgba(28,28,28,0.1)',
  backgroundColor: '#FAFAFA',
  flexWrap: 'wrap',
});

const ToolbarBtn = styled(Box)({
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 600,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.08)' },
});

const ToolbarDot = styled(Box)({
  width: '18px',
  height: '18px',
  borderRadius: '50%',
  backgroundColor: '#1C1C1C',
  flexShrink: 0,
});

const ToolbarDivider = styled(Box)({
  width: '1px',
  height: '20px',
  backgroundColor: 'rgba(28,28,28,0.15)',
  margin: '0 2px',
});

const ToolbarFontSize = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  fontSize: '12px',
  fontWeight: 500,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  cursor: 'pointer',
  padding: '4px 6px',
  borderRadius: '4px',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.08)' },
});

// Action buttons
const ActionRow = styled(Box)({
  display: 'flex',
  gap: '12px',
  marginTop: '4px',
});

const SendBtn = styled(Box)({
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  fontSize: '14px',
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '8px',
  padding: '10px 28px',
  cursor: 'pointer',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
});

const CancelBtn = styled(Box)({
  backgroundColor: 'transparent',
  color: '#1C1C1C',
  fontSize: '14px',
  fontWeight: 500,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '8px',
  padding: '10px 20px',
  cursor: 'pointer',
  border: '1px solid rgba(28,28,28,0.2)',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.04)' },
});

// Unit dropdown item
const UnitDropdownItem = styled(Box)<{ selected?: boolean }>(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 20px',
  cursor: 'pointer',
  backgroundColor: selected ? '#1C1C1C' : '#FFFFFF',
  color: selected ? '#FFFFFF' : '#1C1C1C',
  fontSize: '14px',
  fontWeight: selected ? 600 : 400,
  fontFamily: "'Inter', sans-serif",
  '&:hover': {
    backgroundColor: selected ? '#1C1C1C' : 'rgba(28,28,28,0.04)',
  },
}));

// ─── Data ─────────────────────────────────────────────────────────────────────

const UNIT_OPTIONS = [
  { id: '1', label: 'Unit 1' },
  { id: '2', label: 'Unit 2' },
  { id: '3', label: 'Unit 3' },
];

const TABS = [
  'Unit 01 Unit Summary',
  'Mock Knowledge Test',
  'Portfolio Based Mock Interview',
  'Project/Improvement Presentation',
  'EPA Confirmation',
];

const PROGRESS_ITEMS = [
  { num: 1, label: 'Mock Knowledge Test', progress: 0 },
  { num: 2, label: 'Portfolio Based Mock Interview', progress: 0 },
  { num: 3, label: 'Project/Improvement Presentation', progress: 0 },
  { num: 4, label: 'EPA Confirmation', progress: 0 },
];

// ─── Component ────────────────────────────────────────────────────────────────

const ProgressUnitDetails: React.FC = () => {
  const router = useRouter();
  const { unit: unitParam } = router.query;

  const [activeTab, setActiveTab] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState(
    typeof unitParam === 'string' ? unitParam : '1'
  );
  const [unitAnchorEl, setUnitAnchorEl] = useState<HTMLElement | null>(null);
  const unitDropdownOpen = Boolean(unitAnchorEl);

  const handleUnitDropdownOpen = (e: React.MouseEvent<HTMLElement>) => {
    setUnitAnchorEl(e.currentTarget);
  };
  const handleUnitSelect = (id: string) => {
    setSelectedUnit(id);
    setUnitAnchorEl(null);
  };

  return (
    <LearnerLayout pageTitle="Progress Unit Details">
      <PageWrapper>

        {/* Page header: back + title */}
        <PageHeaderRow>
          <BackBtn onClick={() => router.back()}>
            <ArrowBackIos sx={{ fontSize: '12px', color: '#fff', ml: '3px' }} />
          </BackBtn>
          <PageTitle>Progress Unit Details</PageTitle>
        </PageHeaderRow>

        {/* Main card */}
        <DetailCard>

          {/* Unit selector bar */}
          <UnitBar>
            <UnitSelector onClick={handleUnitDropdownOpen}>
              Unit: {selectedUnit}
              <ExpandMore sx={{ fontSize: '18px', color: 'rgba(28,28,28,0.5)', ml: '2px' }} />
            </UnitSelector>
            <SignedText>This plan of activity/action has already been signed.</SignedText>
          </UnitBar>

          {/* Unit dropdown popover */}
          <Popover
            open={unitDropdownOpen}
            anchorEl={unitAnchorEl}
            onClose={() => setUnitAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{
              sx: {
                borderRadius: '12px',
                overflow: 'hidden',
                minWidth: '180px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
                mt: '6px',
              },
            }}
          >
            {UNIT_OPTIONS.map((unit) => (
              <UnitDropdownItem
                key={unit.id}
                selected={unit.id === selectedUnit}
                onClick={() => handleUnitSelect(unit.id)}
              >
                {unit.label}
                <ChevronRight sx={{ fontSize: '16px', opacity: 0.6 }} />
              </UnitDropdownItem>
            ))}
          </Popover>

          {/* Tabs */}
          <TabsRow>
            {TABS.map((tab, i) => (
              <Tab key={tab} active={activeTab === i} onClick={() => setActiveTab(i)}>
                {tab}
              </Tab>
            ))}
          </TabsRow>

          {/* Tab content */}
          {activeTab === 0 && (
            <TabContent>

              {/* 3-column info row */}
              <InfoRow>
                <InfoCol>
                  <InfoColLabel>Learner Name</InfoColLabel>
                  <InfoColValue>John doe</InfoColValue>
                </InfoCol>
                <InfoCol>
                  <InfoColLabel>Learning Aim</InfoColLabel>
                  <InfoColValue>Business Administrator Gateway to End Point</InfoColValue>
                </InfoCol>
                <InfoCol>
                  <InfoColLabel>Awarding Body Reg.</InfoColLabel>
                  <InfoColValue>Pending</InfoColValue>
                </InfoCol>
              </InfoRow>

              {/* Unit heading */}
              <Box>
                <SectionHeading>[Unit 01] Gateway to End Point Assessment</SectionHeading>

                {/* Progress items */}
                {PROGRESS_ITEMS.map((item) => (
                  <ProgressItemRow key={item.num}>
                    <ProgressItemLabel>[{item.num}] {item.label}</ProgressItemLabel>
                    <ProgressItemValue>Progress: {item.progress}%</ProgressItemValue>
                  </ProgressItemRow>
                ))}
              </Box>

              {/* Related Learning Activities */}
              <Box>
                <SectionHeading>Related Learning Activities</SectionHeading>
                <SectionBodyText>
                  NB. Secondary methods are encapsulated with square brackets, e.g. [OB1]
                </SectionBodyText>
                <SectionBodyText sx={{ mt: '4px' }}>
                  There are no related learning activities for this Unit - pending learning
                  activities are not included in your portfolio.
                </SectionBodyText>
              </Box>

              {/* Attachments */}
              <Box>
                <SectionHeading>Attachments</SectionHeading>
                <SectionMutedText>Nothing is attached</SectionMutedText>
              </Box>

              {/* Feedback & Comments */}
              <Box>
                <SectionHeading>Feedback &amp; Comments</SectionHeading>

                {/* Existing comment */}
                <FeedbackMsg>
                  <FeedbackMeta>
                    From: Tahmidul Hassan (Trainer) on 10/02/2025 19:49 To: John doe (Learner) Unread
                  </FeedbackMeta>
                  <FeedbackBody>Good job</FeedbackBody>
                </FeedbackMsg>

                {/* Rich text editor */}
                <EditorWrapper>
                  <EditorArea contentEditable suppressContentEditableWarning>
                    Write here
                  </EditorArea>
                  <EditorToolbar>
                    {/* Font size */}
                    <ToolbarFontSize>
                      14
                      <ExpandMore sx={{ fontSize: '14px', color: 'rgba(28,28,28,0.5)' }} />
                    </ToolbarFontSize>

                    <ToolbarDivider />

                    {/* T (text color) */}
                    <ToolbarBtn>T</ToolbarBtn>

                    {/* Color dot */}
                    <ToolbarDot />

                    <ToolbarDivider />

                    {/* Format buttons */}
                    <ToolbarBtn sx={{ fontWeight: 700 }}>B</ToolbarBtn>
                    <ToolbarBtn sx={{ fontStyle: 'italic' }}>I</ToolbarBtn>
                    <ToolbarBtn sx={{ textDecoration: 'underline' }}>U</ToolbarBtn>
                    <ToolbarBtn sx={{ textDecoration: 'line-through' }}>S</ToolbarBtn>

                    <ToolbarDivider />

                    {/* Alignment */}
                    <ToolbarBtn>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <line x1="1" y1="3" x2="13" y2="3" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="1" y1="7" x2="10" y2="7" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="1" y1="11" x2="13" y2="11" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </ToolbarBtn>
                    <ToolbarBtn>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <line x1="1" y1="3" x2="13" y2="3" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="3" y1="7" x2="11" y2="7" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="1" y1="11" x2="13" y2="11" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </ToolbarBtn>
                    <ToolbarBtn>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <line x1="1" y1="3" x2="13" y2="3" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="3" y1="7" x2="13" y2="7" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="1" y1="11" x2="13" y2="11" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </ToolbarBtn>

                    <ToolbarDivider />

                    {/* Indent / list */}
                    <ToolbarBtn>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <line x1="5" y1="3" x2="13" y2="3" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="5" y1="7" x2="13" y2="7" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="5" y1="11" x2="13" y2="11" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="1" y1="4" x2="3" y2="7" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="3" y1="7" x2="1" y2="10" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </ToolbarBtn>
                    <ToolbarBtn>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <line x1="5" y1="3" x2="13" y2="3" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="5" y1="7" x2="13" y2="7" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="5" y1="11" x2="13" y2="11" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="2" cy="3" r="1" fill="#1C1C1C"/>
                        <circle cx="2" cy="7" r="1" fill="#1C1C1C"/>
                        <circle cx="2" cy="11" r="1" fill="#1C1C1C"/>
                      </svg>
                    </ToolbarBtn>

                    <ToolbarDivider />

                    {/* Image + Link */}
                    <ToolbarBtn>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="#1C1C1C" strokeWidth="1.4"/>
                        <circle cx="4.5" cy="5.5" r="1.5" stroke="#1C1C1C" strokeWidth="1.2"/>
                        <path d="M1 9.5L4 7L6.5 9.5L9 7.5L13 10" stroke="#1C1C1C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </ToolbarBtn>
                    <ToolbarBtn>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M5.5 8.5C6.2 9.2 7.5 9.6 8.5 8.5L10.5 6.5C11.6 5.4 11.6 3.6 10.5 2.5C9.4 1.4 7.6 1.4 6.5 2.5L5.5 3.5" stroke="#1C1C1C" strokeWidth="1.4" strokeLinecap="round"/>
                        <path d="M8.5 5.5C7.8 4.8 6.5 4.4 5.5 5.5L3.5 7.5C2.4 8.6 2.4 10.4 3.5 11.5C4.6 12.6 6.4 12.6 7.5 11.5L8.5 10.5" stroke="#1C1C1C" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    </ToolbarBtn>
                  </EditorToolbar>
                </EditorWrapper>

                {/* Send / Cancel */}
                <ActionRow>
                  <SendBtn>Send</SendBtn>
                  <CancelBtn>Cancel</CancelBtn>
                </ActionRow>
              </Box>

            </TabContent>
          )}

          {/* Other tabs: empty state placeholder */}
          {activeTab !== 0 && (
            <TabContent>
              <Box sx={{ color: 'rgba(28,28,28,0.4)', fontSize: '14px', fontFamily: "'Inter', sans-serif", textAlign: 'center', py: '40px' }}>
                No content available for this tab.
              </Box>
            </TabContent>
          )}

        </DetailCard>

      </PageWrapper>
    </LearnerLayout>
  );
};

export default ProgressUnitDetails;
