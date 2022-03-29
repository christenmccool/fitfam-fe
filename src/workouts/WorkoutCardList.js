import React from 'react';

import Stack from '@mui/material/Stack';

import WorkoutCard from './WorkoutCard';

/** Shows list of workout cards
 * 
 * WorkoutList -> WorkoutCardList -> WorkoutCard 
 * 
 */
const WorkoutCardList = ({ workouts, startExpanded=false }) => {
  return (
    <Stack spacing={2}>
      {workouts.map(workout => (
          <WorkoutCard 
            key={workout.id} 
            id={workout.id} 
            name={workout.name} 
            description={workout.description} 
            startExpanded={startExpanded}
          />
        ))
      }
    </Stack>
  )
}

export default WorkoutCardList;