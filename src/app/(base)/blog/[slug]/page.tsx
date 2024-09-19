import { Avatar, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import avatar from '@/assets/images/avatar.jpg';
import { CkContent, Flex } from '@/components';
import { articleSelector } from '@/features';
import { useArticlesQuery } from '@/generated/graphql';
import { withSelector } from '@/utils';

type BlogDetailsProps = {
  params: { slug: string };
};

export const revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME);

export async function generateStaticParams() {
  const data = await withSelector(useArticlesQuery.fetcher(), {
    select: articleSelector,
  });

  return data.map((article) => ({ slug: article.slug }));
}

export default async function BlogDetails({
  params: { slug },
}: BlogDetailsProps) {
  const [data] = await withSelector(
    useArticlesQuery.fetcher({
      filters: {
        slug: {
          eq: slug,
        },
      },
    }),
    {
      select: articleSelector,
    },
  );

  return (
    <Flex flexDirection="column" alignItems="start">
      <Stack direction="row" spacing={2} mb={2}>
        {data.tags.map((tag) => (
          <Chip key={tag} label={tag} variant="filled" color="primary" />
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
