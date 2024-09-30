'use client';

import {
  Box,
  CircularProgress,
  Grid2 as Grid,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

import avatar from '@/assets/images/avatar.jpg';
import { Card, Flex } from '@/components';
import { allRoutes, DEFAULT_PAGE, PAGE_SIZE } from '@/constants';
import { useInfiniteArticlesQuery } from '@/generated/graphql';
import { useInfinityScroll } from '@/hooks';
import { getNextPageParamFunc } from '@/services';

export function Blogs() {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteArticlesQuery(
    {
      sort: ['views:desc'],
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE,
      },
    },
    {
      getNextPageParam: (lastPage) =>
        getNextPageParamFunc(lastPage.articles_connection?.pageInfo),
      initialPageParam: {
        sort: ['views:desc'],
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
        All Blogs
      </Typography>
      <Box
        position="relative"
        borderRadius={2}
        overflow="hidden"
        sx={{ aspectRatio: 4 }}
        mb={8}
      >
        <Image
          src={avatar}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
          alt={avatar.src}
          placeholder="blur"
        />
      </Box>

      <Flex flexDirection="column">
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        > */}
        <Grid container spacing={2} mb={4}>
          {data?.map((page) =>
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
        {/* </motion.div> */}
        <Box ref={ref} />
        {isFetchingNextPage && (
          <CircularProgress color="inherit" sx={{ mx: 'auto' }} />
        )}
      </Flex>
    </Flex>
  );
}
