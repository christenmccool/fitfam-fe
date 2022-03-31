import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, useParams, Link as RouterLink} from "react-router-dom";
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';
import PostingHeader from '../postings/PostingHeader';
import PostingEditBar from '../postings/PostingEditBar';
import ResultList from '../results/ResultList';
import UserContext from '../auth/UserContext';
import Loading from '../app/Loading';
import ErrorPage from '../app/ErrorPage';

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
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const [posting, setPosting] = useState();
  const [isUserWo, setIsUserWo] = useState();
  const [isUserPosting, setIsUserPosting] = useState();
  const [famName, setFamName] = useState();
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState();

  useEffect(() => {
    async function getPosting() {
      try {
        const posting = await FitFamApi.getPosting(id);
        setPosting(posting);

        setIsUserWo(user.id === posting.workout.createBy);
        setIsUserPosting(user.id === posting.postBy);

        const familyName = user.families.find(ele => ele.familyId === posting.familyId).familyName;
        setFamName(familyName);
      
        setLoaded(true);
      } catch (err) {
        console.log(err);
        setErrors(err);
      }
    }
    setLoaded(false);
    getPosting();
  }, [])

  const handleDelete = async () => {
    try {
      await FitFamApi.deletePosting(id);
      navigate(posting.postDate === moment().format("YYYYMMDD") ? `/` : `/?date=${moment(posting.postDate).format("YYYY-MM-DD")}`);
    } catch (err) {
      console.log(err);
      setErrors(err);
    }
  }


  if (errors) return <ErrorPage errors={errors} />;
  if (!loaded) return <Loading />;

  return (
    < Container align="center" maxWidth="md" sx={{backgroundColor: "#FFF"}}>
      <Box m={5} p={3}>
        {isUserPosting ?
          <PostingEditBar
            postId={id}
            isUserWo={isUserWo}
            handleDelete={handleDelete}
          />
          : null
        }

        <PostingHeader
          postDate={moment(posting.postDate).format("dddd, MMMM Do, YYYY")}
          woName={posting.workout.woName}
          woDescription={posting.workout.woDescription}
          famName={famName}
        />

        <Box mt={4}>
          <ResultList
            postId={posting.id}
          />
        </Box>

        <Button 
          component={RouterLink}
          to={posting.postDate === moment().format("YYYYMMDD") ? `/` : `/?date=${moment(posting.postDate).format("YYYY-MM-DD")}`}
          size="large"
          sx={{ mt: 5, height: '100%' }}
        >
          <Typography color="text.secondary">
            Back
          </Typography>
        </Button>
      </Box>
    </Container>
  )
}

export default PostingDetail;
