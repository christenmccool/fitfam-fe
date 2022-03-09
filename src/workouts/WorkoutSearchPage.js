import React, {useState} from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';
import WorkoutSearchForm from '../workouts/WorkoutSearchForm';
import WorkoutCardList from '../workouts/WorkoutCardList';

/** Workout search page
 * 
 * Shows workout search form
 * Loads workouts on submit from search form.
 * 
 * Routed at /workouts/search
 */
const WorkoutSearchPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searched, setSearched] = useState(false);

  const searchWorkouts = async (data) => {
    let workouts = await FitFamApi.searchWorkouts(data);
    setWorkouts(workouts);
    setSearched(true)
  }

  return (
    <Container component="main" maxWidth="xs" bgcolor="primary">
      <Box mt={5}>
        <WorkoutSearchForm 
          searchWorkouts={searchWorkouts} 
        />
      </Box>
      
      {searched ?
        <Box mt={5}>
          <Typography variant="h5" align="center" color="text.secondary" gutterBottom>
            {workouts.length ? "Search Results" : "No workouts match your search criteria"}
          </Typography>
          <WorkoutCardList workouts={workouts} />
        </Box>
        :
        null
      }
    </Container>
  )
}

export default WorkoutSearchPage;