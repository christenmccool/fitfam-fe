import React, {useState, useEffect, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import ResultForm from '../results/ResultForm';


/** Shows form for posting results 
 * 
 * If no previous result for user: blank form for new result
 * If previous result: form to edit results
 * 
 * ResultFormPage -> ResultForm 
 */
const ResultFormPage = () => {
  const {postId} = useParams();
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const [posting, setPosting] = useState();
  const [results, setResults] = useState();
  const [userResult, setUserResult] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getResults() {
      try {
        const posting = await FitFamApi.getPosting(postId);
        setPosting(posting);

        const results = await FitFamApi.getResults(postId);
        setResults(results);

        const userResult = results.filter(ele => ele.userId === user.id)[0];
        setUserResult(userResult);
  
        setLoaded(true)
      } catch (err) {
        console.log(err);
      }
    }
    getResults();
  }, []);

  async function submitNewResult(score, notes) {
    const newResult = await FitFamApi.createResult(posting.id, user.id, score, notes);
    setResults([...results, newResult]);
    navigate(`postings/${postId}`);
  }

  async function submitEditResult(score, notes) {
    const editedResult = await FitFamApi.editResult(userResult.id, score, notes);
    const filteredResults = results.filter(ele => ele.userId !== user.id);
    setResults([...filteredResults, editedResult]);
    navigate(`postings/${postId}`);
  }

  async function cancel() {
    navigate(`postings/${postId}`);
  }

  const message = userResult ? "Edit" : "Post";
  const submitFunction = userResult ? submitEditResult : submitNewResult;
  const initScore = userResult ? userResult.score : null;
  const initNotes = userResult ? userResult.notes : null;

  if (!loaded) return <div>Loading</div>;

  return (
    <Container align="center" maxWidth="sm">
      <Box m={5}>
         <Box mt={5}>
          <Typography variant="h4">
            {`${message} your results`}
          </Typography>
          <Box mt={4}>
            <ResultForm 
              submitResult={submitFunction} 
              cancel={cancel}
              scoreType={posting.woScoreType}
              initScore={initScore}
              initNotes={initNotes}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default ResultFormPage;