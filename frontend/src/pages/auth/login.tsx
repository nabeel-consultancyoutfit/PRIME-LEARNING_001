import { ReactNode } from 'react';
import Login from '@/modules/auth/Login';

function LoginPage() {
  return <Login />;
}

LoginPage.getLayout = (page: ReactNode) => page;

export default LoginPage;
