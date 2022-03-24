import React, {useState} from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';
import WorkoutSearchForm from '../workouts/WorkoutSearchForm';
import WorkoutCardList from '../workouts/WorkoutCardList';
import Loading from '../app/Loading';
import ErrorPage from '../app/ErrorPage';


/** Workout search page
 * 
 * Shows workout search form
 * Loads workouts on submit from search form.
 * 
 * WorkoutSearchPage -> { WorkoutSearchForm, WorkoutCardList }
 * 
 * Routed at /workouts/search
 */
const WorkoutSearchPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searched, setSearched] = useState(false);
  const [errors, setErrors] = useState();


  const searchWorkouts = async (data) => {
    try {
      let workouts = await FitFamApi.searchWorkouts(data);
      setWorkouts(workouts);
      setSearched(true);
    } catch(err) {
      console.log(err);
      setErrors(err);
    }
  }

  if (errors) return <ErrorPage errors={errors} />;

  return (
    <Container maxWidth="sm" align="center">
      <Grid container mt={5} >
        <Grid item xs={12}>
          <Box p={3} sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
            <Typography component="h1" variant="h5" textAlign="center">
              Workout search
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Select optional filters
            </Typography>
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
        </Grid>
      </Grid>
    </Container>
  )
}

export default WorkoutSearchPage;