import { NotificationPreferences } from './Settings.interface';

export const SETTINGS_TABS = [
  { label: 'Profile', value: 'profile' as const },
  { label: 'Notifications', value: 'notifications' as const },
  { label: 'Security', value: 'security' as const },
];

export const NOTIFICATION_OPTIONS = [
  {
    id: 'emailNotifications',
    label: 'Email Notifications',
    description: 'Receive general notifications via email',
  },
  {
    id: 'pushNotifications',
    label: 'Push Notifications',
    description: 'Receive push notifications on your device',
  },
  {
    id: 'enrollmentAlerts',
    label: 'Enrollment Alerts',
    description: 'Get notified about new course enrollments and unenrollments',
  },
  {
    id: 'billingReminders',
    label: 'Billing Reminders',
    description: 'Receive reminders about upcoming payments and invoices',
  },
  {
    id: 'courseUpdates',
    label: 'Course Updates',
    description: 'Get notified when courses you are enrolled in are updated',
  },
  {
    id: 'marketingEmails',
    label: 'Marketing Emails',
    description: 'Receive promotional offers and marketing communications',
  },
];

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  emailNotifications: true,
  pushNotifications: true,
  enrollmentAlerts: true,
  billingReminders: true,
  courseUpdates: true,
  marketingEmails: false,
};

export const DEFAULT_PROFILE_DATA = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  bio: 'Passionate educator with 10+ years of experience in online learning.',
  avatar: 'https://api.example.com/avatars/user-1.jpg',
};
