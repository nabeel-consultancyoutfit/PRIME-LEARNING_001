import { ReactNode } from 'react';
import Evidence from '@/modules/learner/pages/Evidence';

function EvidencePage() {
  return <Evidence />;
}

EvidencePage.getLayout = (page: ReactNode) => page;

export default EvidencePage;
