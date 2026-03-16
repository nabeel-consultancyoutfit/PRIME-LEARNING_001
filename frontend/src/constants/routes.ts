/**
 * Route path constants
 */

export const ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Dashboard
  DASHBOARD: '/dashboard',

  // Courses
  COURSES: {
    LIST: '/courses',
    CREATE: '/courses/create',
    DETAILS: (id: string) => `/courses/${id}`,
    EDIT: (id: string) => `/courses/${id}/edit`,
  },

  // Lessons
  LESSONS: {
    LIST: (courseId: string) => `/courses/${courseId}/lessons`,
    CREATE: (courseId: string) => `/courses/${courseId}/lessons/create`,
    DETAILS: (courseId: string, lessonId: string) =>
      `/courses/${courseId}/lessons/${lessonId}`,
    EDIT: (courseId: string, lessonId: string) =>
      `/courses/${courseId}/lessons/${lessonId}/edit`,
  },

  // Students
  STUDENTS: {
    LIST: '/students',
    CREATE: '/students/create',
    DETAILS: (id: string) => `/students/${id}`,
    EDIT: (id: string) => `/students/${id}/edit`,
  },

  // Instructors
  INSTRUCTORS: {
    LIST: '/instructors',
    CREATE: '/instructors/create',
    DETAILS: (id: string) => `/instructors/${id}`,
    EDIT: (id: string) => `/instructors/${id}/edit`,
  },

  // Enrollments
  ENROLLMENTS: {
    LIST: '/enrollments',
    DETAILS: (id: string) => `/enrollments/${id}`,
  },

  // Billing
  BILLING: {
    INVOICES: '/billing/invoices',
    INVOICE_DETAILS: (id: string) => `/billing/invoices/${id}`,
    SUBSCRIPTIONS: '/billing/subscriptions',
    SUBSCRIPTION_DETAILS: (id: string) => `/billing/subscriptions/${id}`,
  },

  // Admin
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    USER_DETAILS: (id: string) => `/admin/users/${id}`,
    SETTINGS: '/admin/settings',
  },

  // Profile
  PROFILE: {
    VIEW: '/profile',
    EDIT: '/profile/edit',
    SETTINGS: '/profile/settings',
  },

  // Misc
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/unauthorized',
} as const;
