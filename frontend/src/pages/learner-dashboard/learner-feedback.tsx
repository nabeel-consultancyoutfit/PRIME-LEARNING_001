import { ReactNode } from 'react';
import LearnerFeedback from '@/modules/learner/pages/LearnerFeedback';

function LearnerFeedbackPage() {
  return <LearnerFeedback />;
}

LearnerFeedbackPage.getLayout = (page: ReactNode) => page;

export default LearnerFeedbackPage;
