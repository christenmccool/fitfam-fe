import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** Not Found page
 */
const NotFound = () => {

  return (
    <Container maxWidth="sm" align="center" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box my={4} p={5}>
          <Typography variant="h6">
            The page you are looking for cannot be found
          </Typography>
      </Box>
    </Container>
  )
}

export default NotFound;