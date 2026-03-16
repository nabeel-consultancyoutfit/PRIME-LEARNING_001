import React, { ReactNode } from 'react';
import { Box, Container, Card, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const AuthRoot = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}15 100%)`,
}));

const AuthHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const AuthBrand = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const BrandLogo = styled(Box)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  letterSpacing: -0.5,
}));

const BrandSubtitle = styled(Box)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

const AuthContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const AuthCard = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  width: '100%',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  borderRadius: theme.shape.borderRadius,
}));

const AuthCardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const AuthFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

interface AuthLayoutProps {
  children: ReactNode;
  showLogo?: boolean;
  showFooter?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  showLogo = true,
  showFooter = true,
}) => {
  return (
    <AuthRoot>
      {/* Header with Logo */}
      {showLogo && (
        <AuthHeader>
          <AuthBrand>
            <BrandLogo>Prime</BrandLogo>
            <BrandSubtitle>Learning Platform</BrandSubtitle>
          </AuthBrand>
        </AuthHeader>
      )}

      {/* Content */}
      <AuthContent>
        <AuthCard>
          <AuthCardContent>{children}</AuthCardContent>
        </AuthCard>
      </AuthContent>

      {/* Footer */}
      {showFooter && (
        <AuthFooter>
          <Box>© 2026 Prime Learning Platform. All rights reserved.</Box>
        </AuthFooter>
      )}
    </AuthRoot>
  );
};

export default AuthLayout;
