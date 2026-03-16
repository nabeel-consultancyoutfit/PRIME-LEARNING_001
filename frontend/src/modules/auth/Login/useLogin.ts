/**
 * Login form hook
 * Handles form logic, validation, and submission
 */

import { useCallback, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { LoginFormValues } from './Login.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { loginUser } from '@/redux/slices/authSlice';
import { LOGIN_VALIDATION_MESSAGES } from './Login.data';

/**
 * Yup validation schema for login form
 */
const loginValidationSchema = yup.object({
  email: yup
    .string()
    .required(LOGIN_VALIDATION_MESSAGES.email.required)
    .email(LOGIN_VALIDATION_MESSAGES.email.invalid),
  password: yup
    .string()
    .required(LOGIN_VALIDATION_MESSAGES.password.required)
    .min(8, LOGIN_VALIDATION_MESSAGES.password.minLength),
  rememberMe: yup.boolean().default(false),
});

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  /**
   * Handle form submission
   */
  const onSubmit: SubmitHandler<LoginFormValues> = useCallback(
    async (data: LoginFormValues) => {
      try {
        const result = await dispatch(
          loginUser({
            email: data.email,
            password: data.password,
          })
        ).unwrap();

        // Store remember me preference if checked
        if (data.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('rememberEmail', data.email);
        }

        // Redirect to dashboard on successful login
        router.push('/dashboard');
      } catch (err) {
        // Error is handled by Redux and displayed via useAppSelector
        console.error('Login failed:', err);
      }
    },
    [dispatch, router]
  );

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading: loading,
    error,
    watch,
  };
};
