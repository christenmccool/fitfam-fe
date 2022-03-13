import React, {useState, useContext} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';

import Container from '@mui/material/Container';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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
  const [date, setDate] = useState(new Date());

  // const today = moment().format("YYYY-MM-DD");
  // const today = moment().subtract(3, 'days').format("YYYY-MM-DD");

  return (
    <Container maxWidth="sm">
      <Box mt={4} sx={{display:"flex", justifyContent:"center"}}>
        <DatePicker
          label="Date"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          renderInput={(params) => <TextField {...params} sx={{input: {fontSize:'20px', p:1}}}/>}
        />
      </Box>
      {user ?
        <PostingList date={moment(date).format("YYYY-MM-DD")}/>
        :
        <Box>
          <WorkoutList date={moment(date).format("YYYY-MM-DD")} />
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