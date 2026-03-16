export interface Subscription {
  id: string;
  subscriptionId: string;
  studentName: string;
  studentId: string;
  courseName: string;
  courseId: string;
  planType: 'monthly' | 'quarterly' | 'annual';
  amount: number;
  status: 'active' | 'inactive' | 'cancelled' | 'paused';
  startDate: string;
  nextBillingDate: string;
  endDate?: string;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionListState {
  subscriptions: Subscription[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  searchQuery: string;
  statusFilter: string | null;
  loading: boolean;
  error: string | null;
}

export interface SubscriptionListContextProps extends SubscriptionListState {
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string | null) => void;
  fetchSubscriptions: () => Promise<void>;
}
