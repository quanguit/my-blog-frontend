'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

import avatar from '@/assets/images/avatar.jpg';
import { Flex, Form, Input } from '@/components';
import { ContactInputDTO, contactSchema } from '@/features';

export default function ContactPage() {
  const { theme } = useTheme();

  const methods = useForm<ContactInputDTO>({
    resolver: yupResolver(contactSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ContactInputDTO> = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <Stack
        alignItems="center"
        spacing={3}
        bgcolor={`${theme === 'dark' ? '#242535' : '#EEEEEE'}`}
        borderRadius={2}
        py={4}
        mb={10}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar alt="Quang" src={avatar.src} sx={{ width: 64, height: 64 }} />
          <Stack>
            <Typography variant="h6" fontWeight={700}>
              Quang Do
            </Typography>
            <Typography variant="body2" color="grey">
              Software Engineer
            </Typography>
          </Stack>
        </Stack>
        <Typography maxWidth={720} textAlign="center">
          Hi, I&apos;m Quang, I&apos;m a software engineer. With the ability to
          learn and research many things related to technology, I want to build
          applications with the most interesting experience for end user.
          Frequently, I update news about technology in the world and improve my
          knowledge by self-learning new technologies and apply it for my
          applications in the future perfectly.
        </Typography>
        <Stack direction="row" alignItems="center">
          <IconButton
            component={Link}
            href={process.env.NEXT_PUBLIC_FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            component={Link}
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            component={Link}
            href={process.env.NEXT_PUBLIC_LINKED_IN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component={Link}
            href={process.env.NEXT_PUBLIC_WHATS_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
          </IconButton>
          <IconButton
            component={Link}
            href={process.env.NEXT_PUBLIC_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Paper
          variant="outlined"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography variant="h5" mb={1}>
            Send Me A Message
          </Typography>
          <Flex gap={4}>
            <Input name="firstName" label="First Name" fullWidth />
            <Input name="lastName" label="Last Name" fullWidth />
          </Flex>
          <Input name="email" label="Email" />
          <Input name="message" label="Message" rows={4} multiline />
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Paper>
      </Form>
    </Box>
  );
}
