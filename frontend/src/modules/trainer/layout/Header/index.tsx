import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  EventNoteOutlined,
  NotificationsOutlined,
  CloseOutlined,
  ExpandMoreOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
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

interface TrainerHeaderProps {
  pageTitle?: string;
}

const TrainerHeader: React.FC<TrainerHeaderProps> = ({ pageTitle = 'Dashboard' }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState('');

  const getInitials = (name: string): string =>
    name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const userName = user?.name || 'Sarah Thompson';
  const userRole = user?.role || 'Trainer';
  const initials = getInitials(userName);

  return (
    <HeaderContainer>
      {/* Breadcrumbs */}
      <HeaderLeftSection>
        <HeaderBreadcrumbs>
          <a
            href="/trainer-dashboard"
            onClick={(e) => {
              e.preventDefault();
              router.push('/trainer-dashboard');
            }}
          >
            Dashboards
          </a>
          <span className="sep">/</span>
          <span>{pageTitle}</span>
        </HeaderBreadcrumbs>
      </HeaderLeftSection>

      {/* Search */}
      <HeaderCenterSection>
        <SearchInputContainer>
          <SearchOutlined fontSize="small" sx={{ color: '#A0A0A0' }} />
          <SearchInput
            placeholder="Search learners, journals, tasks..."
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

      {/* Right — icons + profile */}
      <HeaderRightSection>
        <HeaderIconButtons>
          <IconButton size="small" title="Calendar" sx={{ position: 'relative' }}>
            <EventNoteOutlined fontSize="small" />
            <NotificationDot />
          </IconButton>
          <IconButton size="small" title="Notifications" sx={{ position: 'relative' }}>
            <NotificationsOutlined fontSize="small" />
            <NotificationDot />
          </IconButton>
        </HeaderIconButtons>

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

export default TrainerHeader;
