import React from 'react';
import {
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import {
  LoginOutlined as LoginIcon,
  PersonOutline as PersonIcon,
  VpnKeyOutlined as KeyIcon,
  VisibilityOffOutlined as VisibilityOffIcon,
  VisibilityOutlined as VisibilityIcon,
} from '@mui/icons-material';
import { Controller } from 'react-hook-form';
import {
  LoginWrapper,
  LogoWrapper,
  LoginCard,
  IconBox,
  FormWrapper,
  ForgotPasswordRow,
  DividerLine,
  SsoRow,
  ErrorMessage,
} from './Login.style';
import { useLogin } from './useLogin';

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    error,
    showPassword,
    toggleShowPassword,
  } = useLogin();

  return (
    <LoginWrapper>
      {/* Logo top-left */}
      <LogoWrapper>
        <img
          src="/logo.png"
          alt="Prime Learning Platform"
          style={{ height: 72 }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </LogoWrapper>

      <LoginCard>
        {/* Sign-in icon */}
        <IconBox>
          <LoginIcon sx={{ fontSize: 24, color: '#222' }} />
        </IconBox>

        {/* Heading */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: '#111', mb: 0.5 }}
        >
          Sign in with email
        </Typography>

        {/* Error message */}
        {error && <ErrorMessage sx={{ mt: 2 }}>{error}</ErrorMessage>}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <FormWrapper>
            {/* Email field */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Email address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  size="medium"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: '#999' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      backgroundColor: '#f5f5f5',
                      borderRadius: '8px',
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              )}
            />

            {/* Password field */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  size="medium"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon sx={{ color: '#999' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={toggleShowPassword}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityIcon sx={{ color: '#999' }} />
                          ) : (
                            <VisibilityOffIcon sx={{ color: '#999' }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      backgroundColor: '#f5f5f5',
                      borderRadius: '8px',
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              )}
            />

            {/* Forgot password */}
            <ForgotPasswordRow>
              <Link
                href="#"
                underline="hover"
                sx={{ fontSize: '0.875rem', color: '#111', fontWeight: 500 }}
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </Link>
            </ForgotPasswordRow>

            {/* Login button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                backgroundColor: '#111',
                color: '#fff',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                py: 1.4,
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              Login
            </Button>
          </FormWrapper>
        </form>

        {/* Divider */}
        <DividerLine />

        {/* SSO buttons */}
        <SsoRow>
          <Button
            variant="outlined"
            startIcon={<KeyIcon sx={{ fontSize: 18 }} />}
            sx={{
              borderColor: '#ccc',
              color: '#111',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: '8px',
              px: 3,
              py: 1,
              '&:hover': {
                borderColor: '#999',
                backgroundColor: '#fafafa',
              },
            }}
          >
            Sign in with SSO
          </Button>
          <Button
            variant="outlined"
            startIcon={<KeyIcon sx={{ fontSize: 18 }} />}
            sx={{
              borderColor: '#ccc',
              color: '#111',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: '8px',
              px: 3,
              py: 1,
              '&:hover': {
                borderColor: '#999',
                backgroundColor: '#fafafa',
              },
            }}
          >
            Sign in with Microsoft
          </Button>
        </SsoRow>
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;
