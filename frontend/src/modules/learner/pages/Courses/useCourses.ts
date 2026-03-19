/**
 * Hook for Courses page state management — uses real enrollments API.
 */

import { useState, useEffect, useCallback } from 'react';
import { CoursesState, CourseCard } from './Courses.interface';
import { enrollmentsService } from '@/services/courses/coursesService';

const initialState: CoursesState = {
  courses: [],
  orderBy: 'name_asc',
  searchTerm: '',
};

export const useCourses = () => {
  const [state, setState] = useState<CoursesState>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await enrollmentsService.getMyEnrollments({ page: 1, pageSize: 50 });
      const enrollments: any[] = Array.isArray(res) ? res : (res as any)?.data ?? [];

      const courses: CourseCard[] = enrollments.map((enr: any) => {
        const course = enr.courseId ?? enr.course ?? {};
        const lessonCount = course.lessons?.length ?? 0;
        const completedLessons = (enr.lessonProgress ?? []).filter(
          (lp: any) => lp.completed
        ).length;
        const progress = lessonCount > 0
          ? Math.round((completedLessons / lessonCount) * 100)
          : 0;

        let status = 'Not started';
        if (enr.completedAt) {
          status = 'Completed';
        } else if (progress > 0) {
          status = `${progress}% complete — keep going!`;
        } else {
          status = 'You have not started this course';
        }

        return {
          id: enr._id ?? course._id ?? String(Math.random()),
          title: course.title ?? 'Untitled Course',
          status,
          progress,
        };
      });

      setState((prev) => ({ ...prev, courses }));
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load courses');
      setState((prev) => ({ ...prev, courses: [] }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const setOrderBy = (value: string) => {
    setState((prev) => {
      const sorted = [...prev.courses].sort((a, b) => {
        if (value === 'name_asc') return a.title.localeCompare(b.title);
        if (value === 'name_desc') return b.title.localeCompare(a.title);
        if (value === 'date_new') return b.progress - a.progress;
        if (value === 'date_old') return a.progress - b.progress;
        return 0;
      });
      return { ...prev, orderBy: value, courses: sorted };
    });
  };

  const setSearchTerm = (value: string) => {
    setState((prev) => ({ ...prev, searchTerm: value }));
  };

  const handleStartCourse = (courseId: string) => {
    console.log('Start course:', courseId);
  };

  const filteredCourses = state.searchTerm
    ? state.courses.filter((c) =>
        c.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    : state.courses;

  return {
    state: { ...state, courses: filteredCourses },
    isLoading,
    error,
    setOrderBy,
    setSearchTerm,
    handleStartCourse,
    refresh: fetchCourses,
  };
};
