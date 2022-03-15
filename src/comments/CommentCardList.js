import React, {useContext} from 'react';

import Stack from '@mui/material/Stack';

import UserContext from '../auth/UserContext';
import CommentCard from './CommentCard';

/** Shows list of comment cards
 * 
 * CommentList -> CommentCardList -> CommentCard
 */
const CommentCardList = ({ comments, editComment, deleteComment }) => {
  const {user} = useContext(UserContext);

  return (
    <Stack spacing={1}>
      {comments.map(comment => (
        <CommentCard 
          key={comment.id}
          id={comment.id} 
          userFirst={comment.userFirst}
          content={comment.content} 
          isUser={comment.userId === user.id}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      ))}
    </Stack>
  )
}

export default CommentCardList;