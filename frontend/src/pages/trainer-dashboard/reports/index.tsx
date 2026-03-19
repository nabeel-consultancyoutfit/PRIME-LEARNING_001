import { ReactNode } from 'react';
import TrainerReports from '@/modules/trainer/pages/Reports';

function TrainerReportsPage() {
  return <TrainerReports />;
}

TrainerReportsPage.getLayout = (page: ReactNode) => page;

export default TrainerReportsPage;
