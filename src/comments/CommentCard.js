import React, {useState} from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CommentForm from './CommentForm';
import CommentEditBar from "./CommentEditBar";

/** Comment information
 * 
 * User's own comments: 
 * - Includes CommentEditBar
 * - Toggles between displaying Comment content and CommentForm when editing
 *
 * CommentList -> CommentCardList -> CommentCard -> {CommentForm, CommentEditBar}
 */
const CommentCard = ({ id, userFirst, content, isUser, editComment, deleteComment }) => {
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing(editing => !editing);
  }

  const handleEdit = (content) => {
    editComment(id, content);
    setEditing(editing => !editing);
  }
  
  const handleDelete = () => {
    deleteComment(id)
  }

  const formType = content ? "edit" : "new";
  
  return (
    <Card 
      variant="outlined" 
      align="center" 
    >
      <CardContent sx={{p:1, '&:last-child': { pb: 0 }}}>
      < Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <Typography 
            variant="h6" 
            color="text.secondary" 
          >       
            {userFirst}
          </Typography>
        </Grid>
          {editing ?
            <Grid item xs={12}>
              <Box mb={2}>
                <CommentForm 
                  formType="edit"
                  handleComment={handleEdit}
                  initialComment={content}
                  toggleEditing={toggleEditing}
                />
              </Box>
            </Grid>
            :
            <Grid item xs={12}>
              <Typography 
                variant="h5" 
                color="text.primary" 
                style={{whiteSpace: "pre-line"}}
              >
                {content}
              </Typography>
            </Grid>
          }
        </Grid>

        {isUser & !editing ?
          <CommentEditBar
            toggleEditing={toggleEditing}
            deleteComment={handleDelete}
          />
          :
          null
        }
      </CardContent>
    </Card>
  )
}

export default CommentCard;