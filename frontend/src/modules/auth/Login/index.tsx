/**
 * Login page component
 * Handles user authentication with email and password
 */

import React, { useEffect } from 'react';
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { School as SchoolIcon } from '@mui/icons-material';
import NextLink from 'next/link';
import { PrimaryButton } from '@/components/Buttons';
import {
  LoginWrapper,
  LoginCard,
  FormWrapper,
  HeaderWrapper,
  AppTitle,
  FormFooter,
  LinkWrapper,
  ErrorMessage,
} from './Login.style';
import { LOGIN_FORM_LABELS } from './Login.data';
import { useLogin } from './useLogin';

/**
 * Login component
 */
export const Login: React.FC = () => {
  const { control, handleSubmit, errors, onSubmit, isLoading, error, watch } =
    useLogin();

  const rememberMe = watch('rememberMe');

  /**
   * Load remembered email on component mount
   */
  useEffect(() => {
    const rememberMeStored = localStorage.getItem('rememberMe');
    const rememberEmail = localStorage.getItem('rememberEmail');

    if (rememberMeStored && rememberEmail) {
      // This would require updating the form programmatically
      // The default values in useLogin hook handle this
    }
  }, []);

  return (
    <LoginWrapper>
      <LoginCard>
        {/* Header with icon and title */}
        <HeaderWrapper>
          <SchoolIcon
            sx={{ fontSize: '2rem', color: 'primary.main' }}
            data-testid="school-icon"
          />
        </HeaderWrapper>

        <AppTitle>{LOGIN_FORM_LABELS.submit === 'Sign In' ? 'Prime Learning Platform' : ''}</AppTitle>

        {/* Error message display */}
        {error && (
          <ErrorMessage role="alert" data-testid="error-message">
            {error}
          </ErrorMessage>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            {/* Email field */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={LOGIN_FORM_LABELS.email}
                  type="email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isLoading}
                  data-testid="email-input"
                  autoComplete="email"
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
                  label={LOGIN_FORM_LABELS.password}
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isLoading}
                  data-testid="password-input"
                  autoComplete="current-password"
                />
              )}
            />

            {/* Remember me checkbox and forgot password link */}
            <FormFooter>
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={<Checkbox disabled={isLoading} />}
                    label={LOGIN_FORM_LABELS.rememberMe}
                    data-testid="remember-me-checkbox"
                  />
                )}
              />

              <NextLink href="/auth/forgot-password" passHref legacyBehavior>
                <Link
                  component="a"
                  underline="hover"
                  sx={{ fontSize: '0.875rem' }}
                  data-testid="forgot-password-link"
                >
                  {LOGIN_FORM_LABELS.forgotPassword}
                </Link>
              </NextLink>
            </FormFooter>

            {/* Submit button */}
            <PrimaryButton
              label={LOGIN_FORM_LABELS.submit}
              type="submit"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              size="large"
              data-testid="login-submit-button"
            />
          </FormWrapper>
        </form>

        {/* Register link */}
        <LinkWrapper>
          <Typography variant="body2">
            {LOGIN_FORM_LABELS.noAccount}
            <NextLink href="/auth/register" passHref legacyBehavior>
              <Link
                component="a"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
                data-testid="register-link"
              >
                {LOGIN_FORM_LABELS.register}
              </Link>
            </NextLink>
          </Typography>
        </LinkWrapper>
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;
