/**
 * Hook for Courses page state management
 */

import { useState } from 'react';
import { CoursesState } from './Courses.interface';
import { MOCK_COURSES } from './Courses.data';

const initialState: CoursesState = {
  courses: MOCK_COURSES,
  orderBy: 'name_asc',
  searchTerm: '',
};

export const useCourses = () => {
  const [state, setState] = useState<CoursesState>(initialState);

  const setOrderBy = (value: string) => {
    setState((prev) => ({ ...prev, orderBy: value }));
  };

  const setSearchTerm = (value: string) => {
    setState((prev) => ({ ...prev, searchTerm: value }));
  };

  const handleStartCourse = (courseId: string) => {
    console.log('Start course:', courseId);
  };

  return {
    state,
    setOrderBy,
    setSearchTerm,
    handleStartCourse,
  };
};
