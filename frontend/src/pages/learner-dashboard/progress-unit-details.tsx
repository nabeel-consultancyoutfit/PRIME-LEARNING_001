import { ReactNode } from 'react';
import ProgressUnitDetails from '@/modules/learner/pages/ProgressUnitDetails';

function ProgressUnitDetailsPage() {
  return <ProgressUnitDetails />;
}

ProgressUnitDetailsPage.getLayout = (page: ReactNode) => page;

export default ProgressUnitDetailsPage;
