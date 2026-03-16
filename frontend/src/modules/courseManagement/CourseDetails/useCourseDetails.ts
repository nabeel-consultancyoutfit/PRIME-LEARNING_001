/**
 * CourseDetails custom hook
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchCourseById } from '@/redux/slices/courseManagementSlice';
import { UseCourseDetailsReturn, EnrolledStudent } from './CourseDetails.interface';

/**
 * Custom hook for course details functionality
 */
export const useCourseDetails = (courseId?: string): UseCourseDetailsReturn => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [enrolledStudents, setEnrolledStudents] = useState<EnrolledStudent[]>([]);

  // Use courseId from props or router query
  const id = courseId || (router.query.id as string);

  // Redux selectors
  const course = useAppSelector((state) => state.courseManagement.selectedCourse);
  const loading = useAppSelector((state) => state.courseManagement.loading);
  const error = useAppSelector((state) => state.courseManagement.error);

  // Mock lessons data
  const lessons = useAppSelector((state) => {
    // In a real app, this would come from a lessons slice
    return [];
  });

  // Mock instructor data
  const instructor = null; // In a real app, fetch from an instructor service

  // Fetch course on mount
  useEffect(() => {
    if (id && id !== 'new') {
      dispatch(fetchCourseById(id));
    }
  }, [id, dispatch]);

  // Generate mock enrolled students
  useEffect(() => {
    if (course) {
      const mockStudents: EnrolledStudent[] = Array.from(
        { length: Math.min(5, course.enrolledCount) },
        (_, i) => ({
          id: `student-${i + 1}`,
          name: `Student ${i + 1}`,
          email: `student${i + 1}@example.com`,
          enrolledAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
          progress: Math.floor(Math.random() * 100),
          status: Math.random() > 0.5 ? 'active' : 'completed',
        })
      );
      setEnrolledStudents(mockStudents);
    }
  }, [course]);

  return {
    course,
    instructor,
    lessons,
    enrolledStudents,
    loading,
    error,
  };
};
