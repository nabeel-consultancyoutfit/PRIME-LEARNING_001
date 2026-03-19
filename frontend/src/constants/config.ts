/**
 * Application configuration constants
 */

export const CONFIG = {
  APP_NAME: 'Prime Learning Platform',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1',
  DEFAULT_PAGE_SIZE: 10,
  DATE_FORMAT: 'yyyy-MM-dd',
  DATETIME_FORMAT: 'yyyy-MM-dd HH:mm:ss',
  CURRENCY: 'USD',
  CURRENCY_SYMBOL: '$',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  TOAST_DURATION: 5000, // milliseconds
} as const;
