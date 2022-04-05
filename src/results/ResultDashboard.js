import React, {useState, useEffect, useContext} from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';


/** Summary information about results for a posting
 * - user's score (or "post" if no user results)
 * - number of results 
 * - total number of comments for all results
 * 
 * PostingList -> PostingCardList -> PostingCard -> ResultDashboard
 */
const ResultDashboard = ({ postId }) => {
  const { user } = useContext(UserContext);

  const [results, setResults] = useState();
  const [numComments, setNumComments] = useState(0);
  const [userScore, setUserScore] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getResults() {
      try {
        let results = await FitFamApi.getResults(postId);
        setResults(results);

        for (let result of results) {
          let comments = await FitFamApi.getComments(result.id);
          setNumComments(num => num + comments.length);
        }

        const userResults = results.filter(ele => ele.userId === user.id);
        if (userResults.length) {
          const userScore = userResults[0].score;
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

  let postMessage;
  let numResults = results ? results.length : 0;
  if (numResults > 1) {
    postMessage = `${numResults} results`;
  } else if (numResults === 1) {
    postMessage = `1 result`;
  } else {
    postMessage = "0 results"
  }

  let commentMessage;
  if (numComments > 1) {
    commentMessage = `${numComments} comments`;
  } else if (numComments === 1) {
    commentMessage = `1 comment`;
  } else {
    commentMessage = "0 comments"
  }

  return (
    <Grid container alignItems="stretch">
      <Grid item xs={12} sm={4}>
        <Button 
          component={RouterLink}
          to={`/postings/${postId}/results`}
          variant="outlined" 
          fullWidth
          sx={{ mt: 1, textTransform: "none" }}
        >
          <Typography >{userScore ? userScore : "Post"}</Typography>
        </Button> 
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button 
          component={RouterLink}
          to={`/postings/${postId}`}
          fullWidth
          sx={{ mt: 1, height: '100%' }}
        >
          <Typography color="text.secondary" >{postMessage}</Typography>
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button 
          component={RouterLink}
          to={`/postings/${postId}`}
          fullWidth
          sx={{ mt: 1, height: '100%' }}
        >
          <Typography color="text.secondary" >{commentMessage}</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default ResultDashboard;
