import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import moment from 'moment';

import FitFamApi from '../api/api';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


/** Shows information about a workout
 *
 * Routed at /workouts/:id
 */
const WorkoutDetail = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    try {
      async function getWorkout() {
        const workout = await FitFamApi.getWorkout(id);
        setWorkout(workout);
      }
      getWorkout();
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!workout) return <div>Loading</div>;

  return (
    <Container align="center" maxWidth="md">
      <Box m={5}>
        <Typography variant="h3" color="secondary" gutterBottom >
          {workout.name}
        </Typography>
        <Typography variant="h5" mb={3} style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}>
          {workout.description}
        </Typography>
        {workout.featuredDate ?
          <Typography variant="h6" color="text.secondary" mb={1}>
            Featured date: {moment(workout.featuredDate).format("dddd, MMMM Do, YYYY")}
          </Typography>
          :
          null
        }
        <Typography variant="h6" color="text.secondary" mb={1}>
          Score Type: {workout.scoreType}
        </Typography>
        {workout.movements.length ? 
          <Typography variant="h6" color="text.secondary">
            {workout.movements.length === 1 ? "Movement" : "Movements"}: {workout.movements.map(ele => ele.movementName).join(", ")}
          </Typography>
          :
          null
        }
      </Box>
    </Container>
  )
}

export default WorkoutDetail;

