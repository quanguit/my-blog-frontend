import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { useArticleDetailsQuery, useArticlesQuery } from '@/generated/graphql';

import { BlogDetails } from './ui/blog-details';

type BlogDetailsProps = {
  params: { id: string };
};

export async function generateStaticParams() {
  const data = await useArticlesQuery.fetcher()();

  return (data.articles_connection?.nodes ?? []).map((article) => ({
    id: article.documentId,
  }));
}

export default async function BlogDetailsPage({
  params: { id },
}: BlogDetailsProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: useArticleDetailsQuery.getKey({ documentId: id }),
    queryFn: useArticleDetailsQuery.fetcher({ documentId: id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogDetails id={id} />
    </HydrationBoundary>
  );
}
