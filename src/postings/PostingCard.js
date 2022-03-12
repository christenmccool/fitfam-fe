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


/** Summary information about a posting
 * Includes ResultDashboard 
 * - user's result or post button
 * - number of results posted
 *
 * PostingList -> PostingCardList -> PostingCard -> ResultDashboard
 * Card links to PostDetail
 */
const PostingCard = ({ id, woName, woDescription, maxHeight }) => {
  const { user } = useContext(UserContext);

  const [results, setResults] = useState([]);
  const [userResults, setUserResults] = useState(null);

  useEffect(() => {
    async function getResults() {
      try {
        let results = await FitFamApi.getResults(id);
        setResults(results);
      } catch (err) {
        console.log(err);
      }
    }
    getResults();
  }, []);

  useEffect(() => {
    const userResults = results.filter(ele => ele.userId === user.id)[0];
    setUserResults(userResults);
  }, [results, user]);

  if (!results) return <div></div>;

  return (
    <Card 
      variant="outlined" 
      align="center" 
      sx={{maxHeight, p:1}}
      m={2}
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
            style={{whiteSpace: "pre-line"}}
          >
            {woDescription}
          </Typography>
          </Box>
          </CardActionArea>
          <ResultDashboard 
            postId={id}
            numResults={results.length}
            userResults={userResults}
          />
      </CardContent>
    </Card>
  )
}

export default PostingCard;
