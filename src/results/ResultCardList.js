import React, {useContext} from 'react';

import Stack from '@mui/material/Stack';

import UserContext from '../auth/UserContext';
import ResultCard from './ResultCard';


/** Shows list of result cards
 * 
 * PostingDetail -> ResultList -> ResultCardList -> ResultCard
 * 
 */
const ResultCardList = ({ results, deleteResult }) => {   
  const {user} = useContext(UserContext);

  return (
    <Stack spacing={2} >
      {results.map(result => (
        <ResultCard 
          key={result.id}
          id={result.id} 
          userFirst={result.userFirst} 
          score={result.score} 
          notes={result.notes}
          isUser={result.userId === user.id}
          postId={result.postId}
          deleteResult={deleteResult}
        />
      ))}
    </Stack>
  )
}

export default ResultCardList;