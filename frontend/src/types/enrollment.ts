/**
 * Enrollment type definitions
 */

export type EnrollmentStatus = 'active' | 'completed' | 'dropped' | 'suspended';

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  completedAt: string | null;
  progress: number; // 0-100
  status: EnrollmentStatus;
  grade: string | null;
}

export interface CreateEnrollmentPayload {
  studentId: string;
  courseId: string;
  status: EnrollmentStatus;
}

export type UpdateEnrollmentPayload = Partial<CreateEnrollmentPayload>;
