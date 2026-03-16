/**
 * Authentication service
 */

import { apiClient } from '@/services/api';
import {
  User,
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from '@/types/auth';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  ME: '/auth/me',
};

/**
 * Login user
 */
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    AUTH_ENDPOINTS.LOGIN,
    payload
  );

  // Store tokens in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  return response;
};

/**
 * Register user
 */
export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    AUTH_ENDPOINTS.REGISTER,
    payload
  );

  // Store tokens in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  return response;
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
  } finally {
    // Clear tokens from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }
};

/**
 * Refresh access token
 */
export const refreshToken = async (): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.REFRESH);

  // Update tokens in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  return response;
};

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<User> => {
  return apiClient.get<User>(AUTH_ENDPOINTS.ME);
};
