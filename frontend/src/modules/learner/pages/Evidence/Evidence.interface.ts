/**
 * Evidence module interfaces and types
 */

export interface EvidenceRow {
  id: string;
  date: string;
  ref: string;
  title: string;
  method: string;
  trainerTime: number;
  learnerTime: number;
  planOfActivity: string;
  actionRequiredBy: string;
  addToShowcase: boolean;
}

export interface EvidenceState {
  evidenceItems: EvidenceRow[];
  filterShow: string;
}
