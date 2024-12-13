'use client';

import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { allRoutes } from '@/constants';

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setMessage(error.message);
    console.error(error);
  }, [error]);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={20}
    >
      <Typography variant="h4" color="primary" fontWeight="bold">
        Something went wrong
      </Typography>
      <Typography variant="body1" fontWeight="bold" my={2} textAlign="center">
        {message || 'An unexpected error has occurred. Please try again later.'}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={
            // Attempt to recover by trying to re-render the page
            () => reset()
          }
        >
          Try Again
        </Button>
        <Button
          component={Link}
          href={allRoutes['/'].toURL()}
          variant="text"
          color="primary"
        >
          Go back home
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;
