import React, {useState, useEffect} from 'react';

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
const ResultCard = ({ id, userId, score, notes}) => {
  const [resultUser, setResultlUser] = useState();

  useEffect(() => {
    async function getResultUser() {
      const user = await FitFamApi.getUser(userId);
      setResultlUser(user);
    }
    getResultUser();
  }, [])

  if (!resultUser) return <div></div>;

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
              {`${resultUser.firstName}`}
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
          <Grid item xs={12}>
            <Typography 
              variant="h5" 
              color="text.secondary" 
              textAlign="center"
            >
              {notes}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ResultCard;