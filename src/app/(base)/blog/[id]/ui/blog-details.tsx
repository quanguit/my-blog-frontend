'use client';

import { Avatar, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import avatar from '@/assets/images/avatar.jpg';
import { CkContent, Flex } from '@/components';
import { articleDetailsSelector } from '@/features';
import {
  useArticleDetailsQuery,
  useUpdateArticleMutation,
} from '@/generated/graphql';

interface BlogDetailsProps {
  id: string;
}

export function BlogDetails({ id }: BlogDetailsProps) {
  const { data, refetch } = useArticleDetailsQuery(
    { id },
    {
      select: articleDetailsSelector,
    },
  );

  const { mutate } = useUpdateArticleMutation();

  useEffect(() => {
    // call api 1 more time to get new views
    refetch().then(({ data }) => {
      if (data) {
        mutate({
          id: data.id,
          data: {
            views: data.views + 1,
          },
        });
      }
    });
  }, [mutate, refetch]);

  if (!data) {
    return null;
  }

  return (
    <Flex flexDirection="column">
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
      <Stack direction="row" alignItems="center" mt={1.5} mb={3}>
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
      <CkContent content={data.content} />
    </Flex>
  );
}
