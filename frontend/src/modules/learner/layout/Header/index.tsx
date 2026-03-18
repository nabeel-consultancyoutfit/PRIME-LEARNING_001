/**
 * Learner Layout — Header
 * Profile dropdown matches Figma node 61:11971 — pixel perfect
 */
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  EventNoteOutlined,
  LinkOutlined,
  CloseOutlined,
  ExpandMoreOutlined,
  ExpandLessOutlined,
  SearchOutlined,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { IconButton, Breadcrumbs, Link as MuiLink } from '@mui/material';
import SetStatusModal from '@/modules/learner/components/SetStatusModal';
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
  NotificationDot,
  UserProfileSection,
  UserAvatarBox,
  UserInfo,
  UserName,
  UserRole,
  HeaderAvatar,
  DropdownChevron,
  ProfileDropdownWrapper,
  ProfileMenuCard,
  ProfileMenuItem,
  ProfileMenuItemLabel,
  ProfileMenuItemArrow,
} from './Header.style';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  pageTitle?: string;
}

// ─── Profile Menu Items ───────────────────────────────────────────────────────
interface ProfileMenuItemDef {
  id: string;
  label: string;
  path: string;
  /** If true, highlight with bg on load (Figma shows "Set Status" highlighted) */
  defaultHighlight?: boolean;
}

const PROFILE_MENU_ITEMS: ProfileMenuItemDef[] = [
  { id: 'set-status',            label: 'Set Status',            path: '/learner-dashboard/profile',       defaultHighlight: true },
  { id: 'my-profile',            label: 'My Profile',            path: '/learner-dashboard/profile' },
  { id: 'email-preference',      label: 'Email preference',      path: '/learner-dashboard/profile' },
  { id: 'my-activity',           label: 'My Activity',           path: '/learner-dashboard/activity' },
  { id: 'user-guide',            label: 'User Guide',            path: '/learner-dashboard/help-centre' },
  { id: 'system-announcements',  label: 'System Announcements',  path: '/learner-dashboard/announcements' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Header: React.FC<HeaderProps> = ({ pageTitle = 'Dashboard' }) => {
  const router = useRouter();
  const { user } = useAuth();

  const [searchValue, setSearchValue]       = useState('');
  const [dropdownOpen, setDropdownOpen]     = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const dropdownRef                         = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [router.pathname]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);
  const handleSearchClear  = () => setSearchValue('');

  const getInitials = (name: string) =>
    name.split(' ').map((p) => p[0]).join('').toUpperCase().slice(0, 2);

  const userName = user?.name || 'John Doe';
  const userRole = user?.role || 'Learner';
  const initials = getInitials(userName);

  const handleMenuItemClick = (itemId: string, path: string) => {
    setDropdownOpen(false);
    if (itemId === 'set-status') {
      setStatusModalOpen(true);
    } else {
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
            href="/learner-dashboard"
            onClick={(e) => { e.preventDefault(); router.push('/learner-dashboard'); }}
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
            placeholder="Search for account"
            value={searchValue}
            onChange={handleSearchChange}
          />
          {searchValue ? (
            <SearchClearButton onClick={handleSearchClear}>
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
          <IconButton size="small" title="Calendar" sx={{ position: 'relative' }}>
            <EventNoteOutlined fontSize="small" />
            <NotificationDot />
          </IconButton>
          <IconButton size="small" title="Links" sx={{ position: 'relative' }}>
            <LinkOutlined fontSize="small" />
            <NotificationDot />
          </IconButton>
        </HeaderIconButtons>

        {/* Profile section with dropdown */}
        <ProfileDropdownWrapper ref={dropdownRef}>
          <UserProfileSection onClick={() => setDropdownOpen((prev) => !prev)}>
            <UserAvatarBox>
              <HeaderAvatar>{initials}</HeaderAvatar>
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

          {/* ── Profile Dropdown Card — Figma node 61:11971 ── */}
          {dropdownOpen && (
            <ProfileMenuCard>
              {PROFILE_MENU_ITEMS.map((item) => (
                <ProfileMenuItem
                  key={item.id}
                  active={item.defaultHighlight}
                  onClick={() => handleMenuItemClick(item.id, item.path)}
                >
                  <ProfileMenuItemLabel>{item.label}</ProfileMenuItemLabel>
                  <ProfileMenuItemArrow>
                    <ChevronRightIcon sx={{ fontSize: '16px' }} />
                  </ProfileMenuItemArrow>
                </ProfileMenuItem>
              ))}
            </ProfileMenuCard>
          )}
        </ProfileDropdownWrapper>
      </HeaderRightSection>
      {/* Set Status Modal */}
      <SetStatusModal
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
      />
    </HeaderContainer>
  );
};

export default Header;
