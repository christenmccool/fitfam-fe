import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import moment from 'moment';

import FitFamApi from '../api/api';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


/** Shows detailed information about a workout
 *
 * Routed at /workouts/:id
 */
const WorkoutDetail = () => {
  const { id } = useParams();

  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    async function getWorkout() {
      const workout = await FitFamApi.getWorkout(id);
      setWorkout(workout);
    }
    getWorkout();
  }, []);

  if (!workout) return <div>Loading</div>;

  return (
    <Container align="center">
      <Box m={5}>
        <Typography variant="h3" color="secondary" gutterBottom >
          {workout.name}
        </Typography>
        <Typography variant="h5" mb={3} style={{whiteSpace: "pre-line"}}>
          {workout.description}
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={1}>
          Score Type: {workout.scoreType}
        </Typography>
        {workout.publishDate ?
          <Typography variant="h6" color="text.secondary" mb={1}>
            Workout date: {moment(workout.publishDate).format("dddd, MMMM Do, YYYY")}
          </Typography>
          :
          null
        }
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

