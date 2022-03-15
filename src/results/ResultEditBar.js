import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


/** Menu bar to allow editing or deleting a user's result from a posting
 * Only display for user's own result
 *
 * PostingDetail -> ResultList -> ResultCardList -> ResultCard -> {ResultInfo, ResultEditBar, CommentDashboard}
 */
const ResultEditBar = ({ postId, deleteResult}) => {
  return (
    <Box sx={{display:"flex", justifyContent: "flex-end"}} >
      <Button
        variant="outlined"
        component={RouterLink}
        to={`/postings/${postId}/results`}
        sx={{p: 0 }}
      >
        Edit
      </Button>
  </Box>
  )
}

export default ResultEditBar;