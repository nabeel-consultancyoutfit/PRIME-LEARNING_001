/**
 * Hook for Help Centre page state management
 */

import { useState } from 'react';
import { HelpCentreState } from './HelpCentre.interface';

const initialState: HelpCentreState = {};

export const useHelpCentre = () => {
  const [state] = useState<HelpCentreState>(initialState);

  return {
    state,
  };
};
