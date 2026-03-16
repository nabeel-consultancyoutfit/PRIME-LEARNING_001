/**
 * CourseCreate interfaces
 */

export interface CourseFormValues {
  title: string;
  description: string;
  categoryId: string;
  instructorId: string;
  duration: number;
  maxStudents: number;
  price: number;
  status: 'draft' | 'published';
}

export interface CourseCreateProps {
  initialValues?: Partial<CourseFormValues>;
  onSuccess?: (courseId: string) => void;
  isLoading?: boolean;
}

export interface CategoryOption {
  id: string;
  label: string;
  value: string;
}

export interface InstructorOption {
  id: string;
  label: string;
  value: string;
}
