/**
 * Tasks Page Component
 * Displays learner tasks with filtering and status tracking
 */

import React from 'react';
import { TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import { useTasks } from './useTasks';
import { FILTER_OPTIONS, PENDING_TASKS_COUNT } from './Tasks.data';
import {
  TasksContainer,
  TasksHeader,
  TasksTitle,
  NotificationBadge,
  FilterBar,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  TasksCard,
  StyledTable,
  StatusCell,
  ActionButton,
  getStatusColor,
} from './Tasks.style';

const Tasks: React.FC = () => {
  const { state, setPeriodFilter, setStatusFilter, handleMoreDetails } = useTasks();

  return (
    <LearnerLayout pageTitle="Tasks">
      <TasksContainer>
        {/* Header with title and notification */}
        <TasksHeader>
          <TasksTitle>Tasks</TasksTitle>
          <NotificationBadge>There are {PENDING_TASKS_COUNT} pending tasks!</NotificationBadge>
        </TasksHeader>

        {/* Filter Bar */}
        <FilterBar>
          <FilterGroup>
            <FilterLabel>Period:</FilterLabel>
            <FilterSelect value={state.periodFilter} onChange={(e) => setPeriodFilter(e.target.value)}>
              {FILTER_OPTIONS.periods.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Status:</FilterLabel>
            <FilterSelect value={state.statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              {FILTER_OPTIONS.statuses.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>
        </FilterBar>

        {/* Tasks Table */}
        <TasksCard>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell>Date Set</TableCell>
                <TableCell>Task Description</TableCell>
                <TableCell>Date Due</TableCell>
                <TableCell>Date Completed</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.dateSet}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.dateDue}</TableCell>
                  <TableCell>{task.dateCompleted || '—'}</TableCell>
                  <TableCell>
                    <StatusCell sx={{ color: getStatusColor(task.status) }}>
                      {task.status}
                    </StatusCell>
                  </TableCell>
                  <TableCell align="center">
                    <ActionButton onClick={() => handleMoreDetails(task.id)}>
                      More Details
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TasksCard>
      </TasksContainer>
    </LearnerLayout>
  );
};

export default Tasks;
