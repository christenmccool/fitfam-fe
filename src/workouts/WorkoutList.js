import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';
import WorkoutCardList from './WorkoutCardList';

/** Shows list of featured workouts for a given date
 * 
 * On mount, loads workouts from API
 * 
 * WorkoutList -> WorkoutCardList -> WorkoutCard 
 * 
 */
const WorkoutList = ({ date }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    async function getFeaturedWorkouts() {
      try {
        const dailyworkouts = await FitFamApi.getFeaturedWorkouts(date);
        setWorkouts(dailyworkouts);
      } catch (err) {
        console.log(err);
      }
    }
    getFeaturedWorkouts();
  }, []);

  if (!workouts) return <div>Loading</div>;

  return (
    <Box mt={2}>
      <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
        {workouts.length===1 ? "Featured Workout" : "Featured Workouts"}
      </Typography>
      <WorkoutCardList
        workouts={workouts}
        cardMaxHeight={1000}
      />
    </Box>
  )
}

export default WorkoutList;