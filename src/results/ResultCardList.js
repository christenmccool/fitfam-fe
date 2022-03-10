import React from 'react';
import Stack from '@mui/material/Stack';

import ResultCard from './ResultCard';

const ResultCardList = ({ results }) => {
  return (
    <Stack spacing={2} m="auto">
      {results.map(result => (
          <div>
            <h1>{result.userId}</h1>
            <h1>{result.score}</h1>
          </div>
        ))
      }
    </Stack>
  )
}

export default ResultCardList;