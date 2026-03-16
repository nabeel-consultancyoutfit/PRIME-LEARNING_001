'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  DataGrid,
  DataGridProps,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AppBreadcrumbs } from '@/components/Breadcrumbs';
import { Invoice } from './InvoiceList.interface';
import { useInvoiceList } from './useInvoiceList';
import { INVOICE_COLUMNS, INVOICE_STATUS_COLORS, INVOICE_STATUS_OPTIONS, PAGE_SIZE_OPTIONS } from './InvoiceList.data';
import {
  InvoiceListContainer,
  InvoiceListHeader,
  InvoiceListControls,
  InvoiceListSearchBox,
  InvoiceListTableContainer,
  InvoiceListActionsCell,
} from './InvoiceList.style';

export const InvoiceList: React.FC = () => {
  const {
    invoices,
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
  } = useInvoiceList();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Billing', href: '/billing' },
    { label: 'Invoices' },
  ];

  const columns: GridColDef[] = [
    ...INVOICE_COLUMNS.slice(0, -1), // Exclude the actions column
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 120,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<Invoice>) => (
        <InvoiceListActionsCell>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => handleEditInvoice(params.row.id)}
          >
            View
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteInvoice(params.row.id)}
          >
            Delete
          </Button>
        </InvoiceListActionsCell>
      ),
    },
  ];

  const handleEditInvoice = (id: string) => {
    console.log('Edit invoice:', id);
    // Implement edit logic
  };

  const handleDeleteInvoice = (id: string) => {
    console.log('Delete invoice:', id);
    // Implement delete logic
  };

  const handleExportCSV = () => {
    console.log('Export to CSV');
    // Implement export logic
  };

  const rows = invoices.map((invoice) => ({
    ...invoice,
    id: invoice.id,
    status: (
      <Chip
        label={invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        color={INVOICE_STATUS_COLORS[invoice.status] as any}
        size="small"
        variant="outlined"
      />
    ),
  }));

  return (
    <InvoiceListContainer maxWidth="lg">
      <AppBreadcrumbs items={breadcrumbItems} sx={{ mb: 3 }} />

      <InvoiceListHeader>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Invoices
        </Typography>
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={handleExportCSV}
        >
          Export CSV
        </Button>
      </InvoiceListHeader>

      <InvoiceListControls sx={{ mb: 3 }}>
        <InvoiceListSearchBox>
          <TextField
            fullWidth
            placeholder="Search by invoice #, student, or course..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InvoiceListSearchBox>

        <TextField
          select
          variant="outlined"
          size="small"
          value={statusFilter || ''}
          onChange={(e) => setStatusFilter(e.target.value || null)}
          SelectProps={{ native: true }}
          sx={{ minWidth: 150 }}
        >
          {INVOICE_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </InvoiceListControls>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <InvoiceListTableContainer>
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
      </InvoiceListTableContainer>
    </InvoiceListContainer>
  );
};

export default InvoiceList;
