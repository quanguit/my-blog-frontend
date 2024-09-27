import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { DEFAULT_PAGE, PAGE_SIZE } from '@/constants';
import {
  useArticlesQuery,
  useInfiniteArticlesQuery,
} from '@/generated/graphql';

import { Blogs } from './ui/blogs';

export default async function BlogsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: useInfiniteArticlesQuery.getKey({
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE,
      },
    }),
    queryFn: ({ pageParam }) => useArticlesQuery.fetcher(pageParam)(),
    initialPageParam: {
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE,
      },
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Blogs />
    </HydrationBoundary>
  );
}
