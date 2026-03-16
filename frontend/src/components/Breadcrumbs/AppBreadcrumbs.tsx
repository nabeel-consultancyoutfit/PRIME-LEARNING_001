import React from 'react';
import Link from 'next/link';
import {
  Breadcrumbs,
  BreadcrumbsProps,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AppBreadcrumbsProps extends Omit<BreadcrumbsProps, 'children'> {
  items: BreadcrumbItem[];
}

export const AppBreadcrumbs: React.FC<AppBreadcrumbsProps> = ({
  items,
  ...props
}) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      {...props}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast || !item.href) {
          return (
            <Typography key={index} color={isLast ? 'textPrimary' : 'textSecondary'}>
              {item.label}
            </Typography>
          );
        }

        return (
          <Link key={index} href={item.href} passHref legacyBehavior>
            <MuiLink color="primary" underline="hover">
              {item.label}
            </MuiLink>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
