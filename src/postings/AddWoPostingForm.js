import React, {useState} from 'react';
import { userNavigate, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


/** Form for posting a new workout 
 *
 * Fields for score and notes
 * Score field(s) depend on scoreType
 * Calls submitResult from ResultFormPage parent on submit
 * 
 * PostingFormPage -> PostingForm
 */
const PostingForm = ({date, famId}) => {
  const navigate = useNavigate();

  const initialState = {
    name: "",
    description: ""
  }

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

  const [fields, setFields] = useState(initialState);
  const [option, setOption] = useState("create")
  const [errors, setErrors] = useState([]);

  const handleChange =  async (event) => {
    const {name, value} = event.target;
    setFields({...fields, [name]:value})
  }

  const handleOptChange =  async (event) => {
    const {value} = event.target;
    setOption(value);
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();

    const fieldsToSubmit = {};
    for (let key of Object.keys(fields)) {
      if (fields[key]) {
        fieldsToSubmit[key] = fields[key];
      }
    }

    const data = option === "create" ? fieldsToSubmit : {woId};
    const result = await postWorkout(option, data);


    // const workout = await createWorkout(fieldsToSubmit);
    // const result = await createPosting(workout.id, famId, date);

    if (result.err) {
      navigate(`/?date=${date}`);
    } else {
      setErrors(result.err);
    } 
  }

  return (
    <Box>
      <Box component="form" noValidate onSubmit={handleSubmit} mt={1} >
        <Grid container spacing={2} justifyContent="center">
          {fieldNames.map((name, i) => (
            <Grid item xs={12/fieldNames.length} key={name}>
              <TextField
                fullWidth
                id={name}
                name={name}
                label={name[0].toUpperCase() + name.slice(1)}
                autoFocus={i === 0}
                onChange={handleScoreChange}
                value={score[name]}
                sx={{input: {fontSize: 35, textAlign: "center"}}}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              id="notes"
              name="notes"
              label="Notes"
              onChange={handleNotesChange}
              value={notes}
              InputProps={{
                inputProps: {
                  style: {fontSize: 20, textAlign: 'center', spellcheck:"false", lineHeight: "normal"}
                }
              }}
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
          {formType === "edit" ?
            <Grid item>
              <Button
                type="button"
                variant="outlined"
                size="large"
                onClick={deleteResult}
              >
                Delete
              </Button>
            </Grid>
            : null
          }
          <Grid item>
            <Button
              component={RouterLink}
              to={`/postings/${postId}`}
              type="button"
              size="large"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default ResultForm;