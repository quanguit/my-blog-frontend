'use client';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  Box,
  BoxProps,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

import { Flex, Icon } from '@/components';

const QuickLinks = ['Home', 'About', 'Blog', 'Author', 'Contact'];
const Category = ['Lifestyle', 'Technology', 'Travel', 'Business', 'Sports'];

export interface FooterProps extends BoxProps {}

export const Footer = ({ sx, ...props }: FooterProps) => {
  const [email, setEmail] = useState('');

  return (
    <Box {...props} sx={{ bgcolor: 'background.footer', ...sx }}>
      <Container maxWidth="xl">
        <Flex py={8} flexWrap="wrap" gap={{ xs: 4, md: 2 }}>
          <Box
            display="flex"
            flexDirection="column"
            flexBasis={300}
            flexGrow={1}
          >
            <Typography variant="h6" mb={3} fontWeight={700}>
              About
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography>
                <Typography component="span" fontWeight={700}>
                  Name:
                </Typography>{' '}
                Quang Do
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={700}>
                  Email:
                </Typography>{' '}
                nhatquang25012000@gmail.com{' '}
              </Typography>
              <Typography>
                {' '}
                <Typography component="span" fontWeight={700}>
                  Phone:
                </Typography>{' '}
                0902704896
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flexBasis={150}
            flexGrow={1}
          >
            <Typography variant="h6" mb={3} fontWeight={700}>
              Quick Link
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {QuickLinks.map((link) => (
                <Typography key={link} component={Link} href="/">
                  {link}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flexBasis={150}
            flexGrow={1}
          >
            <Typography variant="h6" mb={3} fontWeight={700}>
              Category
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {Category.map((cate) => (
                <Typography key={cate} component={Link} href="/">
                  {cate}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box flexBasis={300} flexGrow={1}>
            <Card
              variant="outlined"
              sx={{
                p: 4,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" fontWeight={700} mb={0.5}>
                Weekly Newsletter
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                mb={4}
                fontWeight={600}
              >
                Get blog articles and offers via email
              </Typography>
              <TextField
                size="small"
                placeholder="Your Email"
                slotProps={{
                  input: {
                    endAdornment: (
                      <IconButton aria-label="send mail">
                        <MailOutlineIcon />
                      </IconButton>
                    ),
                  },
                }}
                sx={{ mb: 1 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <Button variant="contained" color="primary" fullWidth>
                Subscribe
              </Button>
            </Card>
          </Box>
        </Flex>
        <Divider sx={{ mb: 2 }} />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Icon name="Copyright" sx={{ width: 240, height: 64 }} />
          <Flex gap={4}>
            <Typography
              component={Link}
              href="/"
              variant="body1"
              color="textSecondary"
            >
              Terms of Use
            </Typography>
            <Typography
              component={Link}
              href="/"
              variant="body1"
              color="textSecondary"
            >
              Privacy Policy
            </Typography>
            <Typography
              component={Link}
              href="/"
              variant="body1"
              color="textSecondary"
            >
              Cookie Policy
            </Typography>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};
