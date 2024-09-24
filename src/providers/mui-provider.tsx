'use client';

import { CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material';
import { useTheme } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

import { darkTheme, lightTheme } from '@/theme';

export function MUIProvider({ children }: { children: ReactNode }) {
  const { theme: localTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDarkTheme = localTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <MUIThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
