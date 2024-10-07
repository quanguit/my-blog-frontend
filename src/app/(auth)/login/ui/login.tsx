'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Form, Input, PasswordInput } from '@/components';
import { allRoutes } from '@/constants';
import { LoginInputDTO, loginSchema } from '@/features';
import { useLoginMutation } from '@/generated/graphql';
import { useAuth } from '@/hooks';

export const Login = () => {
  const { mutate } = useLoginMutation();
  const router = useRouter();

  const { refetchUser } = useAuth();

  const methods = useForm<LoginInputDTO>({
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<LoginInputDTO> = (input) => {
    mutate(
      { input },
      {
        onSuccess: () => {
          refetchUser();
          router.push(allRoutes['/'].toURL());
        },
      },
    );
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" align="center" mb={1} fontWeight={600}>
        Welcome Back! Log In to Access My Blog
      </Typography>
      <Typography variant="body1" align="center" mb={3} fontWeight={500}>
        Access my personal dashboard, stay updated, and connect with my latest
        posts.
      </Typography>
      <Form
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2}
        width={1}
      >
        <Input name="identifier" label="Username or Email" />
        <PasswordInput name="password" label="Password" />
        <Button variant="contained" type="submit">
          Login
        </Button>
        <Button href={allRoutes.register.toURL()} component={Link}>
          Register
        </Button>
        <Typography align="center">
          Please{' '}
          <Typography
            color="primary"
            component={Link}
            href={allRoutes['/'].toURL()}
            sx={{ textDecoration: 'underline' }}
          >
            click here
          </Typography>{' '}
          to use without login
        </Typography>
      </Form>
    </Container>
  );
};
