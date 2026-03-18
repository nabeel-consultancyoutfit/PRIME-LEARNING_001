/**
 * Courses module interfaces and types
 */

export interface CourseCard {
  id: string;
  title: string;
  status: string;
  progress: number;
}

export interface CoursesState {
  courses: CourseCard[];
  orderBy: string;
  searchTerm: string;
}
