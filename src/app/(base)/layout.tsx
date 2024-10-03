import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

import { AppBar, Footer } from './components';

export default async function BaseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Box
      component="main"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <AppBar />
      <Container sx={{ py: 2 }}>{children}</Container>
      <Footer mt="auto" />
    </Box>
  );
}
