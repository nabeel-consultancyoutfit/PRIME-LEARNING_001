/**
 * Trainer — Help Centre Page
 */

import React, { useState } from 'react';
import { Box, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import {
  ExpandMoreOutlined,
  HelpOutlineOutlined,
  MenuBookOutlined,
  HeadsetMicOutlined,
  OpenInNewOutlined,
} from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import { COLORS, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '@/modules/trainer/theme/tokens';

const FAQS = [
  {
    q: 'How do I review a learner\'s journal entry?',
    a: 'Go to Learning Journals in the sidebar. You\'ll see all submitted journal entries. Click on any entry to expand it, read the reflection, and then add your feedback or mark it as reviewed.',
  },
  {
    q: 'How do I assign a task to a learner?',
    a: 'Navigate to Tasks and click "Create Task". Fill in the task title, description, due date, priority, and select the learner. Click Save to assign it.',
  },
  {
    q: 'What do the learner statuses mean?',
    a: '"On Track" means the learner is progressing as expected. "Behind" means they have fallen slightly behind schedule and may need support. "At Risk" means they are significantly behind and require immediate intervention.',
  },
  {
    q: 'How do I update a learner\'s scorecard?',
    a: 'Navigate to Scorecard in the sidebar. You\'ll see the KSB assessment grid for each learner. Click the rating dots to update a learner\'s rating for each competency.',
  },
  {
    q: 'Can I message all my learners at once?',
    a: 'Currently, messages are sent per conversation. For group announcements, use your platform administrator or the Resources section to post shared information.',
  },
  {
    q: 'How is the "Overall Progress" percentage calculated?',
    a: 'Overall progress reflects the percentage of units marked as completed out of the total required units for the learner\'s programme.',
  },
];

const RESOURCES = [
  { label: 'Trainer Handbook', icon: MenuBookOutlined, desc: 'Complete guide to your role and responsibilities as a trainer.' },
  { label: 'EPA Guidelines', icon: MenuBookOutlined, desc: 'End Point Assessment guidance and preparation materials.' },
  { label: 'KSB Framework Reference', icon: MenuBookOutlined, desc: 'Full Knowledge, Skills & Behaviours framework for all programmes.' },
  { label: 'Contact Support', icon: HeadsetMicOutlined, desc: 'Reach our helpdesk team for technical or account issues.' },
];

const TrainerHelpCentre: React.FC = () => {
  return (
    <TrainerLayout pageTitle="Help Centre">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Hero card */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: BORDER_RADIUS.card,
            boxShadow: SHADOWS.card,
            border: `1px solid ${COLORS.card.border}`,
            backgroundColor: COLORS.sidebar.activeBg,
            padding: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            color: '#FFFFFF',
          }}
        >
          <HelpOutlineOutlined sx={{ fontSize: '40px', opacity: 0.8 }} />
          <Box>
            <Box sx={{ fontSize: '20px', fontWeight: 700, fontFamily: TYPOGRAPHY.fontFamily }}>
              How can we help you?
            </Box>
            <Box sx={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontFamily: TYPOGRAPHY.fontFamily, mt: '4px' }}>
              Browse FAQs, read guides, or contact support below.
            </Box>
          </Box>
        </Paper>

        {/* FAQs */}
        <Paper elevation={0} sx={{ borderRadius: BORDER_RADIUS.card, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.card.border}`, overflow: 'hidden' }}>
          <Box sx={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.card.border}`, fontSize: '15px', fontWeight: 600, color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily }}>
            Frequently Asked Questions
          </Box>
          <Box sx={{ padding: '12px 20px' }}>
            {FAQS.map((faq, i) => (
              <Accordion
                key={i}
                elevation={0}
                disableGutters
                sx={{
                  '&:before': { display: 'none' },
                  borderBottom: i < FAQS.length - 1 ? `1px solid ${COLORS.card.border}` : 'none',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreOutlined fontSize="small" />}>
                  <Box sx={{ fontSize: '14px', fontWeight: 500, color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily }}>
                    {faq.q}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ fontSize: '14px', color: COLORS.text.secondary, fontFamily: TYPOGRAPHY.fontFamily, lineHeight: 1.6 }}>
                    {faq.a}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Paper>

        {/* Resources */}
        <Paper elevation={0} sx={{ borderRadius: BORDER_RADIUS.card, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.card.border}`, overflow: 'hidden' }}>
          <Box sx={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.card.border}`, fontSize: '15px', fontWeight: 600, color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily }}>
            Resources & Support
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', backgroundColor: COLORS.card.border }}>
            {RESOURCES.map((res, i) => {
              const IconComp = res.icon;
              return (
                <Box
                  key={i}
                  sx={{
                    padding: '18px 20px',
                    backgroundColor: COLORS.card.bg,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.01)' },
                  }}
                >
                  <Box sx={{ width: 40, height: 40, borderRadius: 8, backgroundColor: 'rgba(30,30,45,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <IconComp sx={{ fontSize: '20px', color: COLORS.text.primary }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ fontSize: '14px', fontWeight: 600, color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {res.label}
                      <OpenInNewOutlined sx={{ fontSize: '13px', opacity: 0.5 }} />
                    </Box>
                    <Box sx={{ fontSize: '12px', color: COLORS.text.secondary, fontFamily: TYPOGRAPHY.fontFamily, mt: '2px' }}>
                      {res.desc}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Paper>

      </Box>
    </TrainerLayout>
  );
};

export default TrainerHelpCentre;
