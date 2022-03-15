import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

/** Menu bar to allow for editing or deleting a user's result from a posting
 * Only display for user's own result
 *
 * PostingDetail -> ResultList -> ResultCardList -> ResultCard -> {ResultInfo, ResultEditBar, CommentDashboard}
 */
const ResultEditBar = ({ postId, deleteResult}) => {
  return (
    <Box sx={{display:"flex", justifyContent: "flex-end"}} >
      <IconButton
        component={RouterLink}
        to={`/postings/${postId}/results`}
      >
        <EditIcon />
      </IconButton>

      <IconButton
        onClick={deleteResult}
      >
        <DeleteForeverIcon />
      </IconButton>
  </Box>
  )
}

export default ResultEditBar;