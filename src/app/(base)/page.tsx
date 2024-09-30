import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import { DEFAULT_PAGE, PAGE_SIZE, REVALIDATE_TIME } from '@/constants';
import {
  useArticlesQuery,
  useBannersQuery,
  useInfiniteArticlesQuery,
} from '@/generated/graphql';
import { getQueryClient } from '@/services';

import { Home } from './ui/home';

export const revalidate = REVALIDATE_TIME;

export const metadata: Metadata = {
  title: 'Home',
  description: 'This is Home Page',
};

export default async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: useInfiniteArticlesQuery.getKey({
      sort: ['publishedAt:desc'],
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE,
      },
    }),
    queryFn: ({ pageParam }) => useArticlesQuery.fetcher(pageParam)(),
    initialPageParam: {
      sort: ['publishedAt:desc'],
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: useBannersQuery.getKey(),
    queryFn: useBannersQuery.fetcher(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
}
