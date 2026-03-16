/**
 * Dashboard custom hook
 */

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchCourses } from '@/redux/slices/courseManagementSlice';
import { DashboardData, RecentCourse } from './Dashboard.interface';

interface UseDashboardReturn {
  stats: {
    totalCourses: number;
    totalStudents: number;
    activeEnrollments: number;
    totalRevenue: number;
  };
  recentCourses: RecentCourse[];
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for dashboard data
 */
export const useDashboard = (): UseDashboardReturn => {
  const dispatch = useAppDispatch();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    activeEnrollments: 0,
    totalRevenue: 0,
  });
  const [recentCourses, setRecentCourses] = useState<RecentCourse[]>([]);

  const courses = useAppSelector((state) => state.courseManagement.courses);
  const loading = useAppSelector((state) => state.courseManagement.loading);
  const error = useAppSelector((state) => state.courseManagement.error);
  const pagination = useAppSelector((state) => state.courseManagement.pagination);

  useEffect(() => {
    dispatch(
      fetchCourses({
        page: 1,
        pageSize: 5,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const courseList = Array.isArray(courses) ? courses : [];

    // Calculate stats from courses
    const totalCourses = pagination?.total ?? 0;
    const totalStudents = courseList.reduce(
      (sum, course) => sum + (course.enrolledCount ?? 0),
      0,
    );
    const activeEnrollments = courseList.filter(
      (c) => c.status === 'published',
    ).length;
    const totalRevenue = courseList.reduce(
      (sum, course) => sum + (course.price ?? 0) * (course.enrolledCount ?? 0),
      0,
    );

    setStats({
      totalCourses,
      totalStudents,
      activeEnrollments,
      totalRevenue,
    });

    // Map recent courses
    const recent = courseList.slice(0, 5).map((course) => ({
      id: course.id,
      title: course.title,
      instructor: course.instructorId,
      enrolledCount: course.enrolledCount,
      maxStudents: course.maxStudents,
      status: course.status,
      price: course.price,
      createdAt: course.createdAt,
    }));

    setRecentCourses(recent);
  }, [courses, pagination.total]);

  return {
    stats,
    recentCourses,
    loading,
    error,
  };
};
