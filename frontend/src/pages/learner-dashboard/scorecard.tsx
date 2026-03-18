import { ReactNode } from 'react';
import Scorecard from '@/modules/learner/pages/Scorecard';

function ScorecardPage() {
  return <Scorecard />;
}

ScorecardPage.getLayout = (page: ReactNode) => page;

export default ScorecardPage;
