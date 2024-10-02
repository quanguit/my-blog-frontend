import { RequestInit } from '@/types';

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers'],
) {
  return async (): Promise<TData> => {
    const { next, cache, ...restOptions } = options || {};

    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...restOptions,
      },
      body: JSON.stringify({ query, variables }),
      next,
      cache,
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
