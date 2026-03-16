export type SettingsTab = 'profile' | 'notifications' | 'security';

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  avatar?: File | string;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  enrollmentAlerts: boolean;
  billingReminders: boolean;
  courseUpdates?: boolean;
  marketingEmails?: boolean;
}

export interface SecurityFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SettingsState {
  activeTab: SettingsTab;
  profileLoading: boolean;
  notificationsLoading: boolean;
  securityLoading: boolean;
  profileError: string | null;
  notificationsError: string | null;
  securityError: string | null;
  profileSuccess: boolean;
  notificationsSuccess: boolean;
  securitySuccess: boolean;
  profileData: ProfileFormData;
  notificationPreferences: NotificationPreferences;
}

export interface SettingsContextProps extends SettingsState {
  setActiveTab: (tab: SettingsTab) => void;
  updateProfile: (data: ProfileFormData) => Promise<void>;
  updateNotifications: (preferences: NotificationPreferences) => Promise<void>;
  changePassword: (data: SecurityFormData) => Promise<void>;
  clearSuccess: (section: 'profile' | 'notifications' | 'security') => void;
}
