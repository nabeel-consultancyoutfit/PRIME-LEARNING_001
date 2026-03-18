import { ReactNode } from 'react';
import TrainerHelpCentre from '@/modules/trainer/pages/HelpCentre';

function TrainerHelpCentrePage() {
  return <TrainerHelpCentre />;
}

TrainerHelpCentrePage.getLayout = (page: ReactNode) => page;

export default TrainerHelpCentrePage;
