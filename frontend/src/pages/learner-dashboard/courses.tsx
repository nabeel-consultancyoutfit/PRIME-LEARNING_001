import { ReactNode } from 'react';
import Courses from '@/modules/learner/pages/Courses';

function CoursesPage() {
  return <Courses />;
}

CoursesPage.getLayout = (page: ReactNode) => page;

export default CoursesPage;
