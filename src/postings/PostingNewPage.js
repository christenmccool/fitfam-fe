import React, {useState, useEffect, useContext} from 'react';
import {useSearchParams, Link as RouterLink} from 'react-router-dom';
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';


import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import SelectDate from '../common/SelectDate';
import FamilySelect from './FamilySelect';
import CustomPostingForm from './CustomPostingForm';
import AddWoPostingForm from './AddWoPostingForm';

/** Shows form for posting a workout to a family
 * Can either create a custom workout or add one from the database
 * 
 * PostingNewPage -> {CustomPostingForm, AddWoPostingForm}
 */
const PostingNewPage = () => {
  const {user, currFamId, setCurrFamId} = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams("");

  const initialDate = searchParams.get('date') || moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(initialDate);
  const [familyId, setFamilyId] = useState(currFamId);

  const options = [
    {
      value: "search",
      label: "Search for workout"
    },
    {
     value: "create",
     label: "Create new workout"
    }
  ]
  const [option, setOption] = useState("create");

  const handleOptionChange =  async (event) => {
    const {value} = event.target;
    setOption(value);
  }

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

  async function postNewWorkout(data) {
    try {
      const workout = await FitFamApi.createWorkout({name: data.woName, description: data.woDescription, scoreType: "Other / Text", createBy: user.id});
      const posting = await FitFamApi.createPosting(workout.id, familyId, date, user.id);
      return {success: true, postId: posting.id}
    } catch (err) {
      console.log(err);
      return {success: true, err}
    }
  }

  async function postExistingWorkout(workoutId) {
    try {
      const posting = await FitFamApi.createPosting(workoutId, familyId, date, user.id);
      return {success: true, postId: posting.id}
    } catch (err) {
      console.log(err);
      return {success: true, err}
    }
  }

  return (
    <Container align="center" maxWidth="md" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} p={3}>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: {xs: "column", sm: "row"} }}>
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

        <Grid item xs={12} sm={8} mt={1} mb={5} p={2}>
          <TextField
            fullWidth
            id="option"
            select
            label="Select option"
            color="primary"
            value={option}
            onChange={handleOptionChange}
            InputProps={{style: {fontSize: '20px', color: '#3f50b5'}}}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {option === "create" ?
          <Box mt={3}>
            <CustomPostingForm 
              formType="create"
              date={date}
              submitPostForm={postNewWorkout}
            />
          </Box>
          :
          <Box mt={3}>
            <AddWoPostingForm 
              date={date}
              postExistingWorkout={postExistingWorkout}
            />
          </Box>
        }

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              component={RouterLink}
              to={`/?date=${date}`}
              type="button"
              size="large"
            >
              <Typography color="text.secondary">
                Cancel
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default PostingNewPage;