/**
 * Help Centre Page Component
 * Placeholder for help centre content
 */

import React from 'react';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { useHelpCentre } from './useHelpCentre';
import { HelpCentreContainer, HelpTitle, HelpText } from './HelpCentre.style';

const HelpCentre: React.FC = () => {
  useHelpCentre();

  return (
    <LearnerLayout pageTitle="Help Centre">
      <HelpCentreContainer>
        <HelpTitle>Help Centre</HelpTitle>
        <HelpText>Help centre content coming soon.</HelpText>
      </HelpCentreContainer>
    </LearnerLayout>
  );
};

export default HelpCentre;
