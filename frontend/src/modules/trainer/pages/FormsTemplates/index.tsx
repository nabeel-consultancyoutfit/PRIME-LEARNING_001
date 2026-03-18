/**
 * Trainer — Forms & Templates standalone page
 * Reusable wrapper for any forms/templates category
 */

import React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import {
  ArrowBackIos,
  InsertDriveFileOutlined,
  ChevronRight,
} from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import { COLORS, TYPOGRAPHY } from '@/modules/trainer/theme/tokens';

interface FormsTemplatesProps {
  title: string;
  items: { label: string; description: string; path: string }[];
}

const FormsTemplates: React.FC<FormsTemplatesProps> = ({ title, items }) => {
  const router = useRouter();
  return (
    <TrainerLayout pageTitle={title}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Box
            onClick={() => router.back()}
            sx={{
              width: '32px', height: '32px', borderRadius: '50%',
              backgroundColor: '#1C1C1C', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer',
              '&:hover': { backgroundColor: 'rgba(28,28,28,0.8)' },
            }}
          >
            <ArrowBackIos sx={{ fontSize: '12px', color: '#fff', ml: '3px' }} />
          </Box>
          <Box sx={{ fontSize: '22px', fontWeight: 700, color: '#1C1C1C', fontFamily: TYPOGRAPHY.fontFamily }}>
            {title}
          </Box>
        </Box>

        {/* Items card */}
        <Box sx={{
          backgroundColor: '#FFFFFF', border: '1px solid rgba(28,28,28,0.1)',
          borderRadius: '12px', overflow: 'hidden',
        }}>
          {items.map((item, i) => (
            <Box
              key={item.label}
              onClick={() => router.push(item.path)}
              sx={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px 20px', cursor: 'pointer',
                borderBottom: i < items.length - 1 ? '1px solid rgba(28,28,28,0.06)' : 'none',
                '&:hover': { backgroundColor: 'rgba(28,28,28,0.02)' },
              }}
            >
              <Box sx={{
                width: '40px', height: '40px', borderRadius: '8px',
                backgroundColor: 'rgba(28,28,28,0.06)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <InsertDriveFileOutlined sx={{ fontSize: '20px', color: '#1C1C1C' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1C', fontFamily: TYPOGRAPHY.fontFamily }}>
                  {item.label}
                </Box>
                <Box sx={{ fontSize: '12px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily, mt: '2px' }}>
                  {item.description}
                </Box>
              </Box>
              <ChevronRight sx={{ fontSize: '18px', color: COLORS.text.muted }} />
            </Box>
          ))}
        </Box>

      </Box>
    </TrainerLayout>
  );
};

export default FormsTemplates;
