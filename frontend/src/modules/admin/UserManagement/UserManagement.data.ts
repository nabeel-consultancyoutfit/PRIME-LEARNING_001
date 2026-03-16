import { GridColDef } from '@mui/x-data-grid';
import { ChipProps } from '@mui/material';
import { UserRole, UserStatus } from './UserManagement.interface';

export const USER_ROLE_OPTIONS: Array<{ label: string; value: UserRole }> = [
  { label: 'Admin', value: 'admin' },
  { label: 'Instructor', value: 'instructor' },
  { label: 'Student', value: 'student' },
];

export const USER_STATUS_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Suspended', value: 'suspended' },
];

export const USER_ROLE_COLORS: Record<UserRole, ChipProps['color']> = {
  admin: 'error',
  instructor: 'primary',
  student: 'success',
};

export const USER_STATUS_COLORS: Record<UserStatus, ChipProps['color']> = {
  active: 'success',
  inactive: 'default',
  suspended: 'error',
};

export const ROLE_FILTER_TABS = [
  { label: 'All', value: null },
  { label: 'Admin', value: 'admin' as UserRole },
  { label: 'Instructor', value: 'instructor' as UserRole },
  { label: 'Student', value: 'student' as UserRole },
];

export const USER_COLUMNS: GridColDef[] = [
  {
    field: 'firstName',
    headerName: 'Name',
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => `${params.row.firstName} ${params.row.lastName}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1.5,
    minWidth: 200,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 1,
    minWidth: 140,
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    minWidth: 150,
    sortable: false,
    filterable: false,
  },
];

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
