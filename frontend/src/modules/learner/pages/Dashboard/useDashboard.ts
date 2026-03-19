/**
 * Custom hook for Dashboard state management — uses real backend API.
 */

import { useState, useCallback, useEffect } from 'react';
import { DashboardState } from './Dashboard.interface';
import { getInitialDashboardState, generateCalendarDays } from './Dashboard.data';
import { dashboardService, LearnerDashboard } from '@/services/dashboard/dashboardService';

export interface DashboardApiState {
  stats: LearnerDashboard | null;
  isLoading: boolean;
  error: string | null;
}

export const useDashboard = () => {
  const [state, setState] = useState<DashboardState>(getInitialDashboardState());
  const [apiState, setApiState] = useState<DashboardApiState>({
    stats: null,
    isLoading: false,
    error: null,
  });

  // ── Fetch real dashboard stats ───────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    setApiState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await dashboardService.getLearnerDashboard();
      setApiState({ stats: data, isLoading: false, error: null });
    } catch (err: any) {
      setApiState((prev) => ({
        ...prev,
        isLoading: false,
        error: err?.message ?? 'Failed to load dashboard',
      }));
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  // ── Calendar navigation ──────────────────────────────────────────────────
  const setActiveTab = useCallback((tab: DashboardState['activeTab']) => {
    setState((prev) => ({ ...prev, activeTab: tab }));
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
    apiState,
    setActiveTab,
    previousMonth,
    nextMonth,
    refreshStats: fetchStats,
  };
};
