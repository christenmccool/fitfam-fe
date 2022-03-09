import React, {useState} from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const SearchForm = ({search}) => {
  const [field, setField] = useState("");

  const handleChange = (event) => {
    const {value} = event.target;
    setField(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    search({description: field});
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Search for a workout
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="keyword"
            name="keyword"
            autoFocus
            placeholder='Enter keyword'
            onChange={handleChange}
            value={field}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Search
          </Button>
        </Box>
      </Box>
  </Container>
  )
}

export default SearchForm;