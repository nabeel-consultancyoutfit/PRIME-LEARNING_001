import { ReactNode } from 'react';
import LearnerForms from '@/modules/trainer/pages/LearnerForms';

function LearnerFormsPage() {
  return <LearnerForms />;
}

LearnerFormsPage.getLayout = (page: ReactNode) => page;

export default LearnerFormsPage;
