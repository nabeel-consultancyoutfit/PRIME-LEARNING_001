import { ReactNode } from 'react';
import Dashboard from '@/modules/learner/pages/Dashboard';

function LearnerDashboardPage() {
  return <Dashboard />;
}

LearnerDashboardPage.getLayout = (page: ReactNode) => page;

export default LearnerDashboardPage;
