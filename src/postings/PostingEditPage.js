import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import CustomPostingForm from './CustomPostingForm';

/** Shows form for editing a posting 
 * 
 * PostingEditPage -> CustomPostingForm
 * 
 * Routed at /postings/:id/edit
 */
const PostingEditPage = () => {
  const {id} = useParams();
  const {user} = useContext(UserContext);
  const [posting, setPosting] = useState();

  const famName = posting && user.families.find(ele => ele.familyId === posting.familyId).familyName;

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
  }, []);

  async function editWoPost(data) {
    try {
      await FitFamApi.editWorkout(posting.workoutId, data.woName, data.woDescription);
      return {success: true, postId: id}
    } catch (err) {
      console.log(err);
      return {success: true, err}
    }
  }

  async function deleteWoPost() {
    try {
      await FitFamApi.deletePosting(id);
      return {success: true}
    } catch (err) {
      console.log(err);
      return {success: false, err}
    }
  }

  if (!posting) return <div>Loading</div>;

  return (
    <Container align="center" maxWidth="md" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} p={3}>
        <Typography variant="h4" mb={4} color="primary">
          Edit workout post
        </Typography>

        <Box mt={3}>
          <CustomPostingForm 
            formType="edit"
            date={moment(posting.postDate).format("YYYY-MM-DD")}
            famName={famName}
            submitPostForm={editWoPost}
            woName={posting.woName}
            woDescription={posting.woDescription}
            deleteWoPost={deleteWoPost}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default PostingEditPage;