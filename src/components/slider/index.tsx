'use client';

import { Box, BoxProps } from '@mui/material';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import ReactSlick, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { BannerFragment } from '@/generated/graphql';

interface SliderProps extends Omit<BoxProps, 'draggable'> {
  // If get all properties in images, we can use Banner type
  // but if we only defined some properties in Banner, we must use BannerFragment type
  images: BannerFragment[];
}

export const Slider = (props: SliderProps) => {
  const { images, sx, ...rest } = props;
  const { theme } = useTheme();

  const settings: Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <Box
      component={ReactSlick}
      sx={{
        '.slick-dots': {
          li: {
            width: 'unset',
            height: 'unset',
            button: {
              // padding: 1,
              width: 0,
              height: 0,
              borderRadius: 5,
              bgcolor: theme === 'dark' ? 'primary.main' : 'grey',
              ':before': {
                content: 'none',
              },
              transition: 'all 0.3s linear',
            },
            '&.slick-active': {
              button: {
                paddingX: 2,
              },
            },
          },
        },
        ...sx,
      }}
      {...settings}
      {...rest}
    >
      {images.map((img) => (
        <Box
          key={img.documentId}
          position="relative"
          borderRadius={2}
          overflow="hidden"
          sx={{ aspectRatio: 3 }}
        >
          <Image
            src={`http://localhost:1337${img.image.url}`}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
            alt={img.image.alternativeText ?? ''}
            // placeholder="blur"
          />
        </Box>
      ))}
    </Box>
  );
};
