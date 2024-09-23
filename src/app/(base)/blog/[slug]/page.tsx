import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { articleSelector } from '@/features';
import { useArticlesQuery } from '@/generated/graphql';
import { withSelector } from '@/utils';

import { BlogDetails } from './ui/blog-details';

type BlogDetailsProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const data = await withSelector(useArticlesQuery.fetcher(), {
    select: articleSelector,
  });

  return data.map((article) => ({ slug: article.slug }));
}

export default async function BlogDetailsPage({
  params: { slug },
}: BlogDetailsProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: useArticlesQuery.getKey({ filters: { slug: { eq: slug } } }),
    queryFn: useArticlesQuery.fetcher({ filters: { slug: { eq: slug } } }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogDetails slug={slug} />
    </HydrationBoundary>
  );
}
