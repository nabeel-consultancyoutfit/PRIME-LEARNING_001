/**
 * Dashboard interfaces
 */

export interface DashboardStat {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend?: number;
  trendDirection?: 'up' | 'down';
}

export interface RecentCourse {
  id: string;
  title: string;
  instructor: string;
  enrolledCount: number;
  maxStudents: number;
  status: 'draft' | 'published' | 'archived';
  price: number;
  createdAt: string;
}

export interface DashboardData {
  stats: {
    totalCourses: number;
    totalStudents: number;
    activeEnrollments: number;
    totalRevenue: number;
  };
  recentCourses: RecentCourse[];
}

export interface DashboardProps {
  onCourseClick?: (courseId: string) => void;
}
