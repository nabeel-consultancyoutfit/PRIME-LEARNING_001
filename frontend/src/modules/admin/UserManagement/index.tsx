'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  DataGrid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Alert,
  Tabs,
} from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import { AppBreadcrumbs } from '@/components/Breadcrumbs';
import { User, UserRole } from './UserManagement.interface';
import { useUserManagement } from './useUserManagement';
import {
  USER_COLUMNS,
  USER_ROLE_COLORS,
  USER_STATUS_COLORS,
  ROLE_FILTER_TABS,
  PAGE_SIZE_OPTIONS,
  USER_ROLE_OPTIONS,
} from './UserManagement.data';
import {
  UserManagementContainer,
  UserManagementHeader,
  UserManagementTabs,
  UserManagementControls,
  UserManagementSearchBox,
  UserManagementTableContainer,
  UserManagementActionsCell,
  UserManagementModalContent,
  UserManagementModalActions,
} from './UserManagement.style';

export const UserManagement: React.FC = () => {
  const {
    users,
    totalCount,
    currentPage,
    pageSize,
    searchQuery,
    roleFilter,
    loading,
    error,
    selectedUser,
    showRoleModal,
    setCurrentPage,
    setPageSize,
    setSearchQuery,
    setRoleFilter,
    openRoleModal,
    closeRoleModal,
    updateUserRole,
  } = useUserManagement();

  const [selectedNewRole, setSelectedNewRole] = useState<UserRole | ''>(selectedUser?.role || '');

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Admin', href: '/admin' },
    { label: 'User Management' },
  ];

  const columns: GridColDef[] = [
    ...USER_COLUMNS.slice(0, -1), // Exclude the actions column
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<User>) => (
        <UserManagementActionsCell>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => {
              openRoleModal(params.row);
              setSelectedNewRole(params.row.role);
            }}
          >
            Edit Role
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<BlockIcon />}
            onClick={() => handleSuspendUser(params.row.id)}
          >
            Suspend
          </Button>
        </UserManagementActionsCell>
      ),
    },
  ];

  const handleSuspendUser = (id: string) => {
    console.log('Suspend user:', id);
    // Implement suspend logic
  };

  const handleRoleModalSave = async () => {
    if (selectedUser && selectedNewRole) {
      await updateUserRole(selectedUser.id, selectedNewRole as UserRole);
    }
  };

  const rows = users.map((user) => ({
    ...user,
    id: user.id,
    role: (
      <Chip
        label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        color={USER_ROLE_COLORS[user.role]}
        size="small"
        variant="outlined"
      />
    ),
    status: (
      <Chip
        label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        color={USER_STATUS_COLORS[user.status]}
        size="small"
        variant="outlined"
      />
    ),
  }));

  const activeTabIndex = ROLE_FILTER_TABS.findIndex(
    (tab) => tab.value === roleFilter
  );

  return (
    <UserManagementContainer maxWidth="lg">
      <AppBreadcrumbs items={breadcrumbItems} sx={{ mb: 3 }} />

      <UserManagementHeader>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
          User Management
        </Typography>

        <Tabs
          value={activeTabIndex !== -1 ? activeTabIndex : 0}
          onChange={(e, newValue) => {
            setRoleFilter(ROLE_FILTER_TABS[newValue].value);
          }}
          aria-label="user role filter"
        >
          {ROLE_FILTER_TABS.map((tab) => (
            <UserManagementTabs
              key={tab.value}
              label={tab.label}
            />
          ))}
        </Tabs>
      </UserManagementHeader>

      <UserManagementControls>
        <UserManagementSearchBox>
          <TextField
            fullWidth
            placeholder="Search by name or email..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </UserManagementSearchBox>
      </UserManagementControls>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <UserManagementTableContainer>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            paginationModel={{
              pageSize,
              page: currentPage - 1,
            }}
            onPaginationModelChange={(newModel) => {
              setCurrentPage(newModel.page + 1);
              setPageSize(newModel.pageSize);
            }}
            rowCount={totalCount}
            paginationMode="client"
            disableSelectionOnClick
            loading={loading}
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #e0e0e0',
              },
            }}
          />
        )}
      </UserManagementTableContainer>

      <Dialog open={showRoleModal} onClose={closeRoleModal} maxWidth="sm" fullWidth>
        <DialogTitle>Change User Role</DialogTitle>
        <DialogContent>
          <UserManagementModalContent>
            <Typography variant="body2" color="textSecondary">
              User: {selectedUser?.firstName} {selectedUser?.lastName}
            </Typography>
            <TextField
              select
              label="New Role"
              value={selectedNewRole}
              onChange={(e) => setSelectedNewRole(e.target.value as UserRole)}
              SelectProps={{ native: true }}
              fullWidth
            >
              <option value="">Select a role</option>
              {USER_ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </UserManagementModalContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRoleModal} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleRoleModalSave}
            variant="contained"
            disabled={!selectedNewRole}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </UserManagementContainer>
  );
};

export default UserManagement;
