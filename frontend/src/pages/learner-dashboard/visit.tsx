import { ReactNode } from 'react';
import Visit from '@/modules/learner/pages/Visit';

function VisitPage() {
  return <Visit />;
}

VisitPage.getLayout = (page: ReactNode) => page;

export default VisitPage;
