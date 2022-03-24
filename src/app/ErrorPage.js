import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** Error page */
const ErrorPage = ({ errors }) => {
  return (
    <Container maxWidth="sm" align="center" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box my={4} p={5}>
        {Array.isArray(errors) ?
          errors.map(error => (
            <Typography key={error} variant="h6">
              {error}
            </Typography>
          )
        )
        : 
        <Typography variant="h6">
          Server error. Try again later.
        </Typography>
      }

      </Box>
    </Container>
  )
}

export default ErrorPage;