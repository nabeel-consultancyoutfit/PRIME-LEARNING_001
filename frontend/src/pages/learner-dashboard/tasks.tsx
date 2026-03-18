import { ReactNode } from 'react';
import Tasks from '@/modules/learner/pages/Tasks';

function TasksPage() {
  return <Tasks />;
}

TasksPage.getLayout = (page: ReactNode) => page;

export default TasksPage;
