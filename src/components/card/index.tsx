import {
  Avatar,
  Box,
  CardActionArea,
  Chip,
  Card as MUICard,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { startCase } from 'lodash';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';

export interface Author {
  name: string;
  avatar?: string;
}

export interface CardProps {
  href: string;
  image: string | StaticImport;
  title: string;
  tags: string[];
  author: Author;
  createdDate: Date;
}

export function Card({
  href,
  image,
  title,
  author,
  tags,
  createdDate,
}: CardProps) {
  return (
    <MUICard variant="outlined" sx={{ borderRadius: 2 }}>
      <CardActionArea component={Link} href={href} sx={{ p: 2 }}>
        <Box
          position="relative"
          borderRadius={2}
          overflow="hidden"
          sx={{ aspectRatio: 3 / 2 }}
          mb={2}
        >
          <Image
            src={image}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
            alt={title}
            placeholder="blur"
          />
        </Box>
        <Box p={1}>
          <Stack direction="row" spacing={2} mb={2}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={startCase(tag)}
                variant="outlined"
                color="primary"
                sx={{ mb: 2 }}
              />
            ))}
          </Stack>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
            height={40}
            lineHeight={1}
            overflow="hidden"
            textOverflow="ellipsis"
            sx={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
            }}
          >
            {title}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar alt={author.name} src={author.avatar} />
              <Typography variant="body2" color="grey" flexShrink={0}>
                {author.name}
              </Typography>
            </Stack>
            <Typography variant="body2" color="grey" fontWeight={400}>
              {dayjs(createdDate).format('MMM DD, YYYY')}
            </Typography>
          </Stack>
        </Box>
      </CardActionArea>
    </MUICard>
  );
}
