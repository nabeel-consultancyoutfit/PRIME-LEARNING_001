/**
 * Register page component
 * Handles user account creation with validation
 */

import React from 'react';
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Typography,
  MenuItem,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { School as SchoolIcon } from '@mui/icons-material';
import NextLink from 'next/link';
import { PrimaryButton } from '@/components/Buttons';
import {
  RegisterWrapper,
  RegisterCard,
  FormWrapper,
  HeaderWrapper,
  PageTitle,
  NameFieldsWrapper,
  LinkWrapper,
  ErrorMessage,
  FormSectionTitle,
} from './Register.style';
import { REGISTER_FORM_LABELS, ROLE_OPTIONS } from './Register.data';
import { useRegister } from './useRegister';

/**
 * Register component
 */
export const Register: React.FC = () => {
  const { control, handleSubmit, errors, onSubmit, isLoading, error } =
    useRegister();

  return (
    <RegisterWrapper>
      <RegisterCard>
        {/* Header with icon and title */}
        <HeaderWrapper>
          <SchoolIcon
            sx={{ fontSize: '2rem', color: 'primary.main' }}
            data-testid="school-icon"
          />
        </HeaderWrapper>

        <PageTitle>Create Account</PageTitle>

        {/* Error message display */}
        {error && (
          <ErrorMessage role="alert" data-testid="error-message">
            {error}
          </ErrorMessage>
        )}

        {/* Register form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            {/* Personal Information Section */}
            <FormSectionTitle>Personal Information</FormSectionTitle>

            {/* First and Last Name fields */}
            <NameFieldsWrapper>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={REGISTER_FORM_LABELS.firstName}
                    variant="outlined"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    disabled={isLoading}
                    data-testid="first-name-input"
                    autoComplete="given-name"
                  />
                )}
              />

              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={REGISTER_FORM_LABELS.lastName}
                    variant="outlined"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    disabled={isLoading}
                    data-testid="last-name-input"
                    autoComplete="family-name"
                  />
                )}
              />
            </NameFieldsWrapper>

            {/* Account Information Section */}
            <FormSectionTitle>Account Information</FormSectionTitle>

            {/* Email field */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={REGISTER_FORM_LABELS.email}
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
                  label={REGISTER_FORM_LABELS.password}
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isLoading}
                  data-testid="password-input"
                  autoComplete="new-password"
                />
              )}
            />

            {/* Confirm Password field */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={REGISTER_FORM_LABELS.confirmPassword}
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  disabled={isLoading}
                  data-testid="confirm-password-input"
                  autoComplete="new-password"
                />
              )}
            />

            {/* Role Selection Section */}
            <FormSectionTitle>Role</FormSectionTitle>

            {/* Role select */}
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label={REGISTER_FORM_LABELS.role}
                  variant="outlined"
                  fullWidth
                  error={!!errors.role}
                  helperText={errors.role?.message}
                  disabled={isLoading}
                  data-testid="role-select"
                >
                  {ROLE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* Terms and Conditions Section */}
            <FormSectionTitle>Agreement</FormSectionTitle>

            {/* Agree to terms checkbox */}
            <Controller
              name="agreeToTerms"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  control={<Checkbox disabled={isLoading} />}
                  label={REGISTER_FORM_LABELS.agreeToTerms}
                  data-testid="agree-terms-checkbox"
                  sx={{
                    '& .MuiFormHelperText-root': {
                      marginLeft: 0,
                      marginTop: '4px',
                    },
                  }}
                />
              )}
            />
            {errors.agreeToTerms && (
              <Typography variant="caption" color="error" display="block">
                {errors.agreeToTerms.message}
              </Typography>
            )}

            {/* Submit button */}
            <PrimaryButton
              label={REGISTER_FORM_LABELS.submit}
              type="submit"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              size="large"
              data-testid="register-submit-button"
              sx={{ marginTop: '8px' }}
            />
          </FormWrapper>
        </form>

        {/* Login link */}
        <LinkWrapper>
          <Typography variant="body2">
            {REGISTER_FORM_LABELS.haveAccount}
            <NextLink href="/auth/login" passHref legacyBehavior>
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
                data-testid="login-link"
              >
                {REGISTER_FORM_LABELS.login}
              </Link>
            </NextLink>
          </Typography>
        </LinkWrapper>
      </RegisterCard>
    </RegisterWrapper>
  );
};

export default Register;
