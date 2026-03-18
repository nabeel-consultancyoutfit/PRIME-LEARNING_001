import {
  DashboardCustomizeOutlined,
  AssignmentOutlined,
  MenuBookOutlined,
  ChatOutlined,
  BarChartOutlined,
  FolderOpenOutlined,
  HelpOutlineOutlined,
  SmartToyOutlined,
} from '@mui/icons-material';

export interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  hasSubmenu?: boolean;
}

export const TRAINER_NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    icon: DashboardCustomizeOutlined,
    path: '/trainer-dashboard',
  },
  {
    label: 'Tasks',
    icon: AssignmentOutlined,
    path: '/trainer-dashboard/tasks',
    hasSubmenu: true,
  },
  {
    label: 'Courses',
    icon: MenuBookOutlined,
    path: '/trainer-dashboard/courses',
  },
  {
    label: 'Message',
    icon: ChatOutlined,
    path: '/trainer-dashboard/message',
  },
  {
    label: 'Reports',
    icon: BarChartOutlined,
    path: '/trainer-dashboard/progress',
  },
  {
    label: 'Resources',
    icon: FolderOpenOutlined,
    path: '/trainer-dashboard/resources',
  },
  {
    label: 'Help Centre',
    icon: HelpOutlineOutlined,
    path: '/trainer-dashboard/help-centre',
  },
];

export const ASK_ANYTHING: NavItem = {
  label: 'Ask Anything?',
  icon: SmartToyOutlined,
  path: '/trainer-dashboard/ask-anything',
};
