/**
 * Trainer Module Design Tokens
 * Mirrors learner module structure — single source of truth for trainer UI values
 */

export const COLORS = {
  sidebar: {
    bg: '#FFFFFF',
    activeBg: '#1E1E2D',
    activeText: '#FFFFFF',
    inactiveText: '#1E1E2D',
    inactiveIconColor: '#1E1E2D',
    borderColor: '#E8E8E8',
  },
  header: {
    bg: '#FFFFFF',
    borderColor: '#E8E8E8',
  },
  contentArea: {
    bg: '#F5F5F5',
  },
  text: {
    primary: '#1E1E2D',
    secondary: '#9291A5',
    muted: '#A0A0A0',
  },
  breadcrumb: {
    inactive: '#A0A0A0',
    active: '#1E1E2D',
  },
  card: {
    bg: '#FFFFFF',
    border: '#E8E8E8',
    shadow: '0px 2px 6px rgba(13,10,44,0.08)',
  },
  status: {
    onTrack: '#4CAF50',
    behind: '#FF9800',
    atRisk: '#F44336',
    online: '#22C55E',
    completed: '#4CAF50',
    pending: '#FF9800',
    inProgress: '#4A90D9',
  },
  progress: {
    green: '#4CAF50',
    blue: '#4A90D9',
    orange: '#FF9800',
    track: '#E8E8E8',
  },
  accent: {
    purple: '#7B61FF',
    orange: '#F5A623',
    blue: '#4A90D9',
    green: '#4CAF50',
  },
  button: {
    blackBg: '#1E1E2D',
    blackText: '#FFFFFF',
  },
};

export const TYPOGRAPHY = {
  fontFamily: "'Inter', sans-serif",
  h4: { fontSize: '28px', fontWeight: 700 },
  h5: { fontSize: '20px', fontWeight: 700 },
  h6: { fontSize: '16px', fontWeight: 600 },
  body1: { fontSize: '14px', fontWeight: 400 },
  body2: { fontSize: '13px', fontWeight: 400 },
  caption: { fontSize: '12px', fontWeight: 400, color: '#9291A5' },
  navItem: { fontSize: '14px', fontWeight: 500 },
  label: { fontSize: '12px', fontWeight: 500 },
};

export const SPACING = {
  sidebar: {
    width: 260,
    padding: 16,
    itemHeight: 44,
    itemPaddingX: 12,
    itemPaddingY: 16,
    itemBorderRadius: 25,
    itemGap: 4,
  },
  header: {
    height: 60,
    paddingX: 24,
  },
  contentPadding: 24,
  card: { padding: 20 },
  sectionGap: 20,
};

export const SHADOWS = {
  card: '0px 2px 6px rgba(13,10,44,0.08)',
  cardHover: '0px 4px 12px rgba(13,10,44,0.12)',
};

export const BORDER_RADIUS = {
  card: 12,
  input: 8,
  pill: 25,
  small: 4,
  badge: 6,
};
