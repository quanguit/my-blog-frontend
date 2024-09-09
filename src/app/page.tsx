import { Box, Typography } from '@mui/material';

export default function HomePage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Box>
      <Typography>Home</Typography>
    </Box>
  );
}
