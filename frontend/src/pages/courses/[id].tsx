import { useRouter } from 'next/router';
import CourseDetails from '@/modules/courseManagement/CourseDetails';

export default function CourseDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  return <CourseDetails id={id as string} />;
}
