import {
  Avatar,
  Box,
  CardActionArea,
  Chip,
  Card as MUICard,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { startCase } from 'lodash';
import {
  StaticImageData,
  StaticImport,
} from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';

import { getStrapiURL } from '@/services';

export interface Author {
  name: string;
  avatar?: string;
}

export type CardProps =
  | {
      href: string;
      image: string | StaticImport;
      title: string;
      tags: string[];
      author: Author;
      createdDate: Date;
      isLoading?: false;
    }
  | {
      href?: undefined;
      image?: undefined;
      title?: undefined;
      tags?: undefined;
      author?: undefined;
      createdDate?: undefined;
      isLoading: true;
    };

export function Card({
  href,
  image,
  title,
  author,
  tags,
  createdDate,
  isLoading,
}: CardProps) {
  return (
    <MUICard variant="outlined" sx={{ borderRadius: 2 }}>
      <CardActionArea
        sx={{ p: 2 }}
        {...(!isLoading && {
          component: Link,
          href,
        })}
      >
        <Box
          position="relative"
          borderRadius={2}
          overflow="hidden"
          sx={{ aspectRatio: 3 / 2 }}
          mb={2}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          ) : (
            <Image
              src={`${getStrapiURL(typeof image == 'string' ? image : (image as StaticImageData).src)}`}
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
              }}
              alt={title}
              // placeholder="blur"
            />
          )}
        </Box>
        <Box p={1}>
          <Stack direction="row" spacing={2} mb={2} overflow="hidden">
            {isLoading
              ? Array(2)
                  .fill(null)
                  .map((_, index) => <Skeleton key={index} width="30%" />)
              : tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={startCase(tag)}
                    variant="outlined"
                    color="primary"
                    sx={{ mb: 2 }}
                  />
                ))}
          </Stack>
          {isLoading ? (
            <Skeleton width="80%" sx={{ mb: 1 }} />
          ) : (
            <Typography
              variant="h6"
              fontWeight={700}
              height={40}
              lineHeight={1}
              overflow="hidden"
              textOverflow="ellipsis"
              sx={{
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                display: '-webkit-box',
                color: 'inherit',
              }}
            >
              {title}
            </Typography>
          )}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                  sx={{ flexShrink: 0 }}
                />
              ) : (
                <Avatar alt={author.name} src={author.avatar} />
              )}
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  height={10}
                  width="100%"
                  sx={{ flexShrink: 0 }}
                />
              ) : (
                <Typography variant="body2" color="grey" flexShrink={0}>
                  {author.name}
                </Typography>
              )}
            </Stack>
            {isLoading ? (
              <Skeleton animation="wave" height={10} width="30%" />
            ) : (
              <Typography variant="body2" color="grey" fontWeight={400}>
                {dayjs(createdDate).format('MMM DD, YYYY')}
              </Typography>
            )}
          </Stack>
        </Box>
      </CardActionArea>
    </MUICard>
  );
}
