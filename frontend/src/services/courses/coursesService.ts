/**
 * Courses + Enrollments service — wraps the backend /courses and /enrollments APIs.
 */

import { apiClient } from '@/services/api';

export interface CourseLesson {
  id: string;
  title: string;
  description?: string;
  content?: string;
  videoUrl?: string;
  duration?: number;
  order: number;
  resources?: Array<{ title: string; url: string; type: string }>;
}

export interface Course {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  instructorId?: string | any;
  lessons: CourseLesson[];
  ksbTags: string[];
  programmeId?: string | any;
  duration?: number;
  status: 'draft' | 'published' | 'archived';
  enrollmentCount?: number;
  createdAt?: string;
}

export interface Enrollment {
  _id: string;
  learnerId: string | any;
  courseId: string | Course;
  progressPercentage: number;
  lessonProgress: Array<{
    lessonId: string;
    completed: boolean;
    completedAt?: string;
    timeSpent?: number;
  }>;
  status: 'enrolled' | 'in_progress' | 'completed' | 'dropped';
  completedAt?: string;
  certificateUrl?: string;
}

export interface PaginatedCourses {
  success: boolean;
  data: Course[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

const unwrap = (res: any) => (res && 'data' in res ? res.data : res);

export const coursesService = {
  listAll: async (params?: {
    programmeId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedCourses> => {
    const qs = new URLSearchParams();
    if (params?.programmeId) qs.set('programmeId', params.programmeId);
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/courses${query}`);
  },

  getById: async (id: string): Promise<Course> => {
    return unwrap(await apiClient.get<any>(`/courses/${id}`));
  },

  create: async (data: Partial<Course>): Promise<Course> => {
    return unwrap(await apiClient.post<any>('/courses', data));
  },

  update: async (id: string, data: Partial<Course>): Promise<Course> => {
    return unwrap(await apiClient.patch<any>(`/courses/${id}`, data));
  },

  addLesson: async (courseId: string, lesson: Partial<CourseLesson>): Promise<Course> => {
    return unwrap(await apiClient.post<any>(`/courses/${courseId}/lessons`, lesson));
  },

  updateLesson: async (
    courseId: string,
    lessonId: string,
    data: Partial<CourseLesson>,
  ): Promise<Course> => {
    return unwrap(await apiClient.patch<any>(`/courses/${courseId}/lessons/${lessonId}`, data));
  },
};

export const enrollmentsService = {
  getMyEnrollments: async (params?: { page?: number; pageSize?: number }) => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.pageSize) qs.set('pageSize', String(params.pageSize));
    const query = qs.toString() ? `?${qs}` : '';
    return apiClient.get<any>(`/enrollments/my${query}`);
  },

  enroll: async (courseId: string): Promise<Enrollment> => {
    return unwrap(await apiClient.post<any>('/enrollments', { courseId }));
  },

  getMyEnrollment: async (courseId: string): Promise<Enrollment> => {
    return unwrap(await apiClient.get<any>(`/enrollments/my/${courseId}`));
  },

  completeLesson: async (
    enrollmentId: string,
    lessonId: string,
    timeSpent = 0,
  ): Promise<Enrollment> => {
    return unwrap(
      await apiClient.patch<any>(
        `/enrollments/${enrollmentId}/lesson/${lessonId}`,
        { timeSpent },
      ),
    );
  },
};
