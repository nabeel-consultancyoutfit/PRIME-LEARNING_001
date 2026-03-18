import { ReactNode } from 'react';
import TrainerMessages from '@/modules/trainer/pages/Messages';

function TrainerMessagesPage() {
  return <TrainerMessages />;
}

TrainerMessagesPage.getLayout = (page: ReactNode) => page;

export default TrainerMessagesPage;
