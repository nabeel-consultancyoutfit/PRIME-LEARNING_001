import { ReactNode } from 'react';
import FormsTemplates from '@/modules/trainer/pages/FormsTemplates';

const ITEMS = [
  {
    label: 'Plan of Activity Template',
    description: 'Template for setting structured learning activities with KSB mapping',
    path: '/trainer-dashboard/plan-of-activity-templates/plan-of-activity',
  },
  {
    label: 'Action Plan Template',
    description: 'Set targeted improvement actions with deadlines and review dates',
    path: '/trainer-dashboard/plan-of-activity-templates/action-plan',
  },
  {
    label: 'SMART Target Template',
    description: 'Guide learners in setting Specific, Measurable, Achievable, Relevant, Time-bound targets',
    path: '/trainer-dashboard/plan-of-activity-templates/smart-target',
  },
];

function PlanOfActivityTemplatesPage() {
  return <FormsTemplates title="Plan Of Activity/action Templates" items={ITEMS} />;
}

PlanOfActivityTemplatesPage.getLayout = (page: ReactNode) => page;

export default PlanOfActivityTemplatesPage;
