import React, {useState, useEffect, useContext} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import UserContext from '../auth/UserContext';
import PostingList from '../postings/PostingList';
import WorkoutList from '../workouts/WorkoutList';


/** FitFam homepage
 * 
 * Anonymous user:
 * Shows WorkoutList for today's date
 *  WorkoutList -> WorkoutCardList -> WorkoutCard 
 * Links to WorkoutSearchPage
 * 
 * Logged in user:
 * Shows PostingList for today's date
 *  PostingList -> PostingCardList -> PostingCard 
 * 
 * Routed at /
 */
const Homepage = () => {
  const { user } = useContext(UserContext);

  const today = moment().format("YYYY-MM-DD");
  // const today = moment().subtract(3, 'days').format("YYYY-MM-DD");
  return (
    <Container maxWidth="sm">

      {user ?
        <PostingList date={today}/>
        :
        <Box>
          <WorkoutList date={today} />
          <Button 
            component={RouterLink}
            to="/workouts/search"
            variant="outlined" 
            size="large"
            fullWidth
            sx={{ mt: 3 }}
          >
            <Typography variant="h6">Search for more workouts</Typography>
          </Button>
        </Box>
      }
      
    </Container>
  )
}

export default Homepage;