/**
 * Learner — My Profile page
 * Pixel-perfect match to Figma node 342:32933
 */
import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CheckBox as CheckBoxIcon,
  CloudUploadOutlined as CloudUploadIcon,
  InfoOutlined as InfoIcon,
  UnfoldMore as UnfoldMoreIcon,
  InsertDriveFileOutlined as FileIcon,
} from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

// ─── Styled Components ────────────────────────────────────────────────────────

const PageWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  boxShadow: '0px 2px 6px 0px rgba(13,10,44,0.08)',
  overflow: 'hidden',
  fontFamily: "'Inter', sans-serif",
});

// Gray title bar at the top of the card
const CardTitleBar = styled(Box)({
  backgroundColor: 'rgba(28,28,28,0.05)',
  padding: '0 16px',
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '12px 12px 0 0',
});

const CardTitleText = styled(Typography)({
  fontSize: '18px',
  fontWeight: 700,
  color: '#000000',
  fontFamily: "'Inter', sans-serif",
  letterSpacing: '-0.36px',
});

const CardBody = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '24px 16px',
});

// ── Top row: avatar + info card ──
const TopRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const AvatarBlock = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'flex-start',
});

const AvatarNameBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '4px 8px 4px 4px',
  borderRadius: '8px',
  height: '100px',
});

const AvatarCircle = styled(Box)({
  width: 64,
  height: 64,
  borderRadius: '80px',
  backgroundColor: 'rgba(28,28,28,0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  flexShrink: 0,
});

const AvatarName = styled(Typography)({
  fontSize: '16px',
  fontWeight: 600,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '20px',
  whiteSpace: 'nowrap',
});

const UploadButton = styled(Box)({
  backgroundColor: '#000000',
  color: '#FFFFFF',
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: "'Inter', sans-serif",
  lineHeight: '20px',
  padding: '4px 8px',
  borderRadius: '8px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '&:hover': { opacity: 0.85 },
});

// Info card on the right of top row
const InfoCard = styled(Box)({
  border: '1px solid rgba(28,28,28,0.2)',
  borderRadius: '16px',
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
});

const InfoCardRow = styled(Box)({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const InfoCardText = styled(Typography)({
  fontSize: '14px',
  fontWeight: 400,
  color: '#000000',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '20px',
  textAlign: 'right',
});

// ── Section wrapper (gray bg, rounded) ──
const Section = styled(Box)({
  backgroundColor: 'rgba(28,28,28,0.05)',
  borderRadius: '12px',
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const SectionTitle = styled(Typography)({
  fontSize: '16px',
  fontWeight: 600,
  color: '#000000',
  fontFamily: "'Inter', sans-serif",
  letterSpacing: '-0.32px',
  whiteSpace: 'nowrap',
});

// ── Form fields row ──
const FieldsRow = styled(Box)({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  width: '100%',
});

// Individual form field — white card
const FormField = styled(Box)<{ width?: string | number }>(({ width }) => ({
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28,28,28,0.1)',
  borderRadius: '8px',
  padding: '16px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  position: 'relative',
  flex: width ? 'none' : '1 0 0',
  width: width ?? undefined,
  minWidth: 0,
  minHeight: 1,
}));

const FieldLabel = styled(Typography)({
  fontSize: '12px',
  fontWeight: 400,
  color: '#000000',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '18px',
  whiteSpace: 'nowrap',
});

const FieldValue = styled(Typography)({
  fontSize: '14px',
  fontWeight: 400,
  color: 'rgba(28,28,28,0.6)',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '20px',
});

const DropdownArrow = styled(Box)({
  position: 'absolute',
  right: 15,
  top: 39,
  width: 16,
  height: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(28,28,28,0.4)',
});

// ── Attachments section ──
const AttachBarRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '12px 12px 0 0',
});

const CreateLinkBtn = styled(Box)({
  backgroundColor: '#000000',
  color: '#F7F9FB',
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: "'Inter', sans-serif",
  lineHeight: '20px',
  height: '28px',
  padding: '4px 8px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': { opacity: 0.85 },
});

const ViewSupportedLink = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
  fontWeight: 400,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '20px',
  textDecoration: 'underline',
  cursor: 'pointer',
});

const DropzoneBox = styled(Box)({
  border: '1px dashed rgba(28,28,28,0.2)',
  borderRadius: '10px',
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
  padding: '16px 24px 16px 32px',
});

const DropzoneTextCol = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: 272,
});

const DropzonePrimary = styled(Typography)({
  fontSize: '13px',
  color: '#000000',
  fontFamily: "'Inter', sans-serif",
});

const DropzoneSecondary = styled(Typography)({
  fontSize: '12px',
  color: 'rgba(28,28,28,0.4)',
  fontFamily: "'Inter', sans-serif",
});

const SelectFileBtn = styled(Box)({
  border: '1px solid rgba(28,28,28,0.8)',
  borderRadius: '5px',
  padding: '12px 16px',
  fontSize: '10px',
  fontWeight: 400,
  color: '#000000',
  fontFamily: "'Inter', sans-serif",
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  backgroundColor: '#FFFFFF',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.04)' },
});

const FileRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  height: '28px',
  paddingRight: '16px',
  paddingTop: '8px',
  paddingBottom: '8px',
});

const FileIconBox = styled(Box)({
  width: 24,
  height: 24,
  backgroundColor: '#E5ECF6',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

const FileName = styled(Typography)({
  fontSize: '14px',
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '18px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
});

// ── Bottom buttons ──
const ButtonsRow = styled(Box)({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
});

const SendButton = styled(Box)({
  backgroundColor: '#000000',
  color: '#FFFFFF',
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: "'Inter', sans-serif",
  lineHeight: '20px',
  height: '28px',
  padding: '4px 8px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': { opacity: 0.85 },
});

const CancelButton = styled(Box)({
  border: '1px solid rgba(28,28,28,0.1)',
  color: '#1C1C1C',
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: "'Inter', sans-serif",
  lineHeight: '20px',
  height: '28px',
  padding: '4px 8px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.04)' },
});

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Reusable form field */
function Field({ label, value, hasDropdown = false, width }: {
  label: string;
  value: string;
  hasDropdown?: boolean;
  width?: string | number;
}) {
  return (
    <FormField width={width}>
      <FieldLabel>{label}</FieldLabel>
      <FieldValue>{value}</FieldValue>
      {hasDropdown && (
        <DropdownArrow>
          <UnfoldMoreIcon sx={{ fontSize: '14px' }} />
        </DropdownArrow>
      )}
    </FormField>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const Profile: React.FC = () => {
  const router = useRouter();

  return (
    <LearnerLayout pageTitle="My Profile">
      <PageWrapper>

        {/* Gray title bar */}
        <CardTitleBar>
          <CardTitleText>My Profile</CardTitleText>
        </CardTitleBar>

        <CardBody>

          {/* ── Top Row: Avatar + Info card ── */}
          <TopRow>
            {/* Left: avatar + upload button */}
            <AvatarBlock>
              <AvatarNameBox>
                {/* Placeholder silhouette avatar */}
                <AvatarCircle>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="16" r="8" fill="rgba(28,28,28,0.2)" />
                    <ellipse cx="20" cy="36" rx="14" ry="10" fill="rgba(28,28,28,0.15)" />
                  </svg>
                </AvatarCircle>
                <AvatarName>John Doe</AvatarName>
              </AvatarNameBox>

              <UploadButton>Upload new profile picture</UploadButton>
            </AvatarBlock>

            {/* Right: last-updated card */}
            <InfoCard>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                <InfoCardRow>
                  <CheckBoxIcon sx={{ fontSize: '22px', color: '#1C1C1C' }} />
                  <InfoCardText>This page was last updated on 19/12/2024 01:59.</InfoCardText>
                </InfoCardRow>
                <InfoCardRow>
                  <CheckBoxIcon sx={{ fontSize: '22px', color: '#1C1C1C' }} />
                  <InfoCardText>
                    Please note emails are now managed on the &lsquo;Email Preferences&rsquo; page
                  </InfoCardText>
                </InfoCardRow>
              </Box>
            </InfoCard>
          </TopRow>

          {/* ── My Details section ── */}
          <Section>
            <SectionTitle>My Details</SectionTitle>

            {/* Row 1 */}
            <FieldsRow>
              <Field label="Pronouns"                                          value="None"  hasDropdown />
              <Field label="Landline telephone number"                         value="Text" />
              <Field label="Mobile telephone number"                           value="Text" />
            </FieldsRow>

            {/* Row 2 */}
            <FieldsRow>
              <Field label="Skype name"                                        value="Text" />
              <Field label="Website link (Facebook, Twitter, etc.)"            value="Text" />
              <Field label="Name of study/work place (e.g. employer name)"     value="Text" />
            </FieldsRow>

            {/* Row 3 */}
            <FieldsRow>
              <Field label="Address of study/ work"                            value="Text" />
              <Field label="Time Zone"                                         value="None"  hasDropdown />
              <Field label="Home address (including post code)>"               value="Text" />
            </FieldsRow>
          </Section>

          {/* ── Attachments section ── */}
          <Section>
            <SectionTitle>
              Attachments (CV, qualification certificates &amp; other professional documents)
            </SectionTitle>

            {/* White inner card */}
            <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', overflow: 'hidden' }}>
              {/* Bar */}
              <AttachBarRow sx={{ padding: '16px' }}>
                <CreateLinkBtn>Create link</CreateLinkBtn>
                <ViewSupportedLink>
                  View supported file types
                  <InfoIcon sx={{ fontSize: '16px', color: 'rgba(28,28,28,0.5)' }} />
                </ViewSupportedLink>
              </AttachBarRow>

              {/* Dropzone + file list */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 16px', alignItems: 'center' }}>
                <DropzoneBox sx={{ width: '100%' }}>
                  {/* Cloud icon */}
                  <Box sx={{ width: 48, height: 48, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CloudUploadIcon sx={{ fontSize: '36px', color: 'rgba(28,28,28,0.3)' }} />
                  </Box>

                  {/* Text + button */}
                  <Box sx={{ display: 'flex', gap: '56px', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <DropzoneTextCol>
                      <DropzonePrimary>Select a file or drag and drop here</DropzonePrimary>
                      <DropzoneSecondary>JPG, PNG or PDF, file size no more than 10MB</DropzoneSecondary>
                    </DropzoneTextCol>
                    <SelectFileBtn>Select file</SelectFileBtn>
                  </Box>
                </DropzoneBox>

                {/* Uploaded file row */}
                <FileRow sx={{ width: '100%' }}>
                  <FileIconBox>
                    <FileIcon sx={{ fontSize: '14px', color: '#4A90D9' }} />
                  </FileIconBox>
                  <FileName>Resume.pdf</FileName>
                </FileRow>
              </Box>
            </Box>
          </Section>

          {/* ── Equality, LLDD and Health section ── */}
          <Section>
            <SectionTitle>Equality, LLDD and Health</SectionTitle>

            {/* Row 1 */}
            <FieldsRow>
              <Field
                label="Ethnicity"
                value="Unknown"
                hasDropdown
                width={398}
              />
              <Field
                label="Learner's LLDD and Health Status:"
                value="Learner considers himself or herself to have a learning difficulty and/or health problem."
                hasDropdown
              />
            </FieldsRow>

            {/* Row 2 */}
            <FieldsRow>
              <Field
                label="Sex:"
                value="Unknown"
                hasDropdown
                width={398}
              />
              <Field
                label="Primary LLDD or Health Condition:"
                value="Dyslexia"
                hasDropdown
              />
            </FieldsRow>
          </Section>

          {/* ── Bottom Buttons ── */}
          <ButtonsRow>
            <SendButton>Send</SendButton>
            <CancelButton onClick={() => router.back()}>Cancel</CancelButton>
          </ButtonsRow>

        </CardBody>
      </PageWrapper>
    </LearnerLayout>
  );
};

export default Profile;
