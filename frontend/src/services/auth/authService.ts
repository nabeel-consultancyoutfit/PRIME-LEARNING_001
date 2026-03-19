/**
 * Authentication service — wraps the real API client.
 * Actual token management is handled by AuthContext; this file
 * is kept for backward-compatibility and standalone usage.
 */

import { apiClient, saveTokens, clearTokens } from '@/services/api';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

const unwrap = (res: any): any => (res && 'data' in res ? res.data : res);

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = unwrap(await apiClient.post<any>('/auth/login', payload));
  saveTokens(response.accessToken, response.refreshToken);
  return response;
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = unwrap(await apiClient.post<any>('/auth/register', payload));
  saveTokens(response.accessToken, response.refreshToken);
  return response;
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } finally {
    clearTokens();
  }
};

export const refreshAccessToken = async (): Promise<AuthResponse> => {
  const rt = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  const response = unwrap(
    await apiClient.post<any>('/auth/refresh', { refreshToken: rt }),
  );
  saveTokens(response.accessToken, response.refreshToken);
  return response;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  await apiClient.post('/auth/change-password', { currentPassword, newPassword });
};

export const getMe = async (): Promise<AuthResponse['user']> => {
  return unwrap(await apiClient.get<any>('/users/me'));
};
