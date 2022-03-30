import React, {useState, useEffect, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import PostingHeader from '../postings/PostingHeader';
import ResultForm from '../results/ResultForm';
import Loading from '../app/Loading';
import ErrorPage from '../app/ErrorPage';


/** Shows form for posting results 
 * Includes PostingHeader with workout name and description
 * 
 * If no previous result for user: blank form for new result
 * If previous result: form to edit results
 * 
 * ResultFormPage -> {PostingHeader, ResultForm}
 */
const ResultFormPage = () => {
  const {postId} = useParams();
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const [posting, setPosting] = useState();
  const [userResult, setUserResult] = useState();
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState();

  const famName = posting && user.families.find(ele => ele.familyId === posting.familyId).familyName;

  useEffect(() => {
    async function getResults() {
      try {
        const posting = await FitFamApi.getPosting(postId);
        setPosting(posting);

        const results = await FitFamApi.getResults(postId);
        const userResult = results.filter(ele => ele.userId === user.id)[0];
        setUserResult(userResult);
        setLoaded(true);
      } catch (err) {
        console.log(err);
        setErrors(err);
      }
    }
    setLoaded(false)
    getResults();
  }, []);

  async function submitNewResult(score, notes) {
    await FitFamApi.createResult(posting.id, user.id, score, notes);
    navigate(`/postings/${postId}`);
  }

  async function submitEditResult(score, notes) {
    await FitFamApi.editResult(userResult.id, score, notes);
    navigate(`/postings/${postId}`);
  }

  async function deleteResult() {
    await FitFamApi.deleteResult(userResult.id);
    navigate(`/postings/${postId}`);
  }

  const formType = userResult ? "edit" : "new";
  const message = formType==="edit" ? "Edit" : "Post";
  const handleSubmit = formType==="edit" ? submitEditResult : submitNewResult;
  const initScore = formType==="edit" ? userResult.score : null;
  const initNotes = formType==="edit" ? userResult.notes : null;

  if (errors) return <ErrorPage errors={errors} />;
  if (!loaded) return <Loading />;

  return (
    <Container align="center" maxWidth="sm" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>

      <Box m={5} p={3}>
        <PostingHeader
          postDate={moment(posting.postDate).format("dddd, MMMM Do, YYYY")}
          woName={posting.workout.woName}
          woDescription={posting.workout.woDescription}
          famName={famName}
        />

        <Typography variant="h4" mt={4} color="primary">
          {`${message} your results`}
        </Typography>

        <Box mt={3}>
          <ResultForm 
            formType={formType}
            submitResult={handleSubmit} 
            deleteResult={deleteResult} 
            postId={posting.id}
            initScore={initScore}
            initNotes={initNotes}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default ResultFormPage;