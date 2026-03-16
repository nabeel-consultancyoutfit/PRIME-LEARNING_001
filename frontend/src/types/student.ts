/**
 * Student type definitions
 */

import { StatusType } from './common';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  enrollmentDate: string;
  status: StatusType;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  status: StatusType;
}

export type UpdateStudentPayload = Partial<CreateStudentPayload>;
