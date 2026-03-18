import { ReactNode } from 'react';
import LearnerFeedbackCreate from '@/modules/learner/pages/LearnerFeedback/CreateForm';

function LearnerFeedbackCreatePage() {
  return <LearnerFeedbackCreate />;
}

LearnerFeedbackCreatePage.getLayout = (page: ReactNode) => page;

export default LearnerFeedbackCreatePage;
