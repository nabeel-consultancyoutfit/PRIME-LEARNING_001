/**
 * Mock data for Scorecard module
 */

import { LearningGrowthData } from './Scorecard.interface';

export const MOCK_LEARNING_GROWTH: LearningGrowthData[] = [
  { month: 'Jan', value: 2 },
  { month: 'Feb', value: 1.5 },
  { month: 'Mar', value: 3 },
  { month: 'Apr', value: 3 },
  { month: 'May', value: 3.5 },
  { month: 'Jun', value: 4 },
  { month: 'Jul', value: 5 },
  { month: 'Aug', value: 6 },
  { month: 'Sep', value: 7 },
  { month: 'Oct', value: 6.5 },
  { month: 'Nov', value: 6 },
  { month: 'Dec', value: 7 },
];

export const DATE_RANGE_OPTIONS = [
  { value: '1m', label: 'Last 1 Month' },
  { value: '3m', label: 'Last 3 Months' },
  { value: '6m', label: 'Last 6 Months' },
  { value: '1y', label: 'Last 1 Year' },
  { value: 'all', label: 'All Time' },
];
