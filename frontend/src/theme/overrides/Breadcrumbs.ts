import { Components, Theme } from '@mui/material/styles';

const BreadcrumbsOverride: Components<Theme> = {
  MuiBreadcrumbs: {
    styleOverrides: {
      root: {
        fontSize: '0.875rem',
      },
      li: {
        fontSize: '0.875rem',
      },
      separator: {
        margin: '0 8px',
        color: '#9CA3AF',
      },
      ol: {
        alignItems: 'center',
      },
    },
    defaultProps: {
      separator: '/',
    },
  },
};

export default BreadcrumbsOverride;
