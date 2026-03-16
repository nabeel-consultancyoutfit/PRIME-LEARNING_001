'use client';

import React, { useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import { AppBreadcrumbs } from '@/components/Breadcrumbs';
import { ProfileFormData, NotificationPreferences, SecurityFormData } from './Settings.interface';
import { useSettings } from './useSettings';
import { SETTINGS_TABS, NOTIFICATION_OPTIONS } from './Settings.data';
import {
  SettingsContainer,
  SettingsHeader,
  SettingsWrapper,
  SettingsTabs,
  SettingsTabContent,
  AvatarUploadArea,
  AvatarPreview,
  ProfileFormSection,
  ProfileFormBioSection,
  ProfileFormActions,
  NotificationItemWrapper,
  NotificationItemLabel,
  SecurityFormSection,
  SecurityFormActions,
  SuccessAlert,
} from './Settings.style';

export const Settings: React.FC = () => {
  const {
    activeTab,
    profileLoading,
    notificationsLoading,
    securityLoading,
    profileError,
    notificationsError,
    securityError,
    profileSuccess,
    notificationsSuccess,
    securitySuccess,
    profileData,
    notificationPreferences,
    setActiveTab,
    updateProfile,
    updateNotifications,
    changePassword,
    clearSuccess,
  } = useSettings();

  const [avatarPreview, setAvatarPreview] = useState<string>(profileData.avatar || '');
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings' },
  ];

  // Profile form
  const profileForm = useForm<ProfileFormData>({
    defaultValues: profileData,
  });

  // Notifications form
  const [notifications, setNotifications] = useState<NotificationPreferences>(notificationPreferences);

  // Security form
  const securityForm = useForm<SecurityFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onProfileSubmit = async (data: ProfileFormData) => {
    if (avatarPreview) {
      data.avatar = avatarPreview;
    }
    await updateProfile(data);
  };

  const onNotificationsSubmit = async () => {
    await updateNotifications(notifications);
  };

  const onSecuritySubmit = async (data: SecurityFormData) => {
    await changePassword(data);
    securityForm.reset();
  };

  return (
    <SettingsContainer maxWidth="md">
      <AppBreadcrumbs items={breadcrumbItems} sx={{ mb: 3 }} />

      <SettingsHeader>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Settings
        </Typography>
      </SettingsHeader>

      <SettingsWrapper>
        <Tabs
          value={SETTINGS_TABS.findIndex((tab) => tab.value === activeTab)}
          onChange={(e, newValue) => setActiveTab(SETTINGS_TABS[newValue].value)}
          variant="fullWidth"
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        >
          {SETTINGS_TABS.map((tab) => (
            <SettingsTabs key={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <SettingsTabContent>
            {profileSuccess && (
              <SuccessAlert>
                <Alert severity="success" onClose={() => clearSuccess('profile')}>
                  Profile updated successfully!
                </Alert>
              </SuccessAlert>
            )}
            {profileError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {profileError}
              </Alert>
            )}

            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Profile Picture
                </Typography>
                <AvatarUploadArea onClick={handleAvatarClick}>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  {avatarPreview ? (
                    <>
                      <AvatarPreview
                        component="img"
                        src={avatarPreview}
                        alt="Avatar preview"
                      />
                      <Button variant="outlined" size="small" startIcon={<CloudUploadIcon />}>
                        Change Picture
                      </Button>
                    </>
                  ) : (
                    <>
                      <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Click to upload profile picture
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        PNG, JPG up to 5MB
                      </Typography>
                    </>
                  )}
                </AvatarUploadArea>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Personal Information
                </Typography>
                <ProfileFormSection>
                  <Controller
                    name="firstName"
                    control={profileForm.control}
                    rules={{ required: 'First name is required' }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={profileForm.control}
                    rules={{ required: 'Last name is required' }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </ProfileFormSection>

                <ProfileFormSection>
                  <Controller
                    name="email"
                    control={profileForm.control}
                    rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </ProfileFormSection>

                <ProfileFormBioSection>
                  <Controller
                    name="bio"
                    control={profileForm.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Bio"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    )}
                  />
                </ProfileFormBioSection>
              </Box>

              <ProfileFormActions>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  type="submit"
                  disabled={profileLoading}
                >
                  {profileLoading ? <CircularProgress size={20} /> : 'Save Changes'}
                </Button>
              </ProfileFormActions>
            </form>
          </SettingsTabContent>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <SettingsTabContent>
            {notificationsSuccess && (
              <SuccessAlert>
                <Alert severity="success" onClose={() => clearSuccess('notifications')}>
                  Notification preferences updated successfully!
                </Alert>
              </SuccessAlert>
            )}
            {notificationsError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {notificationsError}
              </Alert>
            )}

            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Notification Preferences
            </Typography>

            <Box sx={{ mb: 4 }}>
              {NOTIFICATION_OPTIONS.map((option) => (
                <NotificationItemWrapper key={option.id}>
                  <NotificationItemLabel>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {option.label}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {option.description}
                    </Typography>
                  </NotificationItemLabel>
                  <Switch
                    checked={(notifications as any)[option.id] || false}
                    onChange={(e) =>
                      setNotifications((prev) => ({
                        ...prev,
                        [option.id]: e.target.checked,
                      }))
                    }
                  />
                </NotificationItemWrapper>
              ))}
            </Box>

            <ProfileFormActions>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={onNotificationsSubmit}
                disabled={notificationsLoading}
              >
                {notificationsLoading ? <CircularProgress size={20} /> : 'Save Preferences'}
              </Button>
            </ProfileFormActions>
          </SettingsTabContent>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <SettingsTabContent>
            {securitySuccess && (
              <SuccessAlert>
                <Alert severity="success" onClose={() => clearSuccess('security')}>
                  Password changed successfully!
                </Alert>
              </SuccessAlert>
            )}
            {securityError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {securityError}
              </Alert>
            )}

            <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Change Password
              </Typography>

              <SecurityFormSection>
                <Controller
                  name="currentPassword"
                  control={securityForm.control}
                  rules={{ required: 'Current password is required' }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Current Password"
                      type="password"
                      variant="outlined"
                      size="small"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  name="newPassword"
                  control={securityForm.control}
                  rules={{ required: 'New password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="New Password"
                      type="password"
                      variant="outlined"
                      size="small"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={securityForm.control}
                  rules={{
                    required: 'Please confirm password',
                    validate: (value) =>
                      value === securityForm.watch('newPassword') || 'Passwords do not match',
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Confirm New Password"
                      type="password"
                      variant="outlined"
                      size="small"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </SecurityFormSection>

              <SecurityFormActions>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={securityLoading}
                >
                  {securityLoading ? <CircularProgress size={20} /> : 'Change Password'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => securityForm.reset()}
                >
                  Cancel
                </Button>
              </SecurityFormActions>
            </form>
          </SettingsTabContent>
        )}
      </SettingsWrapper>
    </SettingsContainer>
  );
};

export default Settings;
