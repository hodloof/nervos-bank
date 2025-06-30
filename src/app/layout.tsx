'use client';
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Divider, Stack } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import HeaderBar from '@/components/HeaderBar';
import FooterBar from '@/components/FooterBar';
import { CCCProvider } from '@/CCCProvider';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* <InitColorSchemeScript attribute="class" /> */}
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <CCCProvider children={props.children}>
              <Stack spacing={2} alignItems='center'>
                <HeaderBar></HeaderBar>
                {props.children}
                 <Divider variant="middle" sx={{ width: '100%', px: 20, color: 'text.disabled' }}>HODL CKB - Nervos Bank</Divider>
                <FooterBar></FooterBar>
              </Stack>
            </CCCProvider>
          </AppRouterCacheProvider>
        {/* <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {props.children}
        </AppRouterCacheProvider> */}
      </body>
    </html>
  );
}
