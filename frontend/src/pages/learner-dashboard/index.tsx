import { ReactNode } from 'react';
import DashboardSelector from '@/modules/learner/pages/DashboardSelector';

function LearnerSelectDashboardPage() {
  return <DashboardSelector />;
}

LearnerSelectDashboardPage.getLayout = (page: ReactNode) => page;

export default LearnerSelectDashboardPage;
