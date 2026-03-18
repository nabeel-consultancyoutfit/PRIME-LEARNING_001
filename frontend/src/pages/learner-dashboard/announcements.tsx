import { ReactNode } from 'react';
import Announcements from '@/modules/learner/pages/Announcements';

function AnnouncementsPage() {
  return <Announcements />;
}

AnnouncementsPage.getLayout = (page: ReactNode) => page;

export default AnnouncementsPage;
