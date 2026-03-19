/**
 * Trainer — My Profile page
 * Uses the shared ProfilePage component with TrainerLayout.
 */
import React from 'react';
import ProfilePage from '@/components/ProfilePage';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';

const TrainerProfile: React.FC = () => {
  return <ProfilePage layout={TrainerLayout} />;
};

export default TrainerProfile;
