import { ReactNode } from 'react';
import TrainerReports from '@/modules/trainer/pages/Reports';

function TrainerProgressPage() {
  return <TrainerReports />;
}

TrainerProgressPage.getLayout = (page: ReactNode) => page;

export default TrainerProgressPage;
