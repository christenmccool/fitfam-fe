import React, {useState} from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import {movementOpts, categoryOpts} from '../config/config.js';

/** WorkoutSearchForm
 *
 * Fields for keyword, category, movements 
 * Calls searchWorkouts from WorkoutSearchPage parent on submit
 * 
 * WorkoutSearchPage -> WorkoutSearchForm
 */
const WorkoutSearchForm = ({ searchWorkouts }) => {
  const [keyword, setKeyword] = useState("")
  const [category, setCategory] = useState("")
  const [movements, setMovements] = useState([])

  const handleKeywordChange = (event) => {
    const {value} = event.target;
    setKeyword(value);
  };

  const handleCategoryChange = (event) => {
    const {value} = event.target;
    setCategory(value);
  };

  const handleMovementChange = (value) => {
    setMovements(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataToSubmit = {};
    if (keyword) dataToSubmit['keyword'] = keyword;
    if (movements.length) dataToSubmit.movementId = movements.map(ele => ele.id);
    if (category) dataToSubmit['category'] = category;
    searchWorkouts(dataToSubmit);
  };


  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" textAlign="center">
          Workout search
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" >
          Select optional filters
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="keyword"
                name="keyword"
                label="Keyword"
                autoFocus
                onChange={handleKeywordChange}
                value={keyword}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="cetegory-label">Category</InputLabel>
                <Select
                  labelId="cetegory-label"
                  id="category"
                  value={category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categoryOpts.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                margin="normal"
                fullWidth
                id="movements"
                options={movementOpts}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={movements}
                onChange={(event, value) => handleMovementChange(value)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Movements"
                    placeholder="Add movement"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            size="large"
            sx={{ mt: 3,
              // backgroundColor: 'secondary.main',  
              // '&:hover': { backgroundColor: 'secondary.dark'} 
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default WorkoutSearchForm;