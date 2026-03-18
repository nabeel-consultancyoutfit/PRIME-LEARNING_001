import { ReactNode } from 'react';
import TrainerScorecard from '@/modules/trainer/pages/Scorecard';

function TrainerScorecardPage() {
  return <TrainerScorecard />;
}

TrainerScorecardPage.getLayout = (page: ReactNode) => page;

export default TrainerScorecardPage;
