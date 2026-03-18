export type Role = 'learner' | 'trainer' | 'iqa';

export interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
