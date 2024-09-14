'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { getQueryClient } from '@/services';

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children};</QueryClientProvider>
  );
}
