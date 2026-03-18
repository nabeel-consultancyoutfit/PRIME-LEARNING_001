/**
 * Information & Options Modals
 * Pixel-perfect to Figma nodes:
 *   Plan Of Activity/action  – 40000068:34434
 *   Unit Summaries           – 40000068:34587
 *   Learning Activities      – 40000068:34546
 *   Progress Reviews         – 40000068:34459
 *   Cancellations            – 40000068:34482
 *   Expert Witnesses         – 40000068:34523
 */
import React from 'react';
import { Box, Typography, Modal, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/* ─────────────────────────── Shared shell ─────────────────────────── */

const Backdrop = styled(Box)({
  position: 'fixed', inset: 0,
  backgroundColor: 'rgba(0,0,0,0.35)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 1300, padding: '24px',
});

const ModalCard = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '12px',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '900px',
  maxHeight: '80vh',
  overflowY: 'auto',
  boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
});

const ModalHeader = styled(Box)({
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  backgroundColor: 'rgba(28,28,28,0.05)',
  padding: '16px 24px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
  position: 'sticky', top: 0, zIndex: 1,
});

const ModalTitle = styled(Typography)({
  fontSize: '16px', fontWeight: 700, color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

const CloseBtn = styled(Box)({
  width: '28px', height: '28px', borderRadius: '50%',
  border: '2px solid #1C1C1C',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.06)' },
});

const ModalBody = styled(Box)({ padding: '0 0 8px' });

/* ─── Generic table primitives ─── */

const Table = styled(Box)({ width: '100%' });

const THead = styled(Box)({
  display: 'grid', padding: '10px 24px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
});

const TBody = styled(Box)({});

const TRow = styled(Box)({
  display: 'grid', padding: '14px 24px', alignItems: 'center',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  '&:last-child': { borderBottom: 'none' },
});

const TH = styled(Typography)({
  fontSize: '12px', fontWeight: 600, color: 'rgba(28,28,28,0.45)',
  fontFamily: "'Inter', sans-serif",
});

const TD = styled(Typography)({
  fontSize: '13px', color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

const BlueLink = styled(Typography)({
  fontSize: '13px', color: '#0057FF', fontFamily: "'Inter', sans-serif",
  textDecoration: 'underline', cursor: 'pointer',
  '&:hover': { color: '#003BBB' },
});

const ViewDetailsBtn = styled(Box)({
  backgroundColor: '#1C1C1C', color: '#fff',
  borderRadius: '20px', padding: '5px 16px',
  fontSize: '12px', fontWeight: 600, fontFamily: "'Inter', sans-serif",
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});

const SectionLabel = styled(Typography)({
  fontSize: '13px', fontWeight: 700, color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

/* ─────────────────────── 1. Plan Of Activity/action ─────────────────────── */

const PlanModal: React.FC = () => (
  <Table>
    <THead sx={{ gridTemplateColumns: '2fr 1.2fr 0.8fr 1fr 1.2fr 1.4fr' }}>
      <TH>Plan Of Activity/action</TH>
      <TH>Related Tasks</TH>
      <TH>Date</TH>
      <TH>Next Visit Date</TH>
      <TH>Future Planned Tasks</TH>
      <TH>Plan Of Activity/action Locked By</TH>
    </THead>
    <TBody>
      <TRow sx={{ gridTemplateColumns: '2fr 1.2fr 0.8fr 1fr 1.2fr 1.4fr' }}>
        <BlueLink>Plan Of Activity/action - Mon 10/02/2025</BlueLink>
        <BlueLink>FSE1 (Trainer)</BlueLink>
        <TD>03/01/2025</TD>
        <TD>03/02/2025</TD>
        <TD>0</TD>
        <TD>Internal Quality Assurer</TD>
      </TRow>
    </TBody>
  </Table>
);

/* ─────────────────────── 2. Unit Summaries ─────────────────────── */

const unitSummaryGroups = [
  {
    groupTitle: 'Business Administrator Gateway to End Point',
    rows: [
      { name: 'Unit 01 - Gateway to End Point Assessment', progress: '0%', actionBy: 'Learner/Trainer' },
      { name: '1 - Mock Knowledge Test',                  progress: '0%', actionBy: 'Learner/Trainer' },
      { name: '2 - Portfolio Based Mock Interview',       progress: '0%', actionBy: 'Learner/Trainer' },
    ],
  },
  {
    groupTitle: '~ Business Administrator End Point Assessment',
    rows: [
      { name: 'Unit 01 - End Point Assessment',           progress: '0%', actionBy: 'Learner/Trainer' },
      { name: '1 - Knowledge Test',                       progress: '0%', actionBy: 'Learner/Trainer' },
      { name: '2 - Project/Improvement Presentation',     progress: '0%', actionBy: 'Learner/Trainer' },
    ],
  },
];

const UnitSummariesModal: React.FC = () => (
  <Box>
    {unitSummaryGroups.map((group) => (
      <Box key={group.groupTitle}>
        {/* Group header row */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 100px 160px 120px',
          padding: '12px 24px',
          backgroundColor: 'rgba(28,28,28,0.02)',
          borderBottom: '1px solid rgba(28,28,28,0.08)',
        }}>
          <SectionLabel>{group.groupTitle}</SectionLabel>
          <TH sx={{ textAlign: 'center' }}>Progress</TH>
          <TH sx={{ textAlign: 'center' }}>Action Required By</TH>
          <TH sx={{ textAlign: 'center' }}>Action</TH>
        </Box>

        {/* Rows */}
        {group.rows.map((row) => (
          <Box key={row.name} sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 100px 160px 120px',
            padding: '13px 24px',
            alignItems: 'center',
            borderBottom: '1px solid rgba(28,28,28,0.06)',
            '&:last-child': { borderBottom: 'none' },
          }}>
            <TD>{row.name}</TD>
            <TD sx={{ textAlign: 'center' }}>{row.progress}</TD>
            <TD sx={{ textAlign: 'center' }}>{row.actionBy}</TD>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <ViewDetailsBtn>View Details</ViewDetailsBtn>
            </Box>
          </Box>
        ))}
      </Box>
    ))}
  </Box>
);

/* ─────────────────────── 3. Learning Activities ─────────────────────── */

const learningActivityRows = [
  { title: 'UI UX Design for onefile', ref: '[AS1]',  date: '03/01/2025', method: 'Assignment', trainerTime: 0, learnerTime: 0, relatedPlan: 'None', actionBy: 'Action completed' },
  { title: 'UX Design',               ref: '[PRJ1]', date: '03/01/2025', method: 'Assignment', trainerTime: 0, learnerTime: 0, relatedPlan: 'None', actionBy: 'Action completed' },
];

const LearningActivitiesModal: React.FC = () => (
  <Table>
    <THead sx={{ gridTemplateColumns: '1.4fr 0.6fr 0.8fr 0.9fr 1fr 1fr 1.1fr 1.1fr' }}>
      <TH>Learning Activity Title</TH>
      <TH>Ref</TH>
      <TH>Date</TH>
      <TH>Method</TH>
      <TH>Trainer Activity Time (minutes)</TH>
      <TH>Learner Activity Time (minutes)</TH>
      <TH>Related Plan Of Activity/action</TH>
      <TH>Action Required By</TH>
    </THead>
    <TBody>
      {learningActivityRows.map((row, i) => (
        <TRow key={i} sx={{ gridTemplateColumns: '1.4fr 0.6fr 0.8fr 0.9fr 1fr 1fr 1.1fr 1.1fr' }}>
          <BlueLink>{row.title}</BlueLink>
          <BlueLink>{row.ref}</BlueLink>
          <TD>{row.date}</TD>
          <TD>{row.method}</TD>
          <TD>{row.trainerTime}</TD>
          <TD>{row.learnerTime}</TD>
          <TD>{row.relatedPlan}</TD>
          <TD>{row.actionBy}</TD>
        </TRow>
      ))}
    </TBody>
  </Table>
);

/* ─────────────────────── 4. Progress Reviews ─────────────────────── */

const progressReviewRows = [
  { units: '[Unit 01] [Unit 01] [01] [01] [Unit 01] [Unit 02]', date: '03/01/2025', reviewType: 'Progress Review', reviewBy: 'Will Doe', learnerSigned: '10/02/2025' },
];

const ProgressReviewsModal: React.FC = () => (
  <Table>
    <THead sx={{ gridTemplateColumns: '2fr 0.8fr 1.2fr 1fr 1fr' }}>
      <TH>Units Covered</TH>
      <TH>Date</TH>
      <TH>Progress Review Type</TH>
      <TH>Progress Review By</TH>
      <TH>Learner Signed</TH>
    </THead>
    <TBody>
      {progressReviewRows.map((row, i) => (
        <TRow key={i} sx={{ gridTemplateColumns: '2fr 0.8fr 1.2fr 1fr 1fr' }}>
          <TD>{row.units}</TD>
          <BlueLink>{row.date}</BlueLink>
          <TD>{row.reviewType}</TD>
          <TD>{row.reviewBy}</TD>
          <TD>{row.learnerSigned}</TD>
        </TRow>
      ))}
    </TBody>
  </Table>
);

/* ─────────────────────── 5. Cancellations ─────────────────────── */

const cancellationRows = [
  { title: 'UI UX Design for onefile', ref: '[AS1]',  date: '03/01/2025', method: 'Assignment', trainerTime: 0, learnerTime: 0, relatedPlan: 'None', actionBy: 'Action completed' },
  { title: 'UX Design',               ref: '[PRJ1]', date: '03/01/2025', method: 'Assignment', trainerTime: 0, learnerTime: 0, relatedPlan: 'None', actionBy: 'Action completed' },
];

const CancellationsModal: React.FC = () => (
  <Table>
    <THead sx={{ gridTemplateColumns: '1.4fr 0.6fr 0.8fr 0.9fr 1fr 1fr 1.1fr 1.1fr' }}>
      <TH>Learning Activity Title</TH>
      <TH>Ref</TH>
      <TH>Date</TH>
      <TH>Method</TH>
      <TH>Trainer Activity Time (minutes)</TH>
      <TH>Learner Activity Time (minutes)</TH>
      <TH>Related Plan Of Activity/action</TH>
      <TH>Action Required By</TH>
    </THead>
    <TBody>
      {cancellationRows.map((row, i) => (
        <TRow key={i} sx={{ gridTemplateColumns: '1.4fr 0.6fr 0.8fr 0.9fr 1fr 1fr 1.1fr 1.1fr' }}>
          <BlueLink>{row.title}</BlueLink>
          <BlueLink>{row.ref}</BlueLink>
          <TD>{row.date}</TD>
          <TD>{row.method}</TD>
          <TD>{row.trainerTime}</TD>
          <TD>{row.learnerTime}</TD>
          <TD>{row.relatedPlan}</TD>
          <TD>{row.actionBy}</TD>
        </TRow>
      ))}
    </TBody>
  </Table>
);

/* ─────────────────────── 6. Expert Witnesses & Witnesses ─────────────────────── */

const expertRows = [
  { name: 'Will Smith', company: '03/01/2025', relationship: 'Trainer', type: 'Expert Witness', actionBy: 'No action required' },
];

const ExpertWitnessesModal: React.FC = () => (
  <Table>
    <THead sx={{ gridTemplateColumns: '1.2fr 1fr 1.2fr 1fr 1.2fr' }}>
      <TH>Expert/Witness Name</TH>
      <TH>Company</TH>
      <TH>Relationship to Learner</TH>
      <TH>Type</TH>
      <TH>Action Required By</TH>
    </THead>
    <TBody>
      {expertRows.map((row, i) => (
        <TRow key={i} sx={{ gridTemplateColumns: '1.2fr 1fr 1.2fr 1fr 1.2fr' }}>
          <BlueLink>{row.name}</BlueLink>
          <TD>{row.company}</TD>
          <TD>{row.relationship}</TD>
          <TD>{row.type}</TD>
          <TD>{row.actionBy}</TD>
        </TRow>
      ))}
    </TBody>
  </Table>
);

/* ─────────────────────── Modal registry ─────────────────────── */

const MODAL_CONTENT: Record<string, { title: (count: number) => string; Content: React.FC }> = {
  'plan-of-activity': {
    title: (c) => `Plan Of Activity/action (${c})`,
    Content: PlanModal,
  },
  'unit-summaries': {
    title: (c) => `Unit Summaries (${c})`,
    Content: UnitSummariesModal,
  },
  'learning-activities': {
    title: (c) => `Learning Activities (${c})`,
    Content: LearningActivitiesModal,
  },
  'progress-reviews': {
    title: (c) => `Progress Reviews (${c})`,
    Content: ProgressReviewsModal,
  },
  'cancellations': {
    title: (c) => `Cancellations (${c})`,
    Content: CancellationsModal,
  },
  'expert-witnesses': {
    title: (c) => `Expert Witnesses & Witnesses (${c})`,
    Content: ExpertWitnessesModal,
  },
};

/* ─────────────────────── Exported component ─────────────────────── */

interface InformationOptionsModalProps {
  optionId: string | null;
  count: number;
  onClose: () => void;
}

const InformationOptionsModal: React.FC<InformationOptionsModalProps> = ({
  optionId,
  count,
  onClose,
}) => {
  if (!optionId) return null;

  const config = MODAL_CONTENT[optionId];
  if (!config) return null;

  const { Content } = config;

  return (
    <Modal open onClose={onClose} disableAutoFocus>
      <Backdrop onClick={onClose}>
        <ModalCard onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{config.title(count)}</ModalTitle>
            <CloseBtn onClick={onClose}>
              <CloseIcon sx={{ fontSize: '14px', color: '#1C1C1C' }} />
            </CloseBtn>
          </ModalHeader>
          <ModalBody>
            <Content />
          </ModalBody>
        </ModalCard>
      </Backdrop>
    </Modal>
  );
};

export default InformationOptionsModal;
