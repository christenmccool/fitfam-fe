import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


/** Menu bar to allow editing a workout posting
 *
 * PostingList -> PostingEditBar
 */
const PostingEditBar = ({ postId, isUserWo, handleDelete }) => {
  return (
    <Box sx={{display:"flex", justifyContent: "flex-end"}} >
      {isUserWo ?
        <Button
          variant="contained"
          component={RouterLink}
          to={`/postings/${postId}/edit`}
          color="grey"
          sx={{p: 0, color: "text.secondary"}}
        >
          Edit
        </Button>
        :
        <Button
        variant="contained"
        onClick={handleDelete}
        color="grey"
        sx={{p: 0, color: "text.secondary"}}
      >
        Delete
      </Button>
      } 
    </Box>
  )
}

export default PostingEditBar;