import React, {useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FitFamApi from '../api/api';


/** Summary information about comments for a result
 * - number of comments
 *
 * PostingDetail -> ResultCardList -> ResultCard -> CommentDashboard
 */
const CommentDashboard = ({ resultId }) => {
  const [comments, setComments] = useState();

  useEffect(() => {
    async function getComments() {
      try {
        let comments = await FitFamApi.getComments(resultId);
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    }
    getComments();
  }, []);

  let message;
  let numComments = comments ? comments.length : 0;

  if (numComments > 1) {
    message = `${numComments} comments`;
  } else if (numComments === 1) {
    message = `1 comment`;
  } else {
    message = "0 comments"
  }

  if (!comments) return <div>Loading</div>

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Button 
          component={RouterLink}
          to={`/results/${resultId}`}
          fullWidth
          sx={{ mb: 1, height: '100%'}}
        >
            <Typography variant="h5" color="secondary">{message}</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default CommentDashboard;
