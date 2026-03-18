/**
 * Learner — System Announcements page
 * Accessible via profile dropdown → System Announcements
 */
import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArrowBack as ArrowBackIcon,
  CampaignOutlined as AnnouncementIcon,
  FiberManualRecord as DotIcon,
} from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  fontFamily: "'Inter', sans-serif",
});

const PageHeaderRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const BackButton = styled(Box)({
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: '1px solid rgba(28,28,28,0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.05)' },
});

const PageTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

const ContentCard = styled(Box)({
  backgroundColor: '#FFFFFF',
  borderRadius: '16px',
  border: '1px solid rgba(28,28,28,0.1)',
  overflow: 'hidden',
});

const AnnouncementRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  padding: '16px 20px',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  '&:last-child': { borderBottom: 'none' },
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.02)' },
});

const AnnouncementIconBox = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: '10px',
  backgroundColor: 'rgba(123,97,255,0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

const MOCK_ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'Platform Maintenance Scheduled',
    body: 'The system will be undergoing planned maintenance on Saturday 22 March from 2:00 AM – 4:00 AM GMT.',
    date: '17 Mar 2026',
    isNew: true,
  },
  {
    id: '2',
    title: 'New Feature: Progress Scorecard',
    body: 'We have launched the new Progress Scorecard section. You can now track your learning milestones in real time.',
    date: '10 Mar 2026',
    isNew: true,
  },
  {
    id: '3',
    title: 'Reminder: Submit OTJ Evidence',
    body: 'Please ensure you have submitted all Off-The-Job training evidence for Q1 2026 by 31 March.',
    date: '05 Mar 2026',
    isNew: false,
  },
  {
    id: '4',
    title: 'Updated Privacy Policy',
    body: 'Our privacy policy has been updated. Please review the changes in your account settings.',
    date: '20 Feb 2026',
    isNew: false,
  },
];

const Announcements: React.FC = () => {
  const router = useRouter();

  return (
    <LearnerLayout pageTitle="System Announcements">
      <PageContainer>
        <PageHeaderRow>
          <BackButton onClick={() => router.back()}>
            <ArrowBackIcon sx={{ fontSize: '18px', color: '#1C1C1C' }} />
          </BackButton>
          <PageTitle>System Announcements</PageTitle>
        </PageHeaderRow>

        <ContentCard>
          {MOCK_ANNOUNCEMENTS.map((item) => (
            <AnnouncementRow key={item.id}>
              <AnnouncementIconBox>
                <AnnouncementIcon sx={{ fontSize: 20, color: '#7B61FF' }} />
              </AnnouncementIconBox>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1C', fontFamily: "'Inter', sans-serif" }}>
                    {item.title}
                  </Typography>
                  {item.isNew && (
                    <Box sx={{
                      backgroundColor: '#7B61FF',
                      color: '#FFF',
                      fontSize: '10px',
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                      borderRadius: '20px',
                      padding: '1px 8px',
                    }}>
                      NEW
                    </Box>
                  )}
                </Box>
                <Typography sx={{ fontSize: '13px', color: 'rgba(28,28,28,0.6)', fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>
                  {item.body}
                </Typography>
                <Typography sx={{ fontSize: '11px', color: 'rgba(28,28,28,0.35)', fontFamily: "'Inter', sans-serif", marginTop: '6px' }}>
                  {item.date}
                </Typography>
              </Box>
            </AnnouncementRow>
          ))}
        </ContentCard>
      </PageContainer>
    </LearnerLayout>
  );
};

export default Announcements;
