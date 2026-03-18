/**
 * Learner - Learning Activity Evidence page
 * Matches Figma node 236:137549
 * Modals: Create Link (40000074:37809), Manage Folder (40000074:37218)
 */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  InputBase,
  Dialog,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArrowBack as ArrowBackIcon,
  CloudUploadOutlined as CloudUploadIcon,
  InfoOutlined as InfoIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import LearnerLayout from '@/modules/learner/layout/LearnerLayout';

// ─── Styled Components ────────────────────────────────────────────────────────

const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  fontFamily: "'Inter', sans-serif",
});

const PageHeaderRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const BackButton = styled(Box)({
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: '1px solid rgba(28,28,28,0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.05)' },
});

const PageTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

const ContentCard = styled(Box)({
  backgroundColor: '#FFFFFF',
  borderRadius: '16px',
  border: '1px solid rgba(28,28,28,0.1)',
  overflow: 'hidden',
});

const FilterBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 20px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
  flexWrap: 'wrap',
});

const FilterLabel = styled(Typography)({
  fontSize: '13px',
  color: 'rgba(28,28,28,0.6)',
  fontFamily: "'Inter', sans-serif",
  whiteSpace: 'nowrap',
});

const StyledSelect = styled(Select)({
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
  height: '32px',
  minWidth: '110px',
  backgroundColor: '#F5F5F5',
  borderRadius: '8px',
  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
  '& .MuiSelect-select': { padding: '4px 8px', paddingRight: '24px !important' },
});

const DarkPillButton = styled(Box)({
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '20px',
  padding: '6px 16px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '&:hover': { backgroundColor: '#333333' },
});

const InfoHint = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '12px',
  color: '#4A90D9',
  fontFamily: "'Inter', sans-serif",
  cursor: 'pointer',
  marginLeft: 'auto',
  whiteSpace: 'nowrap',
  '&:hover': { textDecoration: 'underline' },
});

const DropzoneWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '36px 24px',
  margin: '20px',
  border: '2px dashed rgba(28,28,28,0.15)',
  borderRadius: '12px',
  backgroundColor: '#FAFAFA',
  cursor: 'pointer',
  transition: 'border-color 0.15s ease, background-color 0.15s ease',
  '&:hover': {
    borderColor: 'rgba(28,28,28,0.3)',
    backgroundColor: '#F5F5F5',
  },
});

const DropzoneTitle = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

const DropzoneSubtitle = styled(Typography)({
  fontSize: '12px',
  color: 'rgba(28,28,28,0.45)',
  fontFamily: "'Inter', sans-serif",
});

const SelectFileButton = styled(Box)({
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '20px',
  padding: '8px 24px',
  cursor: 'pointer',
  marginTop: '4px',
  '&:hover': { backgroundColor: '#333333' },
});

const TableControlsRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 20px',
  borderTop: '1px solid rgba(28,28,28,0.08)',
  flexWrap: 'wrap',
  gap: '12px',
});

const TableTitle = styled(Typography)({
  fontSize: '13px',
  fontWeight: 600,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

const TableControlsRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const ControlLabel = styled(Typography)({
  fontSize: '12px',
  color: 'rgba(28,28,28,0.6)',
  fontFamily: "'Inter', sans-serif",
  whiteSpace: 'nowrap',
});

const DateFilterRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 20px',
  borderTop: '1px solid rgba(28,28,28,0.08)',
  flexWrap: 'wrap',
});

const DateInput = styled(InputBase)({
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
  height: '34px',
  padding: '0 10px',
  backgroundColor: '#F5F5F5',
  borderRadius: '8px',
  minWidth: '140px',
  '& input': { padding: 0 },
});

const DateLabel = styled(Typography)({
  fontSize: '13px',
  color: 'rgba(28,28,28,0.6)',
  fontFamily: "'Inter', sans-serif",
  whiteSpace: 'nowrap',
});

const SubmitButton = styled(Box)({
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '20px',
  padding: '6px 20px',
  cursor: 'pointer',
  '&:hover': { backgroundColor: '#333333' },
});

const StyledTable = styled(Table)({
  borderCollapse: 'collapse',
  width: '100%',
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#F9F9F9',
});

const StyledHeadCell = styled(TableCell)({
  fontSize: '12px',
  fontWeight: 600,
  color: 'rgba(28,28,28,0.5)',
  fontFamily: "'Inter', sans-serif",
  padding: '10px 16px',
  borderBottom: '1px solid rgba(28,28,28,0.08)',
  whiteSpace: 'nowrap',
});

const StyledBodyCell = styled(TableCell)({
  fontSize: '13px',
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  padding: '10px 16px',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  verticalAlign: 'middle',
});

const ActionPillsWrapper = styled(Box)({
  display: 'flex',
  gap: '6px',
  flexWrap: 'nowrap',
});

const ActionPill = styled(Box)({
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  fontSize: '11px',
  fontWeight: 500,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '20px',
  padding: '4px 10px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '&:hover': { opacity: 0.85 },
});

const ActionPillDanger = styled(Box)({
  backgroundColor: '#C0392B',
  color: '#FFFFFF',
  fontSize: '11px',
  fontWeight: 500,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '20px',
  padding: '4px 10px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '&:hover': { opacity: 0.85 },
});

// ─── Modal Styled Components ──────────────────────────────────────────────────

const ModalHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '18px 22px 14px',
  backgroundColor: '#F7F7F7',
  borderBottom: '1px solid rgba(28,28,28,0.1)',
});

const ModalTitle = styled(Typography)({
  fontSize: '17px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
});

const ModalCloseBtn = styled(Box)({
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  border: '1.5px solid rgba(28,28,28,0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#1C1C1C',
  fontWeight: 500,
  lineHeight: 1,
  userSelect: 'none' as const,
  flexShrink: 0,
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.06)' },
});

const ModalBody = styled(Box)({
  padding: '22px',
});

const ModalFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  padding: '14px 22px 18px',
  borderTop: '1px solid rgba(28,28,28,0.08)',
});

const ModalDarkBtn = styled(Box)({
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '20px',
  padding: '7px 22px',
  cursor: 'pointer',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
});

/* Create Link specific */
const CLInstructionText = styled(Typography)({
  fontSize: '13px',
  color: 'rgba(28,28,28,0.65)',
  fontFamily: "'Inter', sans-serif",
  textAlign: 'center',
  marginBottom: '10px',
  lineHeight: 1.5,
});

const CLInput = styled('input')({
  width: '100%',
  border: '1px solid rgba(28,28,28,0.2)',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
  color: '#1C1C1C',
  outline: 'none',
  boxSizing: 'border-box' as const,
  backgroundColor: '#FAFAFA',
});

const CLExamplesTitle = styled(Typography)({
  fontSize: '13px',
  fontWeight: 700,
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  marginTop: '14px',
  marginBottom: '4px',
});

const CLExampleLink = styled(Typography)({
  fontSize: '13px',
  color: 'rgba(28,28,28,0.55)',
  fontFamily: "'Inter', sans-serif",
  lineHeight: 1.7,
});

/* Manage Folder specific */
const MFCreateBtn = styled(Box)({
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '20px',
  padding: '7px 18px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  marginBottom: '14px',
  '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
});

const MFTableHead = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 140px',
  padding: '8px 14px',
  borderBottom: '1px solid rgba(28,28,28,0.1)',
});

const MFTableHeadCell = styled(Typography)({
  fontSize: '12px',
  fontWeight: 500,
  color: 'rgba(28,28,28,0.45)',
  fontFamily: "'Inter', sans-serif",
});

const MFTableRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 140px',
  padding: '13px 14px',
  alignItems: 'center',
  borderBottom: '1px solid rgba(28,28,28,0.06)',
  '&:last-child': { borderBottom: 'none' },
});

const MFFolderName = styled(Typography)({
  fontSize: '13px',
  color: '#1C1C1C',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
});

const MFActions = styled(Box)({ display: 'flex', gap: '6px' });

const MFEditBtn = styled(Box)({
  backgroundColor: '#1C1C1C',
  color: '#FFFFFF',
  fontSize: '12px',
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '20px',
  padding: '5px 14px',
  cursor: 'pointer',
  '&:hover': { opacity: 0.85 },
});

const MFDeleteBtn = styled(Box)({
  backgroundColor: '#C0392B',
  color: '#FFFFFF',
  fontSize: '12px',
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
  borderRadius: '20px',
  padding: '5px 14px',
  cursor: 'pointer',
  '&:hover': { opacity: 0.85 },
});

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface FileRow {
  id: string;
  title: string;
  folder: string;
  type: string;
  size: string;
  usedIn: number;
}

const MOCK_FILES: FileRow[] = [
  { id: '1', title: 'Health & Safety Certificate.pdf',      folder: 'Certificates',  type: 'PDF',  size: '1.2 MB', usedIn: 3 },
  { id: '2', title: 'Unit 1 - Knowledge Assessment.docx',   folder: 'Assessments',   type: 'DOCX', size: '540 KB', usedIn: 1 },
  { id: '3', title: 'Progress Review Notes - Q3.pdf',       folder: 'Reviews',       type: 'PDF',  size: '820 KB', usedIn: 2 },
  { id: '4', title: 'OTJ Training Log - October 2024.xlsx', folder: 'Training Logs', type: 'XLSX', size: '98 KB',  usedIn: 0 },
];

const FOLDERS = ['All folders', 'Certificates', 'Assessments', 'Reviews', 'Training Logs'];

interface FolderItem {
  id: string;
  name: string;
}

const INITIAL_FOLDERS: FolderItem[] = [
  { id: '1', name: 'Abc Radio' },
  { id: '2', name: 'Sheba XYZ' },
  { id: '3', name: 'My Folder' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const LearningActivityEvidence: React.FC = () => {
  const router = useRouter();
  const [selectedFolder, setSelectedFolder] = useState('All folders');
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [manageFoldersOpen, setManageFoldersOpen] = useState(false);
  const [createLinkOpen, setCreateLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [folders, setFolders] = useState<FolderItem[]>(INITIAL_FOLDERS);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState('');
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({ open: false, message: '', severity: 'info' });

  const filtered =
    selectedFolder === 'All folders'
      ? MOCK_FILES
      : MOCK_FILES.filter((f) => f.folder === selectedFolder);

  const showToast = (message: string, severity: 'success' | 'error' | 'info' = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const buildShareLink = (row: FileRow) => {
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    return `${base}/learner-dashboard/evidence?file=${encodeURIComponent(row.id)}`;
  };

  const handleCopyLink = async (row: FileRow) => {
    const link = buildShareLink(row);
    try {
      await navigator.clipboard.writeText(link);
      showToast('Link copied to clipboard', 'success');
    } catch (_err) {
      showToast('Could not copy link', 'error');
    }
  };

  const handleEdit = (row: FileRow) => {
    showToast('Edit: ' + row.title, 'info');
  };

  const handleDelete = (row: FileRow) => {
    showToast('Delete: ' + row.title, 'info');
  };

  const handleCreateLink = () => {
    if (linkUrl.trim()) {
      showToast('Link created successfully', 'success');
    }
    setCreateLinkOpen(false);
    setLinkUrl('');
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      setFolders((prev) => [
        ...prev,
        { id: String(Date.now()), name: newFolderName.trim() },
      ]);
      setNewFolderName('');
    }
  };

  const handleSaveEditFolder = (id: string) => {
    if (editingFolderName.trim()) {
      setFolders((prev) =>
        prev.map((f) => (f.id === id ? { ...f, name: editingFolderName.trim() } : f))
      );
    }
    setEditingFolderId(null);
    setEditingFolderName('');
  };

  const handleDeleteFolder = (id: string) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <LearnerLayout pageTitle="Learning Activity Evidence">
      <PageContainer>

        {/* Page Header */}
        <PageHeaderRow>
          <BackButton onClick={() => router.back()}>
            <ArrowBackIcon sx={{ fontSize: '18px', color: '#1C1C1C' }} />
          </BackButton>
          <PageTitle>Learning Activity Evidence</PageTitle>
        </PageHeaderRow>

        {/* Main Content Card */}
        <ContentCard>

          {/* Filter Bar */}
          <FilterBar>
            <FilterLabel>Show uploaded files from:</FilterLabel>
            <StyledSelect
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value as string)}
              variant="outlined"
              size="small"
            >
              {FOLDERS.map((f) => (
                <MenuItem key={f} value={f} sx={{ fontSize: '13px' }}>{f}</MenuItem>
              ))}
            </StyledSelect>

            <DarkPillButton onClick={() => setManageFoldersOpen(true)}>Manage folders</DarkPillButton>
            <DarkPillButton onClick={() => setCreateLinkOpen(true)}>Create link</DarkPillButton>

            <InfoHint>
              <InfoIcon sx={{ fontSize: '14px' }} />
              View supported file types
            </InfoHint>
          </FilterBar>

          {/* Upload Dropzone */}
          <DropzoneWrapper>
            <CloudUploadIcon sx={{ fontSize: '40px', color: 'rgba(28,28,28,0.25)' }} />
            <DropzoneTitle>Select a file or drag and drop here</DropzoneTitle>
            <DropzoneSubtitle>JPG, PNG, PDF, DOCX or XLSX - max file size 20 MB</DropzoneSubtitle>
            <SelectFileButton>SELECT FILE</SelectFileButton>
          </DropzoneWrapper>

          {/* Table Controls Row */}
          <TableControlsRow>
            <TableTitle>
              Uploaded Files in {selectedFolder} (
              {filtered.length > 0 ? `1 - ${filtered.length} of ${filtered.length}` : '0'})
            </TableTitle>
            <TableControlsRight>
              <ControlLabel>Page number:</ControlLabel>
              <StyledSelect
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                variant="outlined"
                size="small"
                sx={{ minWidth: '60px' }}
              >
                {[1, 2, 3].map((n) => (
                  <MenuItem key={n} value={n} sx={{ fontSize: '13px' }}>{n}</MenuItem>
                ))}
              </StyledSelect>

              <ControlLabel>Records per page:</ControlLabel>
              <StyledSelect
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                variant="outlined"
                size="small"
                sx={{ minWidth: '60px' }}
              >
                {[10, 25, 50, 100].map((n) => (
                  <MenuItem key={n} value={n} sx={{ fontSize: '13px' }}>{n}</MenuItem>
                ))}
              </StyledSelect>
            </TableControlsRight>
          </TableControlsRow>

          {/* Date Filter Row */}
          <DateFilterRow>
            <DateLabel>Date From:</DateLabel>
            <DateInput
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <DateLabel>Date To:</DateLabel>
            <DateInput
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
            <SubmitButton>Submit</SubmitButton>
          </DateFilterRow>

          {/* Files Table */}
          <StyledTable>
            <StyledTableHead>
              <TableRow>
                <StyledHeadCell>Title</StyledHeadCell>
                <StyledHeadCell>Folder</StyledHeadCell>
                <StyledHeadCell>Type</StyledHeadCell>
                <StyledHeadCell>Size</StyledHeadCell>
                <StyledHeadCell align="center">Used in Learning Activities</StyledHeadCell>
                <StyledHeadCell>Action</StyledHeadCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <StyledBodyCell colSpan={6} align="center" sx={{ color: 'rgba(28,28,28,0.4)', py: 4 }}>
                    No files uploaded yet.
                  </StyledBodyCell>
                </TableRow>
              ) : (
                filtered.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:hover': { backgroundColor: 'rgba(28,28,28,0.02)' } }}
                  >
                    <StyledBodyCell sx={{ fontWeight: 500 }}>{row.title}</StyledBodyCell>
                    <StyledBodyCell>{row.folder}</StyledBodyCell>
                    <StyledBodyCell>
                      <Box
                        sx={{
                          display: 'inline-block',
                          backgroundColor: 'rgba(28,28,28,0.06)',
                          borderRadius: '4px',
                          padding: '2px 8px',
                          fontSize: '11px',
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {row.type}
                      </Box>
                    </StyledBodyCell>
                    <StyledBodyCell sx={{ color: 'rgba(28,28,28,0.55)' }}>{row.size}</StyledBodyCell>
                    <StyledBodyCell align="center">{row.usedIn}</StyledBodyCell>
                    <StyledBodyCell>
                      <ActionPillsWrapper>
                        <ActionPill onClick={() => handleCopyLink(row)}>Copy Link</ActionPill>
                        <ActionPill onClick={() => handleEdit(row)}>Edit</ActionPill>
                        <ActionPillDanger onClick={() => handleDelete(row)}>Delete</ActionPillDanger>
                      </ActionPillsWrapper>
                    </StyledBodyCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </StyledTable>

        </ContentCard>

        {/* ── Create Link Modal (Figma 40000074:37809) ── */}
        <Dialog
          open={createLinkOpen}
          onClose={() => { setCreateLinkOpen(false); setLinkUrl(''); }}
          PaperProps={{
            sx: {
              borderRadius: '16px',
              overflow: 'hidden',
              width: '520px',
              maxWidth: '95vw',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
              m: 0,
            },
          }}
        >
          <ModalHeader>
            <ModalTitle>Create a link</ModalTitle>
            <ModalCloseBtn onClick={() => { setCreateLinkOpen(false); setLinkUrl(''); }}>
              x
            </ModalCloseBtn>
          </ModalHeader>

          <ModalBody>
            <CLInstructionText>
              Type the full web address (URL) of the website or page to link to:
            </CLInstructionText>
            <CLInput
              type="url"
              placeholder=""
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <CLExamplesTitle>Axamples:</CLExamplesTitle>
            <CLExampleLink>http://www.google.co.uk</CLExampleLink>
            <CLExampleLink>http://myintranet/somepage.htm</CLExampleLink>
          </ModalBody>

          <ModalFooter>
            <ModalDarkBtn onClick={handleCreateLink}>Create</ModalDarkBtn>
            <ModalDarkBtn onClick={() => { setCreateLinkOpen(false); setLinkUrl(''); }}>
              Cancle
            </ModalDarkBtn>
          </ModalFooter>
        </Dialog>

        {/* ── Manage Folder Modal (Figma 40000074:37218) ── */}
        <Dialog
          open={manageFoldersOpen}
          onClose={() => setManageFoldersOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: '16px',
              overflow: 'hidden',
              width: '520px',
              maxWidth: '95vw',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
              m: 0,
            },
          }}
        >
          <ModalHeader>
            <ModalTitle>Manage folder</ModalTitle>
            <ModalCloseBtn onClick={() => setManageFoldersOpen(false)}>
              x
            </ModalCloseBtn>
          </ModalHeader>

          <ModalBody sx={{ pb: '18px' }}>
            {/* Create Folder row */}
            <Box sx={{ display: 'flex', gap: '8px', mb: '16px', alignItems: 'center' }}>
              <MFCreateBtn
                onClick={handleAddFolder}
                sx={{ mb: 0 }}
              >
                <AddIcon sx={{ fontSize: '14px' }} />
                Create Folder +
              </MFCreateBtn>
              <Box
                component="input"
                placeholder="New folder name..."
                value={newFolderName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewFolderName(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') handleAddFolder();
                }}
                sx={{
                  flex: 1,
                  border: '1px solid rgba(28,28,28,0.2)',
                  borderRadius: '8px',
                  padding: '7px 12px',
                  fontSize: '13px',
                  fontFamily: "'Inter', sans-serif",
                  outline: 'none',
                  backgroundColor: '#FAFAFA',
                  '&:focus': { borderColor: '#1C1C1C' },
                }}
              />
            </Box>

            {/* Folder table */}
            <Box sx={{ border: '1px solid rgba(28,28,28,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
              <MFTableHead>
                <MFTableHeadCell>Folders</MFTableHeadCell>
                <MFTableHeadCell>Action</MFTableHeadCell>
              </MFTableHead>

              {folders.map((folder) => (
                <MFTableRow key={folder.id}>
                  {editingFolderId === folder.id ? (
                    <Box
                      component="input"
                      value={editingFolderName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEditingFolderName(e.target.value)
                      }
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') handleSaveEditFolder(folder.id);
                        if (e.key === 'Escape') {
                          setEditingFolderId(null);
                          setEditingFolderName('');
                        }
                      }}
                      autoFocus
                      sx={{
                        border: '1px solid rgba(28,28,28,0.2)',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '13px',
                        fontFamily: "'Inter', sans-serif",
                        outline: 'none',
                        width: '100%',
                        '&:focus': { borderColor: '#1C1C1C' },
                      }}
                    />
                  ) : (
                    <MFFolderName>{folder.name}</MFFolderName>
                  )}

                  <MFActions>
                    {editingFolderId === folder.id ? (
                      <MFEditBtn onClick={() => handleSaveEditFolder(folder.id)}>
                        Save
                      </MFEditBtn>
                    ) : (
                      <MFEditBtn
                        onClick={() => {
                          setEditingFolderId(folder.id);
                          setEditingFolderName(folder.name);
                        }}
                      >
                        Edit
                      </MFEditBtn>
                    )}
                    <MFDeleteBtn onClick={() => handleDeleteFolder(folder.id)}>
                      Delete
                    </MFDeleteBtn>
                  </MFActions>
                </MFTableRow>
              ))}
            </Box>
          </ModalBody>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={2500}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

      </PageContainer>
    </LearnerLayout>
  );
};

export { LearningActivityEvidence as default };
