/**
 * CourseCreate custom hook
 */

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createCourseThunk, clearError } from '@/redux/slices/courseManagementSlice';
import { CourseFormValues } from './CourseCreate.interface';

interface UseCourseCreateReturn {
  onSubmit: (values: CourseFormValues) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  clearSuccess: () => void;
}

/**
 * Custom hook for course creation
 */
export const useCourseCreate = (redirectTo?: string): UseCourseCreateReturn => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.courseManagement.loading);
  const error = useAppSelector((state) => state.courseManagement.error);
  const [success, setSuccess] = useState(false);

  // Clear error on mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = useCallback(
    async (values: CourseFormValues) => {
      try {
        setSuccess(false);
        const result = await dispatch(
          createCourseThunk({
            title: values.title,
            description: values.description,
            categoryId: values.categoryId,
            instructorId: values.instructorId,
            duration: values.duration,
            maxStudents: values.maxStudents,
            price: values.price,
            status: values.status,
            thumbnail: '', // Add default thumbnail
          })
        ).unwrap();

        setSuccess(true);

        // Redirect after a short delay to show success message
        setTimeout(() => {
          router.push(redirectTo || '/courses');
        }, 1500);

        return result;
      } catch (err) {
        console.error('Failed to create course:', err);
        throw err;
      }
    },
    [dispatch, router, redirectTo]
  );

  const clearSuccess = useCallback(() => {
    setSuccess(false);
  }, []);

  return {
    onSubmit,
    loading,
    error,
    success,
    clearSuccess,
  };
};
