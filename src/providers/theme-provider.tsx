'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

import { MUIProvider } from './mui-provider';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <MUIProvider>{children}</MUIProvider>
    </NextThemesProvider>
  );
}
