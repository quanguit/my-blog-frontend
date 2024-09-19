'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Form, Input } from '@/components';
import { PasswordInput } from '@/components/password-input';
import { allRoutes } from '@/constants';
import { useRegisterMutation } from '@/generated/graphql';
import { registerSchema, RegiterInputDTO } from '@/restful-api/auth/dtos';

const RegisterPage = () => {
  const { mutate } = useRegisterMutation();

  const methods = useForm<RegiterInputDTO>({
    resolver: yupResolver(registerSchema),
  });

  const { handleSubmit, watch } = methods;

  const [username, email, password] = watch(['username', 'email', 'password']);

  const onSubmit: SubmitHandler<RegiterInputDTO> = (data) => {
    mutate(
      {
        input: data,
      },
      {
        onSuccess: (data) => {
          console.log('data: ', data);
        },
        onError: (data) => {
          console.log('data1: ', data);
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
        Join My Journey! Create Your Account
      </Typography>
      <Typography variant="body1" align="center" mb={3} fontWeight={500}>
        Sign up to follow my stories, receive updates, and be part of the
        conversation.
      </Typography>
      <Form
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2}
        width={1}
      >
        <Input name="username" label="Username" />
        <Input name="email" label="Email" />
        <PasswordInput name="password" label="Password" />
        <Button variant="contained" type="submit">
          Register
        </Button>
        <Button
          type="submit"
          href={allRoutes.login.toURL()}
          component={Link}
          variant="text"
          sx={{ mx: 'auto' }}
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
