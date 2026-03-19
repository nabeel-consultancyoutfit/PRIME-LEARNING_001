import React from 'react';
import AppSidebar from '@/components/AppSidebar';
import { TRAINER_NAV_ITEMS, ASK_ANYTHING } from './Sidebar.data';

interface SidebarProps {
  onToggle?: () => void;
}

const TrainerSidebar: React.FC<SidebarProps> = ({ onToggle }) => (
  <AppSidebar
    navItems={TRAINER_NAV_ITEMS}
    askAnythingItem={ASK_ANYTHING}
    onToggle={onToggle}
  />
);

export default TrainerSidebar;
