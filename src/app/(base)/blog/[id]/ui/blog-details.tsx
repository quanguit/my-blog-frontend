'use client';

import { Avatar, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import avatar from '@/assets/images/avatar.jpg';
import { CkContent, Flex } from '@/components';
import { useArticleQuery, useUpdateArticleMutation } from '@/generated/graphql';

interface BlogDetailsProps {
  id: string;
}

export function BlogDetails({ id }: BlogDetailsProps) {
  const { data, refetch } = useArticleQuery(
    { documentId: id },
    {
      select: (dt) => dt.article,
    },
  );

  const { mutate } = useUpdateArticleMutation();

  useEffect(() => {
    // call api 1 more time to get new views
    refetch().then(({ data }) => {
      if (data) {
        mutate({
          documentId: data.documentId,
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
        {data.categories.map((category) => (
          <Chip
            key={category?.documentId}
            label={category?.name}
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
          {dayjs(data.createdAt).format('MMMM DD, YYYY')}
        </Typography>
      </Stack>
      <CkContent content={data.content || ''} />
    </Flex>
  );
}
