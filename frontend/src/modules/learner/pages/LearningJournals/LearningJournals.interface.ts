/**
 * Learning Journals module interfaces and types
 */

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  text: string;
  category: string;
  timeStarted: string;
  duration: string;
  activityTypes: string[];
  reflection: string;
  isExpanded: boolean;
  privacy?: string;
  filesCount?: number;
  learningActivitiesCount?: number;
  criteriaCount?: number;
}

export interface LearningJournalsState {
  entries: JournalEntry[];
  showTimesheet: boolean;
}

export interface JournalFormData {
  title: string;
  text: string;
  category: string;
  date: string;
  timeStarted: string;
  duration: string;
  activityTypes: string[];
  reflection: string;
}
