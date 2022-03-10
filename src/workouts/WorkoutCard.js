import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

/** Summary information about a workout
 *
 * WorkoutList -> WorkoutCard 
 * Card links to WorkoutDetail
 */
const WorkoutCard = ({ id, name, description }) => {
  return (
    <Card variant="outlined" align="center">
      <CardActionArea component={RouterLink} to={`/workouts/${id}`}>
        <CardContent>
          <Typography variant="h4" color="secondary" gutterBottom>
            {name}
          </Typography>
          <Typography variant="h6" style={{whiteSpace: "pre-line"}}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default WorkoutCard;
