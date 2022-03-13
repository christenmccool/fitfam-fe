import React, {useContext} from 'react';
import Stack from '@mui/material/Stack';

import ResultCard from './ResultCard';
import UserContext from '../auth/UserContext';
import { scoreToString } from '../helpers/formatScore';

/** Shows list of result cards
 * 
 * PostingDetail -> ResultCardList -> ResultCard
 * 
 */
const ResultCardList = ({ postId, results, scoreType }) => {   
  const {user} = useContext(UserContext);

  return (
    <Stack spacing={2} >
      {results.map(result => (
        <ResultCard 
          key={result.id}
          id={result.id} 
          userFirst={result.userFirst} 
          score={scoreToString(scoreType, result.score)} 
          notes={result.notes}
          isUser={result.userId === user.id}
          postId={postId}
        />
      ))}
    </Stack>
  )
}

export default ResultCardList;