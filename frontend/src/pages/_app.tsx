import React, { useMemo, ReactNode } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { ThemeRegistry } from '@/theme';
import MainLayout from '@/layout/MainLayout';
import AuthLayout from '@/layout/AuthLayout';
import store from '@/store'; // Assuming you have a Redux store configured

interface PageWithLayout {
  getLayout?: (page: ReactNode) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: React.ComponentType & PageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  // Determine which layout to use based on route
  const getLayout = useMemo(() => {
    // Auth routes use AuthLayout
    if (router.pathname.startsWith('/auth')) {
      return (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
    }

    // All other routes use MainLayout
    return (page: ReactNode) => <MainLayout>{page}</MainLayout>;
  }, [router.pathname]);

  // Allow individual pages to override the default layout
  const layout = Component.getLayout || getLayout;

  return (
    <Provider store={store}>
      <ThemeRegistry>
        {layout(<Component {...pageProps} />)}
      </ThemeRegistry>
    </Provider>
  );
}

export default MyApp;
