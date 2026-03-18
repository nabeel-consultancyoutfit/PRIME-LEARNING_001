import { ReactNode } from 'react';
import Progress from '@/modules/learner/pages/Progress';

function ProgressPage() {
  return <Progress />;
}

ProgressPage.getLayout = (page: ReactNode) => page;

export default ProgressPage;
