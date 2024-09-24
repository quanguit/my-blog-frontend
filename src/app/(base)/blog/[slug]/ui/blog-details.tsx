'use client';

import { Avatar, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import avatar from '@/assets/images/avatar.jpg';
import { CkContent, Flex } from '@/components';
import { articleSelector } from '@/features';
import {
  useArticlesQuery,
  useUpdateArticleMutation,
} from '@/generated/graphql';

interface BlogDetailsProps {
  slug: string;
}

export function BlogDetails({ slug }: BlogDetailsProps) {
  const { data } = useArticlesQuery(
    {
      filters: {
        slug: {
          eq: slug,
        },
      },
    },
    {
      select: (data) => articleSelector(data)[0],
    },
  );

  const { mutate } = useUpdateArticleMutation();

  useEffect(() => {
    if (data) {
      mutate(
        {
          id: data.id,
          data: {
            views: data.views + 1,
          },
        },
        {
          onSuccess: (data) => {
            console.log('onSuccess: ', data);
          },
          onError: (error) => {
            console.log('onError: ', error);
          },
        },
      );
    }
  }, [slug, data, mutate]);

  if (!data) {
    return null;
  }

  return (
    <Flex flexDirection="column" alignItems="start">
      <Stack direction="row" spacing={2} mb={2}>
        {data.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            variant="filled"
            color="primary"
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Stack>
      <Typography variant="h4" fontWeight={600}>
        {data.title}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={1.5}
        mb={3}
      >
        <Stack direction="row" alignItems="center" spacing={1} mr={5}>
          <Avatar alt={avatar.src} src={avatar.src} />
          <Typography variant="body1" color="grey">
            Quang Do
          </Typography>
        </Stack>
        <Typography variant="body1" color="grey" fontWeight={400}>
          {dayjs(data.createdDate).format('MMMM DD, YYYY')}
        </Typography>
      </Stack>
      <CkContent>{data.content}</CkContent>
    </Flex>
  );
}
