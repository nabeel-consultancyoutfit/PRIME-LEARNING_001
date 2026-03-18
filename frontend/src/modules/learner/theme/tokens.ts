/**
 * Learner Module Design Tokens
 * Single source of truth for all design values extracted from Figma
 */

// ============================================================================
// COLORS
// ============================================================================

export const COLORS = {
  // Sidebar
  sidebar: {
    bg: '#FFFFFF',
    activeBg: '#1E1E2D',
    activeText: '#FFFFFF',
    inactiveText: '#1E1E2D',
    inactiveIconColor: '#1E1E2D',
    borderColor: '#E8E8E8',
  },

  // Header
  header: {
    bg: '#FFFFFF',
    borderColor: '#E8E8E8',
  },

  // Content Area
  contentArea: {
    bg: '#F5F5F5',
  },

  // Text
  text: {
    primary: '#1E1E2D',
    secondary: '#A0A0A0',
  },

  // Breadcrumb
  breadcrumb: {
    inactive: '#A0A0A0',
    active: '#1E1E2D',
  },

  // Cards
  card: {
    bg: '#FFFFFF',
    border: '#E8E8E8',
  },

  // Progress & Status
  progress: {
    green: '#4CAF50',
  },

  status: {
    online: '#22C55E',
  },

  // Accents
  accent: {
    purple: '#7B61FF',
    orange: '#F5A623',
    gold: '#F5C542',
  },

  // Calendar
  calendar: {
    todayBg: '#1E1E2D',
    eventBg: '#2DB54A',
    highlightBg: '#E8F5E9',
  },

  // Tabs
  tab: {
    activeUnderline: '#1E1E2D',
    activeText: '#1E1E2D',
    inactiveText: '#A0A0A0',
  },

  // Chips
  chip: {
    border: '#E8E8E8',
    bg: '#FFFFFF',
  },

  // Workplace Bar
  workplace: {
    bg: '#1E1E2D',
    text: '#FFFFFF',
  },

  // Links & Buttons
  link: {
    blue: '#4A90D9',
  },

  button: {
    blackBg: '#1E1E2D',
  },
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const TYPOGRAPHY = {
  fontFamily: "'Inter', sans-serif",

  // Heading styles
  h4: {
    fontSize: '28px',
    fontWeight: 700,
  },

  h5: {
    fontSize: '18px',
    fontWeight: 700,
  },

  h6: {
    fontSize: '16px',
    fontWeight: 600,
  },

  // Body styles
  body1: {
    fontSize: '14px',
    fontWeight: 400,
  },

  body2: {
    fontSize: '13px',
    fontWeight: 400,
  },

  // Caption/Label styles
  caption: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#A0A0A0',
  },

  // Navigation item text
  navItem: {
    fontSize: '14px',
    fontWeight: 500,
  },

  // Breadcrumb text
  breadcrumb: {
    fontSize: '14px',
  },

  // User name in header
  userName: {
    fontSize: '14px',
    fontWeight: 600,
  },

  // User role in header
  userRole: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#A0A0A0',
  },
};

// ============================================================================
// SPACING
// ============================================================================

export const SPACING = {
  // Sidebar
  sidebar: {
    width: 260,
    padding: 16,
    itemHeight: 44,
    itemPaddingX: 12,
    itemPaddingY: 16,
    itemBorderRadius: 25,
    itemGap: 4,
  },

  // Header
  header: {
    height: 60,
    paddingX: 24,
  },

  // Content
  contentPadding: 24,

  // Cards
  card: {
    padding: 20,
  },

  // Sections
  sectionGap: 20,
};

// ============================================================================
// SHADOWS
// ============================================================================

export const SHADOWS = {
  card: '0 1px 3px rgba(0,0,0,0.08)',
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const BORDER_RADIUS = {
  card: 12,
  input: 8,
  pill: 25,
  small: 4,
};
