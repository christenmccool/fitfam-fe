import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


/** Result information
 *
 * PostingDetail -> ResultCardList -> ResultCard
 */
const ResultCard = ({ id, userFirst, score, notes, isUser, postId, deleteResult}) => {

  const handleClick = () => {
    deleteResult(id);
  }

  return (
    <Card 
      variant="outlined" 
      align="center" 
    >
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography 
              variant="h4" 
              color="text.primary" 
            >       
              {userFirst}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Typography 
            variant="h4" 
            color="primary" 
          >
            {score}
          </Typography>
          </Grid>
          {notes ?
            <Grid item xs={12}>
              <Typography 
                variant="h5" 
                color="text.secondary" 
                textAlign="center"
                mt={2}
              >
                {notes}
              </Typography>
            </Grid>
            : null
          }
        </Grid>
        {isUser ?
          <Box sx={{display:"flex", justifyContent: "flex-end"}} >
            <IconButton
              component={RouterLink}
              to={`/postings/${postId}/results`}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={handleClick}
              // onClick={id => deleteResult(id)}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Box>
          : null
        }
      </CardContent>
    </Card>
  )
}

export default ResultCard;