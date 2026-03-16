import { useState, useCallback, useEffect } from 'react';
import { Subscription, SubscriptionListState } from './SubscriptionList.interface';
import { DEFAULT_PAGE_SIZE } from './SubscriptionList.data';

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    subscriptionId: 'SUB-001',
    studentName: 'John Doe',
    studentId: 'STU-001',
    courseName: 'React Fundamentals',
    courseId: 'COURSE-001',
    planType: 'annual',
    amount: 299.99,
    status: 'active',
    startDate: '2026-01-01',
    nextBillingDate: '2027-01-01',
    autoRenew: true,
    createdAt: '2026-01-01T10:00:00Z',
    updatedAt: '2026-03-16T10:00:00Z',
  },
  {
    id: '2',
    subscriptionId: 'SUB-002',
    studentName: 'Jane Smith',
    studentId: 'STU-002',
    courseName: 'Advanced TypeScript',
    courseId: 'COURSE-002',
    planType: 'monthly',
    amount: 29.99,
    status: 'active',
    startDate: '2026-02-15',
    nextBillingDate: '2026-04-15',
    autoRenew: true,
    createdAt: '2026-02-15T10:00:00Z',
    updatedAt: '2026-03-15T10:00:00Z',
  },
  {
    id: '3',
    subscriptionId: 'SUB-003',
    studentName: 'Bob Johnson',
    studentId: 'STU-003',
    courseName: 'Web Design Mastery',
    courseId: 'COURSE-003',
    planType: 'quarterly',
    amount: 79.99,
    status: 'paused',
    startDate: '2026-01-15',
    nextBillingDate: '2026-04-15',
    autoRenew: false,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z',
  },
  {
    id: '4',
    subscriptionId: 'SUB-004',
    studentName: 'Alice Brown',
    studentId: 'STU-004',
    courseName: 'Node.js Backend',
    courseId: 'COURSE-004',
    planType: 'monthly',
    amount: 19.99,
    status: 'cancelled',
    startDate: '2025-12-01',
    nextBillingDate: '2026-04-01',
    endDate: '2026-03-01',
    autoRenew: false,
    createdAt: '2025-12-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z',
  },
];

export const useSubscriptionList = () => {
  const [state, setState] = useState<SubscriptionListState>({
    subscriptions: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    searchQuery: '',
    statusFilter: null,
    loading: false,
    error: null,
  });

  const fetchSubscriptions = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call

      let filtered = [...mockSubscriptions];

      // Apply search filter
      if (state.searchQuery) {
        filtered = filtered.filter(
          (subscription) =>
            subscription.subscriptionId.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            subscription.studentName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            subscription.courseName.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }

      // Apply status filter
      if (state.statusFilter) {
        filtered = filtered.filter((subscription) => subscription.status === state.statusFilter);
      }

      const totalCount = filtered.length;
      const startIndex = (state.currentPage - 1) * state.pageSize;
      const paginatedSubscriptions = filtered.slice(startIndex, startIndex + state.pageSize);

      setState((prev) => ({
        ...prev,
        subscriptions: paginatedSubscriptions,
        totalCount,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch subscriptions',
      }));
    }
  }, [state.currentPage, state.pageSize, state.searchQuery, state.statusFilter]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const setCurrentPage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const setPageSize = useCallback((size: number) => {
    setState((prev) => ({ ...prev, pageSize: size, currentPage: 1 }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, searchQuery: query, currentPage: 1 }));
  }, []);

  const setStatusFilter = useCallback((status: string | null) => {
    setState((prev) => ({ ...prev, statusFilter: status, currentPage: 1 }));
  }, []);

  return {
    ...state,
    setCurrentPage,
    setPageSize,
    setSearchQuery,
    setStatusFilter,
    fetchSubscriptions,
  };
};
