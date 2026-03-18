import { ReactNode } from 'react';
import LearningSupportForm from '@/modules/learner/pages/LearningSupportForm';

function LearningSupportPage() {
  return <LearningSupportForm />;
}

LearningSupportPage.getLayout = (page: ReactNode) => page;

export default LearningSupportPage;
