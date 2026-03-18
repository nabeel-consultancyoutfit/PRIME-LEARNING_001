import { ReactNode } from 'react';
import TrainerTasks from '@/modules/trainer/pages/Tasks';

function TrainerTasksPage() {
  return <TrainerTasks />;
}

TrainerTasksPage.getLayout = (page: ReactNode) => page;

export default TrainerTasksPage;
