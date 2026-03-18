import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  EventNoteOutlined,
  LinkOutlined,
  CloseOutlined,
  ExpandMoreOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import { IconButton, Breadcrumbs, Link as MuiLink } from '@mui/material';
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
} from './Header.style';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  pageTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle = 'Dashboard' }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClear = () => {
    setSearchValue('');
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userName = user?.name || 'John Doe';
  const userRole = user?.role || 'Learner';
  const initials = getInitials(userName);

  return (
    <HeaderContainer>
      {/* Left Section - Breadcrumbs */}
      <HeaderLeftSection>
        <HeaderBreadcrumbs separator="/">
          <MuiLink
            color="inherit"
            href="/learner-dashboard"
            onClick={(e) => {
              e.preventDefault();
              router.push('/learner-dashboard');
            }}
          >
            Dashboards
          </MuiLink>
          <span>{pageTitle}</span>
        </HeaderBreadcrumbs>
      </HeaderLeftSection>

      {/* Center Section - Search */}
      <HeaderCenterSection>
        <SearchInputContainer>
          <SearchOutlined fontSize="small" sx={{ color: '#A0A0A0' }} />
          <SearchInput
            placeholder="Search for account"
            value={searchValue}
            onChange={handleSearchChange}
          />
          {searchValue && (
            <SearchClearButton onClick={handleSearchClear}>
              <CloseOutlined fontSize="small" />
            </SearchClearButton>
          )}
          {!searchValue && <SearchKeyboardHint>⌘/</SearchKeyboardHint>}
        </SearchInputContainer>
      </HeaderCenterSection>

      {/* Right Section - Icons and Profile */}
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

        {/* User Profile */}
        <UserProfileSection>
          <UserAvatarBox>
            <HeaderAvatar>{initials}</HeaderAvatar>
            <UserInfo>
              <UserName>{userName}</UserName>
              <UserRole>{userRole}</UserRole>
            </UserInfo>
          </UserAvatarBox>
          <DropdownChevron>
            <ExpandMoreOutlined fontSize="small" />
          </DropdownChevron>
        </UserProfileSection>
      </HeaderRightSection>
    </HeaderContainer>
  );
};

export default Header;
