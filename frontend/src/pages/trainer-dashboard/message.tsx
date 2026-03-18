import { ReactNode } from 'react';
import TrainerMessage from '@/modules/trainer/pages/Message';

function TrainerMessagePage() {
  return <TrainerMessage />;
}

TrainerMessagePage.getLayout = (page: ReactNode) => page;

export default TrainerMessagePage;
