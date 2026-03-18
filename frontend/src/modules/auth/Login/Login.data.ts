import { MockUser, Role } from './Login.interface';

export const MOCK_USERS: MockUser[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', password: 'password123', role: 'learner' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', password: 'password123', role: 'trainer' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', password: 'password123', role: 'iqa' },
];

export const ROLE_REDIRECT_MAP: Record<Role, string> = {
  learner: '/learner-dashboard',
  trainer: '/trainer-dashboard',
  iqa: '/iqa-dashboard',
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
