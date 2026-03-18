/**
 * Mock data for Learning Journals module
 */

import { JournalEntry } from './LearningJournals.interface';

export const MOCK_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    date: '24 Dec 2025',
    title: '',
    text: '',
    category: '',
    timeStarted: '',
    duration: '',
    activityTypes: [],
    reflection: 'Welcome back John! Click here to add a new journal!',
    isExpanded: false,
    privacy: 'Only me',
  },
  {
    id: '2',
    date: '24 Dec 2025',
    title: '',
    text: '',
    category: '',
    timeStarted: '',
    duration: '',
    activityTypes: [],
    reflection: '',
    isExpanded: true,
    privacy: 'Only me',
  },
  {
    id: '3',
    date: '27 Dec 2024',
    title: 'Development task 1',
    text: '',
    category: 'Competition',
    timeStarted: '10:22 AM',
    duration: '1280 minutes',
    activityTypes: ['On the job'],
    reflection: '',
    isExpanded: true,
    privacy: 'Only me',
    filesCount: 1,
    learningActivitiesCount: 1,
    criteriaCount: 1,
  },
];

export const JOURNAL_CATEGORIES = [
  'Development',
  'Learning',
  'Training',
  'Assessment',
  'Planning',
  'Review',
  'Other',
];

export const ACTIVITY_TYPES = ['Off the job', 'On the job'];
