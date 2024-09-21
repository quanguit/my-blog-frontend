import { ArticlesQuery } from '@/generated/graphql';

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
  })) ?? [];
