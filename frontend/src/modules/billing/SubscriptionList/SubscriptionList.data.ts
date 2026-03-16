import { GridColDef } from '@mui/x-data-grid';
import { ChipProps } from '@mui/material';

export const SUBSCRIPTION_STATUS_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Paused', value: 'paused' },
  { label: 'Cancelled', value: 'cancelled' },
];

export const SUBSCRIPTION_STATUS_COLORS: Record<string, ChipProps['color']> = {
  active: 'success',
  inactive: 'default',
  paused: 'warning',
  cancelled: 'error',
};

export const SUBSCRIPTION_PLAN_COLORS: Record<string, ChipProps['color']> = {
  monthly: 'primary',
  quarterly: 'secondary',
  annual: 'success',
};

export const SUBSCRIPTION_COLUMNS: GridColDef[] = [
  {
    field: 'subscriptionId',
    headerName: 'Subscription ID',
    flex: 1,
    minWidth: 140,
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
    field: 'planType',
    headerName: 'Plan',
    flex: 1,
    minWidth: 120,
    renderCell: (params) =>
      params.value?.charAt(0).toUpperCase() + params.value?.slice(1),
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
    field: 'startDate',
    headerName: 'Start Date',
    flex: 1,
    minWidth: 140,
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: 'nextBillingDate',
    headerName: 'Next Billing',
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
