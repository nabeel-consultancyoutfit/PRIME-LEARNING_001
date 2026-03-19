/**
 * Dashboard Page Component
 * Wraps LearnerDashboardContent in LearnerLayout for the learner-facing route
 */

import React from 'react';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import LearnerDashboardContent from './LearnerDashboardContent';

const Dashboard: React.FC = () => (
  <LearnerLayout pageTitle="Dashboard">
    <LearnerDashboardContent />
  </LearnerLayout>
);

export default Dashboard;
