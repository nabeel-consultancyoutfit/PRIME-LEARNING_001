/**
 * Instructor type definitions
 */

import { StatusType } from './common';

export interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  bio: string;
  specializations: string[];
  rating: number;
  coursesCount: number;
  status: StatusType;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInstructorPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  bio: string;
  specializations: string[];
  status: StatusType;
}

export type UpdateInstructorPayload = Partial<CreateInstructorPayload>;
