import React from 'react';
import { EventNoteOutlined, LinkOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import AppHeader, { ProfileMenuItemDef } from '@/components/AppHeader';
import { NotificationDot } from '@/components/AppHeader/AppHeader.style';

interface HeaderProps {
  pageTitle?: string;
}

const LEARNER_PROFILE_MENU_ITEMS: ProfileMenuItemDef[] = [
  { id: 'set-status',           label: 'Set Status',           path: '/learner-dashboard/profile',      defaultHighlight: true },
  { id: 'my-profile',           label: 'My Profile',           path: '/learner-dashboard/profile' },
  { id: 'email-preference',     label: 'Email preference',     path: '/learner-dashboard/profile' },
  { id: 'my-activity',          label: 'My Activity',          path: '/learner-dashboard/activity' },
  { id: 'user-guide',           label: 'User Guide',           path: '/learner-dashboard/help-centre' },
  { id: 'system-announcements', label: 'System Announcements', path: '/learner-dashboard/announcements' },
  { id: 'logout',               label: 'Logout',               isDanger: true },
];

const Header: React.FC<HeaderProps> = ({ pageTitle = 'Dashboard' }) => (
  <AppHeader
    pageTitle={pageTitle}
    basePath="/learner-dashboard"
    searchPlaceholder="Search for account"
    profileMenuItems={LEARNER_PROFILE_MENU_ITEMS}
    iconButtons={
      <>
        <IconButton size="small" title="Calendar" sx={{ position: 'relative' }}>
          <EventNoteOutlined fontSize="small" />
          <NotificationDot />
        </IconButton>
        <IconButton size="small" title="Links" sx={{ position: 'relative' }}>
          <LinkOutlined fontSize="small" />
          <NotificationDot />
        </IconButton>
      </>
    }
  />
);

export default Header;
