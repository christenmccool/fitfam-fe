import React, {useState} from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CommentForm from './CommentForm';
import CommentEditBar from "./CommentEditBar";

/** Comment Contents
 *
 * CommentList -> CommentCardList -> CommentCard
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

  const turnOffEditing = () => {
    setEditing(false);
  }
  
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
              <CommentForm 
                handleComment={handleEdit}
                initialComment={content}
                turnOffEditing={turnOffEditing}
              />
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