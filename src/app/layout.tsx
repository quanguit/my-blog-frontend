import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import openGraphImage from '@/assets/images/bg-open-graph.jpg';
import { ReactQueryProvider, ThemeProvider } from '@/providers';

import './global.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Me Blog',
    default: 'Layout',
  },
  description: 'This is layout',
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_DOMAIN}${openGraphImage.src}`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider enableSystem={false}>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
