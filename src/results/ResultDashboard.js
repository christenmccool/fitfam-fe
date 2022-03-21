import React, {useState, useEffect, useContext} from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import { scoreToString } from '../helpers/formatScore';


/** Summary information about results for a posting
 * - number of results 
 * - user's score (or "post" if no user results)
 *
 * PostingList -> PostingCardList -> PostingCard -> ResultDashboard
 */
const ResultDashboard = ({ postId }) => {
  const { user } = useContext(UserContext);

  const [results, setResults] = useState();
  const [userScore, setUserScore] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getResults() {
      try {
        let results = await FitFamApi.getResults(postId);
        setResults(results);

        const userResults = results.filter(ele => ele.userId === user.id);
        if (userResults.length) {
          const userScore = scoreToString(userResults[0].score)
          setUserScore(userScore);
        }
        
        setLoaded(true)
      } catch (err) {
        console.log(err);
      }
    }
    setLoaded(false)
    getResults();
  }, []);

  if (!loaded) return <div></div>;

  let message;
  let numResults = results ? results.length : 0;
  if (numResults > 1) {
    message = `${numResults} results`;
  } else if (numResults === 1) {
    message = `1 result`;
  } else {
    message = "0 results"
  }

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sm={6}>
        <Button 
          component={RouterLink}
          to={`/postings/${postId}/results`}
          variant="outlined" 
          fullWidth
          sx={{ mt: 1 }}
        >
          <Typography variant="h4" >{userScore ? userScore : "Post"}</Typography>
        </Button> 
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button 
          component={RouterLink}
          to={`/postings/${postId}`}
          fullWidth
          sx={{ mt: 1, height: '100%' }}
        >
          <Typography variant="h4" color="text.secondary" >{message}</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default ResultDashboard;
