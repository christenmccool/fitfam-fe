import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


/** Menu bar to allow editing a workout posting
 *
 * PostingList -> PostingEditBar
 */
const PostingEditBar = ({ postId }) => {
  return (
    <Box sx={{display:"flex", justifyContent: "flex-end"}} >
      <Button
        variant="contained"
        component={RouterLink}
        to={`/postings/${postId}/edit`}
        color="grey"
        sx={{p: 0, color: "text.secondary"}}
      >
        Edit
      </Button>
  </Box>
  )
}

export default PostingEditBar;