/**
 * Register form field configurations and validation messages
 */

import { UserRole } from '@/types/auth';

export const ROLE_OPTIONS: Array<{ value: UserRole; label: string }> = [
  { value: 'student', label: 'Student' },
  { value: 'instructor', label: 'Instructor' },
];

export const REGISTER_VALIDATION_MESSAGES = {
  firstName: {
    required: 'First name is required',
    minLength: 'First name must be at least 2 characters',
  },
  lastName: {
    required: 'Last name is required',
    minLength: 'Last name must be at least 2 characters',
  },
  email: {
    required: 'Email is required',
    invalid: 'Please enter a valid email address',
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 8 characters',
    pattern: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  },
  confirmPassword: {
    required: 'Please confirm your password',
    match: 'Passwords do not match',
  },
  role: {
    required: 'Please select a role',
  },
  agreeToTerms: {
    required: 'You must agree to the terms and conditions',
  },
};

export const REGISTER_FORM_LABELS = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email Address',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  role: 'Role',
  agreeToTerms: 'I agree to the terms and conditions',
  submit: 'Create Account',
  haveAccount: 'Already have an account? ',
  login: 'Sign In',
};
