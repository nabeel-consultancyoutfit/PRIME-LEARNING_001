/**
 * Billing and subscription type definitions
 */

export type InvoiceStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';
export type SubscriptionInterval = 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired';

export interface Invoice {
  id: string;
  studentId: string;
  courseId: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issuedAt: string;
  dueDate: string;
  paidAt: string | null;
}

export interface CreateInvoicePayload {
  studentId: string;
  courseId: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  dueDate: string;
}

export interface Subscription {
  id: string;
  studentId: string;
  planName: string;
  amount: number;
  currency: string;
  interval: SubscriptionInterval;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string | null;
}

export interface CreateSubscriptionPayload {
  studentId: string;
  planName: string;
  amount: number;
  currency: string;
  interval: SubscriptionInterval;
}
