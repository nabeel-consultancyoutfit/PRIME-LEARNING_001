import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import {
  CloseOutlined,
  ExpandMoreOutlined,
  ExpandLessOutlined,
  SearchOutlined,
  ChevronRight as ChevronRightIcon,
  LogoutOutlined,
} from '@mui/icons-material';
import { Link as MuiLink, CircularProgress } from '@mui/material';
import SetStatusModal from '@/components/SetStatusModal';
import {
  HeaderContainer,
  HeaderLeftSection,
  HeaderBreadcrumbs,
  HeaderCenterSection,
  SearchInputContainer,
  SearchInput,
  SearchClearButton,
  SearchKeyboardHint,
  HeaderRightSection,
  HeaderIconButtons,
  ProfileDropdownWrapper,
  UserProfileSection,
  UserAvatarBox,
  HeaderAvatar,
  UserInfo,
  UserName,
  UserRole,
  DropdownChevron,
  ProfileMenuCard,
  ProfileMenuItem,
  ProfileMenuItemLabel,
  ProfileMenuItemArrow,
  ProfileMenuDivider,
} from './AppHeader.style';
import { useAuth } from '@/context/AuthContext';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface ProfileMenuItemDef {
  id: string;
  label: string;
  path?: string;
  /** Highlights this item with a subtle bg on open (used for "Set Status") */
  defaultHighlight?: boolean;
  /** Renders item in red — used for destructive actions like Logout */
  isDanger?: boolean;
}

export interface AppHeaderProps {
  pageTitle?: string;
  /** The base dashboard route used for the "Dashboards" breadcrumb link */
  basePath: string;
  searchPlaceholder?: string;
  /** Items rendered in the profile dropdown menu */
  profileMenuItems: ProfileMenuItemDef[];
  /** Role-specific icon buttons rendered left of the profile section */
  iconButtons: ReactNode;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

const getInitials = (name: string) =>
  name.split(' ').map((p) => p[0]).join('').toUpperCase().slice(0, 2);

// ─── Component ─────────────────────────────────────────────────────────────

const AppHeader: React.FC<AppHeaderProps> = ({
  pageTitle = 'Dashboard',
  basePath,
  searchPlaceholder = 'Search for account',
  profileMenuItems,
  iconButtons,
}) => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [searchValue, setSearchValue]         = useState('');
  const [dropdownOpen, setDropdownOpen]       = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [loggingOut, setLoggingOut]           = useState(false);
  const dropdownRef                           = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [router.pathname]);

  const userName = user
    ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.name || 'User'
    : 'User';
  const userRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : 'User';
  const initials = getInitials(userName);

  const handleMenuItemClick = async (itemId: string, path?: string) => {
    setDropdownOpen(false);
    if (itemId === 'set-status') {
      setStatusModalOpen(true);
    } else if (itemId === 'logout') {
      setLoggingOut(true);
      try {
        await logout();
      } finally {
        setLoggingOut(false);
        router.push('/');
      }
    } else if (path) {
      router.push(path);
    }
  };

  return (
    <HeaderContainer>
      {/* Left — Breadcrumbs */}
      <HeaderLeftSection>
        <HeaderBreadcrumbs separator="/">
          <MuiLink
            color="inherit"
            href={basePath}
            onClick={(e) => { e.preventDefault(); router.push(basePath); }}
          >
            Dashboards
          </MuiLink>
          <span>{pageTitle}</span>
        </HeaderBreadcrumbs>
      </HeaderLeftSection>

      {/* Center — Search */}
      <HeaderCenterSection>
        <SearchInputContainer>
          <SearchOutlined fontSize="small" sx={{ color: '#A0A0A0' }} />
          <SearchInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue ? (
            <SearchClearButton onClick={() => setSearchValue('')}>
              <CloseOutlined fontSize="small" />
            </SearchClearButton>
          ) : (
            <SearchKeyboardHint>⌘/</SearchKeyboardHint>
          )}
        </SearchInputContainer>
      </HeaderCenterSection>

      {/* Right — Icon buttons + Profile dropdown */}
      <HeaderRightSection>
        <HeaderIconButtons>
          {iconButtons}
        </HeaderIconButtons>

        <ProfileDropdownWrapper ref={dropdownRef}>
          <UserProfileSection onClick={() => setDropdownOpen((prev) => !prev)}>
            <UserAvatarBox>
              <HeaderAvatar>
                {loggingOut
                  ? <CircularProgress size={16} sx={{ color: '#fff' }} />
                  : initials}
              </HeaderAvatar>
              <UserInfo>
                <UserName>{userName}</UserName>
                <UserRole>{userRole}</UserRole>
              </UserInfo>
            </UserAvatarBox>
            <DropdownChevron>
              {dropdownOpen
                ? <ExpandLessOutlined fontSize="small" />
                : <ExpandMoreOutlined fontSize="small" />}
            </DropdownChevron>
          </UserProfileSection>

          {dropdownOpen && (
            <ProfileMenuCard>
              {profileMenuItems.map((item, idx) => (
                <React.Fragment key={item.id}>
                  {/* Divider before the logout item */}
                  {item.isDanger && idx > 0 && <ProfileMenuDivider />}
                  <ProfileMenuItem
                    active={item.defaultHighlight}
                    danger={item.isDanger}
                    onClick={() => handleMenuItemClick(item.id, item.path)}
                  >
                    <ProfileMenuItemLabel danger={item.isDanger}>
                      {item.label}
                    </ProfileMenuItemLabel>
                    <ProfileMenuItemArrow>
                      {item.isDanger
                        ? <LogoutOutlined sx={{ fontSize: '15px', color: '#D32F2F' }} />
                        : <ChevronRightIcon sx={{ fontSize: '16px' }} />}
                    </ProfileMenuItemArrow>
                  </ProfileMenuItem>
                </React.Fragment>
              ))}
            </ProfileMenuCard>
          )}
        </ProfileDropdownWrapper>
      </HeaderRightSection>

      {/* Set Status Modal — shared by both roles */}
      <SetStatusModal
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
      />
    </HeaderContainer>
  );
};

export default AppHeader;
