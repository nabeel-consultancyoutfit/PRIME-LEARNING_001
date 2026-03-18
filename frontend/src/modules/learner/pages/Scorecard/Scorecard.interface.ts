/**
 * Scorecard module interfaces and types
 */

export interface LearningGrowthData {
  month: string;
  value: number;
}

export interface ScorecardState {
  scorecards: any[];
  dateFromValue: string;
  dateRangeFilter: string;
  showUnitsFilter: boolean;
  learningGrowthData: LearningGrowthData[];
}
