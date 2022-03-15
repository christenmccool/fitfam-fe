import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

/** Menu bar to allow for editing or deleting a user's comment from a result
 * Only display for user's own comment
 *
 */
const CommentEditBar = ({ toggleEditing, deleteComment}) => {
  return (
    <Box sx={{display:"flex", justifyContent: "flex-end"}} >
      <IconButton
        onClick={toggleEditing}
      >
        <EditIcon />
      </IconButton>

      <IconButton
        onClick={deleteComment}
      >
        <DeleteForeverIcon />
      </IconButton>
  </Box>
  )
}

export default CommentEditBar;