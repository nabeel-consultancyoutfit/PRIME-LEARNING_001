/**
 * 5. Learning Support Form
 * Pixel-perfect to Figma node 40000068:37870
 */
import React, { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { useRouter } from 'next/router';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

/* ─── Styled ─── */

const PageWrapper = styled(Box)({ display: 'flex', flexDirection: 'column', gap: '0px' });

const PageHeader = styled(Box)({ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' });

const BackButton = styled(Box)({
  width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1C1C1C',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});

const PageTitle = styled(Typography)({
  fontSize: '22px', fontWeight: 700, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

/* Section blocks */
const SectionHeader = styled(Box)({
  backgroundColor: 'rgba(28,28,28,0.06)', padding: '12px 20px',
  borderTop: '1px solid rgba(28,28,28,0.1)', borderBottom: '1px solid rgba(28,28,28,0.1)',
});

const SectionTitle = styled(Typography)({
  fontSize: '14px', fontWeight: 600, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

const SectionBody = styled(Box)({
  padding: '16px 20px 20px', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '14px',
});

const BodyText = styled(Typography)({
  fontSize: '13px', color: '#1C1C1C', fontFamily: "'Inter', sans-serif", lineHeight: 1.6,
});

const FieldLabel = styled(Typography)({
  fontSize: '13px', fontWeight: 500, color: '#1C1C1C', fontFamily: "'Inter', sans-serif", marginBottom: '6px',
});

const SelectField = styled('select')({
  width: '100%', padding: '10px 12px', border: '1px solid rgba(28,28,28,0.15)',
  borderRadius: '6px', fontSize: '13px', fontFamily: "'Inter', sans-serif", color: '#1C1C1C',
  backgroundColor: '#fff', outline: 'none', cursor: 'pointer',
  '&:focus': { borderColor: '#1C1C1C' },
});

const TextareaField = styled('textarea')({
  width: '100%', padding: '10px 12px', border: '1px solid rgba(28,28,28,0.15)',
  borderRadius: '6px', fontSize: '13px', fontFamily: "'Inter', sans-serif", color: '#1C1C1C',
  backgroundColor: '#fff', outline: 'none', resize: 'vertical', minHeight: '44px',
  boxSizing: 'border-box',
  '&:focus': { borderColor: '#1C1C1C' },
});

const EmptyMessage = styled(Typography)({
  fontSize: '13px', color: 'rgba(28,28,28,0.45)', fontFamily: "'Inter', sans-serif",
  fontStyle: 'italic',
});

const CancelBtn = styled(Box)({
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  backgroundColor: '#1C1C1C', color: '#fff', borderRadius: '8px',
  padding: '10px 36px', fontSize: '14px', fontWeight: 600,
  fontFamily: "'Inter', sans-serif", cursor: 'pointer', alignSelf: 'center', marginTop: '24px',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
});

const FormCard = styled(Box)({
  backgroundColor: '#FFFFFF', border: '1px solid rgba(28,28,28,0.1)', borderRadius: '12px',
  overflow: 'hidden',
});

/* ─── Component ─── */

const LearningSupportForm: React.FC = () => {
  const router = useRouter();

  const [monthlyReview, setMonthlyReview] = useState('No/False');
  const [threeMonthlyReview, setThreeMonthlyReview] = useState('No/False');
  const [planChanges, setPlanChanges] = useState('');
  const [activityTracker, setActivityTracker] = useState('');
  const [reasonStopping, setReasonStopping] = useState('');
  const [tutorConfirmA, setTutorConfirmA] = useState('No/False');
  const [tutorConfirmB, setTutorConfirmB] = useState('No/False');
  const [learnerConfirm, setLearnerConfirm] = useState('No/False');

  return (
    <LearnerLayout pageTitle="Learning Support Form">
      <PageWrapper>
        {/* Header */}
        <PageHeader>
          <BackButton onClick={() => router.back()}>
            <ArrowBackIos sx={{ fontSize: '12px', color: '#fff', ml: '4px' }} />
          </BackButton>
          <PageTitle>5.Learning Support Form</PageTitle>
        </PageHeader>

        <FormCard>
          {/* ── Section 1 ── */}
          <SectionHeader>
            <SectionTitle>1) Learning Support Documents</SectionTitle>
          </SectionHeader>
          <SectionBody>
            <EmptyMessage>Nothing is attached. Please Attach Learning Support Plan</EmptyMessage>
          </SectionBody>

          {/* ── Section 2 ── */}
          <SectionHeader>
            <SectionTitle>2) When will the support plan be reviewed?</SectionTitle>
          </SectionHeader>
          <SectionBody>
            <BodyText>Regular Learning Support reviews to take place with the learner</BodyText>
            <BodyText>
              Normal expectation would be to update the learning support plan on a monthly basis if support is being provided.
            </BodyText>
            <BodyText>
              If a learner refuses additional Learning Support then the plan will need to be reviewed every three month to take into account any changes in the learners circumstances.
            </BodyText>

            <Box>
              <FieldLabel>Monthly support review</FieldLabel>
              <SelectField value={monthlyReview} onChange={(e) => setMonthlyReview(e.target.value)}>
                <option value="No/False">No/False</option>
                <option value="Yes/True">Yes/True</option>
              </SelectField>
            </Box>

            <Box>
              <FieldLabel>3 monthly support review</FieldLabel>
              <SelectField value={threeMonthlyReview} onChange={(e) => setThreeMonthlyReview(e.target.value)}>
                <option value="No/False">No/False</option>
                <option value="Yes/True">Yes/True</option>
              </SelectField>
            </Box>
          </SectionBody>

          {/* ── Section 3 ── */}
          <SectionHeader>
            <SectionTitle>3) Monthly Support Review</SectionTitle>
          </SectionHeader>
          <SectionBody>
            <Box>
              <FieldLabel>Have there been any changes too the plan?</FieldLabel>
              <TextareaField value={planChanges} onChange={(e) => setPlanChanges(e.target.value)} />
            </Box>

            <BodyText>
              Additional Learning Support given to learners must be logged below on the Activity Tracker
            </BodyText>
            <BodyText>
              To use the tracker, click on the green + button to add a new entry
            </BodyText>

            <Box>
              <FieldLabel>Activity Tracker</FieldLabel>
              <TextareaField value={activityTracker} onChange={(e) => setActivityTracker(e.target.value)} />
            </Box>

            <Box>
              <FieldLabel>Reason for stopping support</FieldLabel>
              <TextareaField value={reasonStopping} onChange={(e) => setReasonStopping(e.target.value)} />
            </Box>
          </SectionBody>

          {/* ── Section 4 ── */}
          <SectionHeader>
            <SectionTitle>4) Tutor Confirmation of the plan</SectionTitle>
          </SectionHeader>
          <SectionBody>
            <Box>
              <BodyText sx={{ mb: '8px' }}>
                a) I am satisfied the adjustments made to the learner&apos;s programme are required and deemed reasonable in order to address their barriers to learning and that there is a delivery cost in providing these. Without the support above it is thought the learner would be unlikely to achieve or would face significant difficulties achieving or remaining on programme. Learning Support Funding (LSF) to be claimed
              </BodyText>
              <SelectField value={tutorConfirmA} onChange={(e) => setTutorConfirmA(e.target.value)}>
                <option value="No/False">No/False</option>
                <option value="Yes/True">Yes/True</option>
              </SelectField>
            </Box>

            <Box>
              <BodyText sx={{ mb: '8px' }}>
                b) I am satisfied that the planned adjustments would be beneficial to the learner though these will not result in additional costs being incurred and / or the needs affected would not have material impact on ability to successfully engage in learning day to day. LSF Funding will not be claimed.
              </BodyText>
              <SelectField value={tutorConfirmB} onChange={(e) => setTutorConfirmB(e.target.value)}>
                <option value="No/False">No/False</option>
                <option value="Yes/True">Yes/True</option>
              </SelectField>
            </Box>
          </SectionBody>

          {/* ── Section 5 ── */}
          <SectionHeader>
            <SectionTitle>5) Learner confirmation of the plan</SectionTitle>
          </SectionHeader>
          <SectionBody>
            <BodyText>
              I agree that the adjustments identified are necessary and without which I believe the completion of my apprenticeship would be at risk and that the activities identified are reasonable in order to address my barriers to learning. I agree that this information can be shared with The Prime College and my Employer.
            </BodyText>
            <SelectField value={learnerConfirm} onChange={(e) => setLearnerConfirm(e.target.value)}>
              <option value="No/False">No/False</option>
              <option value="Yes/True">Yes/True</option>
            </SelectField>
          </SectionBody>

          {/* Cancel button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <CancelBtn onClick={() => router.back()}>Cancel</CancelBtn>
          </Box>
        </FormCard>
      </PageWrapper>
    </LearnerLayout>
  );
};

export default LearningSupportForm;
