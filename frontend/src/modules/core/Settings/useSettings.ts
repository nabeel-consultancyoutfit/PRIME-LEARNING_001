import { useState, useCallback } from 'react';
import { SettingsState, ProfileFormData, NotificationPreferences, SecurityFormData, SettingsTab } from './Settings.interface';
import { DEFAULT_NOTIFICATION_PREFERENCES, DEFAULT_PROFILE_DATA } from './Settings.data';

export const useSettings = () => {
  const [state, setState] = useState<SettingsState>({
    activeTab: 'profile',
    profileLoading: false,
    notificationsLoading: false,
    securityLoading: false,
    profileError: null,
    notificationsError: null,
    securityError: null,
    profileSuccess: false,
    notificationsSuccess: false,
    securitySuccess: false,
    profileData: DEFAULT_PROFILE_DATA,
    notificationPreferences: DEFAULT_NOTIFICATION_PREFERENCES,
  });

  const setActiveTab = useCallback((tab: SettingsTab) => {
    setState((prev) => ({ ...prev, activeTab: tab }));
  }, []);

  const updateProfile = useCallback(async (data: ProfileFormData) => {
    setState((prev) => ({ ...prev, profileLoading: true, profileError: null, profileSuccess: false }));
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validate data
      if (!data.firstName || !data.lastName || !data.email) {
        throw new Error('First name, last name, and email are required');
      }

      // Update state
      setState((prev) => ({
        ...prev,
        profileLoading: false,
        profileSuccess: true,
        profileData: data,
      }));

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setState((prev) => ({ ...prev, profileSuccess: false }));
      }, 3000);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        profileLoading: false,
        profileError: error instanceof Error ? error.message : 'Failed to update profile',
      }));
    }
  }, []);

  const updateNotifications = useCallback(async (preferences: NotificationPreferences) => {
    setState((prev) => ({ ...prev, notificationsLoading: true, notificationsError: null, notificationsSuccess: false }));
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Update state
      setState((prev) => ({
        ...prev,
        notificationsLoading: false,
        notificationsSuccess: true,
        notificationPreferences: preferences,
      }));

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setState((prev) => ({ ...prev, notificationsSuccess: false }));
      }, 3000);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        notificationsLoading: false,
        notificationsError: error instanceof Error ? error.message : 'Failed to update notifications',
      }));
    }
  }, []);

  const changePassword = useCallback(async (data: SecurityFormData) => {
    setState((prev) => ({ ...prev, securityLoading: true, securityError: null, securitySuccess: false }));
    try {
      // Validate data
      if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
        throw new Error('All password fields are required');
      }

      if (data.newPassword !== data.confirmPassword) {
        throw new Error('New passwords do not match');
      }

      if (data.newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters');
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Update state
      setState((prev) => ({
        ...prev,
        securityLoading: false,
        securitySuccess: true,
      }));

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setState((prev) => ({ ...prev, securitySuccess: false }));
      }, 3000);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        securityLoading: false,
        securityError: error instanceof Error ? error.message : 'Failed to change password',
      }));
    }
  }, []);

  const clearSuccess = useCallback((section: 'profile' | 'notifications' | 'security') => {
    setState((prev) => ({
      ...prev,
      [`${section}Success`]: false,
    } as Partial<SettingsState>));
  }, []);

  return {
    ...state,
    setActiveTab,
    updateProfile,
    updateNotifications,
    changePassword,
    clearSuccess,
  };
};
