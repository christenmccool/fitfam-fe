import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { scoreTypeToFields } from '../config/config';

/** ResultNewForm
 *
 * Fields for score and notes
 * Score field(s) depend on scoreTeyps
 * Calls submitNewResult from PostingDetail parent on submit
 * 
 * PostingDetail -> ResultNewForm
 */
const ResultNewForm = ({submitNewResult, scoreType}) => {
  const fieldNames = scoreTypeToFields.find(ele => ele.scoreType === scoreType).fields;
  let initialScore = {};
  for (let name of fieldNames) {
    initialScore[name] = "";
  }

  const [score, setScore] = useState(initialScore);
  const [notes, setNotes] = useState("");

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
      submitNewResult(score, notes);
    } else {
      submitNewResult(score);
    }
  };

  return (
    <Box>
      <Typography component="h1" variant="h5">
        Post your results
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} mt={1} >
        <Grid container spacing={2} justifyContent="center">
          {fieldNames.map(name => (
            <Grid item xs={4} key={name}>
              <TextField
                fullWidth
                id={name}
                name={name}
                label={name[0].toUpperCase() + name.slice(1)}
                autoFocus
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
              minRows={4}
              id="notes"
              name="notes"
              label="Notes"
              autoFocus
              onChange={handleNotesChange}
              value={notes}
              InputProps={{
                inputProps: {
                  style: {fontSize: 30, textAlign: 'center', spellcheck:"false"}
                }
              }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="outlined"
          size="large"
          sx={{ mt:1 }}
        >
          Post results
        </Button>
      </Box>
    </Box>
  )
}

export default ResultNewForm;