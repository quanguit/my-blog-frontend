import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={20}
    >
      <Typography variant="body1" color="primary" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h3" fontWeight="bold" my={2}>
        Page not found
      </Typography>
      <Typography variant="body1" mb={2}>
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </Typography>
      <Link href="/">
        <Button variant="contained" color="primary">
          Go back home
        </Button>
      </Link>
    </Box>
  );
}
