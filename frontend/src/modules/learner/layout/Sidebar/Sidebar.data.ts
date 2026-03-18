import {
  DashboardCustomizeOutlined,
  AssignmentOutlined,
  FormatListBulletedOutlined,
  MenuBookOutlined,
  TrackChangesOutlined,
  CastForEducationOutlined,
  ShowChartOutlined,
  FolderCopyOutlined,
  HelpOutlineOutlined,
  ChatOutlined,
  SmartToyOutlined,
} from '@mui/icons-material';

export interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  hasSubmenu?: boolean;
}

export const LEARNER_NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    icon: DashboardCustomizeOutlined,
    path: '/learner-dashboard/dashboard',
  },
  {
    label: 'Tasks',
    icon: AssignmentOutlined,
    path: '/learner-dashboard/tasks',
    hasSubmenu: true,
  },
  {
    label: 'Evidence',
    icon: FormatListBulletedOutlined,
    path: '/learner-dashboard/evidence',
  },
  {
    label: 'Learning Journals',
    icon: MenuBookOutlined,
    path: '/learner-dashboard/learning-journals',
  },
  {
    label: 'Scorecard',
    icon: TrackChangesOutlined,
    path: '/learner-dashboard/scorecard',
  },
  {
    label: 'Courses',
    icon: CastForEducationOutlined,
    path: '/learner-dashboard/courses',
  },
  {
    label: 'Progress',
    icon: ShowChartOutlined,
    path: '/learner-dashboard/progress',
  },
  {
    label: 'Resources',
    icon: FolderCopyOutlined,
    path: '/learner-dashboard/resources',
  },
  {
    label: 'Help Centre',
    icon: HelpOutlineOutlined,
    path: '/learner-dashboard/help-centre',
  },
  {
    label: 'Message',
    icon: ChatOutlined,
    path: '/learner-dashboard/message',
  },
];

export const ASK_ANYTHING: NavItem = {
  label: 'Ask Anything?',
  icon: SmartToyOutlined,
  path: '/learner-dashboard/ask-anything',
};
