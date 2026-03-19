import { Role } from './Login.interface';

export const ROLE_REDIRECT_MAP: Record<Role, string> = {
  learner: '/learner-dashboard',
  trainer: '/trainer-dashboard',
  iqa: '/iqa-dashboard',
  admin: '/admin-dashboard',
};

export const LOGIN_VALIDATION_MESSAGES = {
  email: {
    required: 'Email is required',
    invalid: 'Please enter a valid email address',
  },
  password: {
    required: 'Password is required',
  },
};
