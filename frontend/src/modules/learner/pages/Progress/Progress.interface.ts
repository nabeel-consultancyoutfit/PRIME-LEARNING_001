/**
 * Progress module interfaces and types
 */

export interface UnitCard {
  id: string;
  title: string;
  actualProgress: number;
  unitProgress: number;
}

export interface ProgressState {
  overallProgress: number;
  units: UnitCard[];
  unitFilter: string;
  includePending: boolean;
  showDetailed: boolean;
}
