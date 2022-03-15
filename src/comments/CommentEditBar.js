import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

/** Menu bar to allow for editing or deleting a user's comment from a result
 * Only displays for user's own comment
 * 
 * CommentList -> CommentCardList -> CommentCard -> {CommentForm, CommentEditBar}
 */
const CommentEditBar = ({ toggleEditing, deleteComment}) => {
  return (
    <Box sx={{display:"flex", justifyContent: "flex-end"}} >
      <IconButton
        onClick={toggleEditing}
      >
        <EditIcon 
          fontSize="small" 
          sx={{color:"#bebebe"}}
        />
      </IconButton>

      <IconButton
        onClick={deleteComment}
      >
        <DeleteForeverIcon 
          fontSize="small" 
          sx={{color:"#bebebe"}}
        />
      </IconButton>
  </Box>
  )
}

export default CommentEditBar;