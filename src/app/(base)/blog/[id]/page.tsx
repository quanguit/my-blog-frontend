import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata, ResolvingMetadata } from 'next';

import {
  useArticleQuery,
  useArticlesQuery,
  useCommentsQuery,
} from '@/generated/graphql';
import { getStrapiURL } from '@/services';

import { BlogDetails } from './ui/blog-details';

type Props = {
  params: { id: string };
};

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { article } = await useArticleQuery.fetcher({
    documentId: params.id,
  })();

  if (!article) return {};

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      images: [getStrapiURL(article.image.url), ...previousImages],
    },
  };
}

export async function generateStaticParams() {
  const data = await useArticlesQuery.fetcher()();

  return (data.articles_connection?.nodes ?? []).map((article) => ({
    id: article.documentId,
  }));
}

export default async function BlogDetailsPage({ params: { id } }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: useArticleQuery.getKey({ documentId: id }),
    queryFn: useArticleQuery.fetcher({ documentId: id }),
  });

  await queryClient.prefetchQuery({
    queryKey: useCommentsQuery.getKey({ documentId: id }),
    queryFn: useCommentsQuery.fetcher({ documentId: id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogDetails id={id} />
    </HydrationBoundary>
  );
}
