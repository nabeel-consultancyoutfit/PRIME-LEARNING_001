/**
 * Learner — Dashboard Selector
 * Figma: node 53:39728  (file: cxViXQO1W96E5OtTcRhQSh)
 *
 * Post-login screen. Shows all enrolled programmes as cards.
 * Clicking a card navigates to the full individual dashboard.
 *
 * Layout:
 *  ┌──────────────┬──────────────────────────────────────────────┐
 *  │  Sidebar     │  TopBar  (breadcrumb | search | user)        │
 *  │  • Dashboards│  ─────────────────────────────────────────   │
 *  │  My Account* │  [Card] [Card] [Card]                        │
 *  │  RPL         │  [Card] [Card]                               │
 *  │  Enroll      │                                              │
 *  │  Eportfolio  │                                              │
 *  └──────────────┴──────────────────────────────────────────────┘
 */

import React from 'react';
import { useRouter } from 'next/router';
import {
  AccountCircleOutlined,
  CurrencyPoundOutlined,
  HowToRegOutlined,
  FolderOpenOutlined,
  SearchOutlined,
  KeyboardArrowDownOutlined,
  PersonOutlined,
} from '@mui/icons-material';
import {
  PageWrapper,
  SelectorSidebar,
  SidebarLogoArea,
  SidebarLogoBox,
  SidebarLogoText,
  SidebarLogoSubtext,
  SidebarSectionLabel,
  SidebarNavItem,
  MainContent,
  TopBar,
  BreadcrumbRow,
  BreadcrumbItem,
  BreadcrumbSep,
  TopBarRight,
  SearchBox,
  SearchInput,
  SearchShortcut,
  UserChip,
  UserAvatar,
  UserName,
  ContentBody,
  CardsGrid,
  ProgramCard,
  CardTitleRow,
  CardTitle,
  CardTealAvatar,
  CardLastActivity,
  CardStatusRow,
  CardUserIcon,
  StatusText,
  StatusDot,
  CardProgressTrack,
  CardBottomRow,
  TaskCountRow,
  TaskNumber,
  TaskSep,
  TaskLabel,
  PercentText,
} from './DashboardSelector.style';

/* ─── Types ──────────────────────────────────────────────────── */
type ProgramStatus =
  | 'In Progress'
  | 'Complete'
  | 'Pending'
  | 'Approved'
  | 'Not task Assigned';

interface Program {
  id: string;
  title: string;         // e.g. "Tutor-(The prime collage ltd )"
  lastActivity: string;  // e.g. "17/11/2024 12:05"
  status: ProgramStatus;
  tasksCompleted: number;
  tasksTotal: number;
  percent: number;
}

/* ─── Mock data — matches Figma node 53:39728 exactly ───────── */
const PROGRAMS: Program[] = [
  {
    id: '1',
    title: 'Tutor-(The prime collage ltd )',
    lastActivity: '17/11/2024 12:05',
    status: 'In Progress',
    tasksCompleted: 15,
    tasksTotal: 48,
    percent: 51,
  },
  {
    id: '2',
    title: 'Tahmidul Hassan (The prime collage ltd)',
    lastActivity: '17/11/2024 12:05',
    status: 'Complete',
    tasksCompleted: 48,
    tasksTotal: 48,
    percent: 100,
  },
  {
    id: '3',
    title: 'Tahmidul Hassan (Centre Manager the p...',
    lastActivity: '17/11/2024 12:05',
    status: 'Pending',
    tasksCompleted: 1,
    tasksTotal: 48,
    percent: 0,
  },
  {
    id: '4',
    title: 'Tahmidul Hassan (Internal Quality Assur...',
    lastActivity: '17/11/2024 12:05',
    status: 'Not task Assigned',
    tasksCompleted: 0,
    tasksTotal: 0,
    percent: 0,
  },
  {
    id: '5',
    title: 'Tahmidul Hassan (Trainer the prime coll...',
    lastActivity: '17/11/2024 12:05',
    status: 'Approved',
    tasksCompleted: 48,
    tasksTotal: 48,
    percent: 100,
  },
];

/* ─── Sidebar nav ────────────────────────────────────────────── */
const SELECTOR_NAV: { label: string; icon: React.ElementType; active?: boolean }[] = [
  { label: 'My Account', icon: AccountCircleOutlined, active: true },
  { label: 'RPL', icon: CurrencyPoundOutlined },
  { label: 'Enroll', icon: HowToRegOutlined },
  { label: 'Eportfolio', icon: FolderOpenOutlined },
];

/* ─── Component ─────────────────────────────────────────────── */
const DashboardSelector: React.FC = () => {
  const router = useRouter();

  const handleSelect = (prog: Program) => {
    router.push(`/learner-dashboard/dashboard?programId=${prog.id}`);
  };

  return (
    <PageWrapper>
      {/* ── Sidebar ── */}
      <SelectorSidebar>
        {/* Logo */}
        <SidebarLogoArea>
          <SidebarLogoBox>
            {/* "P" monogram as logo stand-in */}
            <span style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700 }}>P</span>
          </SidebarLogoBox>
          <div>
            <SidebarLogoText>Prime</SidebarLogoText>
            <SidebarLogoSubtext>Learning Platform</SidebarLogoSubtext>
          </div>
        </SidebarLogoArea>

        {/* Section label */}
        <SidebarSectionLabel>Dashboards</SidebarSectionLabel>

        {/* Nav items */}
        {SELECTOR_NAV.map((item) => {
          const Icon = item.icon;
          return (
            <SidebarNavItem key={item.label} active={item.active}>
              <Icon sx={{ fontSize: 16 }} />
              {item.label}
            </SidebarNavItem>
          );
        })}
      </SelectorSidebar>

      {/* ── Main content ── */}
      <MainContent>
        {/* Top bar */}
        <TopBar>
          {/* Breadcrumb */}
          <BreadcrumbRow>
            <BreadcrumbItem>Dashboards</BreadcrumbItem>
            <BreadcrumbSep>/</BreadcrumbSep>
            <BreadcrumbItem active>Default</BreadcrumbItem>
          </BreadcrumbRow>

          {/* Search + User */}
          <TopBarRight>
            <SearchBox>
              <SearchOutlined sx={{ fontSize: 14, color: '#9CA3AF' }} />
              <SearchInput placeholder="Search for account" />
              <SearchShortcut>⌘/</SearchShortcut>
            </SearchBox>

            <UserChip>
              <UserAvatar>
                <PersonOutlined sx={{ fontSize: 18, color: '#FFFFFF' }} />
              </UserAvatar>
              <UserName>ByeWind</UserName>
              <KeyboardArrowDownOutlined sx={{ fontSize: 16, color: '#9CA3AF' }} />
            </UserChip>
          </TopBarRight>
        </TopBar>

        {/* Cards grid */}
        <ContentBody>
          <CardsGrid>
            {PROGRAMS.map((prog) => (
              <ProgramCard key={prog.id} onClick={() => handleSelect(prog)}>
                {/* Title + teal avatar */}
                <CardTitleRow>
                  <CardTitle title={prog.title}>{prog.title}</CardTitle>
                  <CardTealAvatar>
                    <PersonOutlined sx={{ fontSize: 20, color: '#FFFFFF' }} />
                  </CardTealAvatar>
                </CardTitleRow>

                {/* Last activity */}
                <CardLastActivity>
                  Last activity on {prog.lastActivity}
                </CardLastActivity>

                {/* User icon + status */}
                <CardStatusRow>
                  <CardUserIcon>
                    <PersonOutlined sx={{ fontSize: 14, color: '#FFFFFF' }} />
                  </CardUserIcon>
                  <StatusText status={prog.status}>
                    <StatusDot status={prog.status} />
                    {prog.status}
                  </StatusText>
                </CardStatusRow>

                {/* Progress track (4px gray bar — no fill, matches Figma) */}
                <CardProgressTrack />

                {/* Task count + percent */}
                <CardBottomRow>
                  <TaskCountRow>
                    <TaskNumber>{prog.tasksCompleted}</TaskNumber>
                    <TaskSep>/</TaskSep>
                    <TaskNumber>{prog.tasksTotal}</TaskNumber>
                    <TaskLabel>&nbsp;Total Tasks</TaskLabel>
                  </TaskCountRow>
                  <PercentText>{prog.percent}%</PercentText>
                </CardBottomRow>
              </ProgramCard>
            ))}
          </CardsGrid>
        </ContentBody>
      </MainContent>
    </PageWrapper>
  );
};

export default DashboardSelector;
