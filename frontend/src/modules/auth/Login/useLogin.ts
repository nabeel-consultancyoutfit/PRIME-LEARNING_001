import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { LoginFormValues } from './Login.interface';
import { ROLE_REDIRECT_MAP, LOGIN_VALIDATION_MESSAGES } from './Login.data';

const loginValidationSchema = yup.object({
  email: yup
    .string()
    .required(LOGIN_VALIDATION_MESSAGES.email.required)
    .email(LOGIN_VALIDATION_MESSAGES.email.invalid),
  password: yup
    .string()
    .required(LOGIN_VALIDATION_MESSAGES.password.required),
});

export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setError(null);
    setIsLoading(true);

    try {
      const loggedInUser = await login({ email: data.email, password: data.password });
      const redirect = ROLE_REDIRECT_MAP[loggedInUser.role] ?? '/learner-dashboard';
      router.push(redirect);
    } catch (err: any) {
      const message =
        err?.data?.message ||
        err?.message ||
        'Invalid email or password. Please try again.';
      setError(Array.isArray(message) ? message.join(', ') : message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    error,
    showPassword,
    toggleShowPassword,
  };
};
