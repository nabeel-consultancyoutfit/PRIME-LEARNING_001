import { ReactNode } from 'react';
import Resources from '@/modules/learner/pages/Resources';

function ResourcesPage() {
  return <Resources />;
}

ResourcesPage.getLayout = (page: ReactNode) => page;

export default ResourcesPage;
