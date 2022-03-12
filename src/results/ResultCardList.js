import React from 'react';
import Stack from '@mui/material/Stack';

import ResultCard from './ResultCard';
import { scoreToString } from '../helpers/formatScore';

/** Shows list of result cards
 * 
 * PostingDetail -> ResultCardList -> ResultCard
 * 
 */
const ResultCardList = ({ results, scoreType }) => {   
  return (
    <Stack spacing={2} >
      {results.map(result => (
        <ResultCard 
          key={result.id}
          id={result.id} 
          userFirst={result.userFirst} 
          score={scoreToString(scoreType, result.score)} 
          notes={result.notes}
        />
      ))}
    </Stack>
  )
}

export default ResultCardList;