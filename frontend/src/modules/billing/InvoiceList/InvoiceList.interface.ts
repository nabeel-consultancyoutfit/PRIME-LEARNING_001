export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentName: string;
  studentId: string;
  courseName: string;
  courseId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  issuedDate: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceListState {
  invoices: Invoice[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  searchQuery: string;
  statusFilter: string | null;
  loading: boolean;
  error: string | null;
}

export interface InvoiceListContextProps extends InvoiceListState {
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string | null) => void;
  fetchInvoices: () => Promise<void>;
}
