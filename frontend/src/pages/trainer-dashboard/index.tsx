import { ReactNode } from 'react';
import TrainerDashboard from '@/modules/trainer/pages/Dashboard';

function TrainerDashboardPage() {
  return <TrainerDashboard />;
}

TrainerDashboardPage.getLayout = (page: ReactNode) => page;

export default TrainerDashboardPage;
