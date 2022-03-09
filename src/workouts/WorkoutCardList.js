import React from 'react';
import Stack from '@mui/material/Stack';

import WorkoutCard from './WorkoutCard';

/** Shows list of workout cards
 * 
 * WorkoutList -> WorkoutCardList -> WorkoutCard 
 * 
 */
const WorkoutCardList = ({ workouts }) => {

  return (
    <Stack spacing={2} m="auto">
      {workouts.map(workout => (
          <WorkoutCard 
            key={workout.id} 
            id={workout.id} 
            name={workout.name} 
            description={workout.description} 
          />
        ))
      }
    </Stack>
  )
}

export default WorkoutCardList;