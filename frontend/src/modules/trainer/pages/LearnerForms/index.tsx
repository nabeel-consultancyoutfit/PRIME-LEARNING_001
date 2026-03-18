/**
 * Trainer — Learner Forms Page
 * Accessible from: Dashboard > Forms & Templates > Learner Forms
 * Pixel-perfect to Figma resource 2018:2710
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import {
  ArrowBackIos,
  SearchOutlined,
  DescriptionOutlined,
  KeyboardArrowDown,
  VisibilityOutlined,
  GetAppOutlined,
  PrintOutlined,
} from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS } from '@/modules/trainer/theme/tokens';

// ─── Form types ───────────────────────────────────────────────────────────────

const FORM_CATEGORIES = [
  {
    id: 'initial',
    title: 'Initial Assessment & Onboarding',
    forms: [
      {
        id: 'initial-assessment',
        name: 'Initial Assessment Form',
        description: 'Assess learner prior knowledge and skills at start of programme',
        status: 'Available',
        lastUpdated: '01/01/2025',
      },
      {
        id: 'training-plan',
        name: 'Individual Training Plan (ITP)',
        description: "Outline the learner's personalised training journey and objectives",
        status: 'Available',
        lastUpdated: '01/01/2025',
      },
      {
        id: 'induction-checklist',
        name: 'Induction Checklist',
        description: 'Verify all induction activities have been completed for the learner',
        status: 'Available',
        lastUpdated: '01/01/2025',
      },
    ],
  },
  {
    id: 'progress',
    title: 'Progress Reviews',
    forms: [
      {
        id: 'progress-review',
        name: 'Progress Review Form',
        description: 'Quarterly review of learner progress against KSBs and off-the-job targets',
        status: 'Available',
        lastUpdated: '01/03/2025',
      },
      {
        id: 'progress-review-actions',
        name: 'Progress Review Action Plan',
        description: 'Record agreed actions and targets from the progress review meeting',
        status: 'Available',
        lastUpdated: '01/03/2025',
      },
    ],
  },
  {
    id: 'otj',
    title: 'Off-The-Job Training',
    forms: [
      {
        id: 'otj-log',
        name: 'Off-The-Job Training Log',
        description: 'Log learner off-the-job training hours and activities',
        status: 'Available',
        lastUpdated: '15/02/2025',
      },
      {
        id: 'otj-declaration',
        name: 'Off-The-Job Training Declaration',
        description: "Learner's declaration confirming recorded OTJ hours are accurate",
        status: 'Available',
        lastUpdated: '15/02/2025',
      },
    ],
  },
  {
    id: 'epa',
    title: 'End Point Assessment',
    forms: [
      {
        id: 'epa-readiness',
        name: 'EPA Readiness Declaration',
        description: 'Confirm learner is ready for End Point Assessment gateway',
        status: 'Available',
        lastUpdated: '10/03/2025',
      },
      {
        id: 'gateway-review',
        name: 'Gateway Review Checklist',
        description: 'Review all gateway requirements prior to EPA referral',
        status: 'Available',
        lastUpdated: '10/03/2025',
      },
      {
        id: 'epa-confirmation',
        name: 'EPA Confirmation Form',
        description: 'Formal confirmation of learner EPA booking and details',
        status: 'Available',
        lastUpdated: '10/03/2025',
      },
    ],
  },
  {
    id: 'exit',
    title: 'Exit & Completion',
    forms: [
      {
        id: 'exit-review',
        name: 'Exit Review Form',
        description: 'Conduct final review on programme completion or withdrawal',
        status: 'Available',
        lastUpdated: '01/04/2025',
      },
      {
        id: 'withdrawal',
        name: 'Learner Withdrawal Form',
        description: 'Record reasons and details for learner programme withdrawal',
        status: 'Available',
        lastUpdated: '01/04/2025',
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const LearnerForms: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [cohort, setCohort] = useState('Any cohort');

  const filtered = FORM_CATEGORIES.map((cat) => ({
    ...cat,
    forms: cat.forms.filter(
      (f) =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.forms.length > 0);

  return (
    <TrainerLayout pageTitle="Learner Forms">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Page header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mb: '4px' }}>
          <Box
            onClick={() => router.back()}
            sx={{
              width: '32px', height: '32px', borderRadius: '50%',
              backgroundColor: '#1C1C1C', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
              '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
            }}
          >
            <ArrowBackIos sx={{ fontSize: '12px', color: '#fff', ml: '3px' }} />
          </Box>
          <Box sx={{ fontSize: '22px', fontWeight: 700, color: '#1C1C1C', fontFamily: TYPOGRAPHY.fontFamily }}>
            Learner Forms
          </Box>
        </Box>

        {/* Filter bar */}
        <Box sx={{
          backgroundColor: '#FFFFFF', border: '1px solid rgba(28,28,28,0.1)',
          borderRadius: '12px', padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Box sx={{ fontSize: '13px', color: COLORS.text.secondary, fontFamily: TYPOGRAPHY.fontFamily }}>Cohort:</Box>
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: '4px',
              border: '1px solid rgba(28,28,28,0.12)', borderRadius: '8px',
              padding: '6px 12px', fontSize: '13px', fontFamily: TYPOGRAPHY.fontFamily,
              color: COLORS.text.primary, cursor: 'pointer', minWidth: '130px',
            }}>
              {cohort} <KeyboardArrowDown sx={{ fontSize: '16px', ml: 'auto', color: '#888' }} />
            </Box>
          </Box>

          {/* Search */}
          <Box sx={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '8px',
            border: '1px solid rgba(28,28,28,0.12)', borderRadius: '8px',
            padding: '6px 12px', backgroundColor: '#FAFAFA',
          }}>
            <SearchOutlined sx={{ fontSize: '16px', color: '#AAA' }} />
            <Box
              component="input"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder="Search forms..."
              sx={{
                border: 'none', outline: 'none', background: 'transparent',
                fontSize: '13px', fontFamily: TYPOGRAPHY.fontFamily, color: COLORS.text.primary,
                flex: 1, '&::placeholder': { color: '#AAA' },
              }}
            />
          </Box>
        </Box>

        {/* Form categories */}
        {filtered.map((cat) => (
          <Box
            key={cat.id}
            sx={{
              backgroundColor: '#FFFFFF', border: '1px solid rgba(28,28,28,0.1)',
              borderRadius: '12px', overflow: 'hidden',
            }}
          >
            {/* Category header */}
            <Box sx={{
              padding: '12px 20px', backgroundColor: 'rgba(28,28,28,0.03)',
              borderBottom: '1px solid rgba(28,28,28,0.08)',
              fontSize: '14px', fontWeight: 700, color: '#1C1C1C',
              fontFamily: TYPOGRAPHY.fontFamily,
            }}>
              {cat.title}
            </Box>

            {/* Forms list */}
            {cat.forms.map((form, fi) => (
              <Box
                key={form.id}
                sx={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '14px 20px',
                  borderBottom: fi < cat.forms.length - 1 ? '1px solid rgba(28,28,28,0.06)' : 'none',
                  '&:hover': { backgroundColor: 'rgba(28,28,28,0.02)' },
                  cursor: 'pointer',
                }}
              >
                {/* Icon */}
                <Box sx={{
                  width: '40px', height: '40px', borderRadius: '8px',
                  backgroundColor: 'rgba(28,28,28,0.06)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <DescriptionOutlined sx={{ fontSize: '20px', color: '#1C1C1C' }} />
                </Box>

                {/* Text */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{
                    fontSize: '14px', fontWeight: 600, color: '#1C1C1C',
                    fontFamily: TYPOGRAPHY.fontFamily, mb: '2px',
                  }}>
                    {form.name}
                  </Box>
                  <Box sx={{ fontSize: '12px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily, lineHeight: 1.4 }}>
                    {form.description}
                  </Box>
                </Box>

                {/* Meta */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                  <Box sx={{
                    fontSize: '11px', color: '#43A047', fontWeight: 600,
                    fontFamily: TYPOGRAPHY.fontFamily, backgroundColor: 'rgba(67,160,71,0.1)',
                    borderRadius: '12px', padding: '2px 10px',
                  }}>
                    {form.status}
                  </Box>
                  <Box sx={{ fontSize: '11px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>
                    Updated: {form.lastUpdated}
                  </Box>
                </Box>

                {/* Action buttons */}
                <Box sx={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <Box
                    onClick={(e) => { e.stopPropagation(); router.push(`/trainer-dashboard/learner-forms/${form.id}`); }}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      backgroundColor: '#1C1C1C', color: '#FFF',
                      borderRadius: '6px', padding: '6px 12px',
                      fontSize: '12px', fontWeight: 600, fontFamily: TYPOGRAPHY.fontFamily,
                      cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(28,28,28,0.85)' },
                    }}
                  >
                    <VisibilityOutlined sx={{ fontSize: '14px' }} /> View
                  </Box>
                  <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      display: 'flex', alignItems: 'center',
                      border: '1px solid rgba(28,28,28,0.2)', borderRadius: '6px',
                      padding: '6px 10px', cursor: 'pointer', color: COLORS.text.primary,
                      '&:hover': { backgroundColor: 'rgba(28,28,28,0.04)' },
                    }}
                  >
                    <PrintOutlined sx={{ fontSize: '14px' }} />
                  </Box>
                  <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      display: 'flex', alignItems: 'center',
                      border: '1px solid rgba(28,28,28,0.2)', borderRadius: '6px',
                      padding: '6px 10px', cursor: 'pointer', color: COLORS.text.primary,
                      '&:hover': { backgroundColor: 'rgba(28,28,28,0.04)' },
                    }}
                  >
                    <GetAppOutlined sx={{ fontSize: '14px' }} />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <Box sx={{
            backgroundColor: '#FFFFFF', border: '1px solid rgba(28,28,28,0.1)',
            borderRadius: '12px', padding: '40px', textAlign: 'center',
          }}>
            <DescriptionOutlined sx={{ fontSize: '40px', color: COLORS.text.muted, mb: 1 }} />
            <Box sx={{ fontSize: '15px', fontWeight: 600, color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily }}>
              No forms found
            </Box>
            <Box sx={{ fontSize: '13px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily, mt: 0.5 }}>
              Try a different search term or clear the filter.
            </Box>
          </Box>
        )}

      </Box>
    </TrainerLayout>
  );
};

export default LearnerForms;
