/**
 * Billing and subscription service
 */

import { apiClient } from '@/services/api';
import {
  Invoice,
  CreateInvoicePayload,
  Subscription,
  CreateSubscriptionPayload,
} from '@/types/billing';
import { PaginatedResponse } from '@/types/common';

const BILLING_ENDPOINTS = {
  INVOICES: '/invoices',
  INVOICE_DETAIL: (id: string) => `/invoices/${id}`,
  CREATE_INVOICE: '/invoices',
  SUBSCRIPTIONS: '/subscriptions',
  SUBSCRIPTION_DETAIL: (id: string) => `/subscriptions/${id}`,
  CREATE_SUBSCRIPTION: '/subscriptions',
  CANCEL_SUBSCRIPTION: (id: string) => `/subscriptions/${id}/cancel`,
};

interface GetInvoicesParams {
  page?: number;
  pageSize?: number;
  status?: string;
  studentId?: string;
  sortBy?: string;
}

interface GetSubscriptionsParams {
  page?: number;
  pageSize?: number;
  status?: string;
  studentId?: string;
  sortBy?: string;
}

/**
 * Get all invoices with pagination and filtering
 */
export const getInvoices = async (
  params?: GetInvoicesParams
): Promise<PaginatedResponse<Invoice>> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.studentId) queryParams.append('studentId', params.studentId);
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

  const query = queryParams.toString();
  const endpoint = query ? `${BILLING_ENDPOINTS.INVOICES}?${query}` : BILLING_ENDPOINTS.INVOICES;

  return apiClient.get<PaginatedResponse<Invoice>>(endpoint);
};

/**
 * Get invoice by ID
 */
export const getInvoiceById = async (id: string): Promise<Invoice> => {
  return apiClient.get<Invoice>(BILLING_ENDPOINTS.INVOICE_DETAIL(id));
};

/**
 * Create a new invoice
 */
export const createInvoice = async (
  payload: CreateInvoicePayload
): Promise<Invoice> => {
  return apiClient.post<Invoice>(BILLING_ENDPOINTS.CREATE_INVOICE, payload);
};

/**
 * Get all subscriptions with pagination and filtering
 */
export const getSubscriptions = async (
  params?: GetSubscriptionsParams
): Promise<PaginatedResponse<Subscription>> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.studentId) queryParams.append('studentId', params.studentId);
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

  const query = queryParams.toString();
  const endpoint = query
    ? `${BILLING_ENDPOINTS.SUBSCRIPTIONS}?${query}`
    : BILLING_ENDPOINTS.SUBSCRIPTIONS;

  return apiClient.get<PaginatedResponse<Subscription>>(endpoint);
};

/**
 * Get subscription by ID
 */
export const getSubscriptionById = async (id: string): Promise<Subscription> => {
  return apiClient.get<Subscription>(BILLING_ENDPOINTS.SUBSCRIPTION_DETAIL(id));
};

/**
 * Create a new subscription
 */
export const createSubscription = async (
  payload: CreateSubscriptionPayload
): Promise<Subscription> => {
  return apiClient.post<Subscription>(
    BILLING_ENDPOINTS.CREATE_SUBSCRIPTION,
    payload
  );
};

/**
 * Cancel a subscription
 */
export const cancelSubscription = async (id: string): Promise<Subscription> => {
  return apiClient.post<Subscription>(
    BILLING_ENDPOINTS.CANCEL_SUBSCRIPTION(id)
  );
};
