/**
 * Trainer — Resources Page
 * Fetches from /trainers/me/resources; falls back to empty state gracefully.
 */

import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { FolderOpenOutlined, OpenInNewOutlined } from '@mui/icons-material';
import TrainerLayout from '@/modules/trainer/layout/TrainerLayout';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/modules/trainer/theme/tokens';
import { apiClient } from '@/services/api';

interface ResourceItem {
  id: string;
  title: string;
  type: string;
  size: string;
  category: string;
  url?: string;
}

const TYPE_COLORS: Record<string, string> = {
  PDF: '#E53935',
  DOCX: '#4A90D9',
  XLSX: '#43A047',
  DOC: '#4A90D9',
  XLS: '#43A047',
  PPT: '#FF5722',
  PPTX: '#FF5722',
};

function getTypeFromFilename(name: string): string {
  const ext = name.split('.').pop()?.toUpperCase() ?? 'FILE';
  return ext;
}

const TrainerResources: React.FC = () => {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await apiClient.get<any>('/trainers/me/resources');
        const list: any[] = Array.isArray(res) ? res : (res as any)?.data ?? [];
        setResources(list.map((r: any) => ({
          id: r._id ?? String(Math.random()),
          title: r.title ?? r.name ?? 'Resource',
          type: r.fileType ?? getTypeFromFilename(r.title ?? r.name ?? ''),
          size: r.fileSize ? `${(r.fileSize / (1024 * 1024)).toFixed(1)} MB` : '—',
          category: r.category ?? '—',
          url: r.fileUrl ?? r.url,
        })));
      } catch {
        setResources([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <TrainerLayout pageTitle="Resources">
      <Box sx={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ fontSize: '18px', fontWeight: 600, color: COLORS.text.primary, fontFamily: TYPOGRAPHY.fontFamily }}>
          Resources
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <CircularProgress size={32} sx={{ color: '#7B61FF' }} />
          </Box>
        ) : resources.length === 0 ? (
          <Box sx={{
            backgroundColor: '#FFFFFF',
            border: `1px solid ${COLORS.card.border}`,
            borderRadius: BORDER_RADIUS.card,
            padding: '60px 20px',
            textAlign: 'center',
            fontSize: '14px',
            color: COLORS.text.muted,
            fontFamily: TYPOGRAPHY.fontFamily,
          }}>
            No resources available at this time.
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
            {resources.map((res) => (
              <Box
                key={res.id}
                onClick={() => res.url && window.open(res.url, '_blank')}
                sx={{
                  backgroundColor: '#FFFFFF',
                  border: `1px solid ${COLORS.card.border}`,
                  borderRadius: BORDER_RADIUS.card,
                  boxShadow: SHADOWS.card,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  cursor: res.url ? 'pointer' : 'default',
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: SHADOWS.cardHover },
                }}
              >
                <Box sx={{
                  width: 44, height: 44, borderRadius: 2,
                  backgroundColor: `${TYPE_COLORS[res.type] || '#888'}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <FolderOpenOutlined sx={{ color: TYPE_COLORS[res.type] || '#888', fontSize: '22px' }} />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{
                    fontSize: '14px', fontWeight: 600, color: COLORS.text.primary,
                    fontFamily: TYPOGRAPHY.fontFamily, overflow: 'hidden',
                    textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {res.title}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', mt: 0.5 }}>
                    <Box sx={{
                      fontSize: '11px', fontWeight: 600,
                      color: TYPE_COLORS[res.type] || '#888',
                      backgroundColor: `${TYPE_COLORS[res.type] || '#888'}12`,
                      padding: '2px 6px', borderRadius: '4px',
                      fontFamily: TYPOGRAPHY.fontFamily,
                    }}>
                      {res.type}
                    </Box>
                    {res.size !== '—' && (
                      <Box sx={{ fontSize: '12px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>
                        {res.size}
                      </Box>
                    )}
                    {res.category !== '—' && (
                      <Box sx={{ fontSize: '12px', color: COLORS.text.muted, fontFamily: TYPOGRAPHY.fontFamily }}>
                        · {res.category}
                      </Box>
                    )}
                  </Box>
                </Box>

                {res.url && (
                  <OpenInNewOutlined sx={{ fontSize: '16px', color: COLORS.text.muted, flexShrink: 0, mt: 0.5 }} />
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </TrainerLayout>
  );
};

export default TrainerResources;
