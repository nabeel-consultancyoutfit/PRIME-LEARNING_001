import { ReactNode } from 'react';
import Timesheet from '@/modules/learner/pages/Timesheet';

function TimesheetPage() {
  return <Timesheet />;
}

TimesheetPage.getLayout = (page: ReactNode) => page;

export default TimesheetPage;
