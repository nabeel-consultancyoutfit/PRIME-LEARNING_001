/**
 * Mock data for Dashboard module
 */

import {
  DashboardState,
  QuickAccessItem,
  TrainerInfo,
  TaskDueItem,
  CalendarDay,
  InfoCard,
  LearningAimRow,
  InformationOption,
  WorkplaceInfo,
  SafeguardingContact,
} from './Dashboard.interface';

export const SAFEGUARDING_CONTACTS: SafeguardingContact[] = [
  {
    type: 'email',
    label: 'Email',
    value: 'info@primelearning.uk',
    href: 'mailto:info@primelearning.uk',
  },
  {
    type: 'phone',
    label: 'Phone',
    value: '+4409988423',
    href: 'tel:+4409988423',
  },
];

export const QUICK_ACCESS_ITEMS: Omit<QuickAccessItem, 'icon'>[] = [
  {
    id: 'activity',
    label: 'Activity',
    iconType: 'public',
  },
  {
    id: 'learning-evidence',
    label: 'Learning Activity Evidence',
    iconType: 'document',
  },
  {
    id: 'timesheet',
    label: 'Timesheet',
    iconType: 'calendar',
  },
  {
    id: 'visit',
    label: 'Visit',
    iconType: 'location',
  },
];

export const TAB_QUICK_ACCESS: Record<string, Omit<QuickAccessItem, 'icon'>[]> = {
  Activity: QUICK_ACCESS_ITEMS,
  Manage: [
    { id: 'download-portfolio', label: 'Download Portfolio', iconType: 'document' },
    { id: 'expert-witnesses', label: 'Expert / Witnesses', iconType: 'public' },
    { id: 'portfolio-showcase', label: 'Portfolio Showcase', iconType: 'document' },
  ],
  Progress: [
    { id: 'gap-analysis', label: 'Gap Analysis', iconType: 'document' },
    { id: 'learning-journey', label: 'Learning Journey', iconType: 'document' },
    { id: 'scorecard', label: 'Scorecard', iconType: 'document' },
    { id: 'progress-percent', label: 'Progress (0%)', iconType: 'public' },
  ],
  Forms: [
    { id: 'learner-feedback', label: 'Learner feedback from teach sessions', iconType: 'document' },
    { id: 'exit-review', label: 'Exit review and Programme Evaluation', iconType: 'document' },
    { id: 'learning-support', label: '5.Learning Support Form*', iconType: 'document' },
  ],
};

export const TRAINER_INFO: TrainerInfo = {
  id: 'trainer-1',
  name: 'Cris Curtis',
  title: 'Primary Trainer',
  status: 'online',
  avatar: 'https://via.placeholder.com/48',
};

export const TASKS_DUE: TaskDueItem[] = [
  {
    category: 'Immediately',
    count: 2,
    color: '#7B61FF',
    lightColor: '#E8E0FF',
  },
  {
    category: 'This week',
    count: 0,
    color: '#E8E8E8',
    lightColor: '#F5F5F5',
  },
  {
    category: 'Next week',
    count: 3,
    color: '#F5A623',
    lightColor: '#FEE8D1',
  },
  {
    category: 'In two weeks',
    count: 1,
    color: '#4CAF50',
    lightColor: '#E8F5E9',
  },
];

export const generateCalendarDays = (month: number, year: number): CalendarDay[] => {
  const days: CalendarDay[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // getDay() returns 0=Sun, we need Mon=0, so adjust
  const startDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDayOfWeek);

  const today = new Date();
  const eventDate = 27; // Green event date
  const highlightedDates = [24, 25, 26]; // Light green highlight

  // Determine if we need 5 or 6 rows
  const totalDaysNeeded = startDayOfWeek + lastDay.getDate();
  const rowCount = totalDaysNeeded <= 35 ? 5 : 6;
  const cellCount = rowCount * 7;

  for (let i = 0; i < cellCount; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const isCurrentMonth = currentDate.getMonth() === month;
    const isToday =
      isCurrentMonth &&
      currentDate.getDate() === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();

    const dateNum = currentDate.getDate();

    days.push({
      date: dateNum,
      isToday: isToday && isCurrentMonth,
      hasEvent: isCurrentMonth && dateNum === eventDate,
      isCurrentMonth,
      isHighlighted: isCurrentMonth && highlightedDates.includes(dateNum),
    });
  }

  return days;
};

export const INFO_CARDS: Omit<InfoCard, 'icon'>[] = [
  {
    id: 'plan-of-activity',
    title: 'Plan Of Activity/action',
    description: 'View pending and completed Plan Of Activity/action',
    iconType: 'lightbulb',
    stats: [
      {
        label: 'Pending',
        value: '01 / 03',
      },
    ],
  },
  {
    id: 'otj-training',
    title: "View the learner's Off-The-Job training record",
    description: 'Lorem Ipsum place holer text lore aus du vas ja re me',
    iconType: 'clipboard',
    stats: [
      {
        label: 'OTJ Total',
        value: '0 / 0',
      },
      {
        label: 'Status',
        value: '0%',
      },
    ],
  },
  {
    id: 'progress-reviews',
    title: 'Progress Reviews',
    description: 'View the learner\'s progress progress reviews.',
    iconType: 'barchart',
    stats: [
      {
        label: 'Next Set',
        value: '27/02/2025',
      },
    ],
  },
];

export const WORKPLACE_INFO: WorkplaceInfo = {
  workplace: 'Default Workplace',
  mentorName: 'Josseme',
  phone: '********',
  email: 'None',
};

export const LEARNING_AIMS: LearningAimRow[] = [
  {
    id: 'aim-1',
    name: 'Business Administrator Apprenticeship Standard',
    currentProgress: 0,
    targetProgress: 0,
  },
  {
    id: 'aim-2',
    name: 'Business Administrator Gateway to End Point',
    currentProgress: 0,
    targetProgress: 0,
  },
  {
    id: 'aim-3',
    name: 'NCFE Level 2 Functional Skills Qualification in English (September 2019)',
    currentProgress: 0,
    targetProgress: 0,
  },
  {
    id: 'aim-4',
    name: 'Business Administrator End Point Assessment',
    currentProgress: 0,
    targetProgress: 0,
  },
  {
    id: 'aim-5',
    name: 'NCFE Level 2 Functional Skills Qualification in Mathematics (September 2019)',
    currentProgress: 0,
    targetProgress: 0,
  },
];

export const INFORMATION_OPTIONS: InformationOption[] = [
  {
    id: 'learning-activities-1',
    label: 'Learning Activities',
    count: 2,
  },
  {
    id: 'unit-summaries',
    label: 'Unit Summaries',
    count: 7,
  },
  {
    id: 'learning-activities-2',
    label: 'Learning Activities',
    count: 0,
  },
  {
    id: 'progress-reviews',
    label: 'Progress Reviews',
    count: 0,
  },
  {
    id: 'cancellations',
    label: 'Cancellations',
    count: 0,
  },
  {
    id: 'expert-witnesses',
    label: 'Expert Witnesses & Witnesses',
    count: 0,
  },
];

export const getInitialDashboardState = (): DashboardState => {
  const now = new Date();
  return {
    quickAccessItems: QUICK_ACCESS_ITEMS,
    trainerInfo: TRAINER_INFO,
    tasksDue: TASKS_DUE,
    calendarDays: generateCalendarDays(now.getMonth(), now.getFullYear()),
    calendarMonth: now.getMonth(),
    calendarYear: now.getFullYear(),
    infoCards: INFO_CARDS,
    workplaceInfo: WORKPLACE_INFO,
    learningAims: LEARNING_AIMS,
    informationOptions: INFORMATION_OPTIONS,
    activeTab: 'Activity',
  };
};
