import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

/** Summary information about a workout
 *
 * WorkoutList -> WorkoutCardList -> WorkoutCard
 * Card links to WorkoutDetail
 */
const WorkoutCard = ({ id, name, description, maxHeight }) => {
  return (
    <Card 
      variant="outlined" 
      align="center" 
      sx={{maxHeight}}
    >
      <CardActionArea 
        component={RouterLink} 
        to={`/workouts/${id}`}
      >
        <CardContent>
          <Typography 
            variant="h4" 
            color="secondary" 
            gutterBottom
          >
            {name}
          </Typography>
          <Typography 
            variant="h6" 
            style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default WorkoutCard;
