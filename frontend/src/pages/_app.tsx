import React, { useEffect, ReactNode } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import GlobalStyles from '@mui/material/GlobalStyles';

const PUBLIC_ROUTES = ['/auth/login'];

interface PageWithLayout {
  getLayout?: (page: ReactNode) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: React.ComponentType & PageWithLayout;
};

function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const isPublicRoute = PUBLIC_ROUTES.includes(router.pathname);

  useEffect(() => {
    if (!isAuthenticated && !isPublicRoute) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, isPublicRoute, router]);

  if (!isAuthenticated && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <AuthProvider>
      <GlobalStyles
        styles={{
          '.no-scrollbar': {
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          },
          '.no-scrollbar::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      />
      <AuthGuard>
        {getLayout(<Component {...pageProps} />)}
      </AuthGuard>
    </AuthProvider>
  );
}

export default MyApp;
