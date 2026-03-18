import React, { useState, ReactNode } from 'react';
import {
  Box,
  Toolbar,
  InputBase,
  IconButton,
  Avatar,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  AutoStories as LessonsIcon,
  PeopleAlt as StudentsIcon,
  PersonOutline as InstructorsIcon,
  Assignment as EnrollmentsIcon,
  Payment as BillingIcon,
  Settings as SettingsIcon,
  AdminPanelSettings as AdminIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import * as S from '@/layout/MainLayout/MainLayout.style';

interface NavItemConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  section: 'main' | 'admin' | 'settings';
}

const NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    href: '/dashboard',
    section: 'main',
  },
  {
    id: 'courses',
    label: 'Courses',
    icon: <SchoolIcon />,
    href: '/courses',
    section: 'main',
  },
  {
    id: 'lessons',
    label: 'Lessons',
    icon: <LessonsIcon />,
    href: '/lessons',
    section: 'main',
  },
  {
    id: 'students',
    label: 'Students',
    icon: <StudentsIcon />,
    href: '/students',
    section: 'main',
  },
  {
    id: 'instructors',
    label: 'Instructors',
    icon: <InstructorsIcon />,
    href: '/instructors',
    section: 'main',
  },
  {
    id: 'enrollments',
    label: 'Enrollments',
    icon: <EnrollmentsIcon />,
    href: '/enrollments',
    section: 'main',
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: <BillingIcon />,
    href: '/billing',
    section: 'settings',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    href: '/settings',
    section: 'settings',
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: <AdminIcon />,
    href: '/admin',
    section: 'admin',
  },
];

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const mainNavItems = NAV_ITEMS.filter((item) => item.section === 'main');
  const settingsNavItems = NAV_ITEMS.filter((item) => item.section === 'settings');
  const adminNavItems = NAV_ITEMS.filter((item) => item.section === 'admin');

  const isNavItemActive = (href: string) => {
    return router.pathname.startsWith(href);
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setMobileDrawerOpen(false);
  };

  const NavItems = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <S.DrawerHeader>
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'primary.main',
              letterSpacing: -0.5,
            }}
          >
            Prime
          </Box>
          <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Learning Platform</Box>
        </Box>
      </S.DrawerHeader>

      <Box sx={{ flex: 1, overflowY: 'hidden', pb: 2, }}>
        {/* Main Section */}
        <S.NavSection>
          {mainNavItems.map((item) => (
            <S.NavItem
              key={item.id}
              onClick={() => handleNavigation(item.href)}
              className={isNavItemActive(item.href) ? 'active' : ''}
              sx={{
                backgroundColor: isNavItemActive(item.href) ? 'primary.lighter' : 'transparent',
              }}
            >
              <Box sx={{ display: 'flex', color: 'inherit' }}>{item.icon}</Box>
              <span>{item.label}</span>
            </S.NavItem>
          ))}
        </S.NavSection>

        {/* Settings Section */}
        {settingsNavItems.length > 0 && (
          <S.NavSection>
            {settingsNavItems.map((item) => (
              <S.NavItem
                key={item.id}
                onClick={() => handleNavigation(item.href)}
                className={isNavItemActive(item.href) ? 'active' : ''}
                sx={{
                  backgroundColor: isNavItemActive(item.href) ? 'primary.lighter' : 'transparent',
                }}
              >
                <Box sx={{ display: 'flex', color: 'inherit' }}>{item.icon}</Box>
                <span>{item.label}</span>
              </S.NavItem>
            ))}
          </S.NavSection>
        )}

        {/* Admin Section */}
        {adminNavItems.length > 0 && (
          <S.NavSection>
            <S.NavSectionTitle>Administration</S.NavSectionTitle>
            {adminNavItems.map((item) => (
              <S.NavItem
                key={item.id}
                onClick={() => handleNavigation(item.href)}
                className={isNavItemActive(item.href) ? 'active' : ''}
                sx={{
                  backgroundColor: isNavItemActive(item.href) ? 'primary.lighter' : 'transparent',
                }}
              >
                <Box sx={{ display: 'flex', color: 'inherit' }}>{item.icon}</Box>
                <span>{item.label}</span>
              </S.NavItem>
            ))}
          </S.NavSection>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Desktop Drawer */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <S.Drawer variant="permanent" anchor="left">
          <NavItems />
        </S.Drawer>
      </Box>

      {/* Mobile Drawer */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <S.Drawer
          variant="temporary"
          anchor="left"
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
        >
          <NavItems />
        </S.Drawer>
      </Box>

      {/* Main Content */}
      <S.ContentWrapper>
        {/* App Bar */}
        <S.AppBar position="fixed">
          <Toolbar sx={{ minHeight: 64, px: 3 }}>
            <S.AppBarContent>
              {/* Left Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Tooltip title="Menu">
                  <IconButton
                    color="inherit"
                    onClick={() => setMobileDrawerOpen(true)}
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
                <Box sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>
                  Prime Learning Platform
                </Box>
              </Box>

              {/* Center Section - Search */}
              <S.SearchBox
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 1,
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  },
                }}
              >
                <SearchIcon sx={{ color: 'white', fontSize: '1.25rem' }} />
                <InputBase
                  placeholder="Search..."
                  sx={{
                    color: 'white',
                    flex: 1,
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      opacity: 1,
                    },
                  }}
                />
              </S.SearchBox>

              {/* Right Section - Actions */}
              <S.AppBarActions>
                <Tooltip title="Notifications">
                  <IconButton color="inherit">
                    <Badge badgeContent={3} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Profile">
                  <IconButton color="inherit">
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: 'secondary.main',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                      }}
                    >
                      JD
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </S.AppBarActions>
            </S.AppBarContent>
          </Toolbar>
        </S.AppBar>

        {/* Content */}
        <S.ContentArea>{children}</S.ContentArea>
      </S.ContentWrapper>
    </Box>
  );
};

export default MainLayout;
