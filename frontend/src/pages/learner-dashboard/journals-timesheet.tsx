import { ReactNode } from 'react';
import Timesheets from '@/modules/learner/pages/LearningJournals/Timesheets';

function JournalsTimesheetPage() {
  return <Timesheets />;
}

JournalsTimesheetPage.getLayout = (page: ReactNode) => page;

export default JournalsTimesheetPage;
