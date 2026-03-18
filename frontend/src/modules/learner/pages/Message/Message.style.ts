/**
 * Styled components for Message module
 */

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { COLORS, SPACING, TYPOGRAPHY } from '@/modules/learner/theme/tokens';

export const MessageContainer = styled(Box)({
  padding: `${SPACING.contentPadding}px`,
});

export const MessageTitle = styled('h2')({
  margin: `0 0 16px 0`,
  fontSize: '18px',
  fontWeight: 700,
  color: COLORS.text.primary,
  fontFamily: TYPOGRAPHY.fontFamily,
});

export const MessageText = styled(Box)({
  fontSize: '14px',
  fontWeight: 400,
  color: COLORS.text.secondary,
  lineHeight: '1.6',
  fontFamily: TYPOGRAPHY.fontFamily,
});
