import React, {useState, useEffect} from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import SelectDate from '../common/SelectDate';
import WorkoutList from '../workouts/WorkoutList';


/** FitFam homepage
 * 
 * Gets date from query string or today's date
 * Shows Featured WorkoutList for selected date
 * WorkoutList -> WorkoutCardList -> WorkoutCard 
 * Links to WorkoutSearchPage
 * 
 * Routed at /
 */
const Homepage = () => {
  const [searchParams, setSearchParams] = useSearchParams("");

  const initialDate = searchParams.get('date') || moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    const newDate = searchParams.get('date');
    if (newDate) {
      setDate(newDate);
    } 
  }, [searchParams, setSearchParams])

  return (
    <Container maxWidth="md" align="center">
      <Box mb={4}>
        <SelectDate />
      
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
    </Container>
  )
}

export default Homepage;