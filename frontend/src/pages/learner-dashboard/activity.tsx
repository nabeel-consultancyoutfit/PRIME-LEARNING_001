import { ReactNode } from 'react';
import ActivityLog from '@/modules/learner/pages/Activity';

function ActivityPage() {
  return <ActivityLog />;
}

ActivityPage.getLayout = (page: ReactNode) => page;

export default ActivityPage;
