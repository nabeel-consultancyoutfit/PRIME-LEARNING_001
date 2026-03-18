import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronRight, MenuOutlined as MenuIcon } from '@mui/icons-material';
import {
  SidebarContainer,
  LogoArea,
  LogoBox,
  LogoText,
  LogoSubtext,
  CollapseButton,
  NavListContainer,
  NavListItem,
  NavListItemIcon,
  NavListItemText,
  SubmenuChevron,
  BottomNavContainer,
  AskAnythingItem,
} from './Sidebar.style';
import { LEARNER_NAV_ITEMS, ASK_ANYTHING } from './Sidebar.data';

interface SidebarProps {
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onToggle?.();
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const isActiveItem = (path: string): boolean => {
    return router.pathname === path || router.pathname.startsWith(path);
  };

  return (
    <SidebarContainer>
      {/* Logo Area with Prime branding */}
      <LogoArea>
        <LogoBox>
          <LogoText>Prime</LogoText>
          <LogoSubtext>Learning Platform</LogoSubtext>
        </LogoBox>
        <CollapseButton size="small" onClick={handleToggleCollapse} title="Toggle sidebar">
          <MenuIcon fontSize="small" />
        </CollapseButton>
      </LogoArea>

      {/* Main Navigation Items */}
      <NavListContainer>
        {LEARNER_NAV_ITEMS.map((item) => {
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

      {/* Bottom Ask Anything Section */}
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

export default Sidebar;
