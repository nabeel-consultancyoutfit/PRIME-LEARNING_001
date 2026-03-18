import { ReactNode } from 'react';
import Courses from '@/modules/learner/pages/Courses';

function ClassroomPage() {
  return <Courses />;
}

ClassroomPage.getLayout = (page: ReactNode) => page;

export default ClassroomPage;
