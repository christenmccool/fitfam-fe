import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


/** Summary information about results for a posting
 *
 * PostingList -> PostingCardList -> PostingCard -> ResultDashboard
 */
const ResultDashboard = ({ postId, numResults, userResults }) => {

  let message;
  if (numResults > 1) {
    message = `${numResults} results`;
  } else if (numResults === 1) {
    message = `1 result`;
  } else {
    message = "No results posted yet."
  }

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sm={6}>
        {userResults ?
          <Button 
            // component={RouterLink}
            // to="/workouts/search"
            variant="contained" 
            fullWidth
            sx={{ mt: 1 }}
          >
            <Typography variant="h4" >{userResults.score}</Typography>
          </Button> :
          <Button 
            // component={RouterLink}
            // to="/workouts/search"
            variant="contained" 
            fullWidth
            sx={{ mt: 1, height: '100%' }}
          >
            <Typography variant="h4">Post</Typography>
          </Button>
        }
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button 
          component={RouterLink}
          to={`/postings/${postId}`}
          fullWidth
          sx={{ mt: 1, height: '100%' }}
        >
          <Typography variant="h4" color="primary" >{message}</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default ResultDashboard;
