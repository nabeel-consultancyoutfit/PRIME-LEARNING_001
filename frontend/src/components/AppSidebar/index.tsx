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
} from './AppSidebar.style';
import PrimeLogo from '@/components/PrimeLogo';

export interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  hasSubmenu?: boolean;
}

export interface AppSidebarProps {
  navItems: NavItem[];
  askAnythingItem: NavItem;
  onToggle?: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ navItems, askAnythingItem, onToggle }) => {
  const router = useRouter();

  const isActiveItem = (path: string): boolean =>
    router.pathname === path || router.pathname.startsWith(path + '/');

  const handleNavigation = (path: string) => {
    router.push(path);
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

      {/* Navigation Items */}
      <NavListContainer>
        {navItems.map((item) => {
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

      {/* Ask Anything */}
      <BottomNavContainer>
        <AskAnythingItem onClick={() => handleNavigation(askAnythingItem.path)}>
          <NavListItemIcon>
            {React.createElement(askAnythingItem.icon, { fontSize: 'small' })}
          </NavListItemIcon>
          <NavListItemText primary={askAnythingItem.label} />
        </AskAnythingItem>
      </BottomNavContainer>
    </SidebarContainer>
  );
};

export default AppSidebar;
