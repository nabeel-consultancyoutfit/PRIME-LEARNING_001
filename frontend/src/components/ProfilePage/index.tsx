/**
 * Shared editable Profile page — used by both learner and trainer layouts.
 * Matches Figma node 342:32933
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CheckBox as CheckBoxIcon,
  CloudUploadOutlined as CloudUploadIcon,
  InfoOutlined as InfoIcon,
  UnfoldMore as UnfoldMoreIcon,
  InsertDriveFileOutlined as FileIcon,
  DeleteOutlined as DeleteIcon,
  EditOutlined as EditIcon,
} from '@mui/icons-material';
import { apiClient } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

// ─── Styled Components ────────────────────────────────────────────────────────

const PageWrapper = styled(Box)({ display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0px 2px 6px 0px rgba(13,10,44,0.08)', overflow: 'hidden', fontFamily: "'Inter', sans-serif" });
const CardTitleBar = styled(Box)({ backgroundColor: 'rgba(28,28,28,0.05)', padding: '0 16px', height: '45px', display: 'flex', alignItems: 'center', borderRadius: '12px 12px 0 0' });
const CardTitleText = styled(Typography)({ fontSize: '18px', fontWeight: 700, color: '#000000', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.36px' });
const CardBody = styled(Box)({ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 16px' });
const TopRow = styled(Box)({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' });
const AvatarBlock = styled(Box)({ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' });
const AvatarNameBox = styled(Box)({ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '4px 8px 4px 4px', borderRadius: '8px', height: '100px' });

const AvatarCircle = styled(Box)({
  width: 64, height: 64, borderRadius: '80px',
  backgroundColor: 'rgba(28,28,28,0.08)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  overflow: 'hidden', flexShrink: 0, cursor: 'pointer', position: 'relative',
  '&:hover .avatar-overlay': { opacity: 1 },
});

const AvatarOverlay = styled(Box)({
  position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  opacity: 0, transition: 'opacity 0.2s', borderRadius: '80px',
});

const AvatarName = styled(Typography)({ fontSize: '16px', fontWeight: 600, color: '#1C1C1C', fontFamily: "'Inter', sans-serif", lineHeight: '20px', whiteSpace: 'nowrap' });
const UploadButton = styled(Box)({ backgroundColor: '#000000', color: '#FFFFFF', fontSize: '14px', fontWeight: 400, fontFamily: "'Inter', sans-serif", lineHeight: '20px', padding: '4px 8px', borderRadius: '8px', height: '28px', display: 'flex', alignItems: 'center', cursor: 'pointer', whiteSpace: 'nowrap', '&:hover': { opacity: 0.85 } });
const InfoCard = styled(Box)({ border: '1px solid rgba(28,28,28,0.2)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center' });
const InfoCardRow = styled(Box)({ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end' });
const InfoCardText = styled(Typography)({ fontSize: '14px', fontWeight: 400, color: '#000000', fontFamily: "'Inter', sans-serif", lineHeight: '20px', textAlign: 'right' });
const Section = styled(Box)({ backgroundColor: 'rgba(28,28,28,0.05)', borderRadius: '12px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '24px' });
const SectionTitle = styled(Typography)({ fontSize: '16px', fontWeight: 600, color: '#000000', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.32px', whiteSpace: 'nowrap' });
const FieldsRow = styled(Box)({ display: 'flex', gap: '16px', alignItems: 'flex-start', width: '100%', flexWrap: 'wrap' });

const FormField = styled(Box)<{ width?: string | number }>(({ width }) => ({
  backgroundColor: '#FFFFFF', border: '1px solid rgba(28,28,28,0.1)', borderRadius: '8px',
  padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: '4px',
  position: 'relative', flex: width ? 'none' : '1 0 0', width: width ?? undefined,
  minWidth: '180px',
}));

const FieldLabel = styled(Typography)({ fontSize: '12px', fontWeight: 400, color: '#000000', fontFamily: "'Inter', sans-serif", lineHeight: '18px', whiteSpace: 'nowrap' });

const FieldInput = styled('input')({
  fontSize: '14px', fontWeight: 400, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
  lineHeight: '20px', border: 'none', outline: 'none', backgroundColor: 'transparent',
  width: '100%', padding: 0,
  '&::placeholder': { color: 'rgba(28,28,28,0.35)' },
});

const FieldSelect = styled('select')({
  fontSize: '14px', fontWeight: 400, color: '#1C1C1C', fontFamily: "'Inter', sans-serif",
  lineHeight: '20px', border: 'none', outline: 'none', backgroundColor: 'transparent',
  width: '100%', padding: 0, appearance: 'none', cursor: 'pointer',
});

const DropdownArrow = styled(Box)({ position: 'absolute', right: 15, top: 38, width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(28,28,28,0.4)', pointerEvents: 'none' });

// Attachments
const AttachBarRow = styled(Box)({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '12px 12px 0 0' });
const DropzoneBox = styled(Box)<{ dragging?: boolean }>(({ dragging }) => ({
  border: `2px dashed ${dragging ? '#7B61FF' : 'rgba(28,28,28,0.2)'}`,
  borderRadius: '10px', display: 'flex', gap: '24px', alignItems: 'center',
  padding: '16px 24px 16px 32px', backgroundColor: dragging ? 'rgba(123,97,255,0.04)' : 'transparent',
  transition: 'all 0.2s', cursor: 'pointer',
}));
const SelectFileBtn = styled(Box)({ border: '1px solid rgba(28,28,28,0.8)', borderRadius: '5px', padding: '12px 16px', fontSize: '10px', fontWeight: 400, color: '#000000', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', whiteSpace: 'nowrap', cursor: 'pointer', backgroundColor: '#FFFFFF', '&:hover': { backgroundColor: 'rgba(28,28,28,0.04)' } });
const FileRow = styled(Box)({ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px solid rgba(28,28,28,0.06)', '&:last-child': { borderBottom: 'none' } });
const FileIconBox = styled(Box)({ width: 24, height: 24, backgroundColor: '#E5ECF6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 });
const FileName = styled(Typography)({ fontSize: '14px', color: '#1C1C1C', fontFamily: "'Inter', sans-serif", lineHeight: '18px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 });

// Buttons
const ButtonsRow = styled(Box)({ display: 'flex', gap: '16px', alignItems: 'center' });
const SaveButton = styled(Box)<{ disabled?: boolean }>(({ disabled }) => ({ backgroundColor: disabled ? 'rgba(28,28,28,0.3)' : '#000000', color: '#FFFFFF', fontSize: '14px', fontWeight: 500, fontFamily: "'Inter', sans-serif", lineHeight: '20px', height: '36px', padding: '4px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', cursor: disabled ? 'not-allowed' : 'pointer', '&:hover': { opacity: disabled ? 1 : 0.85 } }));
const CancelButton = styled(Box)({ border: '1px solid rgba(28,28,28,0.1)', color: '#1C1C1C', fontSize: '14px', fontWeight: 400, fontFamily: "'Inter', sans-serif", lineHeight: '20px', height: '36px', padding: '4px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(28,28,28,0.04)' } });

// ─── Constants ────────────────────────────────────────────────────────────────

const PRONOUNS_OPTIONS = ['', 'None', 'He/Him', 'She/Her', 'They/Them', 'Ze/Zir', 'Other'];
const TIMEZONE_OPTIONS = ['', 'UTC', 'GMT', 'Europe/London', 'Europe/Paris', 'America/New_York', 'America/Chicago', 'America/Los_Angeles', 'Asia/Dubai', 'Asia/Karachi', 'Asia/Kolkata'];
const ETHNICITY_OPTIONS = ['', 'Unknown', 'White British', 'White Irish', 'White Other', 'Mixed White & Black Caribbean', 'Mixed White & Black African', 'Mixed White & Asian', 'Mixed Other', 'Asian/Asian British - Indian', 'Asian/Asian British - Pakistani', 'Asian/Asian British - Bangladeshi', 'Asian/Asian British - Chinese', 'Asian/Asian British - Other', 'Black/African/Caribbean - African', 'Black/African/Caribbean - Caribbean', 'Black/African/Caribbean - Other', 'Arab', 'Other'];
const SEX_OPTIONS = ['', 'Unknown', 'Male', 'Female', 'Not provided'];
const LLDD_STATUS_OPTIONS = ['', 'No known learning difficulty or health problem', 'Learner considers himself or herself to have a learning difficulty and/or health problem', 'Not provided'];
const PRIMARY_LLDD_OPTIONS = ['', 'None', 'Dyslexia', 'Dyscalculia', 'Autism Spectrum Disorder', 'Visual Impairment', 'Hearing Impairment', 'Physical Disability', 'Mental Health Difficulty', 'Social/Emotional Difficulty', 'Other', 'Not provided'];

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  pronouns: string;
  landline: string;
  mobile: string;
  skype: string;
  website: string;
  workplace: string;
  workAddress: string;
  timezone: string;
  homeAddress: string;
  ethnicity: string;
  sex: string;
  llddStatus: string;
  primaryLldd: string;
}

interface Attachment { name: string; url: string; uploadedAt?: string; }

const EMPTY_FORM: ProfileFormData = { firstName: '', lastName: '', email: '', pronouns: '', landline: '', mobile: '', skype: '', website: '', workplace: '', workAddress: '', timezone: '', homeAddress: '', ethnicity: '', sex: '', llddStatus: '', primaryLldd: '' };

function getApiBase() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
}

// ─── Sub-component: editable text field ──────────────────────────────────────

function EditField({ label, value, onChange, placeholder, width }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; width?: string | number;
}) {
  return (
    <FormField width={width}>
      <FieldLabel>{label}</FieldLabel>
      <FieldInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? 'Enter value'}
      />
    </FormField>
  );
}

// ─── Sub-component: editable select field ────────────────────────────────────

function SelectField({ label, value, onChange, options, width }: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; width?: string | number;
}) {
  return (
    <FormField width={width}>
      <FieldLabel>{label}</FieldLabel>
      <FieldSelect value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt || '— Select —'}</option>
        ))}
      </FieldSelect>
      <DropdownArrow><UnfoldMoreIcon sx={{ fontSize: '14px' }} /></DropdownArrow>
    </FormField>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface ProfilePageProps {
  layout: React.FC<{ pageTitle?: string; children: React.ReactNode }>;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ layout: Layout }) => {
  const router = useRouter();
  const { user: authUser } = useAuth();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const [form, setForm] = useState<ProfileFormData>(EMPTY_FORM);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const showToast = (message: string, severity: 'success' | 'error' = 'success') => {
    setToast({ open: true, message, severity });
  };

  // ── Fetch current user on mount ──────────────────────────────────────────

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get<any>('/users/me');
      const u = res?.data ?? res;
      setForm({
        firstName: u.firstName ?? '',
        lastName: u.lastName ?? '',
        email: u.email ?? '',
        pronouns: u.pronouns ?? '',
        landline: u.landline ?? '',
        mobile: u.mobile ?? u.phone ?? '',
        skype: u.skype ?? '',
        website: u.website ?? '',
        workplace: u.workplace ?? '',
        workAddress: u.workAddress ?? u.address ?? '',
        timezone: u.timezone ?? '',
        homeAddress: u.homeAddress ?? '',
        ethnicity: u.ethnicity ?? '',
        sex: u.sex ?? '',
        llddStatus: u.llddStatus ?? '',
        primaryLldd: u.primaryLldd ?? '',
      });
      setAvatarUrl(u.avatar ?? null);
      setAttachments(u.attachments ?? []);
      if (u.updatedAt) {
        setLastUpdated(new Date(u.updatedAt).toLocaleString('en-GB'));
      }
    } catch {
      showToast('Failed to load profile', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  // ── Field change handler ──────────────────────────────────────────────────

  const setField = (key: keyof ProfileFormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ── Save profile ──────────────────────────────────────────────────────────

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiClient.patch('/users/me', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        pronouns: form.pronouns || undefined,
        landline: form.landline || undefined,
        mobile: form.mobile || undefined,
        phone: form.mobile || undefined,
        skype: form.skype || undefined,
        website: form.website || undefined,
        workplace: form.workplace || undefined,
        workAddress: form.workAddress || undefined,
        address: form.workAddress || undefined,
        timezone: form.timezone || undefined,
        homeAddress: form.homeAddress || undefined,
        ethnicity: form.ethnicity || undefined,
        sex: form.sex || undefined,
        llddStatus: form.llddStatus || undefined,
        primaryLldd: form.primaryLldd || undefined,
      });
      setLastUpdated(new Date().toLocaleString('en-GB'));
      showToast('Profile updated successfully');
    } catch (err: any) {
      showToast(err?.message ?? 'Failed to save profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // ── Avatar upload ─────────────────────────────────────────────────────────

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingAvatar(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${getApiBase()}/users/me/avatar`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      const url = data?.data?.url ?? data?.url;
      setAvatarUrl(`http://localhost:3001${url}`);
      showToast('Avatar updated');
    } catch {
      showToast('Failed to upload avatar', 'error');
    } finally {
      setIsUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = '';
    }
  };

  // ── Attachment upload ─────────────────────────────────────────────────────

  const uploadFile = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      showToast('File must be under 10 MB', 'error');
      return;
    }
    setIsUploadingFile(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${getApiBase()}/users/me/attachments`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      const updated = data?.data ?? data;
      setAttachments(updated?.attachments ?? []);
      showToast('File uploaded successfully');
    } catch {
      showToast('Failed to upload file', 'error');
    } finally {
      setIsUploadingFile(false);
      if (attachInputRef.current) attachInputRef.current.value = '';
    }
  };

  const handleAttachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleRemoveAttachment = async (url: string) => {
    try {
      const filename = url.split('/').pop() ?? '';
      await apiClient.delete(`/users/me/attachments/${filename}`);
      setAttachments((prev) => prev.filter((a) => a.url !== url));
      showToast('Attachment removed');
    } catch {
      showToast('Failed to remove attachment', 'error');
    }
  };

  // ── Computed ──────────────────────────────────────────────────────────────

  const displayName = `${form.firstName} ${form.lastName}`.trim() || authUser?.name || 'User';
  const initials = displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  // ─────────────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <Layout pageTitle="My Profile">
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '80px' }}>
          <CircularProgress sx={{ color: '#7B61FF' }} />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="My Profile">
      <PageWrapper>
        <CardTitleBar>
          <CardTitleText>My Profile</CardTitleText>
        </CardTitleBar>

        <CardBody>
          {/* ── Top Row ── */}
          <TopRow>
            <AvatarBlock>
              <AvatarNameBox>
                {/* Hidden file inputs */}
                <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />

                <AvatarCircle onClick={() => avatarInputRef.current?.click()}>
                  {isUploadingAvatar ? (
                    <CircularProgress size={24} sx={{ color: '#7B61FF' }} />
                  ) : avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Box sx={{ fontSize: '22px', fontWeight: 700, color: 'rgba(28,28,28,0.5)', fontFamily: "'Inter', sans-serif" }}>
                      {initials}
                    </Box>
                  )}
                  <AvatarOverlay className="avatar-overlay">
                    <EditIcon sx={{ fontSize: '20px', color: '#fff' }} />
                  </AvatarOverlay>
                </AvatarCircle>
                <AvatarName>{displayName}</AvatarName>
              </AvatarNameBox>
              <UploadButton onClick={() => avatarInputRef.current?.click()}>
                Upload new profile picture
              </UploadButton>
            </AvatarBlock>

            <InfoCard>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                {lastUpdated && (
                  <InfoCardRow>
                    <CheckBoxIcon sx={{ fontSize: '22px', color: '#1C1C1C' }} />
                    <InfoCardText>This page was last updated on {lastUpdated}.</InfoCardText>
                  </InfoCardRow>
                )}
                <InfoCardRow>
                  <CheckBoxIcon sx={{ fontSize: '22px', color: '#1C1C1C' }} />
                  <InfoCardText>
                    Please note emails are now managed on the &lsquo;Email Preferences&rsquo; page
                  </InfoCardText>
                </InfoCardRow>
              </Box>
            </InfoCard>
          </TopRow>

          {/* ── My Details ── */}
          <Section>
            <SectionTitle>My Details</SectionTitle>

            <FieldsRow>
              <SelectField label="Pronouns" value={form.pronouns} onChange={setField('pronouns')} options={PRONOUNS_OPTIONS} />
              <EditField label="Landline telephone number" value={form.landline} onChange={setField('landline')} placeholder="e.g. 01234 567890" />
              <EditField label="Mobile telephone number" value={form.mobile} onChange={setField('mobile')} placeholder="e.g. 07700 900000" />
            </FieldsRow>

            <FieldsRow>
              <EditField label="Skype name" value={form.skype} onChange={setField('skype')} placeholder="Skype username" />
              <EditField label="Website link (Facebook, Twitter, etc.)" value={form.website} onChange={setField('website')} placeholder="https://" />
              <EditField label="Name of study/work place (e.g. employer name)" value={form.workplace} onChange={setField('workplace')} placeholder="Employer name" />
            </FieldsRow>

            <FieldsRow>
              <EditField label="Address of study / work" value={form.workAddress} onChange={setField('workAddress')} placeholder="Work address" />
              <SelectField label="Time Zone" value={form.timezone} onChange={setField('timezone')} options={TIMEZONE_OPTIONS} />
              <EditField label="Home address (including post code)" value={form.homeAddress} onChange={setField('homeAddress')} placeholder="Home address" />
            </FieldsRow>
          </Section>

          {/* ── Attachments ── */}
          <Section>
            <SectionTitle>
              Attachments (CV, qualification certificates &amp; other professional documents)
            </SectionTitle>

            <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', overflow: 'hidden' }}>
              <AttachBarRow sx={{ padding: '16px' }}>
                <Box sx={{ fontSize: '13px', color: 'rgba(28,28,28,0.5)', fontFamily: "'Inter', sans-serif" }}>
                  Supported: JPG, PNG, PDF, DOC, DOCX, XLS, XLSX · Max 10 MB
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#1C1C1C', fontFamily: "'Inter', sans-serif", textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() => attachInputRef.current?.click()}>
                  View supported file types
                  <InfoIcon sx={{ fontSize: '16px', color: 'rgba(28,28,28,0.5)' }} />
                </Box>
              </AttachBarRow>

              <input ref={attachInputRef} type="file" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt" style={{ display: 'none' }} onChange={handleAttachChange} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 16px', alignItems: 'center' }}>
                <DropzoneBox
                  sx={{ width: '100%' }}
                  dragging={dragging}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => attachInputRef.current?.click()}
                >
                  <Box sx={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {isUploadingFile
                      ? <CircularProgress size={28} sx={{ color: '#7B61FF' }} />
                      : <CloudUploadIcon sx={{ fontSize: '36px', color: 'rgba(28,28,28,0.3)' }} />}
                  </Box>
                  <Box sx={{ display: 'flex', gap: '56px', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 272 }}>
                      <Typography sx={{ fontSize: '13px', color: '#000', fontFamily: "'Inter', sans-serif" }}>
                        {dragging ? 'Drop file here' : 'Select a file or drag and drop here'}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: 'rgba(28,28,28,0.4)', fontFamily: "'Inter', sans-serif" }}>
                        JPG, PNG or PDF, file size no more than 10MB
                      </Typography>
                    </Box>
                    <SelectFileBtn onClick={(e) => { e.stopPropagation(); attachInputRef.current?.click(); }}>
                      Select file
                    </SelectFileBtn>
                  </Box>
                </DropzoneBox>

                {/* Uploaded files */}
                {attachments.length > 0 && (
                  <Box sx={{ width: '100%' }}>
                    {attachments.map((att, i) => (
                      <FileRow key={i}>
                        <FileIconBox>
                          <FileIcon sx={{ fontSize: '14px', color: '#4A90D9' }} />
                        </FileIconBox>
                        <FileName>
                          <a href={`http://localhost:3001${att.url}`} target="_blank" rel="noreferrer" style={{ color: '#4A90D9', textDecoration: 'none' }}>
                            {att.name}
                          </a>
                        </FileName>
                        <Box
                          onClick={() => handleRemoveAttachment(att.url)}
                          sx={{ cursor: 'pointer', color: 'rgba(28,28,28,0.4)', display: 'flex', alignItems: 'center', '&:hover': { color: '#D32F2F' } }}
                        >
                          <DeleteIcon sx={{ fontSize: '16px' }} />
                        </Box>
                      </FileRow>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Section>

          {/* ── Equality, LLDD and Health ── */}
          <Section>
            <SectionTitle>Equality, LLDD and Health</SectionTitle>

            <FieldsRow>
              <SelectField label="Ethnicity" value={form.ethnicity} onChange={setField('ethnicity')} options={ETHNICITY_OPTIONS} width={398} />
              <SelectField
                label="Learner's LLDD and Health Status"
                value={form.llddStatus}
                onChange={setField('llddStatus')}
                options={LLDD_STATUS_OPTIONS}
              />
            </FieldsRow>

            <FieldsRow>
              <SelectField label="Sex" value={form.sex} onChange={setField('sex')} options={SEX_OPTIONS} width={398} />
              <SelectField
                label="Primary LLDD or Health Condition"
                value={form.primaryLldd}
                onChange={setField('primaryLldd')}
                options={PRIMARY_LLDD_OPTIONS}
              />
            </FieldsRow>
          </Section>

          {/* ── Buttons ── */}
          <ButtonsRow>
            <SaveButton disabled={isSaving} onClick={isSaving ? undefined : handleSave}>
              {isSaving ? <CircularProgress size={16} sx={{ color: '#fff', mr: '8px' }} /> : null}
              {isSaving ? 'Saving…' : 'Save Changes'}
            </SaveButton>
            <CancelButton onClick={() => router.back()}>Cancel</CancelButton>
          </ButtonsRow>
        </CardBody>
      </PageWrapper>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={toast.severity} onClose={() => setToast((t) => ({ ...t, open: false }))} sx={{ fontFamily: "'Inter', sans-serif" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default ProfilePage;
