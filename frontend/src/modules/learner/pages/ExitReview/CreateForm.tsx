/**
 * Create Exit Review and Programme Evaluation
 * Pixel-perfect to Figma node 40000068:38099
 */
import React, { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { useRouter } from 'next/router';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

/* ─── Styled Components ─── */

const PageWrapper = styled(Box)({ display: 'flex', flexDirection: 'column', gap: '24px' });

const PageHeader = styled(Box)({ display: 'flex', alignItems: 'center', gap: '10px' });

const BackButton = styled(Box)({
  width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1C1C1C',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
});

const PageTitle = styled(Typography)({
  fontSize: '22px', fontWeight: 700, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

const FormCard = styled(Box)({
  backgroundColor: '#FFFFFF', border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '12px', overflow: 'hidden',
});

const SectionHeader = styled(Box)({
  backgroundColor: 'rgba(28,28,28,0.05)', padding: '14px 24px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
});

const SectionTitle = styled(Typography)({
  fontSize: '15px', fontWeight: 700, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

const SectionBody = styled(Box)({
  padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px',
});

const FieldGrid = styled(Box)({
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px',
  '@media (max-width: 700px)': { gridTemplateColumns: '1fr' },
});

const FieldBox = styled(Box)({
  backgroundColor: 'rgba(28,28,28,0.04)', borderRadius: '8px',
  padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px',
  border: '1px solid rgba(28,28,28,0.08)',
});

const FieldLabel = styled(Typography)({
  fontSize: '12px', fontWeight: 500, color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif", lineHeight: 1.4,
});

const FieldInput = styled('textarea')({
  background: 'transparent', border: 'none', outline: 'none', resize: 'none',
  fontSize: '13px', color: 'rgba(28,28,28,0.45)', fontFamily: "'Inter', sans-serif",
  lineHeight: 1.5, minHeight: '44px', padding: 0, width: '100%',
  '&:focus': { color: '#1C1C1C' },
});

const CheckboxRow = styled(Box)({ display: 'flex', gap: '16px', marginTop: '4px' });

const CheckboxLabel = styled('label')({
  display: 'flex', alignItems: 'center', gap: '6px',
  fontSize: '13px', color: '#1C1C1C', fontFamily: "'Inter', sans-serif", cursor: 'pointer',
});

const StyledCheckbox = styled('input')({
  width: '15px', height: '15px', cursor: 'pointer', accentColor: '#1C1C1C',
});

const SignatureBox = styled(Box)({
  backgroundColor: 'rgba(28,28,28,0.04)', borderRadius: '8px',
  padding: '16px 20px', border: '1px solid rgba(28,28,28,0.08)',
  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px',
});

const SignatureLeft = styled(Box)({ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 });

const SignatureCheckRow = styled(Box)({ display: 'flex', alignItems: 'center', gap: '8px' });

const SignatureCheckLabel = styled(Typography)({
  fontSize: '13px', fontWeight: 600, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

const SignatureAgreementText = styled(Typography)({
  fontSize: '12px', color: 'rgba(28,28,28,0.55)', fontFamily: "'Inter', sans-serif", lineHeight: 1.5,
});

const SignatureRight = styled(Box)({
  display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0,
});

const SignatureUserRow = styled(Box)({ display: 'flex', alignItems: 'center', gap: '6px' });

const SignatureUser = styled(Typography)({
  fontSize: '13px', fontWeight: 500, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
});

const SignatureDate = styled(Typography)({
  fontSize: '12px', color: 'rgba(28,28,28,0.5)', fontFamily: "'Inter', sans-serif",
});

const ActionBar = styled(Box)({
  display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '4px',
});

const SaveBtn = styled(Box)({
  backgroundColor: '#1C1C1C', color: '#fff', borderRadius: '8px',
  padding: '9px 24px', fontSize: '13px', fontWeight: 600,
  fontFamily: "'Inter', sans-serif", cursor: 'pointer',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
});

const CancelBtn = styled(Box)({
  backgroundColor: 'transparent', color: '#1C1C1C',
  padding: '9px 16px', fontSize: '13px', fontWeight: 500,
  fontFamily: "'Inter', sans-serif", cursor: 'pointer',
  '&:hover': { color: 'rgba(28,28,28,0.6)' },
});

const DeleteBtn = styled(Box)({
  backgroundColor: '#D32F2F', color: '#fff', borderRadius: '8px',
  padding: '9px 24px', fontSize: '13px', fontWeight: 600,
  fontFamily: "'Inter', sans-serif", cursor: 'pointer', marginLeft: 'auto',
  '&:hover': { backgroundColor: '#B71C1C' },
});

/* ─── Component ─── */

const ExitReviewCreate: React.FC = () => {
  const router = useRouter();

  const [trainersName, setTrainersName] = useState('');
  const [keyPoint, setKeyPoint] = useState('');
  const [skillsUsage, setSkillsUsage] = useState('');
  const [moreInfo, setMoreInfo] = useState('');
  const [completedJournalYes, setCompletedJournalYes] = useState(false);
  const [completedJournalNo, setCompletedJournalNo] = useState(true);
  const [whyNot, setWhyNot] = useState('');
  const [improvement, setImprovement] = useState('');
  const [learnerSignature, setLearnerSignature] = useState(false);
  const [trainerSignature, setTrainerSignature] = useState(false);

  const handleYesChange = (checked: boolean) => {
    setCompletedJournalYes(checked);
    if (checked) setCompletedJournalNo(false);
  };

  const handleNoChange = (checked: boolean) => {
    setCompletedJournalNo(checked);
    if (checked) setCompletedJournalYes(false);
  };

  return (
    <LearnerLayout pageTitle="Create Exit Review">
      <PageWrapper>

        {/* Header */}
        <PageHeader>
          <BackButton onClick={() => router.back()}>
            <ArrowBackIos sx={{ fontSize: '12px', color: '#fff', ml: '4px' }} />
          </BackButton>
          <PageTitle>Create Exit review and Programme Evaluation</PageTitle>
        </PageHeader>

        {/* ── Training Feedback card ── */}
        <FormCard>
          <SectionHeader>
            <SectionTitle>Training Feedback</SectionTitle>
          </SectionHeader>

          <SectionBody>
            {/* Row 1 */}
            <FieldGrid>
              <FieldBox>
                <FieldLabel>Trainers Name</FieldLabel>
                <FieldInput
                  placeholder="Text"
                  value={trainersName}
                  onChange={(e) => setTrainersName(e.target.value)}
                  rows={2}
                />
              </FieldBox>

              <FieldBox>
                <FieldLabel>What would you say was the key point you learned today?</FieldLabel>
                <FieldInput
                  placeholder="Text"
                  value={keyPoint}
                  onChange={(e) => setKeyPoint(e.target.value)}
                  rows={2}
                />
              </FieldBox>
            </FieldGrid>

            {/* Row 2 */}
            <FieldGrid>
              <FieldBox>
                <FieldLabel>How would you use the skills you are learning in work? and what impact would this have?</FieldLabel>
                <FieldInput
                  placeholder="Text"
                  value={skillsUsage}
                  onChange={(e) => setSkillsUsage(e.target.value)}
                  rows={2}
                />
              </FieldBox>

              <FieldBox>
                <FieldLabel>What would you like more information on?</FieldLabel>
                <FieldInput
                  placeholder="Text"
                  value={moreInfo}
                  onChange={(e) => setMoreInfo(e.target.value)}
                  rows={2}
                />
              </FieldBox>
            </FieldGrid>

            {/* Row 3 */}
            <FieldGrid>
              <FieldBox>
                <FieldLabel>Have you completed your learning journal?</FieldLabel>
                <CheckboxRow>
                  <CheckboxLabel>
                    <StyledCheckbox
                      type="checkbox"
                      checked={completedJournalYes}
                      onChange={(e) => handleYesChange(e.target.checked)}
                    />
                    Yes
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <StyledCheckbox
                      type="checkbox"
                      checked={completedJournalNo}
                      onChange={(e) => handleNoChange(e.target.checked)}
                    />
                    No
                  </CheckboxLabel>
                </CheckboxRow>
              </FieldBox>

              <FieldBox>
                <FieldLabel>If you selected no why not?</FieldLabel>
                <FieldInput
                  placeholder="Text"
                  value={whyNot}
                  onChange={(e) => setWhyNot(e.target.value)}
                  rows={2}
                />
              </FieldBox>
            </FieldGrid>

            {/* Full-width */}
            <FieldBox>
              <FieldLabel>
                If you could improve just one thing in the training/lesson – what would it be, and what difference would it make?
              </FieldLabel>
              <FieldInput
                placeholder="Text"
                value={improvement}
                onChange={(e) => setImprovement(e.target.value)}
                rows={2}
              />
            </FieldBox>
          </SectionBody>

          {/* ── Signature ── */}
          <SectionHeader sx={{ borderTop: '1px solid rgba(28,28,28,0.08)' }}>
            <SectionTitle>Signature</SectionTitle>
          </SectionHeader>

          <SectionBody>
            <SignatureBox>
              <SignatureLeft>
                <SignatureCheckRow>
                  <StyledCheckbox
                    type="checkbox"
                    checked={learnerSignature}
                    onChange={(e) => setLearnerSignature(e.target.checked)}
                  />
                  <SignatureCheckLabel>Signature</SignatureCheckLabel>
                </SignatureCheckRow>
                <SignatureAgreementText>
                  I agree that the information provided here is an accurate account of what has taken place.
                </SignatureAgreementText>
              </SignatureLeft>
              <SignatureRight>
                <SignatureUserRow>
                  <Box component="span" sx={{ fontSize: '14px', color: 'rgba(28,28,28,0.5)' }}>👤</Box>
                  <SignatureUser>John Doe (Learner)</SignatureUser>
                </SignatureUserRow>
                <SignatureDate>2025/03/03</SignatureDate>
              </SignatureRight>
            </SignatureBox>

            <SignatureBox>
              <SignatureLeft>
                <SignatureCheckRow>
                  <StyledCheckbox
                    type="checkbox"
                    checked={trainerSignature}
                    onChange={(e) => setTrainerSignature(e.target.checked)}
                  />
                  <SignatureCheckLabel>Signature</SignatureCheckLabel>
                </SignatureCheckRow>
                <SignatureAgreementText>
                  I agree that the information provided here is an accurate account of what has taken place.
                </SignatureAgreementText>
              </SignatureLeft>
              <SignatureRight>
                <SignatureUserRow>
                  <Box component="span" sx={{ fontSize: '14px', color: 'rgba(28,28,28,0.5)' }}>👤</Box>
                  <SignatureUser>Trainer</SignatureUser>
                </SignatureUserRow>
              </SignatureRight>
            </SignatureBox>
          </SectionBody>
        </FormCard>

        {/* ── Action bar ── */}
        <ActionBar>
          <SaveBtn onClick={() => router.push('/learner-dashboard/exit-review')}>Save</SaveBtn>
          <CancelBtn onClick={() => router.back()}>Cancel</CancelBtn>
          <DeleteBtn>Delete</DeleteBtn>
        </ActionBar>

      </PageWrapper>
    </LearnerLayout>
  );
};

export default ExitReviewCreate;
