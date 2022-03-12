import React from 'react';

import Stack from '@mui/material/Stack';

import WorkoutCard from './WorkoutCard';

/** Shows list of workout cards
 * 
 * WorkoutList -> WorkoutCardList -> WorkoutCard 
 * 
 */
const WorkoutCardList = ({ workouts, cardMaxHeight }) => {
  return (
    <Stack spacing={2}>
      {workouts.map(workout => (
          <WorkoutCard 
            key={workout.id} 
            id={workout.id} 
            name={workout.name} 
            description={workout.description} 
            maxHeight={cardMaxHeight}
          />
        ))
      }
    </Stack>
  )
}

export default WorkoutCardList;