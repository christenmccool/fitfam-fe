import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ResultNewForm = ({submitNewResult, scoreType}) => {
  const [rounds, setRounds] = useState("");
  const [reps, setReps] = useState("");
  const [notes, setNotes] = useState("")


  const handleRoundsChange = (event) => {
    const {value} = event.target;
    setRounds(value);
  };

  const handleRepsChange = (event) => {
    const {value} = event.target;
    setReps(value);
  };


  const handleNotesChange = (event) => {
    const {value} = event.target;
    setNotes(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    submitNewResult({rounds, reps}, notes);
  };

  return (
    <Box>
      <Typography component="h1" variant="h5">
        Post your results
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} mt={1} >
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="rounds"
              name="rounds"
              label="rounds"
              autoFocus
              onChange={handleRoundsChange}
              value={rounds}
              sx={{input: {fontSize: 35, textAlign: "center"}}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="reps"
              name="reps"
              label="reps"
              autoFocus
              onChange={handleRepsChange}
              value={reps}
              sx={{input: {fontSize: 35, textAlign: "center"}}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="notes"
              name="notes"
              label="Notes"
              autoFocus
              onChange={handleNotesChange}
              value={notes}
              sx={{input: {textAlign: "center"}}}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
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