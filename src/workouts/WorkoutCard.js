import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


//From MUI docs
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

/** Summary information about a workout
 *
 * WorkoutList -> WorkoutCardList -> WorkoutCard
 * Card links to WorkoutDetail
 */
const WorkoutCard = ({ id, name, description }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card 
      variant="outlined" 
      align="center" 
    >
        <CardContent sx={{ "&:last-child": {paddingBottom: 0}}}>
          <CardActionArea 
            component={RouterLink} 
            to={`/workouts/${id}`}
          >
            <Typography 
              variant="h4" 
              color="secondary" 
            >
              {name}
            </Typography>
          </CardActionArea>

          <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: 0}}>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardActionArea
              component={RouterLink} 
              to={`/workouts/${id}`}
            >
            <Typography variant="h6" mb={3} color="text.primary" sx={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}>
              {description}
            </Typography>
            </CardActionArea>
          </Collapse>

        </CardContent>
    </Card>
  )
}

export default WorkoutCard;
