/**
 * Dashboard static data and configurations
 */

import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import PersonCheckIcon from '@mui/icons-material/PersonCheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const STAT_CARD_CONFIG = [
  {
    id: 'totalCourses',
    icon: SchoolIcon,
    label: 'Total Courses',
    color: '#1976D2',
  },
  {
    id: 'totalStudents',
    icon: PeopleIcon,
    label: 'Total Students',
    color: '#388E3C',
  },
  {
    id: 'activeEnrollments',
    icon: PersonCheckIcon,
    label: 'Active Enrollments',
    color: '#F57C00',
  },
  {
    id: 'totalRevenue',
    icon: AttachMoneyIcon,
    label: 'Total Revenue',
    color: '#7B1FA2',
  },
];

export const CHART_PLACEHOLDER_DATA = {
  title: 'Enrollment Trends',
  description: 'Track course enrollment patterns over time',
};
