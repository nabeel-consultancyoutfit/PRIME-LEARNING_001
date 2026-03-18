import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { LoginFormValues } from './Login.interface';
import { MOCK_USERS, ROLE_REDIRECT_MAP, LOGIN_VALIDATION_MESSAGES } from './Login.data';

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

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    setError(null);
    setIsLoading(true);

    const user = MOCK_USERS.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!user) {
      setError('Invalid email or password. Try: alice@example.com / bob@example.com / carol@example.com (password: password123)');
      setIsLoading(false);
      return;
    }

    login({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    router.push(ROLE_REDIRECT_MAP[user.role]);
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
