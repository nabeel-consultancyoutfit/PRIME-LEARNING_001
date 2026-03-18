/**
 * Mock data for Evidence module
 */

import { EvidenceRow } from './Evidence.interface';

export const MOCK_EVIDENCE: EvidenceRow[] = [
  {
    id: '1',
    date: '03/01/2025',
    ref: 'PRJ1',
    title: 'UI UX Design for onefile',
    method: 'Assignment',
    trainerTime: 0,
    learnerTime: 60,
    planOfActivity: 'None',
    actionRequiredBy: 'Learner',
    addToShowcase: false,
  },
  {
    id: '2',
    date: '05/01/2025',
    ref: 'PRJ2',
    title: 'Mobile App Development',
    method: 'Project',
    trainerTime: 120,
    learnerTime: 180,
    planOfActivity: 'Mobile First Design',
    actionRequiredBy: 'Trainer',
    addToShowcase: true,
  },
  {
    id: '3',
    date: '08/01/2025',
    ref: 'PRJ3',
    title: 'Database Architecture Planning',
    method: 'Workshop',
    trainerTime: 90,
    learnerTime: 45,
    planOfActivity: 'Database Design Standard',
    actionRequiredBy: 'Learner',
    addToShowcase: false,
  },
  {
    id: '4',
    date: '12/01/2025',
    ref: 'PRJ4',
    title: 'API Integration Documentation',
    method: 'Assignment',
    trainerTime: 60,
    learnerTime: 120,
    planOfActivity: 'Integration Standards',
    actionRequiredBy: 'Trainer',
    addToShowcase: true,
  },
  {
    id: '5',
    date: '15/01/2025',
    ref: 'PRJ5',
    title: 'System Testing and QA',
    method: 'Assessment',
    trainerTime: 150,
    learnerTime: 200,
    planOfActivity: 'QA Procedures',
    actionRequiredBy: 'Learner',
    addToShowcase: false,
  },
];

export const FILTER_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'all', label: 'All' },
];
