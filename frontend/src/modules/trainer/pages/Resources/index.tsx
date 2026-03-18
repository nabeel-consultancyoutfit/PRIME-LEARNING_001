/**
 * Trainer — Resources Page (Figma: "Resources" in sidebar)
 */

import React from 'react';
import { Box } from '@mui/material';
import { FolderOpenOutlined, OpenInNewOutlined } from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/modules/trainer/theme/tokens';

const RESOURCES = [
  { id: 1, title: 'Apprenticeship Standard Guide', type: 'PDF', size: '2.4 MB', category: 'Standards' },
  { id: 2, title: 'End Point Assessment Preparation', type: 'PDF', size: '1.8 MB', category: 'Assessment' },
  { id: 3, title: 'Off-The-Job Training Log Template', type: 'DOCX', size: '0.5 MB', category: 'Templates' },
  { id: 4, title: 'Progress Review Meeting Notes', type: 'DOCX', size: '0.3 MB', category: 'Templates' },
  { id: 5, title: 'Learner Induction Pack', type: 'PDF', size: '3.2 MB', category: 'Induction' },
  { id: 6, title: 'KSB Mapping Framework', type: 'XLSX', size: '0.9 MB', category: 'Standards' },
];

const TYPE_COLORS: Record<string, string> = {
  PDF: '#E53935',
  DOCX: '#4A90D9',
  XLSX: '#43A047',
};

const TrainerResources: React.FC = () => {
  return (
    <TrainerLayout pageTitle="Resources">
      <Box sx={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ fontSize: '18px', fontWeight: 600, color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily }}>
          Resources
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 2,
          }}
        >
          {RESOURCES.map((res) => (
            <Box
              key={res.id}
              sx={{
                backgroundColor: '#FFFFFF',
                border: `1px solid ${COLORS.card.border}`,
                borderRadius: BORDER_RADIUS.card,
                boxShadow: SHADOWS.card,
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: SHADOWS.cardHover },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  backgroundColor: `${TYPE_COLORS[res.type] || '#888'}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FolderOpenOutlined sx={{ color: TYPE_COLORS[res.type] || '#888', fontSize: '22px' }} />
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: COLORS.text.primary,
                    fontFamily: TYPOGRAPHY.fontFamily,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {res.title}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    mt: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: TYPE_COLORS[res.type] || '#888',
                      backgroundColor: `${TYPE_COLORS[res.type] || '#888'}12`,
                      padding: '2px 6px',
                      borderRadius: 4,
                      fontFamily: TYPOGRAPHY.fontFamily,
                    }}
                  >
                    {res.type}
                  </Box>
                  <Box sx={{ fontSize: '12px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>
                    {res.size}
                  </Box>
                  <Box sx={{ fontSize: '12px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>
                    · {res.category}
                  </Box>
                </Box>
              </Box>

              <OpenInNewOutlined sx={{ fontSize: '16px', color: COLORS.text.muted, flexShrink: 0, mt: 0.5 }} />
            </Box>
          ))}
        </Box>
      </Box>
    </TrainerLayout>
  );
};

export default TrainerResources;
