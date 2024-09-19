'use client';

import { Box, BoxProps } from '@mui/material';
import Image from 'next/image';
import ReactSlick, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { ImageDTO } from '@/features';

interface SliderProps extends Omit<BoxProps, 'draggable'> {
  images: ImageDTO[];
}

const settings: Settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
};

export const Slider = (props: SliderProps) => {
  const { images, ...rest } = props;

  return (
    <Box component={ReactSlick} {...settings} {...rest}>
      {images.map((img) => (
        <Box
          key={img.id}
          position="relative"
          borderRadius={2}
          overflow="hidden"
          sx={{ aspectRatio: 3 }}
        >
          <Image
            src={`http://localhost:1337${img.image}`}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
            alt={img.image}
            // placeholder="blur"
          />
        </Box>
      ))}
    </Box>
  );
};
