import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { articleSelector } from '@/features';
import { useArticleDetailsQuery, useArticlesQuery } from '@/generated/graphql';
import { withSelector } from '@/utils';

import { BlogDetails } from './ui/blog-details';

type BlogDetailsProps = {
  params: { id: string };
};

export async function generateStaticParams() {
  const data = await withSelector(useArticlesQuery.fetcher(), {
    select: articleSelector,
  });

  return data.map((article) => ({ id: article.id }));
}

export default async function BlogDetailsPage({
  params: { id },
}: BlogDetailsProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: useArticleDetailsQuery.getKey({ id }),
    queryFn: useArticleDetailsQuery.fetcher({ id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogDetails id={id} />
    </HydrationBoundary>
  );
}
