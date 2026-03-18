/**
 * Trainer — Tasks Page (Figma-accurate)
 * Table: Date Set | Task To Learner | Date Due | Date Completed | Status | Action
 */

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import {
  PageContainer,
  PageHeader,
  FiltersBar,
  FilterLabel,
  FilterSelect,
  PendingBadge,
  TableWrapper,
  TableHeader,
  TableHeaderCell,
  TaskRow,
  TaskCell,
  TaskLinkCell,
  TaskOverdueCell,
  StatusBadge,
  ReassignButton,
  HideButton,
  ActionsCell,
} from './Tasks.style';
import { COLORS, TYPOGRAPHY } from '@/modules/trainer/theme/tokens';

type TaskStatus = 'In Progress' | 'Complete' | 'Pending' | 'Overdue' | 'Finished';

interface TaskItem {
  id: number;
  dateSet: string;
  taskToLearner: string;
  dateDue: string;
  dateCompleted: string;
  status: TaskStatus;
  isWarning?: boolean;
}

const MOCK_TASKS: TaskItem[] = [
  {
    id: 1,
    dateSet: '19/12/2024 01:59',
    taskToLearner: 'Complete your new learning activity Q1: learning.acc',
    dateDue: '15/02/2025 00:05',
    dateCompleted: '',
    status: 'In Progress',
  },
  {
    id: 2,
    dateSet: '19/12/2024 01:59',
    taskToLearner: 'Please sign your recently prepared Plan Of Activity/action by Rob Boulton',
    dateDue: '19/12/2025 00:06',
    dateCompleted: '13/02/2022 06:13',
    status: 'Complete',
  },
  {
    id: 3,
    dateSet: '19/12/2024 01:59',
    taskToLearner: 'Complete your new learning activity 21-learning.acc',
    dateDue: '15/12/2025 00:06',
    dateCompleted: '',
    status: 'Pending',
  },
  {
    id: 4,
    dateSet: '19/12/2024 01:59',
    taskToLearner: 'You have not submitted an Off-The-Job activity. Please, if you have removed your completion details',
    dateDue: '15/12/2025 00:06',
    dateCompleted: '',
    status: 'Overdue',
    isWarning: true,
  },
  {
    id: 5,
    dateSet: '19/12/2024 01:59',
    taskToLearner: 'Complete your new learning activity Q1: learning.acc',
    dateDue: '15/12/2025 00:06',
    dateCompleted: '',
    status: 'Finished',
  },
];

const TrainerTasks: React.FC = () => {
  const [cohort, setCohort] = useState('Show All');
  const [learner, setLearner] = useState('Everyone');
  const [period, setPeriod] = useState('Show All');
  const [statusFilter, setStatusFilter] = useState('Pending task');

  const pendingCount = MOCK_TASKS.filter((t) => t.status === 'Pending' || t.status === 'In Progress').length;

  return (
    <TrainerLayout pageTitle="Task">
      <PageContainer>
        {/* Page heading */}
        <PageHeader>Tasks</PageHeader>

        {/* Filters bar */}
        <FiltersBar>
          <FilterLabel>Cohort:</FilterLabel>
          <FilterSelect>
            {cohort}
            <KeyboardArrowDown />
          </FilterSelect>

          <FilterLabel>Learner:</FilterLabel>
          <FilterSelect>
            {learner}
            <KeyboardArrowDown />
          </FilterSelect>

          <FilterLabel>Period:</FilterLabel>
          <FilterSelect>
            {period}
            <KeyboardArrowDown />
          </FilterSelect>

          <FilterLabel>Status:</FilterLabel>
          <FilterSelect>
            {statusFilter}
            <KeyboardArrowDown />
          </FilterSelect>

          <PendingBadge>
            There are {pendingCount} pending tasks!
          </PendingBadge>
        </FiltersBar>

        {/* Table */}
        <TableWrapper>
          <TableHeader>
            <TableHeaderCell>Date Set</TableHeaderCell>
            <TableHeaderCell>Task (click to open)</TableHeaderCell>
            <TableHeaderCell>Date Due</TableHeaderCell>
            <TableHeaderCell>Date Completed</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableHeader>

          {MOCK_TASKS.map((task) => (
            <TaskRow key={task.id}>
              <TaskCell>{task.dateSet}</TaskCell>

              {task.isWarning ? (
                <TaskOverdueCell>{task.taskToLearner}</TaskOverdueCell>
              ) : (
                <TaskLinkCell>{task.taskToLearner}</TaskLinkCell>
              )}

              <TaskCell>{task.dateDue}</TaskCell>
              <TaskCell>{task.dateCompleted || '—'}</TaskCell>

              <StatusBadge status={task.status}>{task.status}</StatusBadge>

              <ActionsCell>
                <ReassignButton>Reassign task</ReassignButton>
                <HideButton>Hide</HideButton>
              </ActionsCell>
            </TaskRow>
          ))}
        </TableWrapper>
      </PageContainer>
    </TrainerLayout>
  );
};

export default TrainerTasks;
