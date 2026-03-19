/**
 * Trainer — Tasks Page
 * Pixel-perfect to Figma node 2095:158833
 * Reassign Task modal → Figma node 2096:159830
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Box, CircularProgress } from '@mui/material';
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
import { tasksService, Task } from '@/modules/trainer/services/tasks.service';

type TaskStatus = 'In Progress' | 'Complete' | 'Pending' | 'Overdue' | 'Rejected' | 'Approved';

interface TaskItem {
  id: string;
  dateSet: string;
  taskToLearner: string;
  dateDue: string;
  dateCompleted: string;
  status: TaskStatus;
  isWarning?: boolean;
  learnerName: string;
}

const ASSIGNEE_OPTIONS = [
  { id: 'trainer', label: 'Reassign to Trainer' },
  { id: 'learner', label: 'Reassign to Learner' },
];

function formatDateTime(dateStr: string | undefined): string {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

function mapTaskStatus(status: string): TaskStatus {
  switch (status) {
    case 'pending': return 'Pending';
    case 'in_progress': return 'In Progress';
    case 'complete':
    case 'submitted': return 'Complete';
    case 'approved': return 'Approved';
    case 'rejected': return 'Rejected';
    default: return 'Pending';
  }
}

function isOverdue(task: Task): boolean {
  if (!task.dueDate) return false;
  const due = new Date(task.dueDate);
  const now = new Date();
  return due < now && task.status !== 'approved' && task.status !== 'complete';
}

function mapTask(t: Task): TaskItem {
  const learner = (t.learnerId as any) ?? {};
  const userId = learner.userId ?? {};
  const first = userId.firstName ?? '';
  const last = userId.lastName ?? '';
  const learnerName = first ? `${first} ${last}`.trim() : 'Learner';
  const overdue = isOverdue(t);

  return {
    id: t._id,
    dateSet: formatDateTime(t.createdAt),
    taskToLearner: t.title,
    dateDue: formatDateTime(t.dueDate),
    dateCompleted: t.completedAt ? formatDateTime(t.completedAt) : '',
    status: overdue ? 'Overdue' : mapTaskStatus(t.status),
    isWarning: overdue,
    learnerName,
  };
}

const TrainerTasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [cohort] = useState('Show All');
  const [learner] = useState('Everyone');
  const [period] = useState('Show All');
  const [statusFilter] = useState('Pending task');

  const [reassignOpen, setReassignOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [assigneeId, setAssigneeId] = useState('trainer');
  const [comments, setComments] = useState('');

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await tasksService.getAll({ page: 1, pageSize: 100 });
      setTasks(data.map(mapTask));
    } catch {
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const visibleTasks = tasks.filter((t) => !hiddenIds.includes(t.id));
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
    handleModalClose();
  };

  const handleHide = (id: string) => {
    setHiddenIds((prev) => [...prev, id]);
  };

  return (
    <TrainerLayout pageTitle="Task">
      <PageContainer>
        <PageHeader>Tasks</PageHeader>

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

        <TableWrapper>
          <TableHeader>
            <TableHeaderCell>Date Set</TableHeaderCell>
            <TableHeaderCell>Task (click to open)</TableHeaderCell>
            <TableHeaderCell>Date Due</TableHeaderCell>
            <TableHeaderCell>Date Completed</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableHeader>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <CircularProgress size={28} sx={{ color: '#7B61FF' }} />
            </Box>
          ) : visibleTasks.length === 0 ? (
            <Box sx={{
              padding: '32px 24px',
              textAlign: 'center',
              fontSize: '13px',
              color: 'rgba(28,28,28,0.45)',
              fontFamily: "'Inter', sans-serif",
            }}>
              No tasks to display.
            </Box>
          ) : (
            visibleTasks.map((task) => (
              <TaskRow key={task.id}>
                <TaskCell>{task.dateSet}</TaskCell>
                {task.isWarning ? (
                  <TaskOverdueCell>{task.taskToLearner}</TaskOverdueCell>
                ) : (
                  <TaskLinkCell>{task.taskToLearner}</TaskLinkCell>
                )}
                <TaskCell>{task.dateDue}</TaskCell>
                <TaskCell>{task.dateCompleted || '—'}</TaskCell>
                <StatusBadge status={task.status as any}>{task.status}</StatusBadge>
                <ActionsCell>
                  <ReassignButton onClick={() => handleReassignClick(task)}>
                    Reassign task
                  </ReassignButton>
                  <HideButton onClick={() => handleHide(task.id)}>
                    Hide
                  </HideButton>
                </ActionsCell>
              </TaskRow>
            ))
          )}
        </TableWrapper>
      </PageContainer>

      {reassignOpen && selectedTask && (
        <ModalOverlay onClick={handleModalClose}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Reassign Task</ModalTitle>
              <ModalCloseBtn onClick={handleModalClose}>
                <Close sx={{ fontSize: '18px' }} />
              </ModalCloseBtn>
            </ModalHeader>
            <ModalBody>
              <ModalBanner>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <WarningAmberRounded sx={{ fontSize: '16px', color: '#D4A000', mt: '1px', flexShrink: 0 }} />
                  <Box>{selectedTask.taskToLearner}</Box>
                </Box>
              </ModalBanner>
              <ModalInfoText>
                You can reassign this task to the following user(s). If you need to reassign
                this task to a different user then you must contact your Centre Manager.
              </ModalInfoText>
              <Box>
                <ModalLabel>Reassign task to:</ModalLabel>
                <RadioRow>
                  {ASSIGNEE_OPTIONS.map((opt) => (
                    <RadioOption key={opt.id} onClick={() => setAssigneeId(opt.id)}>
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
