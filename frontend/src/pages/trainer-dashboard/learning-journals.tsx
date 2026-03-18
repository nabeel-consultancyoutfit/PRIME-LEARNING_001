import { ReactNode } from 'react';
import TrainerLearningJournals from '@/modules/trainer/pages/LearningJournals';

function TrainerLearningJournalsPage() {
  return <TrainerLearningJournals />;
}

TrainerLearningJournalsPage.getLayout = (page: ReactNode) => page;

export default TrainerLearningJournalsPage;
