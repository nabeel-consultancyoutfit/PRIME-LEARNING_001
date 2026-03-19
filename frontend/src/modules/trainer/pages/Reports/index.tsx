/**
 * Trainer — Reports Landing Page
 * Figma node: 2097:161465
 * Row 1: 4 cards | Row 2: 3 cards | Row 3: 3 cards
 */

import React from 'react';
import { useRouter } from 'next/router';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import {
  PageContainer,
  CardsRow,
  ReportCard,
  CardIconBox,
  CardLabel,
} from './Reports.style';

/* ─── Bar-chart icon matching Figma ──────────────────────── */
const BarIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="1"  y="12" width="3.5" height="9"  rx="1" fill="#9291A5" />
    <rect x="6"  y="7"  width="3.5" height="14" rx="1" fill="#9291A5" />
    <rect x="11" y="3"  width="3.5" height="18" rx="1" fill="#9291A5" />
    <rect x="16" y="9"  width="3.5" height="12" rx="1" fill="#9291A5" />
  </svg>
);

/* ─── Report cards — 3 rows ───────────────────────────────── */
const ROW1 = [
  { id: 'tasks-due',               label: 'Tasks Due',                        route: '/trainer-dashboard/tasks' },
  { id: 'learners-on-target',      label: 'Learners on Target',               route: '/trainer-dashboard/reports/learners-on-target' },
  { id: 'learners-last-logged-in', label: 'Learners Last Logged In',          route: '/trainer-dashboard/reports/learners-last-logged-in' },
  { id: 'progress-reviews-due',    label: 'Progress Reviews Due',             route: '/trainer-dashboard/reports/progress-reviews-due' },
];
const ROW2 = [
  { id: 'due-to-complete',         label: 'Due to Complete next 90 days',     route: '/trainer-dashboard/reports/due-to-complete' },
  { id: 'completed-visits',        label: 'Completed Visits in Last 30 Days', route: '/trainer-dashboard/reports/completed-visits' },
  { id: 'iqa-actions',             label: 'IQA Actions',                      route: '/trainer-dashboard/reports/iqa-actions' },
];
const ROW3 = [
  { id: 'planned-visits',          label: 'Planned visit in next 30 Days',    route: '/trainer-dashboard/reports/planned-visits' },
  { id: 'learners-on-target-otj',  label: 'Learners on Target (Off-The-Job)', route: '/trainer-dashboard/reports/learners-on-target-otj' },
  { id: 'no-otj-activity',         label: 'No Off-The-Job Activity',          route: '/trainer-dashboard/reports/no-otj-activity' },
];

const Card: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <ReportCard onClick={onClick}>
    <CardIconBox><BarIcon /></CardIconBox>
    <CardLabel>{label}</CardLabel>
  </ReportCard>
);

/* ─── Component ───────────────────────────────────────────── */
const TrainerReports: React.FC = () => {
  const router = useRouter();

  return (
    <TrainerLayout pageTitle="Reports">
      <PageContainer>
        <CardsRow>
          {ROW1.map((c) => <Card key={c.id} label={c.label} onClick={() => router.push(c.route)} />)}
        </CardsRow>
        <CardsRow>
          {ROW2.map((c) => <Card key={c.id} label={c.label} onClick={() => router.push(c.route)} />)}
        </CardsRow>
        <CardsRow>
          {ROW3.map((c) => <Card key={c.id} label={c.label} onClick={() => router.push(c.route)} />)}
        </CardsRow>
      </PageContainer>
    </TrainerLayout>
  );
};

export default TrainerReports;
