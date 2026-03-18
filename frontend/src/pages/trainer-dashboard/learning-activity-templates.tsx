import { ReactNode } from 'react';
import FormsTemplates from '@/modules/trainer/pages/FormsTemplates';

const ITEMS = [
  {
    label: 'Observation of Practice Template',
    description: 'Template for recording direct observation of learner work-based practice',
    path: '/trainer-dashboard/learning-activity-templates/observation',
  },
  {
    label: 'Professional Discussion Template',
    description: 'Structured template for conducting and recording professional discussions',
    path: '/trainer-dashboard/learning-activity-templates/professional-discussion',
  },
  {
    label: 'Case Study Template',
    description: 'Template for setting and assessing work-based case study activities',
    path: '/trainer-dashboard/learning-activity-templates/case-study',
  },
  {
    label: 'Reflective Account Template',
    description: 'Guide learners in writing structured reflective accounts of their practice',
    path: '/trainer-dashboard/learning-activity-templates/reflective-account',
  },
  {
    label: 'Witness Testimony Template',
    description: 'Collect third-party witness testimony confirming learner competence',
    path: '/trainer-dashboard/learning-activity-templates/witness-testimony',
  },
];

function LearningActivityTemplatesPage() {
  return <FormsTemplates title="Learning Activity Templates" items={ITEMS} />;
}

LearningActivityTemplatesPage.getLayout = (page: ReactNode) => page;

export default LearningActivityTemplatesPage;
