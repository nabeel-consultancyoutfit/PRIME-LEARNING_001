'use client';

import React from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  DataGrid,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PauseIcon from '@mui/icons-material/Pause';
import { AppBreadcrumbs } from '@/components/Breadcrumbs';
import { Subscription } from './SubscriptionList.interface';
import { useSubscriptionList } from './useSubscriptionList';
import {
  SUBSCRIPTION_COLUMNS,
  SUBSCRIPTION_STATUS_COLORS,
  SUBSCRIPTION_STATUS_OPTIONS,
  SUBSCRIPTION_PLAN_COLORS,
  PAGE_SIZE_OPTIONS,
} from './SubscriptionList.data';
import {
  SubscriptionListContainer,
  SubscriptionListHeader,
  SubscriptionListControls,
  SubscriptionListSearchBox,
  SubscriptionListTableContainer,
  SubscriptionListActionsCell,
} from './SubscriptionList.style';

export const SubscriptionList: React.FC = () => {
  const {
    subscriptions,
    totalCount,
    currentPage,
    pageSize,
    searchQuery,
    statusFilter,
    loading,
    error,
    setCurrentPage,
    setPageSize,
    setSearchQuery,
    setStatusFilter,
  } = useSubscriptionList();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Billing', href: '/billing' },
    { label: 'Subscriptions' },
  ];

  const columns: GridColDef[] = [
    ...SUBSCRIPTION_COLUMNS.slice(0, -1), // Exclude the actions column
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<Subscription>) => (
        <SubscriptionListActionsCell>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => handleEditSubscription(params.row.id)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="warning"
            startIcon={<PauseIcon />}
            onClick={() => handlePauseSubscription(params.row.id)}
          >
            Pause
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleCancelSubscription(params.row.id)}
          >
            Cancel
          </Button>
        </SubscriptionListActionsCell>
      ),
    },
  ];

  const handleEditSubscription = (id: string) => {
    console.log('Edit subscription:', id);
    // Implement edit logic
  };

  const handlePauseSubscription = (id: string) => {
    console.log('Pause subscription:', id);
    // Implement pause logic
  };

  const handleCancelSubscription = (id: string) => {
    console.log('Cancel subscription:', id);
    // Implement cancel logic
  };

  const handleExportCSV = () => {
    console.log('Export to CSV');
    // Implement export logic
  };

  const rows = subscriptions.map((subscription) => ({
    ...subscription,
    id: subscription.id,
    planType: (
      <Chip
        label={subscription.planType.charAt(0).toUpperCase() + subscription.planType.slice(1)}
        color={SUBSCRIPTION_PLAN_COLORS[subscription.planType] as any}
        size="small"
        variant="outlined"
      />
    ),
    status: (
      <Chip
        label={subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
        color={SUBSCRIPTION_STATUS_COLORS[subscription.status] as any}
        size="small"
        variant="outlined"
      />
    ),
  }));

  return (
    <SubscriptionListContainer maxWidth="lg">
      <AppBreadcrumbs items={breadcrumbItems} sx={{ mb: 3 }} />

      <SubscriptionListHeader>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Subscriptions
        </Typography>
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={handleExportCSV}
        >
          Export CSV
        </Button>
      </SubscriptionListHeader>

      <SubscriptionListControls>
        <SubscriptionListSearchBox>
          <TextField
            fullWidth
            placeholder="Search by subscription ID, student, or course..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SubscriptionListSearchBox>

        <TextField
          select
          variant="outlined"
          size="small"
          value={statusFilter || ''}
          onChange={(e) => setStatusFilter(e.target.value || null)}
          SelectProps={{ native: true }}
          sx={{ minWidth: 150 }}
        >
          {SUBSCRIPTION_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </SubscriptionListControls>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <SubscriptionListTableContainer>
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
      </SubscriptionListTableContainer>
    </SubscriptionListContainer>
  );
};

export default SubscriptionList;
