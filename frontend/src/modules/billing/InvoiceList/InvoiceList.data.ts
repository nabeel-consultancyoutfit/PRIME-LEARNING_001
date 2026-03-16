import { GridColDef } from '@mui/x-data-grid';
import { ChipProps } from '@mui/material';

export const INVOICE_STATUS_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Cancelled', value: 'cancelled' },
];

export const INVOICE_STATUS_COLORS: Record<string, ChipProps['color']> = {
  paid: 'success',
  pending: 'warning',
  overdue: 'error',
  cancelled: 'default',
};

export const INVOICE_COLUMNS: GridColDef[] = [
  {
    field: 'invoiceNumber',
    headerName: 'Invoice #',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'studentName',
    headerName: 'Student',
    flex: 1.5,
    minWidth: 180,
  },
  {
    field: 'courseName',
    headerName: 'Course',
    flex: 1.5,
    minWidth: 180,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    minWidth: 120,
    align: 'right',
    headerAlign: 'right',
    renderCell: (params) => `$${params.value?.toFixed(2) || '0.00'}`,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'issuedDate',
    headerName: 'Issued Date',
    flex: 1,
    minWidth: 140,
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    flex: 1,
    minWidth: 140,
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    minWidth: 120,
    sortable: false,
    filterable: false,
  },
];

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
