import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FitFamApi from '../api/api';
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
 * 
 * PostingDetail -> ResultCardList -> ResultCard
 *
 * Routed at /postings/:id
 */
const PostingDetail = () => {
  const {id} = useParams();

  const [posting, setPosting] = useState();
  const [results, setResults] = useState();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    async function getPosting() {
      try {
        const posting = await FitFamApi.getPosting(id);
        setPosting(posting);
      } catch (err) {
        console.log(err);
      }
    }
    getPosting();
  }, [])

  useEffect(() => {
    try {
      async function getResults() {
        const results = await FitFamApi.getResults(id);
        setResults(results);
      }
      getResults();
    } catch (err) {
      console.log(err);
    }
  }, [])

  if (!posting || !results) return <div>Loading</div>

  return (
    <Container align="center" maxWidth="md">
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
          <Typography variant="h5" mb={3} style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}>
            {posting.woDescription}
          </Typography>
        </Collapse>
      </Box>
      <ResultCardList 
        results={results}
      />
    </Container>
  )
}

export default PostingDetail;
