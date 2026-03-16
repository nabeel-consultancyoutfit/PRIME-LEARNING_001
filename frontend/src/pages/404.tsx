import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Page Not Found
      </Typography>
      <Link href="/dashboard" passHref legacyBehavior>
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Go Home
        </Button>
      </Link>
    </Box>
  );
}
