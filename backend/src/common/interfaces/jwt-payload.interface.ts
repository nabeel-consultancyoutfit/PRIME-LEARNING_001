export type UserRole = 'learner' | 'trainer' | 'iqa' | 'admin';

export interface JwtPayload {
  sub: string;       // user ObjectId
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
