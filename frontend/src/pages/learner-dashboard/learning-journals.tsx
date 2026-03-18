import { ReactNode } from 'react';
import LearningJournals from '@/modules/learner/pages/LearningJournals';

function LearningJournalsPage() {
  return <LearningJournals />;
}

LearningJournalsPage.getLayout = (page: ReactNode) => page;

export default LearningJournalsPage;
