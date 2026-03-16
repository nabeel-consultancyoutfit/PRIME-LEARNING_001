/**
 * Register form hook
 * Handles form logic, validation, and submission
 */

import { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { RegisterFormValues } from './Register.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { registerUser } from '@/redux/slices/authSlice';
import { REGISTER_VALIDATION_MESSAGES } from './Register.data';

/**
 * Yup validation schema for register form
 */
const registerValidationSchema = yup.object({
  firstName: yup
    .string()
    .required(REGISTER_VALIDATION_MESSAGES.firstName.required)
    .min(2, REGISTER_VALIDATION_MESSAGES.firstName.minLength),
  lastName: yup
    .string()
    .required(REGISTER_VALIDATION_MESSAGES.lastName.required)
    .min(2, REGISTER_VALIDATION_MESSAGES.lastName.minLength),
  email: yup
    .string()
    .required(REGISTER_VALIDATION_MESSAGES.email.required)
    .email(REGISTER_VALIDATION_MESSAGES.email.invalid),
  password: yup
    .string()
    .required(REGISTER_VALIDATION_MESSAGES.password.required)
    .min(8, REGISTER_VALIDATION_MESSAGES.password.minLength)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
      REGISTER_VALIDATION_MESSAGES.password.pattern
    ),
  confirmPassword: yup
    .string()
    .required(REGISTER_VALIDATION_MESSAGES.confirmPassword.required)
    .oneOf(
      [yup.ref('password')],
      REGISTER_VALIDATION_MESSAGES.confirmPassword.match
    ),
  role: yup
    .string()
    .required(REGISTER_VALIDATION_MESSAGES.role.required)
    .oneOf(['student', 'instructor', 'admin']),
  agreeToTerms: yup
    .boolean()
    .required(REGISTER_VALIDATION_MESSAGES.agreeToTerms.required)
    .oneOf([true], REGISTER_VALIDATION_MESSAGES.agreeToTerms.required),
});

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerValidationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      agreeToTerms: false,
    },
  });

  /**
   * Handle form submission
   */
  const onSubmit: SubmitHandler<RegisterFormValues> = useCallback(
    async (data: RegisterFormValues) => {
      try {
        const result = await dispatch(
          registerUser({
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
          })
        ).unwrap();

        // Redirect to login page with success message
        router.push('/auth/login?registered=true');
      } catch (err) {
        // Error is handled by Redux and displayed via useAppSelector
        console.error('Registration failed:', err);
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
  };
};
