import React, {useState, useEffect} from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import SelectDate from '../common/SelectDate';
import WorkoutList from '../workouts/WorkoutList';
import ErrorPage from '../app/ErrorPage';


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
  const [errors, setErrors] = useState();

  useEffect(() => {
    const newDate = searchParams.get('date');
    if (newDate) {
      setDate(newDate);
    } 
  }, [searchParams, setSearchParams])

  
  if (errors) return <ErrorPage errors={errors} />;

  return (
    <Container maxWidth="sm" align="center" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box my={4} p={5}>
        <SelectDate />
      
        <WorkoutList 
          date={date} 
          setErrors={setErrors}
        />

        <Button 
          component={RouterLink}
          to="/workouts"
          variant="outlined" 
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