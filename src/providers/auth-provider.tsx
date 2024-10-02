'use client';

import { createContext, ReactNode } from 'react';

import { MeFragment, useMeQuery } from '@/generated/graphql';

type AuthContextType = {
  user?: MeFragment | null;
  refetchUser: () => void;
};

const initialAuthContext: AuthContextType = {
  refetchUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, refetch } = useMeQuery(undefined, {
    retry: false,
    staleTime: Infinity,
  });

  return (
    <AuthContext.Provider value={{ user: data?.me, refetchUser: refetch }}>
      {children}
    </AuthContext.Provider>
  );
}
