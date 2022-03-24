import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import moment from 'moment';

import FitFamApi from '../api/api';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Loading from '../app/Loading';
import ErrorPage from '../app/ErrorPage';

/** Shows information about a workout
 *
 * Routed at /workouts/:id
 */
const WorkoutDetail = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    async function getWorkout() {
      try {
        const workout = await FitFamApi.getWorkout(id);
        setWorkout(workout);
        setLoaded(true);
      } catch (err) {
      console.log(err);
      setErrors(err);
      }
    }
    setLoaded(false);
    getWorkout();
  }, []);

  if (errors) return <ErrorPage errors={errors} />;

  if (!loaded) return <Loading />

  return (
    <Container align="center" maxWidth="md" sx={{backgroundColor: "#FFF"}}>
      <Box m={5} p={3}>
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
        <Box mt={4}>
          <Button
            onClick={() => navigate(-1)}
            size="large"
          >
            Back
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default WorkoutDetail;

