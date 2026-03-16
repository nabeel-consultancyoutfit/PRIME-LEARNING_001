/**
 * Enum constants
 */

export const CourseStatus = {
  DRAFT: 'draft' as const,
  PUBLISHED: 'published' as const,
  ARCHIVED: 'archived' as const,
} as const;

export const CourseStatusLabels = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
} as const;

export const EnrollmentStatus = {
  ACTIVE: 'active' as const,
  COMPLETED: 'completed' as const,
  DROPPED: 'dropped' as const,
  SUSPENDED: 'suspended' as const,
} as const;

export const EnrollmentStatusLabels = {
  active: 'Active',
  completed: 'Completed',
  dropped: 'Dropped',
  suspended: 'Suspended',
} as const;

export const InvoiceStatus = {
  PENDING: 'pending' as const,
  PAID: 'paid' as const,
  OVERDUE: 'overdue' as const,
  CANCELLED: 'cancelled' as const,
} as const;

export const InvoiceStatusLabels = {
  pending: 'Pending',
  paid: 'Paid',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
} as const;

export const SubscriptionStatus = {
  ACTIVE: 'active' as const,
  CANCELLED: 'cancelled' as const,
  EXPIRED: 'expired' as const,
} as const;

export const SubscriptionStatusLabels = {
  active: 'Active',
  cancelled: 'Cancelled',
  expired: 'Expired',
} as const;

export const SubscriptionInterval = {
  MONTHLY: 'monthly' as const,
  YEARLY: 'yearly' as const,
} as const;

export const SubscriptionIntervalLabels = {
  monthly: 'Monthly',
  yearly: 'Yearly',
} as const;

export const UserRole = {
  ADMIN: 'admin' as const,
  INSTRUCTOR: 'instructor' as const,
  STUDENT: 'student' as const,
} as const;

export const UserRoleLabels = {
  admin: 'Administrator',
  instructor: 'Instructor',
  student: 'Student',
} as const;

export const StatusType = {
  ACTIVE: 'active' as const,
  INACTIVE: 'inactive' as const,
  PENDING: 'pending' as const,
  ARCHIVED: 'archived' as const,
} as const;

export const StatusTypeLabels = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
  archived: 'Archived',
} as const;
