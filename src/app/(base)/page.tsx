import { Button, Grid2 as Grid, Typography } from '@mui/material';

import avatar from '@/assets/images/avatar.jpg';
import { Card, Flex, Slider } from '@/components';
import { allRoutes } from '@/constants';
import { articleSelector, bannerSelector } from '@/features';
import { useArticlesQuery, useBannersQuery } from '@/generated/graphql';
import { withSelector } from '@/utils';

export const revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME);

export default async function HomePage() {
  // const { data } = useArticlesQuery(undefined, {
  //   select: articleSelector,
  // });

  const articles = await withSelector(useArticlesQuery.fetcher(), {
    select: articleSelector,
  });

  const banners = await withSelector(useBannersQuery.fetcher(), {
    select: bannerSelector,
  });

  return (
    <Flex flexDirection="column">
      <Slider images={banners} sx={{ mb: 10 }} />

      <Flex flexDirection="column">
        <Typography variant="h5" fontWeight={700} mb={2}>
          Latest Post
        </Typography>
        <Grid container spacing={2} mb={4}>
          {articles?.map((dt) => (
            <Grid key={dt.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card
                title={dt.title}
                tags={dt.tags}
                image={dt.image}
                href={allRoutes.blog[':slug'].toURL({
                  slug: dt.slug,
                })}
                author={{ name: 'Quang Do', avatar: avatar.src }}
                createdDate={dt.createdDate}
              />
            </Grid>
          ))}
        </Grid>

        <Button variant="outlined" color="inherit" sx={{ mx: 'auto' }}>
          View More Post
        </Button>
      </Flex>
    </Flex>
  );
}
