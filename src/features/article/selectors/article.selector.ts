import { ArticleDetailsQuery, ArticlesQuery } from '@/generated/graphql';

import { ArticleDTO } from '../dtos';

export const articleSelector = (data: ArticlesQuery): Array<ArticleDTO> =>
  data?.articles?.data.map((article) => ({
    id: article.id ?? '',
    slug: article.attributes?.slug ?? '',
    title: article.attributes?.title ?? '',
    image: article.attributes?.image?.data?.attributes?.url ?? '',
    content: article.attributes?.content ?? '',
    tags:
      article.attributes?.categories?.data.map(
        (category) => category.attributes?.name ?? '',
      ) ?? [],
    createdDate: article.attributes?.createdAt ?? new Date(),
    views: article.attributes?.views ?? 0,
  })) ?? [];

export const articleDetailsSelector = (
  data: ArticleDetailsQuery,
): ArticleDTO => ({
  id: data.article?.data?.id ?? '',
  slug: data.article?.data?.attributes?.slug ?? '',
  title: data.article?.data?.attributes?.title ?? '',
  image: data.article?.data?.attributes?.image?.data?.attributes?.url ?? '',
  content: data.article?.data?.attributes?.content ?? '',
  tags:
    data.article?.data?.attributes?.categories?.data.map(
      (category) => category.attributes?.name ?? '',
    ) ?? [],
  createdDate: data.article?.data?.attributes?.createdAt ?? new Date(),
  views: data.article?.data?.attributes?.views ?? 0,
});
