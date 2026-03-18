import React from 'react';
import { useRouter } from 'next/router';
import { ChevronRight, MenuOutlined as MenuIcon } from '@mui/icons-material';
import {
  SidebarContainer,
  LogoArea,
  LogoBox,
  CollapseButton,
  NavListContainer,
  NavListItem,
  NavListItemIcon,
  NavListItemText,
  SubmenuChevron,
  BottomNavContainer,
  AskAnythingItem,
} from './Sidebar.style';
import { TRAINER_NAV_ITEMS, ASK_ANYTHING } from './Sidebar.data';
import PrimeLogo from '@/components/PrimeLogo';

interface SidebarProps {
  onToggle?: () => void;
}

const TrainerSidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const isActiveItem = (path: string): boolean => {
    if (path === '/trainer-dashboard') {
      return router.pathname === '/trainer-dashboard';
    }
    return router.pathname === path || router.pathname.startsWith(path + '/');
  };

  return (
    <SidebarContainer>
      {/* Logo */}
      <LogoArea>
        <LogoBox>
          <PrimeLogo width={96} height={53} />
        </LogoBox>
        <CollapseButton size="small" onClick={onToggle} title="Toggle sidebar">
          <MenuIcon fontSize="small" />
        </CollapseButton>
      </LogoArea>

      {/* Main Navigation */}
      <NavListContainer>
        {TRAINER_NAV_ITEMS.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActiveItem(item.path);

          return (
            <NavListItem
              key={item.path}
              className={isActive ? 'active' : ''}
              onClick={() => handleNavigation(item.path)}
            >
              <NavListItemIcon>
                <IconComponent fontSize="small" />
              </NavListItemIcon>
              <NavListItemText primary={item.label} />
              {item.hasSubmenu && (
                <SubmenuChevron>
                  <ChevronRight fontSize="small" />
                </SubmenuChevron>
              )}
            </NavListItem>
          );
        })}
      </NavListContainer>

      {/* Bottom Ask Anything */}
      <BottomNavContainer>
        <AskAnythingItem onClick={() => handleNavigation(ASK_ANYTHING.path)}>
          <NavListItemIcon>
            {React.createElement(ASK_ANYTHING.icon, { fontSize: 'small' })}
          </NavListItemIcon>
          <NavListItemText primary={ASK_ANYTHING.label} />
        </AskAnythingItem>
      </BottomNavContainer>
    </SidebarContainer>
  );
};

export default TrainerSidebar;
