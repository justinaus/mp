import '@/styles/globals.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NavermapsProvider } from 'react-naver-maps';
import { RecoilRoot } from 'recoil';

import { theme } from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  if (!process.env.NAVER_CLIENT_ID) {
    throw new Error('NAVER_CLIENT_ID is not defined');
  }

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
            <Component {...pageProps} />
          </NavermapsProvider>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}
