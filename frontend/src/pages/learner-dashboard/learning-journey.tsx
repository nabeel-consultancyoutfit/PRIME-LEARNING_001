import { ReactNode } from 'react';
import LearningJourney from '@/modules/learner/pages/LearningJourney';

function LearningJourneyPage() {
  return <LearningJourney />;
}

LearningJourneyPage.getLayout = (page: ReactNode) => page;

export default LearningJourneyPage;
