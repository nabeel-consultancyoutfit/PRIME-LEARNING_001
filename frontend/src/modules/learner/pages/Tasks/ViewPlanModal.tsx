/**
 * ViewPlanModal — "Set Criteria" modal
 * Figma node: 40000074-43727
 *
 * Opens when the user clicks "View Plan Of Activity/action" on the TaskDetail page.
 *
 * Layout (top → bottom):
 *   ① Modal header  — "Set Criteria" title + close ✕
 *   ② Body
 *      • "Expand all" button (black pill)
 *      • Expandable criteria list (5 items with +/– icon + arrow)
 *      • "Evidence" sub-header
 *      • Rich-text editor (toolbar + textarea)
 *   ③ Footer — Save & Quit | Save | Cancel
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  Backdrop,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseBtn,
  ModalBody,
  ExpandAllBtn,
  CriteriaListBox,
  CriteriaItem,
  CriteriaItemLeft,
  CriteriaItemText,
  CriteriaItemArrow,
  CriteriaExpandedContent,
  SubCriteriaItem,
  EvidenceWrapper,
  EvidenceSectionHeader,
  EvidenceSectionTitle,
  EditorToolbar,
  ToolbarDivider,
  ToolbarBtn,
  FontSizeBox,
  ColorDot,
  EditorTextArea,
  ModalFooter,
  BlackBtn,
  OutlineBtn,
} from './ViewPlanModal.style';

// ─── Icons ────────────────────────────────────────────────────────────────────
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PlusCircleIcon = ({ expanded }: { expanded: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="rgba(28,28,28,0.35)" strokeWidth="1.4" />
    {expanded ? (
      <path d="M6 10h8" stroke="rgba(28,28,28,0.55)" strokeWidth="1.4" strokeLinecap="round" />
    ) : (
      <>
        <path d="M10 6v8" stroke="rgba(28,28,28,0.55)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M6 10h8" stroke="rgba(28,28,28,0.55)" strokeWidth="1.4" strokeLinecap="round" />
      </>
    )}
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 9.5l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckboxIcon = ({ checked }: { checked: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="1.5" width="13" height="13" rx="3"
      stroke={checked ? '#1C1C1C' : 'rgba(28,28,28,0.25)'}
      strokeWidth="1.3"
      fill={checked ? '#1C1C1C' : 'transparent'}
    />
    {checked && (
      <path d="M4 8l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
interface CriterionData {
  id: string;
  label: string;
  subItems: { id: string; label: string }[];
}

const CRITERIA_DATA: CriterionData[] = [
  {
    id: 'ba-standard',
    label: 'Business Administrator Apprenticeship Standard',
    subItems: [
      { id: 'ba-1', label: '[1.1] IT proficiency' },
      { id: 'ba-2', label: '[1.2] Record and document production' },
      { id: 'ba-3', label: '[1.3] Decision making' },
      { id: 'ba-4', label: '[1.4] Interpersonal skills' },
    ],
  },
  {
    id: 'ba-gateway',
    label: 'Business Administrator Gateway to End Point',
    subItems: [
      { id: 'gw-1', label: '[G.1] Portfolio of evidence submitted' },
      { id: 'gw-2', label: '[G.2] English and Maths achieved' },
    ],
  },
  {
    id: 'ncfe-english',
    label: 'NCFE Level 2 Functional Skills Qualification in English (September 2019)',
    subItems: [
      { id: 'en-1', label: '[E.1] Reading' },
      { id: 'en-2', label: '[E.2] Writing' },
      { id: 'en-3', label: '[E.3] Speaking, listening and communicating' },
    ],
  },
  {
    id: 'ncfe-maths',
    label: 'NCFE Level 2 Functional Skills Qualification in Mathematics (September 2019)',
    subItems: [
      { id: 'ma-1', label: '[M.1] Using numbers and the number system' },
      { id: 'ma-2', label: '[M.2] Using common measures, shape and space' },
      { id: 'ma-3', label: '[M.3] Handling information and data' },
    ],
  },
  {
    id: 'ba-epa',
    label: '~ Business Administrator End Point Assessment',
    subItems: [
      { id: 'ep-1', label: '[EP.1] Portfolio-based interview' },
      { id: 'ep-2', label: '[EP.2] Project presentation' },
    ],
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  open: boolean;
  onClose: () => void;
  taskTitle?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
const ViewPlanModal: React.FC<Props> = ({ open, onClose, taskTitle }) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [evidenceText, setEvidenceText] = useState('');

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleChecked = useCallback((id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const expandAll = () => {
    const allExpanded = CRITERIA_DATA.every((c) => expandedIds.has(c.id));
    setExpandedIds(allExpanded ? new Set() : new Set(CRITERIA_DATA.map((c) => c.id)));
  };

  const allExpanded = CRITERIA_DATA.every((c) => expandedIds.has(c.id));

  if (!open) return null;

  return (
    <Backdrop onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>

        {/* ① Header */}
        <ModalHeader>
          <ModalTitle>Set Criteria</ModalTitle>
          <CloseBtn onClick={onClose} aria-label="Close">
            <XIcon />
          </CloseBtn>
        </ModalHeader>

        {/* ② Body */}
        <ModalBody>

          {/* Expand all */}
          <ExpandAllBtn onClick={expandAll}>
            {allExpanded ? 'Collapse all' : 'Expand all'}
            {allExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </ExpandAllBtn>

          {/* Criteria list */}
          <CriteriaListBox>
            {CRITERIA_DATA.map((criterion) => {
              const isExpanded = expandedIds.has(criterion.id);
              return (
                <React.Fragment key={criterion.id}>
                  <CriteriaItem onClick={() => toggleExpanded(criterion.id)}>
                    <CriteriaItemLeft>
                      <PlusCircleIcon expanded={isExpanded} />
                      <CriteriaItemText title={criterion.label}>
                        {criterion.label}
                      </CriteriaItemText>
                    </CriteriaItemLeft>
                    <CriteriaItemArrow>
                      {isExpanded ? <ChevronUpIcon /> : <ChevronRightIcon />}
                    </CriteriaItemArrow>
                  </CriteriaItem>

                  {isExpanded && (
                    <CriteriaExpandedContent>
                      {criterion.subItems.map((sub) => (
                        <SubCriteriaItem
                          key={sub.id}
                          onClick={() => toggleChecked(sub.id)}
                        >
                          <CheckboxIcon checked={checkedIds.has(sub.id)} />
                          <span>{sub.label}</span>
                        </SubCriteriaItem>
                      ))}
                    </CriteriaExpandedContent>
                  )}
                </React.Fragment>
              );
            })}
          </CriteriaListBox>

          {/* Evidence sub-section */}
          <EvidenceWrapper>
            <EvidenceSectionHeader>
              <EvidenceSectionTitle>Evidence</EvidenceSectionTitle>
            </EvidenceSectionHeader>

            {/* Editor toolbar */}
            <EditorToolbar>
              <FontSizeBox>
                14 <ChevronDownIcon />
              </FontSizeBox>
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
              <ToolbarBtn title="Ordered list">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3.5h7M5 7h7M5 10.5h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <text x="0.5" y="5" fontSize="5" fill="currentColor" fontFamily="Inter">1</text>
                  <text x="0.5" y="8.5" fontSize="5" fill="currentColor" fontFamily="Inter">2</text>
                  <text x="0.5" y="12" fontSize="5" fill="currentColor" fontFamily="Inter">3</text>
                </svg>
              </ToolbarBtn>
              <ToolbarDivider />
              <ToolbarBtn title="Align left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 3h12M1 7h8M1 11h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </ToolbarBtn>
              <ToolbarBtn title="Align center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 3h12M3 7h8M2 11h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </ToolbarBtn>
              <ToolbarBtn title="Align right">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 3h12M5 7h8M3 11h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </ToolbarBtn>
              <ToolbarDivider />
              <ToolbarBtn title="Link">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5.5 8.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5l-1 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M8.5 5.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </ToolbarBtn>
              <ToolbarBtn title="Image">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="4.5" cy="5.5" r="1" stroke="currentColor" strokeWidth="1.1" />
                  <path d="M1 10l3-3 2 2 3-3 3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ToolbarBtn>
            </EditorToolbar>

            {/* Editor textarea */}
            <EditorTextArea
              placeholder="Write here"
              value={evidenceText}
              onChange={(e) => setEvidenceText(e.target.value)}
            />
          </EvidenceWrapper>

          {/* bottom spacer so footer doesn't overlap last element */}
          <div style={{ height: 4 }} />
        </ModalBody>

        {/* ③ Footer */}
        <ModalFooter>
          <BlackBtn>Save &amp; Quit</BlackBtn>
          <BlackBtn>Save</BlackBtn>
          <OutlineBtn onClick={onClose}>Cancel</OutlineBtn>
        </ModalFooter>

      </ModalContainer>
    </Backdrop>
  );
};

export default ViewPlanModal;
