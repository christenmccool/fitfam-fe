import React, {useContext} from 'react';

import Stack from '@mui/material/Stack';

import UserContext from '../auth/UserContext';
import PostingCard from './PostingCard';

/** Shows list of posting cards
 * 
 * PostingList -> PostingCardList -> PostingCard
 * 
 */
const PostingCardList = ({ postings, cardMaxHeight=1000 }) => {
  const {user} = useContext(UserContext);

  return (
    <Stack spacing={2} >
      {postings.map(posting => (
        <PostingCard 
          key={posting.id}
          id={posting.id} 
          woName={posting.workout.woName} 
          woDescription={posting.workout.woDescription} 
          woScoreType={posting.workout.woScoreType} 
          maxHeight={cardMaxHeight}
          isUserPost={posting.postBy === user.id}
        />
      ))}
    </Stack>
  )
}

export default PostingCardList;