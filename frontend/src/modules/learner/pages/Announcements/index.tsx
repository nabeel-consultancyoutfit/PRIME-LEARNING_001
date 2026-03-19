/**
 * Learner — System Announcements page
 * Fetches from /notifications (system-type) or falls back gracefully.
 */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArrowBack as ArrowBackIcon,
  CampaignOutlined as AnnouncementIcon,
} from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { notificationsService } from '@/services/notifications/notificationsService';

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

interface AnnouncementItem {
  id: string;
  title: string;
  body: string;
  date: string;
  isNew: boolean;
}

function mapNotification(n: any): AnnouncementItem {
  const createdAt = n.createdAt ? new Date(n.createdAt) : new Date();
  const isNew = !n.isRead && (Date.now() - createdAt.getTime()) < 7 * 24 * 60 * 60 * 1000;
  return {
    id: n._id ?? String(Math.random()),
    title: n.title ?? 'Announcement',
    body: n.message ?? n.body ?? '',
    date: createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    isNew,
  };
}

const Announcements: React.FC = () => {
  const router = useRouter();
  const [items, setItems] = useState<AnnouncementItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await notificationsService.getMyNotifications({ page: 1, pageSize: 20 });
        const list: any[] = Array.isArray(res) ? res : (res as any)?.data ?? [];
        setItems(list.filter((n: any) => n.type === 'system' || n.type === 'announcement').map(mapNotification));
      } catch {
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <CircularProgress size={28} sx={{ color: '#7B61FF' }} />
            </Box>
          ) : items.length === 0 ? (
            <Box sx={{ padding: '40px 20px', textAlign: 'center', color: 'rgba(28,28,28,0.4)', fontSize: '14px', fontFamily: "'Inter', sans-serif" }}>
              No announcements at this time.
            </Box>
          ) : (
            items.map((item) => (
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
            ))
          )}
        </ContentCard>
      </PageContainer>
    </LearnerLayout>
  );
};

export default Announcements;
