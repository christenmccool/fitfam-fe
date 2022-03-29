import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';
import WorkoutCardList from './WorkoutCardList';
import Loading from '../app/Loading';


/** Shows list of featured workouts for a given date
 * 
 * On mount, loads workouts from API
 * 
 * WorkoutList -> WorkoutCardList -> WorkoutCard 
 */
const WorkoutList = ({ date, setErrors }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getFeaturedWorkouts() {
      try {
        const dailyworkouts = await FitFamApi.getFeaturedWorkouts(date);
        setWorkouts(dailyworkouts);
        setLoaded(true);
      } catch (err) {
        console.log(err);
        setErrors(err);
      }
    }
    setLoaded(false);
    getFeaturedWorkouts();
  }, [date]);

  if (!loaded) return <Loading />;

  return (
    <Container maxWidth="sm" >
      <Box mt={4}>
        <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
          {workouts.length===1 ? "Featured Workout" : "Featured Workouts"}
        </Typography>
        <WorkoutCardList
          workouts={workouts}
          startExpanded={true}
        />
      </Box>
    </Container>
  )
}

export default WorkoutList;