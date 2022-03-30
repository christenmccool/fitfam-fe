import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


/** Form for entering new results and deleting/editing results
 *
 * Fields for score and notes
 * Score field(s) depend on scoreType
 * Calls submitResult from ResultFormPage parent on submit
 * 
 * ResultFormPage -> {PostingHeader, ResultForm}
 */
const ResultForm = ({formType, submitResult, deleteResult, postId, initScore, initNotes}) => {
  const [score, setScore] = useState(initScore || "");
  const [notes, setNotes] = useState(initNotes || "");

  const handleScoreChange = (event) => {
    const {value} = event.target;
    setScore(value);
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="score"
              name="score"
              label="Score"
              autoFocus
              onChange={handleScoreChange}
              value={score}
              InputProps={{
                inputProps: {
                  style: {fontSize: 35, textAlign: 'center'}
                }
              }}
            />
          </Grid>
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