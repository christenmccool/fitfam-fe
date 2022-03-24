import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** Loading page
 */
const Loading = () => {

  return (
    <Container maxWidth="sm" align="center">
      <Box my={4} p={5}>
          <Typography variant="h6">
            Loading
          </Typography>
      </Box>
    </Container>
  )
}

export default Loading;