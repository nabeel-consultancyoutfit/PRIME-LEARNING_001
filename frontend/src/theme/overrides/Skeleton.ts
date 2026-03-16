import { Components, Theme } from '@mui/material/styles';

const SkeletonOverride: Components<Theme> = {
  MuiSkeleton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
      rounded: {
        borderRadius: '50%',
      },
      rectangular: {
        borderRadius: 8,
      },
      text: {
        borderRadius: 8,
      },
    },
    defaultProps: {
      animation: 'wave',
    },
  },
};

export default SkeletonOverride;
