import React, {useState, useEffect, useContext} from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
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
 * WorkoutList -> WorkoutCardList -> WorkoutCard 
 * Links to WorkoutSearchPage
 * 
 * Logged in user:
 * Shows PostingList for today's date
 * PostingList -> PostingCardList -> PostingCard 
 * 
 * Routed at /
 */
const Homepage = () => {
  const { user } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams("");

  const initialDate = searchParams.get('date') || moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    const newDate = searchParams.get('date');
    if (newDate) {
      setDate(newDate);
    } else {
      setSearchParams({date: moment().format("YYYY-MM-DD")});
    }
  }, [searchParams, setSearchParams])
  
  return (
    <Container maxWidth="md" align="center">
      <Box mt={4} sx={{display:"flex", justifyContent:"center"}}>
        <DatePicker
          label="Date"
          value={date}
          onChange={(newDate) => setSearchParams({date: moment(newDate).format("YYYY-MM-DD")})}
          renderInput={(params) => <TextField {...params} sx={{backgroundColor: "#FFF", input: {fontSize:'20px', p:1}}}/>}
        />
      </Box>
      <Box mb={4}>
        {user ?
            <PostingList date={date}/>
          :
          <Box>
            <WorkoutList date={date} />
            <Button 
              component={RouterLink}
              to="/workouts"
              variant="contained" 
              size="large"
              sx={{ mt: 3 }}
            >
              <Typography variant="h6">Search for more workouts</Typography>
            </Button>
          </Box>
        }
      </Box>
    </Container>
  )
}

export default Homepage;