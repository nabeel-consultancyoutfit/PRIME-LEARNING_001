/**
 * Task Detail Page — Pixel-perfect implementation of Figma 40000068-35569
 *
 * LAYOUT (left to right):
 *   [Learner Sidebar 212px] | [Main content flex-1]
 *
 * MAIN CONTENT (top to bottom):
 *   1. Breadcrumb bar
 *   2. Task Overview card  (gray header: badge + title + red warning badge + View Plan button)
 *   3. Details of Planned Assessment card  (form fields in a row)
 *   4. Secondary Methods card  (checkboxes)
 *   5. Assessment Criteria card  (blue links + purple skill tags)
 *   6. Bottom row: [Information & Options panel 280px] | [Evidence/content panel flex-1]
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';
import ViewPlanModal from './ViewPlanModal';
import { tasksService, Task } from '@/services/tasks/tasksService';
import {
  SECONDARY_METHOD_OPTIONS,
  PRIMARY_METHOD_OPTIONS,
} from './Tasks.data';
import { InfoTab } from './Tasks.interface';
import {
  DetailPage,
  Breadcrumbs,
  BreadcrumbBtn,
  BreadcrumbSep,
  BreadcrumbCurrent,
  Card,
  CardHeader,
  CardHeaderLeft,
  TaskBadge,
  PageTitle,
  WarningBadge,
  BlackBtn,
  OutlineBtn,
  CardBody,
  DetailsLabel,
  DetailsSubtitle,
  FieldRow,
  FieldBox,
  FieldLabel,
  FieldValue,
  FieldSelectEl,
  ResourceRow,
  ResourceIconBox,
  ResourceName,
  SubSectionTitle,
  CheckboxRow,
  CheckboxItem,
  CriteriaLayout,
  CriteriaList,
  CriteriaLink,
  TagsColumn,
  TagPurpleA,
  TagPurpleB,
  BottomRow,
  InfoPanel,
  InfoTabsList,
  InfoTabItem,
  InfoTabIconWrap,
  InfoTabLabel,
  InfoTabArrow,
  ContentPanel,
  EditorToolbar,
  ToolbarDivider,
  ToolbarBtn,
  FontSizeBtn,
  ColorDot,
  EditorBody,
  EditorTextArea,
  ActionRow,
} from './TaskDetail.style';

// ─── SVG icons ────────────────────────────────────────────────────────────────
const ChevronRight = ({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M6 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDown = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
    <path d="M7 1.5L12.5 11H1.5L7 1.5Z" stroke="#FF4747" strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="7" y1="5.5" x2="7" y2="8" stroke="#FF4747" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="7" cy="9.5" r="0.6" fill="#FF4747" />
  </svg>
);

const PaperclipIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M12.5 6.5l-5.5 5.5a3.5 3.5 0 01-4.95-4.95l5.5-5.5a2.33 2.33 0 013.3 3.3L5.35 10.35a1.17 1.17 0 01-1.65-1.65L8.5 3.9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Tab icons (change color based on active state)
const EvidenceIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="3" y="2" width="14" height="16" rx="2" stroke={active ? '#fff' : '#1C1C1C'} strokeWidth="1.4" />
    <path d="M6 7h8M6 10h8M6 13h5" stroke={active ? '#fff' : '#1C1C1C'} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const FeedbackIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="3" y="3" width="14" height="10" rx="2" stroke={active ? '#fff' : '#1C1C1C'} strokeWidth="1.4" />
    <path d="M6 16l2-2h9" stroke={active ? '#fff' : '#1C1C1C'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 7h6M7 10h4" stroke={active ? '#fff' : '#1C1C1C'} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const TimesheetIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7" stroke={active ? '#fff' : '#1C1C1C'} strokeWidth="1.4" />
    <path d="M10 6v4l3 2" stroke={active ? '#fff' : '#1C1C1C'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DeclarationIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 4h8l4 4v8H4V4z" stroke={active ? '#fff' : '#1C1C1C'} strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M12 4v4h4" stroke={active ? '#fff' : '#1C1C1C'} strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M7 10h6M7 13h4" stroke={active ? '#fff' : '#1C1C1C'} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ─── Tab definitions ──────────────────────────────────────────────────────────
const INFO_TABS: { key: InfoTab; label: string; Icon: React.FC<{ active: boolean }> }[] = [
  { key: 'evidence',     label: 'Evidence',                 Icon: EvidenceIcon },
  { key: 'feedback',    label: 'Feedback & Comments',      Icon: FeedbackIcon },
  { key: 'timesheet',   label: 'Timesheet',                Icon: TimesheetIcon },
  { key: 'declaration', label: 'Declaration & Signatures', Icon: DeclarationIcon },
];

// ─── Component ────────────────────────────────────────────────────────────────
interface Props {
  taskId: string;
}

const TaskDetail: React.FC<Props> = ({ taskId }) => {
  const router = useRouter();

  // ── Real API state ───────────────────────────────────────────────────────
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<InfoTab>('evidence');
  const [evidenceText, setEvidenceText] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [primaryMethod, setPrimaryMethod] = useState('Assignment');
  const [selectedSecondary, setSelectedSecondary] = useState<string[]>([]);
  const [viewPlanOpen, setViewPlanOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ── Fetch task from backend ──────────────────────────────────────────────
  const fetchTask = useCallback(async () => {
    if (!taskId) return;
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await tasksService.getById(taskId);
      setTask(data);
      setEvidenceText(data.evidence ?? '');
      setFeedbackText(data.feedbackComments ?? '');
      setPrimaryMethod(data.primaryMethod ?? 'Assignment');
      setSelectedSecondary(data.secondaryMethods ?? []);
    } catch (err: any) {
      setApiError(err?.message ?? 'Failed to load task');
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  useEffect(() => { fetchTask(); }, [fetchTask]);

  // ── Save handlers ────────────────────────────────────────────────────────
  const handleSaveEvidence = async () => {
    if (!task) return;
    setIsSaving(true);
    try {
      await tasksService.saveEvidence(task._id, evidenceText);
    } finally { setIsSaving(false); }
  };

  const handleSubmitTask = async () => {
    if (!task) return;
    setIsSaving(true);
    try {
      const updated = await tasksService.submit(task._id);
      setTask(updated);
    } finally { setIsSaving(false); }
  };

  if (isLoading) {
    return (
      <LearnerLayout pageTitle="Task Detail">
        <DetailPage>
          <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
            Loading task…
          </div>
        </DetailPage>
      </LearnerLayout>
    );
  }

  if (apiError || !task) {
    return (
      <LearnerLayout pageTitle="Task Detail">
        <DetailPage>
          <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
            {apiError ?? 'Task not found.'}
          </div>
        </DetailPage>
      </LearnerLayout>
    );
  }

  const initials = task.title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  const toggleSecondary = (m: string) =>
    setSelectedSecondary((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );

  const activeTabLabel = INFO_TABS.find((t) => t.key === activeTab)?.label ?? '';

  return (
    <LearnerLayout pageTitle={task.title}>
      <DetailPage>

        {/* 1. Breadcrumb */}
        <Breadcrumbs>
          <BreadcrumbBtn onClick={() => router.push('/learner-dashboard/dashboard')}>
            Dashboards
          </BreadcrumbBtn>
          <BreadcrumbSep>/</BreadcrumbSep>
          <BreadcrumbBtn onClick={() => router.push('/learner-dashboard/tasks')}>
            Tasks
          </BreadcrumbBtn>
          <BreadcrumbSep>/</BreadcrumbSep>
          <BreadcrumbCurrent>{task.title}</BreadcrumbCurrent>
        </Breadcrumbs>

        {/* 2. Task Overview card */}
        <Card>
          <CardHeader>
            <CardHeaderLeft>
              <TaskBadge>{initials}</TaskBadge>
              <PageTitle>{task.title}</PageTitle>
              {task.isTrainerAssigned && (
                <WarningBadge>
                  <WarningIcon />
                  This learning activity is assigned by your trainer so you can only send feedback and comments
                </WarningBadge>
              )}
            </CardHeaderLeft>
            <BlackBtn onClick={() => setViewPlanOpen(true)}>
              View Plan Of Activity/action <ArrowRight />
            </BlackBtn>
          </CardHeader>
        </Card>

        {/* 3. Details of Planned Assessment */}
        <Card>
          <CardHeader>
            <CardHeaderLeft>
              <div>
                <DetailsLabel>Details of Planned Assessment</DetailsLabel>
                <DetailsSubtitle>{task.subtitle}</DetailsSubtitle>
              </div>
            </CardHeaderLeft>
          </CardHeader>
          <CardBody>
            {/* Associated resources */}
            {task.associatedResources.length > 0 && (
              <div>
                <FieldLabel style={{ marginBottom: '8px' }}>Learning Resources:</FieldLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {task.associatedResources.map((r) => (
                    <ResourceRow key={r.name} href={r.url} target="_blank" rel="noopener noreferrer">
                      <ResourceIconBox>PDF</ResourceIconBox>
                      <ResourceName>{r.name}</ResourceName>
                    </ResourceRow>
                  ))}
                </div>
              </div>
            )}

            {/* Form fields row */}
            <FieldRow>
              {/* Title — flex grow */}
              <FieldBox sx={{ flex: 1, minWidth: '160px' }}>
                <FieldLabel>Title</FieldLabel>
                <FieldValue>{task.title}</FieldValue>
              </FieldBox>

              {/* Primary Method */}
              <FieldBox sx={{ width: '200px' }}>
                <FieldLabel>Primary Method:</FieldLabel>
                <FieldValue>
                  <FieldSelectEl
                    value={primaryMethod}
                    onChange={(e) => setPrimaryMethod(e.target.value)}
                  >
                    {PRIMARY_METHOD_OPTIONS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </FieldSelectEl>
                  <ChevronDown />
                </FieldValue>
              </FieldBox>

              {/* Date */}
              <FieldBox sx={{ width: '170px' }}>
                <FieldLabel>Date</FieldLabel>
                <FieldValue>
                  {task.date}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="rgba(28,28,28,0.35)" strokeWidth="1.2" />
                    <path d="M5 2v2M11 2v2" stroke="rgba(28,28,28,0.35)" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M2 7h12" stroke="rgba(28,28,28,0.35)" strokeWidth="1.2" />
                  </svg>
                </FieldValue>
              </FieldBox>

              {/* Reference */}
              <FieldBox sx={{ width: '120px' }}>
                <FieldLabel>Reference</FieldLabel>
                <FieldValue>{task.reference}</FieldValue>
              </FieldBox>

              {/* Date Due */}
              <FieldBox sx={{ width: '150px' }}>
                <FieldLabel>Date Due</FieldLabel>
                <FieldValue>{task.dateDue}</FieldValue>
              </FieldBox>

              {task.dateCompleted && (
                <FieldBox sx={{ width: '160px' }}>
                  <FieldLabel>Date Completed</FieldLabel>
                  <FieldValue>{task.dateCompleted}</FieldValue>
                </FieldBox>
              )}
            </FieldRow>
          </CardBody>
        </Card>

        {/* 4. Secondary Methods */}
        <Card>
          <CardBody>
            <SubSectionTitle>Secondary Methods</SubSectionTitle>
            <CheckboxRow>
              {SECONDARY_METHOD_OPTIONS.map((method) => (
                <CheckboxItem key={method}>
                  <input
                    type="checkbox"
                    checked={selectedSecondary.includes(method)}
                    onChange={() => toggleSecondary(method)}
                    style={{
                      accentColor: '#1C1C1C',
                      width: '16px',
                      height: '16px',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  />
                  {method}
                </CheckboxItem>
              ))}
            </CheckboxRow>
          </CardBody>
        </Card>

        {/* 5. Assessment Criteria */}
        {task.assessmentCriteria.length > 0 && (
          <Card>
            <CardBody>
              <SubSectionTitle>Assessment Criteria</SubSectionTitle>
              <CriteriaLayout>
                <CriteriaList>
                  {task.assessmentCriteria.map((c) => (
                    <CriteriaLink key={c.code} href="#">
                      {c.code} {c.label}
                    </CriteriaLink>
                  ))}
                </CriteriaList>
                {task.skillTags.length > 0 && (
                  <TagsColumn>
                    {task.skillTags.map((tag, i) =>
                      i % 2 === 0
                        ? <TagPurpleA key={tag}>{tag}</TagPurpleA>
                        : <TagPurpleB key={tag}>{tag}</TagPurpleB>
                    )}
                  </TagsColumn>
                )}
              </CriteriaLayout>
            </CardBody>
          </Card>
        )}

        {/* 6. Bottom row: [Information & Options] | [Active tab content] */}
        <BottomRow>

          {/* Left — Information & Options tabs */}
          <InfoPanel>
            <CardHeader>
              <SubSectionTitle>Information & Options</SubSectionTitle>
            </CardHeader>
            <InfoTabsList>
              {INFO_TABS.map(({ key, label, Icon }) => (
                <InfoTabItem
                  key={key}
                  active={activeTab === key}
                  onClick={() => setActiveTab(key)}
                >
                  <InfoTabIconWrap>
                    <Icon active={activeTab === key} />
                  </InfoTabIconWrap>
                  <InfoTabLabel>{label}</InfoTabLabel>
                  <InfoTabArrow>
                    <ChevronRight
                      size={14}
                      color={activeTab === key ? '#ffffff' : '#1C1C1C'}
                    />
                  </InfoTabArrow>
                </InfoTabItem>
              ))}
            </InfoTabsList>
          </InfoPanel>

          {/* Right — Active tab content */}
          <ContentPanel>

            {/* Content card header */}
            <CardHeader>
              <SubSectionTitle>{activeTabLabel}</SubSectionTitle>
            </CardHeader>

            {/* Evidence */}
            {activeTab === 'evidence' && (
              <>
                <EditorToolbar>
                  <FontSizeBtn>14 <ChevronDown /></FontSizeBtn>
                  <ToolbarDivider />
                  <ColorDot style={{ margin: '0 8px' }} />
                  <ToolbarDivider />
                  <ToolbarBtn title="Bold"><b>B</b></ToolbarBtn>
                  <ToolbarBtn title="Italic"><i>I</i></ToolbarBtn>
                  <ToolbarBtn title="Underline"><u>U</u></ToolbarBtn>
                  <ToolbarBtn title="Strikethrough" style={{ textDecoration: 'line-through' }}>S</ToolbarBtn>
                  <ToolbarDivider />
                  <ToolbarBtn title="Bullet list">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="2" cy="3.5" r="1.2" fill="currentColor" />
                      <circle cx="2" cy="7" r="1.2" fill="currentColor" />
                      <circle cx="2" cy="10.5" r="1.2" fill="currentColor" />
                      <path d="M5 3.5h7M5 7h7M5 10.5h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </ToolbarBtn>
                  <ToolbarDivider />
                  <ToolbarBtn title="Align">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 3h12M1 7h8M1 11h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </ToolbarBtn>
                  <ToolbarBtn title="Link">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5.5 8.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5l-1 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M8.5 5.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </ToolbarBtn>
                  <ToolbarBtn title="Quote">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 4h3v4H2l2 3M8 4h3v4H8l2 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </ToolbarBtn>
                </EditorToolbar>

                <EditorBody>
                  <EditorTextArea
                    placeholder="Write here"
                    value={evidenceText}
                    onChange={(e) => setEvidenceText(e.target.value)}
                  />
                  <ActionRow>
                    <BlackBtn><PaperclipIcon /> Add Attachments</BlackBtn>
                    <BlackBtn>Save &amp; Quit</BlackBtn>
                    <BlackBtn>Save</BlackBtn>
                    <OutlineBtn>Cancel</OutlineBtn>
                  </ActionRow>
                </EditorBody>
              </>
            )}

            {/* Feedback & Comments */}
            {activeTab === 'feedback' && (
              <EditorBody>
                {task.feedbackComments ? (
                  <div style={{
                    backgroundColor: 'rgba(28,28,28,0.04)',
                    border: '1px solid rgba(28,28,28,0.1)',
                    borderRadius: '8px',
                    padding: '14px 18px',
                    fontSize: '14px',
                    color: '#1C1C1C',
                    lineHeight: '20px',
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {task.feedbackComments}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: 'rgba(28,28,28,0.35)', fontSize: '14px', padding: '24px 0', fontFamily: "'Inter', sans-serif" }}>
                    No feedback or comments yet.
                  </div>
                )}
                <EditorTextArea
                  placeholder="Write here"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  style={{ minHeight: '100px' }}
                />
                <ActionRow>
                  <BlackBtn>Save &amp; Quit</BlackBtn>
                  <BlackBtn>Save</BlackBtn>
                  <OutlineBtn>Cancel</OutlineBtn>
                </ActionRow>
              </EditorBody>
            )}

            {/* Timesheet */}
            {activeTab === 'timesheet' && (
              <EditorBody>
                <div style={{ textAlign: 'center', color: 'rgba(28,28,28,0.35)', fontSize: '14px', padding: '40px 0', fontFamily: "'Inter', sans-serif" }}>
                  No timesheet entries recorded for this task.
                </div>
                <ActionRow>
                  <BlackBtn>Add Timesheet Entry</BlackBtn>
                </ActionRow>
              </EditorBody>
            )}

            {/* Declaration & Signatures */}
            {activeTab === 'declaration' && (
              <EditorBody>
                <div style={{ textAlign: 'center', color: 'rgba(28,28,28,0.35)', fontSize: '14px', padding: '40px 0', fontFamily: "'Inter', sans-serif" }}>
                  No declarations or signatures required at this time.
                </div>
                <ActionRow>
                  <BlackBtn>Sign Declaration</BlackBtn>
                </ActionRow>
              </EditorBody>
            )}

          </ContentPanel>
        </BottomRow>

      </DetailPage>

      {/* View Plan of Activity modal */}
      <ViewPlanModal
        open={viewPlanOpen}
        onClose={() => setViewPlanOpen(false)}
        taskTitle={task.title}
      />

    </LearnerLayout>
  );
};

export default TaskDetail;
