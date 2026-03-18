import { ReactNode } from 'react';
import CalendarPage from '@/modules/learner/pages/Calendar';

function LearnerCalendarPage() {
  return <CalendarPage />;
}

LearnerCalendarPage.getLayout = (page: ReactNode) => page;

export default LearnerCalendarPage;
