/**
 * Custom hook for Dashboard state management
 */

import { useState, useCallback } from 'react';
import { DashboardState } from './Dashboard.interface';
import { getInitialDashboardState, generateCalendarDays } from './Dashboard.data';

export const useDashboard = () => {
  const [state, setState] = useState<DashboardState>(getInitialDashboardState());

  const setActiveTab = useCallback((tab: DashboardState['activeTab']) => {
    setState((prev) => ({
      ...prev,
      activeTab: tab,
    }));
  }, []);

  const previousMonth = useCallback(() => {
    setState((prev) => {
      const newMonth = prev.calendarMonth === 0 ? 11 : prev.calendarMonth - 1;
      const newYear = prev.calendarMonth === 0 ? prev.calendarYear - 1 : prev.calendarYear;

      return {
        ...prev,
        calendarMonth: newMonth,
        calendarYear: newYear,
        calendarDays: generateCalendarDays(newMonth, newYear),
      };
    });
  }, []);

  const nextMonth = useCallback(() => {
    setState((prev) => {
      const newMonth = prev.calendarMonth === 11 ? 0 : prev.calendarMonth + 1;
      const newYear = prev.calendarMonth === 11 ? prev.calendarYear + 1 : prev.calendarYear;

      return {
        ...prev,
        calendarMonth: newMonth,
        calendarYear: newYear,
        calendarDays: generateCalendarDays(newMonth, newYear),
      };
    });
  }, []);

  return {
    state,
    setActiveTab,
    previousMonth,
    nextMonth,
  };
};
