'use client';

import { Box, Button, Grid2 as Grid, Typography } from '@mui/material';
import Image from 'next/image';

import img1 from '@/assets/images/img1.jpg';
import { Card, Flex } from '@/components';
import { allRoutes, posts } from '@/constants';

export default function BlogPage() {
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
          src={img1}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
          alt={img1.src}
          placeholder="blur"
        />
      </Box>

      <Flex flexDirection="column">
        <Grid container spacing={2} mb={4}>
          {posts.map((post) => (
            <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card
                title={post.title}
                tags={[post.tag]}
                image={post.image}
                href={allRoutes.blog[':id'].toURL({ id: post.id })}
                author={{ name: post.author, avatar: img1.src }}
                createdDate={post.created_date}
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
