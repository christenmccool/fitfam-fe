import React, {useState, useEffect, useContext} from 'react';
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import PostingHeader from '../postings/PostingHeader';
import ResultInfo from "../results/ResultInfo";
import ResultEditBar from './ResultEditBar';
import CommentList from '../comments/CommentList';
import { scoreToString } from '../helpers/formatScore';

/** Shows information about a result
 * - Posting workout name and description
 * - Result user, score, and notes
 * - List of comments including CommentForm to add a new comment
 * Includes ResultEditBar if user's own result 
 * 
 * ResultDetail -> PostingHeader -> ResultInfo -> ResultEditBar -> CommentList 
 *
 * Routed at /results/:id
 */
 const ResultDetail = () => {
  const {id} = useParams();
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const [posting, setPosting] = useState();
  const [result, setResult] = useState();
  const [loaded, setLoaded] = useState(false);

  const isUserResult = loaded && user.id === result.userId;

  useEffect(() => {
    async function getResult() {
      try {
        const result = await FitFamApi.getResult(id);
        setResult(result);

        const posting = await FitFamApi.getPosting(result.postId);
        setPosting(posting);
      
      } catch (err) {
        console.log(err);
      }
      setLoaded(true);
    }
    getResult();
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

        <Box mt={4} mb={3}>
          <ResultInfo
            userFirst={result.userFirst} 
            score={scoreToString(result.score)} 
            notes={result.notes}
            size="large"
          />
        </Box>

        {isUserResult ?
          <ResultEditBar
            postId={posting.id}
          />
          : null
        }

        <CommentList
          resultId={result.id}
        />

        <Button 
          component={RouterLink}
          to={`/postings/${posting.id}`}
          variant="outlined"
          fullWidth
          sx={{ mt: 5, height: '100%' }}
        >
          <Typography color="text.secondary">
            {`Back to All Results`}
          </Typography>
        </Button>
    </Box>
  </Container>
  )
}

export default ResultDetail;