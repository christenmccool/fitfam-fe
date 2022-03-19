import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { scoreTypeToFields } from '../config/config';

/** Form for entering new results and deleting/editing results
 *
 * Fields for score and notes
 * Score field(s) depend on scoreType
 * Calls submitResult from ResultFormPage parent on submit
 * 
 * ResultFormPage -> {PostingHeader, ResultForm}
 */
const ResultForm = ({formType, submitResult, deleteResult, postId, scoreType, initScore, initNotes}) => {
  const fieldNames = scoreTypeToFields.find(ele => ele.scoreType === scoreType).fields;
  
  let initialScore = {};
  for (let name of fieldNames) {
    initialScore[name] = "";
  }

  const [score, setScore] = useState(initScore || initialScore);
  const [notes, setNotes] = useState(initNotes || "");

  const handleScoreChange = (event) => {
    const {name, value} = event.target;
    setScore({...score, [name]:value});
  };

  const handleNotesChange = (event) => {
    const {value} = event.target;
    setNotes(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (notes) {
      submitResult(score, notes);
    } else {
      submitResult(score);
    }
  };

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