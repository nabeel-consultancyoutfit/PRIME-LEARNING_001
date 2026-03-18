import { ReactNode } from 'react';
import TrainerCourses from '@/modules/trainer/pages/Courses';

function TrainerCoursesPage() {
  return <TrainerCourses />;
}

TrainerCoursesPage.getLayout = (page: ReactNode) => page;

export default TrainerCoursesPage;
