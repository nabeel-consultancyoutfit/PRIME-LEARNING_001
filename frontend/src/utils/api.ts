/**
 * API utility functions
 */

import { ApiError, isApiError } from '@/services/api';

/**
 * Handle API errors with appropriate messages
 */
export const handleApiError = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message || 'An error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

/**
 * Build query string from object
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  const query = queryParams.toString();
  return query ? `?${query}` : '';
};

/**
 * Type guard to check if error is an ApiError
 */
export { isApiError } from '@/services/api';
