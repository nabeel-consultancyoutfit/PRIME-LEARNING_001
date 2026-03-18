/**
 * Dashboard module interfaces and types
 */

export interface QuickAccessItem {
  id: string;
  label: string;
  path: string;
  iconType?: 'activity' | 'evidence' | 'timesheet' | 'visit' | 'download' | 'witness' | 'showcase' | 'gap' | 'journey' | 'scorecard' | 'progress' | 'feedback' | 'exit' | 'support';
}

export interface TrainerInfo {
  id: string;
  name: string;
  title: string;
  status: 'online' | 'offline' | 'busy';
  avatar?: string;
}

export interface TaskDueItem {
  category: string;
  count: number;
  color: string;
  lightColor: string;
}

export interface CalendarDay {
  date: number;
  isToday: boolean;
  hasEvent: boolean;
  isCurrentMonth: boolean;
  isHighlighted: boolean;
}

export interface InfoCard {
  id: string;
  title: string;
  description: string;
  iconType?: 'lightbulb' | 'clipboard' | 'barchart';
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface LearningAimRow {
  id: string;
  name: string;
  currentProgress: number;
  targetProgress: number;
}

export interface InformationOption {
  id: string;
  label: string;
  count: number;
}

export interface WorkplaceInfo {
  workplace: string;
  mentorName: string;
  phone: string;
  email: string;
}

export interface DashboardState {
  quickAccessItems: QuickAccessItem[];
  trainerInfo: TrainerInfo;
  tasksDue: TaskDueItem[];
  calendarDays: CalendarDay[];
  calendarMonth: number;
  calendarYear: number;
  infoCards: InfoCard[];
  workplaceInfo: WorkplaceInfo;
  learningAims: LearningAimRow[];
  informationOptions: InformationOption[];
  activeTab: 'Activity' | 'Manage' | 'Progress' | 'Forms';
}

export interface SafeguardingContact {
  type: 'email' | 'phone';
  label: string;
  value: string;
  href: string;
}
