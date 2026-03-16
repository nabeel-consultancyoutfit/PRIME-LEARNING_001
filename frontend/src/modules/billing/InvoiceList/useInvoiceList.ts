import { useState, useCallback, useEffect } from 'react';
import { Invoice, InvoiceListState } from './InvoiceList.interface';
import { DEFAULT_PAGE_SIZE } from './InvoiceList.data';

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    studentName: 'John Doe',
    studentId: 'STU-001',
    courseName: 'React Fundamentals',
    courseId: 'COURSE-001',
    amount: 299.99,
    status: 'paid',
    issuedDate: '2026-03-01',
    dueDate: '2026-03-15',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-05T10:00:00Z',
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    studentName: 'Jane Smith',
    studentId: 'STU-002',
    courseName: 'Advanced TypeScript',
    courseId: 'COURSE-002',
    amount: 349.99,
    status: 'pending',
    issuedDate: '2026-03-10',
    dueDate: '2026-03-25',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z',
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    studentName: 'Bob Johnson',
    studentId: 'STU-003',
    courseName: 'Web Design Mastery',
    courseId: 'COURSE-003',
    amount: 199.99,
    status: 'overdue',
    issuedDate: '2026-02-15',
    dueDate: '2026-03-01',
    createdAt: '2026-02-15T10:00:00Z',
    updatedAt: '2026-02-15T10:00:00Z',
  },
  {
    id: '4',
    invoiceNumber: 'INV-004',
    studentName: 'Alice Brown',
    studentId: 'STU-004',
    courseName: 'Node.js Backend',
    courseId: 'COURSE-004',
    amount: 249.99,
    status: 'cancelled',
    issuedDate: '2026-02-20',
    dueDate: '2026-03-05',
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-02-25T10:00:00Z',
  },
];

export const useInvoiceList = () => {
  const [state, setState] = useState<InvoiceListState>({
    invoices: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    searchQuery: '',
    statusFilter: null,
    loading: false,
    error: null,
  });

  const fetchInvoices = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call

      let filtered = [...mockInvoices];

      // Apply search filter
      if (state.searchQuery) {
        filtered = filtered.filter(
          (invoice) =>
            invoice.invoiceNumber.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            invoice.studentName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            invoice.courseName.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }

      // Apply status filter
      if (state.statusFilter) {
        filtered = filtered.filter((invoice) => invoice.status === state.statusFilter);
      }

      const totalCount = filtered.length;
      const startIndex = (state.currentPage - 1) * state.pageSize;
      const paginatedInvoices = filtered.slice(startIndex, startIndex + state.pageSize);

      setState((prev) => ({
        ...prev,
        invoices: paginatedInvoices,
        totalCount,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch invoices',
      }));
    }
  }, [state.currentPage, state.pageSize, state.searchQuery, state.statusFilter]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

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
    fetchInvoices,
  };
};
