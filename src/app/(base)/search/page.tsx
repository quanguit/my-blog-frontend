'use client';

import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

import avatar from '@/assets/images/avatar.jpg';
import { Card, Flex } from '@/components';
import { allRoutes, DEFAULT_PAGE, PAGE_SIZE } from '@/constants';
import { useInfiniteArticlesQuery } from '@/generated/graphql';
import { useInfinityScroll } from '@/hooks';
import { getNextPageParamFunc } from '@/services';

export default function SearchPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get('q');

  const { data, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteArticlesQuery(
      {
        filters: {
          or: [
            {
              title: { containsi: search },
            },
            {
              description: { containsi: search },
            },
            {
              content: { containsi: search },
            },
          ],
        },
        pagination: {
          page: DEFAULT_PAGE,
          pageSize: PAGE_SIZE,
        },
      },
      {
        getNextPageParam: (lastPage) =>
          getNextPageParamFunc(lastPage.articles_connection?.pageInfo),
        initialPageParam: {
          filters: {
            or: [
              {
                title: { containsi: search },
              },
              {
                description: { containsi: search },
              },
              {
                content: { containsi: search },
              },
            ],
          },
          pagination: {
            page: DEFAULT_PAGE,
            pageSize: PAGE_SIZE,
          },
        },
        select: (dt) => dt.pages,
        // add staleTime to prevent re-fetching data when switching between tabs
        staleTime: Infinity,
        // default retry 4 times
        retry: false,
      },
    );

  const ref = useInfinityScroll(fetchNextPage);

  return (
    <Flex flexDirection="column">
      <Typography variant="h4" align="center" fontWeight={700} mb={4}>
        Search result for: {search}
      </Typography>
      <Flex flexDirection="column">
        <Grid container spacing={2} mb={4}>
          {data?.map((page) =>
            page.articles_connection?.nodes.map((article) => (
              <Grid
                key={article.documentId}
                component={motion.div}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
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
          {isFetchingNextPage &&
            Array(4)
              .fill(null)
              .map((_, index) => (
                <Grid
                  component={motion.div}
                  key={index}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2 }}
                >
                  <Card isLoading />
                </Grid>
              ))}
        </Grid>
        {!isFetching && <Box ref={ref} />}
      </Flex>
    </Flex>
  );
}
