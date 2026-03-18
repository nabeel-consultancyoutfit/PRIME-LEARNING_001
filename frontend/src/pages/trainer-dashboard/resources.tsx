import { ReactNode } from 'react';
import TrainerResources from '@/modules/trainer/pages/Resources';

function TrainerResourcesPage() {
  return <TrainerResources />;
}

TrainerResourcesPage.getLayout = (page: ReactNode) => page;

export default TrainerResourcesPage;
