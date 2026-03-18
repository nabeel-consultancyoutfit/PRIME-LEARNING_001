import { ReactNode } from 'react';
import HelpCentre from '@/modules/learner/pages/HelpCentre';

function HelpCentrePage() {
  return <HelpCentre />;
}

HelpCentrePage.getLayout = (page: ReactNode) => page;

export default HelpCentrePage;
