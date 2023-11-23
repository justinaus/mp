import '@/styles/globals.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { NavermapsProvider } from 'react-naver-maps';
import { RecoilRoot } from 'recoil';

import { theme } from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  if (!process.env.NAVER_CLIENT_ID) {
    throw new Error('NAVER_CLIENT_ID is not defined');
  }

  const handlePageError = useCallback(
    // (error: Error, info: { componentStack: string }) => {
    () => {
      // TODO. Sentry
    },
    [],
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RecoilRoot>
          <NavermapsProvider
            ncpClientId={process.env.NAVER_CLIENT_ID}
            // or finClientId, govClientId
          >
            <ErrorBoundary
              fallback={<div>Something went wrong</div>}
              onError={handlePageError}
            >
              <Component {...pageProps} />
            </ErrorBoundary>
          </NavermapsProvider>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}
