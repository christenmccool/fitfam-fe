import React, {useState, useEffect, useContext} from 'react';
import { useParams, NavLink as RouterLink } from "react-router-dom";
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import ResultCardList from '../results/ResultCardList';

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

/** Shows information about a posting 
 * - Workout name and description
 * - List of results
 * - Link to ResultForm to add or edit user's result
 * 
 * PostingDetail -> ResultCardList -> ResultCard
 *
 * Routed at /postings/:id
 */
const PostingDetail = () => {
  const {id} = useParams();
  const {user} = useContext(UserContext);

  const [posting, setPosting] = useState();
  const [results, setResults] = useState();
  const [userResult, setUserResult] = useState();
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    async function getPosting() {
      try {
        const posting = await FitFamApi.getPosting(id);
        setPosting(posting);

        const results = await FitFamApi.getResults(id);
        setResults(results);

        const userResult = results.filter(ele => ele.userId === user.id)[0];
        setUserResult(userResult);
      } catch (err) {
        console.log(err);
      }
      setLoaded(true);
    }
    getPosting();
  }, [])
  

  if (!loaded) return <div>Loading</div>

  return (
    <Container align="center" maxWidth="sm">
      <Box m={5}>
        <Typography variant="h6" color="text.secondary" mb={1}>
          {moment(posting.postDate).format("dddd, MMMM Do, YYYY")}
        </Typography>
        <Typography variant="h3" color="secondary" >
          {posting.woName}
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
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
          <Typography variant="h6" mb={3} style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}>
            {posting.woDescription}
          </Typography>
        </Collapse>
      </Box>

      {results.length ?
        <ResultCardList 
          results={results}
          scoreType={posting.woScoreType}
        /> :
      <Typography variant="h4">
        No results posted yet.
      </Typography>
      }

      {!userResult ?
        <Button 
          component={RouterLink}
          to={`/postings/${posting.id}/results`}
          sx={{ mt: 4 }}
        >
          <Typography variant="h4" >Post result</Typography>
        </Button> 
        : null
      }
    </Container>
  )
}

export default PostingDetail;
