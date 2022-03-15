import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { scoreTypeToFields } from '../config/config';

/** Form for entering new results and editing results
 *
 * Fields for score and notes
 * Score field(s) depend on scoreType
 * Calls submitNewResult from ResultFormPage parent on submit
 * 
 * ResultFormPage -> {PostingHeader, ResultForm}
 */
const ResultForm = ({submitResult, handleCancel, scoreType, initScore, initNotes}) => {
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
                  style: {fontSize: 30, textAlign: 'center', spellcheck:"false", lineHeight: "normal"}
                }
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt:1 }}
            >
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="button"
              variant="outlined"
              size="large"
              sx={{ mt:1 }}
              onClick={handleCancel}
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