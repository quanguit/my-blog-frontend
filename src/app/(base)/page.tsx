'use client';

import { Box, Button, Grid2 as Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import img1 from '@/assets/images/img1.jpg';
import img2 from '@/assets/images/img2.jpg';
import img3 from '@/assets/images/img3.jpg';
import img4 from '@/assets/images/img4.jpg';
import img5 from '@/assets/images/img5.jpg';
import { Card, Flex } from '@/components';
import { allRoutes, posts } from '@/constants';

const images = [img1, img2, img3, img4, img5];

const settings: Settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
};

export default function HomePage() {
  return (
    <Flex flexDirection="column">
      <Box component={Slider} {...settings} mb={10}>
        {images.map((image) => (
          <Box
            key={image.src}
            position="relative"
            borderRadius={2}
            overflow="hidden"
            sx={{ aspectRatio: 3 }}
          >
            <Image
              src={image}
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
              }}
              alt={image.src}
              placeholder="blur"
            />
          </Box>
        ))}
      </Box>

      <Flex flexDirection="column">
        <Typography variant="h5" fontWeight={700} mb={2}>
          Latest Post
        </Typography>
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
          View More Post
        </Button>
      </Flex>
    </Flex>
  );
}
