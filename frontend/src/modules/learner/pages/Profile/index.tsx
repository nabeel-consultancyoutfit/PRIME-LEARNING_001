/**
 * Learner — My Profile page
 * Uses the shared ProfilePage component with LearnerLayout.
 */
import React from 'react';
import ProfilePage from '@/components/ProfilePage';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

const Profile: React.FC = () => {
  return <ProfilePage layout={LearnerLayout} />;
};

export default Profile;
