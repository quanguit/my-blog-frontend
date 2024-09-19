import { Box, Button, Grid2 as Grid, Typography } from '@mui/material';
import Image from 'next/image';

import avatar from '@/assets/images/avatar.jpg';
import { Card, Flex } from '@/components';
import { allRoutes } from '@/constants';
import { articleSelector } from '@/features';
import { useArticlesQuery } from '@/generated/graphql';
import { withSelector } from '@/utils';

export default async function BlogPage() {
  const data = await withSelector(useArticlesQuery.fetcher(), {
    select: articleSelector,
  });

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
        <Grid container spacing={2} mb={4}>
          {data.map((dt) => (
            <Grid key={dt.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card
                title={dt.title}
                tags={dt.tags}
                image={dt.image}
                href={allRoutes.blog[':slug'].toURL({ slug: dt.slug })}
                author={{ name: 'Quang Do', avatar: avatar.src }}
                createdDate={dt.createdDate}
              />
            </Grid>
          ))}
        </Grid>

        <Button variant="outlined" color="inherit" sx={{ mx: 'auto' }}>
          Load More
        </Button>
      </Flex>
    </Flex>
  );
}
