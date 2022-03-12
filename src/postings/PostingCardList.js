import React from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import PostingCard from './PostingCard';

/** Shows list of posting cards
 * 
 * PostingList -> PostingCardList -> PostingCard
 * 
 */
const PostingCardList = ({ postings, cardMaxHeight=1000 }) => {
  return (
    <Stack spacing={2} >
      {postings.map(posting => (
        <PostingCard 
          key={posting.id}
          id={posting.id} 
          woName={posting.woName} 
          woDescription={posting.woDescription} 
          maxHeight={cardMaxHeight}
        />
      ))}
    </Stack>
  )
}

export default PostingCardList;