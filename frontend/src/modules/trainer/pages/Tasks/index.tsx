/**
 * Trainer — Tasks Page
 * Pixel-perfect to Figma node 2095:158833
 * Reassign Task modal → Figma node 2096:159830
 *
 * Flow: click "Reassign task" button → opens ReassignTask modal overlay
 */

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { KeyboardArrowDown, Close, WarningAmberRounded } from '@mui/icons-material';
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
  // Modal
  ModalOverlay,
  ModalCard,
  ModalHeader,
  ModalTitle,
  ModalCloseBtn,
  ModalBody,
  ModalBanner,
  ModalInfoText,
  ModalLabel,
  RadioRow,
  RadioOption,
  ModalTextarea,
  ModalFooter,
  ModalCancelBtn,
  ModalConfirmBtn,
} from './Tasks.style';

type TaskStatus = 'In Progress' | 'Complete' | 'Pending' | 'Overdue' | 'Rejected';

interface TaskItem {
  id: number;
  dateSet: string;
  taskToLearner: string;
  dateDue: string;
  dateCompleted: string;
  status: TaskStatus;
  isWarning?: boolean;
  learnerName: string;
}

const MOCK_TASKS: TaskItem[] = [
  {
    id: 1,
    dateSet: '19/12/2024 01:59',
    taskToLearner: 'Complete your new learning activity Q1: learning acc',
    dateDue: '13/02/2025 00:00',
    dateCompleted: '',
    status: 'In Progress',
    learnerName: 'John Doe',
  },
  {
    id: 2,
    dateSet: '19/12/2024 01:59',
    taskToLearner: 'Please sign your recently prepared Plan Of Activity/action by Rob Bastow',
    dateDue: '13/02/2025 00:00',
    dateCompleted: '13/03/2025 00:00',
    status: 'Complete',
    learnerName: 'John Doe',
  },
  {
    id: 3,
    dateSet: '19/12/2024 01:59',
    taskToLearner: 'Complete your new learning activity Q1: learning acc',
    dateDue: '13/02/2025 00:00',
    dateCompleted: '',
    status: 'Pending',
    learnerName: 'John Doe',
  },
  {
    id: 4,
    dateSet: '19/12/2024 01:59',
    taskToLearner:
      'You have not recorded any Off-The-Job activity recently. Please record your completed activity.',
    dateDue: '13/02/2025 00:00',
    dateCompleted: '',
    status: 'Overdue',
    isWarning: true,
    learnerName: 'John Doe',
  },
  {
    id: 5,
    dateSet: '19/12/2024 01:59',
    taskToLearner: 'Complete your new learning activity Q1: learning acc',
    dateDue: '13/02/2025 00:00',
    dateCompleted: '',
    status: 'Rejected',
    learnerName: 'John Doe',
  },
];

// Reassign modal assignee options (Figma)
const ASSIGNEE_OPTIONS = [
  { id: 'trainer', label: 'Bastow, Rob (Trainer)' },
  { id: 'learner', label: 'Rakker Hassan (Learner)' },
];

const TrainerTasks: React.FC = () => {
  // ── Filter state ────────────────────────────────────────────────────────────
  const [cohort] = useState('Show All');
  const [learner] = useState('Everyone');
  const [period] = useState('Show All');
  const [statusFilter] = useState('Pending task');
  const [hiddenIds, setHiddenIds] = useState<number[]>([]);

  // ── Reassign modal state ────────────────────────────────────────────────────
  const [reassignOpen, setReassignOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [assigneeId, setAssigneeId] = useState('trainer');
  const [comments, setComments] = useState('');

  const visibleTasks = MOCK_TASKS.filter((t) => !hiddenIds.includes(t.id));
  const pendingCount = visibleTasks.filter(
    (t) => t.status === 'Pending' || t.status === 'In Progress'
  ).length;

  const handleReassignClick = (task: TaskItem) => {
    setSelectedTask(task);
    setAssigneeId('trainer');
    setComments('');
    setReassignOpen(true);
  };

  const handleModalClose = () => {
    setReassignOpen(false);
    setSelectedTask(null);
  };

  const handleReassignSubmit = () => {
    // In a real app: call API to reassign
    handleModalClose();
  };

  const handleHide = (id: number) => {
    setHiddenIds((prev) => [...prev, id]);
  };

  return (
    <TrainerLayout pageTitle="Task">
      <PageContainer>

        {/* ── Page heading ── */}
        <PageHeader>Tasks</PageHeader>

        {/* ── Filters bar ── */}
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

        {/* ── Table ── */}
        <TableWrapper>
          <TableHeader>
            <TableHeaderCell>Date Set</TableHeaderCell>
            <TableHeaderCell>Task (click to open)</TableHeaderCell>
            <TableHeaderCell>Date Due</TableHeaderCell>
            <TableHeaderCell>Date Completed</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableHeader>

          {visibleTasks.map((task) => (
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
                <ReassignButton onClick={() => handleReassignClick(task)}>
                  Reassign task
                </ReassignButton>
                <HideButton onClick={() => handleHide(task.id)}>
                  Hide
                </HideButton>
              </ActionsCell>
            </TaskRow>
          ))}

          {visibleTasks.length === 0 && (
            <Box sx={{
              padding: '32px 24px',
              textAlign: 'center',
              fontSize: '13px',
              color: 'rgba(28,28,28,0.45)',
              fontFamily: "'Inter', sans-serif",
            }}>
              No tasks to display.
            </Box>
          )}
        </TableWrapper>
      </PageContainer>

      {/* ─────────────────────────────────────────────────────────────────────
          Reassign Task Modal  (Figma node 2096:159830)
          Opens when trainer clicks "Reassign task" on any row
      ───────────────────────────────────────────────────────────────────── */}
      {reassignOpen && selectedTask && (
        <ModalOverlay onClick={handleModalClose}>
          {/* Stop click propagation so clicking inside modal doesn't close it */}
          <ModalCard onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <ModalHeader>
              <ModalTitle>Reassign Task</ModalTitle>
              <ModalCloseBtn onClick={handleModalClose}>
                <Close sx={{ fontSize: '18px' }} />
              </ModalCloseBtn>
            </ModalHeader>

            {/* Body */}
            <ModalBody>

              {/* Yellow info banner — shows task content */}
              <ModalBanner>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <WarningAmberRounded sx={{ fontSize: '16px', color: '#D4A000', mt: '1px', flexShrink: 0 }} />
                  <Box>
                    {selectedTask.taskToLearner}
                  </Box>
                </Box>
              </ModalBanner>

              {/* Explanatory text */}
              <ModalInfoText>
                You can reassign this task to the following user(s). If you need to reassign
                this task to a different user then you must contact your Centre Manager.
              </ModalInfoText>

              {/* Radio options */}
              <Box>
                <ModalLabel>Reassign task to:</ModalLabel>
                <RadioRow>
                  {ASSIGNEE_OPTIONS.map((opt) => (
                    <RadioOption
                      key={opt.id}
                      onClick={() => setAssigneeId(opt.id)}
                    >
                      {/* Custom radio circle */}
                      <Box sx={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: assigneeId === opt.id
                          ? '5px solid #1C1C1C'
                          : '1.5px solid rgba(28,28,28,0.35)',
                        flexShrink: 0,
                        transition: 'border 0.12s',
                      }} />
                      {opt.label}
                    </RadioOption>
                  ))}
                </RadioRow>
              </Box>

              {/* Optional comments */}
              <Box>
                <ModalLabel sx={{ mb: '6px', fontWeight: 400, color: 'rgba(28,28,28,0.7)' }}>
                  Add additional comments or instructions to recipient (optional):
                </ModalLabel>
                <ModalTextarea
                  value={comments}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComments(e.target.value)}
                  placeholder=""
                />
              </Box>
            </ModalBody>

            {/* Footer */}
            <ModalFooter>
              <ModalCancelBtn onClick={handleModalClose}>Cancel</ModalCancelBtn>
              <ModalConfirmBtn onClick={handleReassignSubmit}>Reassign Task</ModalConfirmBtn>
            </ModalFooter>

          </ModalCard>
        </ModalOverlay>
      )}
    </TrainerLayout>
  );
};

export default TrainerTasks;
