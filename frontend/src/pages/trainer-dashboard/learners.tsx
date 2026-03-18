import { ReactNode } from 'react';
import MyLearners from '@/modules/trainer/pages/Learners';

function TrainerLearnersPage() {
  return <MyLearners />;
}

TrainerLearnersPage.getLayout = (page: ReactNode) => page;

export default TrainerLearnersPage;
