import React, {useState} from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Alert from '../common/Alert';

/** Form for posting a new workout to a family
 *
 * 
 * PostingFormPage -> {NewWoPostingForm, AddWoPostingForm}
 */
// const NewWoPostingForm = ({formType, famId, date}) => {
const NewWoPostingForm = ({date, postNewWorkout}) => {
  const navigate = useNavigate();

  const initialState = {
    name: "",
    description: ""
  }

  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState([]);

  const handleChange =  async (event) => {
    const {name, value} = event.target;
    setFields({...fields, [name]:value})
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();

    const fieldsToSubmit = {};
    for (let key of Object.keys(fields)) {
      if (fields[key]) {
        fieldsToSubmit[key] = fields[key];
      }
    }

    const result = await postNewWorkout(fieldsToSubmit);

    if (result.success) {
      navigate(`/?date=${date}`);
    } else {
      setErrors(result.err);
    } 
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} mt={1} >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Workout Name"
              onChange={handleChange}
              value={fields.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Workout Description"
              onChange={handleChange}
              value={fields.description}
            />
          </Grid>
      </Grid>
    
      <Grid container mt={2} spacing={2} justifyContent="center">
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Submit
          </Button>
        </Grid>
        {/* {formType === "edit" ?
          <Grid item>
            <Button
              type="button"
              variant="outlined"
              size="large"
              // onClick={deleteResult}
            >
              Delete
            </Button>
          </Grid>
          : null
        } */}
        <Grid item>
          <Button
            component={RouterLink}
            to={`/postings/`}
            type="button"
            size="large"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>

      {errors.length ?
      <Alert messages={errors} />
      : null
    } 
  </Box>
  )
}

export default NewWoPostingForm;