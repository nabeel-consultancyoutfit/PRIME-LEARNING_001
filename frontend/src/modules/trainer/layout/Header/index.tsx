import React from 'react';
import { EventNoteOutlined, NotificationsOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import AppHeader, { ProfileMenuItemDef } from '@/components/AppHeader';
import { NotificationDot } from '@/components/AppHeader/AppHeader.style';

interface TrainerHeaderProps {
  pageTitle?: string;
}

const TRAINER_PROFILE_MENU_ITEMS: ProfileMenuItemDef[] = [
  { id: 'set-status',       label: 'Set Status',       path: '/trainer-dashboard/profile',     defaultHighlight: true },
  { id: 'my-profile',       label: 'My Profile',       path: '/trainer-dashboard/profile' },
  { id: 'email-preference', label: 'Email preference', path: '/trainer-dashboard/profile' },
  { id: 'user-guide',       label: 'User Guide',       path: '/trainer-dashboard/help-centre' },
  { id: 'logout',           label: 'Logout',           isDanger: true },
];

const TrainerHeader: React.FC<TrainerHeaderProps> = ({ pageTitle = 'Dashboard' }) => (
  <AppHeader
    pageTitle={pageTitle}
    basePath="/trainer-dashboard"
    searchPlaceholder="Search learners, journals, tasks..."
    profileMenuItems={TRAINER_PROFILE_MENU_ITEMS}
    iconButtons={
      <>
        <IconButton size="small" title="Calendar" sx={{ position: 'relative' }}>
          <EventNoteOutlined fontSize="small" />
          <NotificationDot />
        </IconButton>
        <IconButton size="small" title="Notifications" sx={{ position: 'relative' }}>
          <NotificationsOutlined fontSize="small" />
          <NotificationDot />
        </IconButton>
      </>
    }
  />
);

export default TrainerHeader;
