import { ReactNode } from 'react';
import FormsTemplates from '@/modules/trainer/pages/FormsTemplates';

const ITEMS = [
  {
    label: 'Knowledge Test Question Bank',
    description: 'Repository of written knowledge questions mapped to each KSB',
    path: '/trainer-dashboard/written-question-forms/knowledge-test',
  },
  {
    label: 'Mock Knowledge Test Paper',
    description: 'Practice knowledge test paper for learner EPA preparation',
    path: '/trainer-dashboard/written-question-forms/mock-knowledge-test',
  },
  {
    label: 'Scenario-Based Questions',
    description: 'Situational questions to assess learner contextual understanding',
    path: '/trainer-dashboard/written-question-forms/scenario-questions',
  },
];

function WrittenQuestionFormsPage() {
  return <FormsTemplates title="Written Question Forms" items={ITEMS} />;
}

WrittenQuestionFormsPage.getLayout = (page: ReactNode) => page;

export default WrittenQuestionFormsPage;
