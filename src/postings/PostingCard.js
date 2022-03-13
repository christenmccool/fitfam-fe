import React, {useState, useEffect, useContext} from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import ResultDashboard from './ResultDashboard';
import { scoreToString } from '../helpers/formatScore';

/** Summary information about a posting
 * Includes ResultDashboard 
 * - user's result or post button
 * - number of results posted
 *
 * PostingList -> PostingCardList -> PostingCard -> ResultDashboard
 * Card links to PostingDetail
 */
const PostingCard = ({ id, woName, woDescription, woScoreType, maxHeight }) => {
  const { user } = useContext(UserContext);

  const [results, setResults] = useState();
  const [userScore, setUserScore] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getResults() {
      try {
        const postingResults = await FitFamApi.getResults(id);
        setResults(postingResults);

        const userResults = postingResults.filter(ele => ele.userId === user.id);
        if (userResults.length) {
          const userScore = scoreToString(woScoreType, userResults[0].score)
          setUserScore(userScore);
        }
        
        setLoaded(true)
      } catch (err) {
        console.log(err);
      }
    }
    getResults();
  }, []);

  if (!loaded) return <div></div>;

  return (
    <Card 
      variant="outlined" 
      align="center" 
      sx={{maxHeight, p:1}}
    >
      <CardContent>
        <CardActionArea 
          component={RouterLink} 
          to={`/postings/${id}`}
        > 
          <Box p={2}>
          <Typography 
            variant="h4" 
            color="secondary" 
            gutterBottom
          >
            {woName}
          </Typography>
          <Typography 
            variant="h6" 
            style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}
          >
            {woDescription}
          </Typography>
          </Box>
          </CardActionArea>
          <ResultDashboard 
            postId={id}
            numResults={results.length}
            userScore={userScore}
          />
      </CardContent>
    </Card>
  )
}

export default PostingCard;
