import React from 'react';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';

/** Result information
 *
 * PostingDetail -> ResultCardList -> ResultCard
 */
const ResultCard = ({ id, userFirst, score, notes}) => {
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
      </CardContent>
    </Card>
  )
}

export default ResultCard;