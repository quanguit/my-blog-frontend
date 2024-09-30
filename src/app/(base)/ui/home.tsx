'use client';

import { Button, Grid2 as Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import avatar from '@/assets/images/avatar.jpg';
import { Card, Flex, Slider } from '@/components';
import { allRoutes, DEFAULT_PAGE, PAGE_SIZE } from '@/constants';
import { useBannersQuery, useInfiniteArticlesQuery } from '@/generated/graphql';
import { getNextPageParamFunc } from '@/services';

export function Home() {
  const {
    data: articles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteArticlesQuery(
    {
      sort: ['publishedAt:desc'],
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE,
      },
    },
    {
      getNextPageParam: (lastPage) =>
        getNextPageParamFunc(lastPage.articles_connection?.pageInfo),
      initialPageParam: {
        sort: ['publishedAt:desc'],
        pagination: {
          page: DEFAULT_PAGE,
          pageSize: PAGE_SIZE,
        },
      },
      // add staleTime to prevent re-fetching data when switching between tabs
      staleTime: Infinity,
      // default retry 4 times
      retry: false,
      select: (dt) => dt.pages,
    },
  );

  const { data: banners } = useBannersQuery(undefined, {
    select: (dt) => dt.banners.filter((banner) => !!banner),
    staleTime: Infinity,
  });

  return (
    <Flex flexDirection="column">
      {banners && <Slider images={banners} sx={{ mb: 10 }} />}

      <Flex flexDirection="column">
        <Typography variant="h5" fontWeight={700} mb={2}>
          Latest Post
        </Typography>
        <Grid container spacing={2} mb={4}>
          {articles?.map((page) =>
            page.articles_connection?.nodes.map((article) => (
              <Grid
                key={article.documentId}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              >
                <Card
                  title={article.title}
                  tags={article.categories.map(
                    (category) => category?.name ?? '',
                  )}
                  image={article.image.url}
                  href={allRoutes.blog[':id'].toURL({
                    id: article.documentId,
                  })}
                  author={{ name: 'Quang Do', avatar: avatar.src }}
                  createdDate={article.createdAt}
                />
              </Grid>
            )),
          )}
        </Grid>
        {hasNextPage &&
          (isFetchingNextPage ? (
            <CircularProgress color="inherit" sx={{ mx: 'auto' }} />
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              sx={{ mx: 'auto' }}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              View More Post
            </Button>
          ))}
      </Flex>
    </Flex>
  );
}
