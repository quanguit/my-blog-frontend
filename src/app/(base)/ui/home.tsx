'use client';

import { Button, Grid2 as Grid, Typography } from '@mui/material';

import avatar from '@/assets/images/avatar.jpg';
import { Card, Flex, Slider } from '@/components';
import { allRoutes, DEFAULT_PAGE, PAGE_SIZE } from '@/constants';
import { articleSelector, bannerSelector } from '@/features';
import { useBannersQuery, useInfiniteArticlesQuery } from '@/generated/graphql';

export function Home() {
  const {
    data: articles,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteArticlesQuery(
    {
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE,
      },
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.articles?.meta.pagination &&
        lastPage.articles?.meta.pagination.page <
          lastPage.articles?.meta.pagination.pageCount
          ? {
              pagination: {
                page: lastPage.articles?.meta.pagination.page + 1,
                pageSize: DEFAULT_PAGE,
              },
            }
          : undefined,
      initialPageParam: {
        pagination: {
          page: DEFAULT_PAGE,
          pageSize: PAGE_SIZE,
        },
      },
      // add staleTime to prevent re-fetching data when switching between tabs
      staleTime: Infinity,
    },
  );

  const { data: banners } = useBannersQuery(undefined, {
    select: bannerSelector,
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
          {articles?.pages?.map((page) =>
            articleSelector(page).map((article) => (
              <Grid key={article.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card
                  title={article.title}
                  tags={article.tags}
                  image={article.image}
                  href={allRoutes.blog[':slug'].toURL({
                    slug: article.slug,
                  })}
                  author={{ name: 'Quang Do', avatar: avatar.src }}
                  createdDate={article.createdDate}
                />
              </Grid>
            )),
          )}
        </Grid>
        {hasNextPage && (
          <Button
            variant="outlined"
            color="inherit"
            sx={{ mx: 'auto' }}
            onClick={() => fetchNextPage()}
          >
            View More Post
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
