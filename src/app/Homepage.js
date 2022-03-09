import React, {useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import FitFamApi from '../api/api';
import WorkoutCardList from '../workouts/WorkoutCardList';


/** Shows FitFam homepage
 * 
 * On mount, loads daily workouts from API
 * 
 * WorkoutList -> WorkoutCardList -> WorkoutCard 
 * 
 * Routed at /
 */
const Homepage = () => {
  const [workouts, setWorkouts] = useState();

  useEffect(() => {
    async function getTodaysWorkouts() {
      const todaysWorkouts = await FitFamApi.getTodaysWorkouts();
      setWorkouts(todaysWorkouts);
    }
    getTodaysWorkouts();
  }, []);

  if (!workouts) return <div>Loading</div>;

  return (
    <Container component="main" maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
          {workouts.length===1 ? "Featured Workout" : "Featured Workouts"}
        </Typography>
        <WorkoutCardList workouts={workouts} />
      </Box>
      <Button 
        component={RouterLink}
        to="/workouts/search"
        variant="outlined" 
        size="large"
        fullWidth
        sx={{ 
          mt: 5, 
          // backgroundColor: 'secondary.main',  
          // '&:hover': { backgroundColor: 'secondary.dark'} 
        }}
      >
        <Typography variant="h6">Search for more workouts</Typography>
      </Button>
    </Container>
  )
}

export default Homepage;