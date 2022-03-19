import React from 'react';

import Stack from '@mui/material/Stack';
import { Alert as MuiAlert } from '@mui/material';

const Alert = ({ messages=[] }) => {
  return (
    <Stack spacing={1}>
      {messages.map((ele, i) => (
        <MuiAlert 
          key={i} 
          severity="error"
        >
          {ele}
        </MuiAlert>
      )
      )}
    </Stack>
  )
}

export default Alert;