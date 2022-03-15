import React, {useState, useEffect} from 'react';
import {useParams, Link as RouterLink} from "react-router-dom";
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import FitFamApi from '../api/api';
import PostingHeader from '../postings/PostingHeader';
import ResultList from '../results/ResultList';


/** Shows information about a posting 
 * - Workout name and description
 * - List of results
 * - Link to ResultForm to add or edit user's result
 * 
 * PostingDetail -> ResultList -> ResultCardList -> ResultCard
 *
 * Routed at /postings/:id
 */
const PostingDetail = () => {
  const {id} = useParams();

  const [posting, setPosting] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getPosting() {
      try {
        if (!posting) {
          const posting = await FitFamApi.getPosting(id);
          setPosting(posting);
        }
      } catch (err) {
        console.log(err);
      }
      setLoaded(true);
    }
    getPosting();
  }, [])


  if (!loaded) return <div>Loading</div>

  return (
    < Container align="center" maxWidth="md" sx={{backgroundColor: "#FFF"}}>
      <Box m={5} p={3}>
        <PostingHeader
          postDate={moment(posting.postDate).format("dddd, MMMM Do, YYYY")}
          woName={posting.woName}
          woDescription={posting.woDescription}
        />

        <Box mt={4}>
          <ResultList
            postId={posting.id}
          />
        </Box>

        <Button 
          component={RouterLink}
          to={`/?date=${moment(posting.postDate).format("YYYY-MM-DD")}`}
          variant="outlined"
          fullWidth
          sx={{ mt: 5, height: '100%' }}
        >
          <Typography color="text.secondary">
            {`Back to All Workouts`}
          </Typography>
        </Button>
      </Box>
    </Container>
  )
}

export default PostingDetail;
