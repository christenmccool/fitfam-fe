import React, {useState} from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';


import FitFamApi from '../api/api';
import WorkoutSearchForm from '../workouts/WorkoutSearchForm';
import WorkoutCard from '../workouts/WorkoutCard';
import Alert from '../common/Alert';

/** Form for posting an existing workout to a family
 * 
 * date and famName supplied by the parent
 * 
 * PostingNewPage -> {CustomPostingForm, AddWoPostingForm}
 */
const AddWoPostingForm = ({date, postExistingWorkout}) => {
  const navigate = useNavigate();

  const [workouts, setWorkouts] = useState();
  const [workout, setWorkout] = useState();
  const [workoutId, setWorkoutId] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [errors, setErrors] = useState([]);

  const searchWorkouts = async (data) => {
    let workouts = await FitFamApi.searchWorkouts(data);
    setWorkouts(workouts);

    if (workouts.length) {
      setWorkoutId(workouts[0].id);
      setWorkout(workouts[0]);
    }
    setShowSearch(false);
  }

  const handleChange =  async (event) => {
    const {value} = event.target;
    setWorkoutId(value);
    const selectedWorkout = workouts.find(ele => ele.id === value);
    setWorkout(selectedWorkout);
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();

    const result = await postExistingWorkout(workoutId);

    if (result.success) {
      navigate(`/postings/${result.postId}`);
    } else {
      setErrors(result.err);
    } 
  }

  const resetSearch = () => {
    setShowSearch(true);
  }

  return (
    <Box mt={1} >
      <Box maxWidth="sm" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
        {showSearch ?
          <WorkoutSearchForm 
            searchWorkouts={searchWorkouts} 
          /> 
          :
          <Grid item xs={12} sm={6}>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              size="large"
              onClick={resetSearch}
            >
              New Search
            </Button>
          </Grid>
        }
      </Box>
      {workouts && !workouts.length ? 
        <Typography variant="h5" color="text.secondary" mt={2}>
          No workouts match your search criteria
        </Typography>
        : null
      }
      {workouts && !showSearch && workouts.length ?
        <Box mt={3}>
          <Typography variant="h4" color="primary">
            Select workout
          </Typography>
          <Box component="form" onSubmit={handleSubmit} mt={1}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  id="option"
                  fullWidth
                  select
                  label="Select workout"
                  value={workoutId}
                  onChange={handleChange}
                  InputProps={{style: {fontSize: '20px'}}}
                >
                  {workouts.map((workout) => (
                    <MenuItem key={workout.id} value={workout.id}>
                      {workout.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                >
                  Post
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        : null
      }
      {workouts && !showSearch && workout ?
        <Box my={2} maxWidth="sm">
          <WorkoutCard 
            id={workout.id}
            name={workout.name} 
            description={workout.description}
            startExpanded={true}
          />
        </Box>
        : null
      }

      {errors.length ?
        <Alert messages={errors} />
        : null
      } 
    </Box>
  )
}

export default AddWoPostingForm;