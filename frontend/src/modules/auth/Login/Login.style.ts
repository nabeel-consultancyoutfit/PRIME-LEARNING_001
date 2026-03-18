import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const LoginWrapper = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #d6eaf8 0%, #eaf6ff 40%, #ffffff 70%, #e8e8e8 85%, #d5d5d5 100%)',
  backgroundSize: 'cover',
  position: 'relative',
  padding: 16,
}));

export const LogoWrapper = styled(Box)(() => ({
  position: 'absolute',
  top: 24,
  left: 32,
}));

export const LoginCard = styled(Box)(() => ({
  maxWidth: 460,
  width: '100%',
  padding: '40px 48px',
  borderRadius: 16,
  background: 'linear-gradient(135deg, rgba(232, 248, 255, 0.85) 0%, rgba(255, 255, 255, 0.9) 100%)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const IconBox = styled(Box)(() => ({
  width: 48,
  height: 48,
  borderRadius: 8,
  border: '1.5px solid #222',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
}));

export const FormWrapper = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 24,
}));

export const ForgotPasswordRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: -8,
}));

export const DividerLine = styled(Box)(() => ({
  width: '100%',
  height: 1,
  backgroundColor: '#e0e0e0',
  margin: '20px 0',
}));

export const SsoRow = styled(Box)(() => ({
  display: 'flex',
  gap: 12,
  width: '100%',
  justifyContent: 'center',
}));

export const ErrorMessage = styled(Box)(({ theme }) => ({
  padding: '10px 16px',
  backgroundColor: '#ffebee',
  color: theme.palette.error.main,
  borderRadius: 8,
  fontSize: '0.875rem',
  width: '100%',
  textAlign: 'center',
}));
