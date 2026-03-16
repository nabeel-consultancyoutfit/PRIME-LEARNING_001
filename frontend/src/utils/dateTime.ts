/**
 * Date and time utilities using date-fns
 */

import {
  format,
  formatDistanceToNow,
  differenceInDays,
  isAfter,
  parseISO,
} from 'date-fns';
import { CONFIG } from '@/constants/config';

/**
 * Format date to string
 */
export const formatDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, CONFIG.DATE_FORMAT);
  } catch {
    return '';
  }
};

/**
 * Format date and time to string
 */
export const formatDateTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, CONFIG.DATETIME_FORMAT);
  } catch {
    return '';
  }
};

/**
 * Format date as relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch {
    return '';
  }
};

/**
 * Check if a date is overdue (in the past)
 */
export const isOverdue = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return !isAfter(dateObj, new Date());
  } catch {
    return false;
  }
};

/**
 * Get days between two dates
 */
export const getDaysBetween = (startDate: string | Date, endDate: string | Date): number => {
  try {
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
    return differenceInDays(end, start);
  } catch {
    return 0;
  }
};
