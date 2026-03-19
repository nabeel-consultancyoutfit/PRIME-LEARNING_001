import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const ROLE_HOME: Record<string, string> = {
  learner: '/learner-dashboard',
  trainer: '/trainer-dashboard',
  iqa:     '/iqa-dashboard',
  admin:   '/admin-dashboard',
};

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (user) {
      router.replace(ROLE_HOME[user.role] ?? '/learner-dashboard');
    } else {
      router.replace('/auth/login');
    }
  }, [user, isLoading, router]);

  return null;
}
