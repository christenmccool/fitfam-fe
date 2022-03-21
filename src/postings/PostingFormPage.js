import React, {useState, useEffect, useContext} from 'react';
import {useSearchParams, useNavigate} from 'react-router-dom';
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import SelectDate from '../common/SelectDate';
import FamilySelect from './FamilySelect';
// import PostingHeader from '../postings/PostingHeader';
import NewWoPostingForm from '../postings/NewWoPostingForm';

/** Shows form for posting results 
 * Includes PostingHeader with workout name and description
 * 
 * If no previous result for user: blank form for new result
 * If previous result: form to edit results
 * 
 * PostingFormPage -> PostingForm
 */
const PostingFormPage = () => {
  // const {postId} = useParams();
  const {user, currFamId, setCurrFamId} = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams("");
  const navigate = useNavigate();

  // const [posting, setPosting] = useState();
  const initialDate = searchParams.get('date') || moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(initialDate);
  const [familyId, setFamilyId] = useState(currFamId);

  // const [userResult, setUserResult] = useState();
  // const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const newDate = searchParams.get('date');
    if (newDate) {
      setDate(newDate);
    } 
  }, [searchParams, setSearchParams])

  function changeFamilyId(famId) {
    setFamilyId(famId);
    setCurrFamId(famId);
  }
  // const famName = posting && user.families.find(ele => ele.familyId === posting.familyId).familyName;

  // useEffect(() => {
  //   async function getResults() {
  //     try {
  //       const posting = await FitFamApi.getPosting(postId);
  //       setPosting(posting);

  //       const results = await FitFamApi.getResults(postId);
  //       const userResult = results.filter(ele => ele.userId === user.id)[0];
  //       setUserResult(userResult);
  //       setLoaded(true)
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   setLoaded(false)
  //   getResults();
  // }, []);

  async function postNewWorkout(data) {
    try {
      const workout = await FitFamApi.createWorkout({...data, scoreType: "Other / Text", createBy: user.id});
      await FitFamApi.createPosting(workout.id, familyId, date, user.id);
      return {success: true}
    } catch (err) {
      console.log(err);
      return {success: true, err}
    }

    // await FitFamApi.createResult(posting.id, user.id, {...score, type: posting.woScoreType}, notes);
    // navigate(`/postings/${postId}`);
  }

  // async function submitEditResult(score, notes) {
  //   await FitFamApi.editResult(userResult.id, score, notes);
  //   navigate(`/postings/${postId}`);
  // }

  // async function deleteResult() {
  //   await FitFamApi.deleteResult(userResult.id);
  //   navigate(`/postings/${postId}`);
  // }

  // const formType = userResult ? "edit" : "new";
  // const message = formType==="edit" ? "Edit" : "Post";
  // const handleSubmit = formType==="edit" ? submitEditResult : submitNewResult;
  // const initScore = formType==="edit" ? userResult.score : null;
  // const initNotes = formType==="edit" ? userResult.notes : null;

  // if (!loaded) return <div>Loading</div>;
  // if (!date) return <div>Loading</div>;

  return (
    <Container align="center" maxWidth="md" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} p={3}>
        <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: {xs: "column", sm: "row"} }}>
            <Box p={1}>
              < SelectDate />
            </Box>
            <Box p={1}>
              < FamilySelect 
                families={user.families}
                familyId={familyId}
                changeFamilyId={changeFamilyId}
              />
            </Box>
        </Box>
        {/* <PostingHeader
          postDate={moment(posting.postDate).format("dddd, MMMM Do, YYYY")}
          woName={posting.woName}
          woDescription={posting.woDescription}
          famName={famName}
        /> */}
{/* 
        <Typography variant="h4" mt={4} color="primary">
          {`${message} your results`}
        </Typography> */}

        <Typography variant="h4" mt={4} color="primary">
          Post new workout
        </Typography>

        <Box mt={3}>
          <NewWoPostingForm 
            date={date}
            postNewWorkout={postNewWorkout}
            // formType={formType}
            // submitResult={handleSubmit} 
            // deleteResult={deleteResult} 
            // postId={posting.id}
            // scoreType={posting.woScoreType}
            // initScore={initScore}
            // initNotes={initNotes}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default PostingFormPage;