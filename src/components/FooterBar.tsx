import * as React from 'react';
import {Box, Link, Typography} from '@mui/material';

export default function FooterBar() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Typography
        variant="body2"
        align="center"
        sx={{
          color: 'text.secondary',
        }}
      >
        {'Copyright © '}
        <Link color="inherit" href="https://www.hodloof.com/">
          HODLoof
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
      {/* <Box sx={{ flex: '1 1 auto' }} /> */}
    </Box>
  );
}