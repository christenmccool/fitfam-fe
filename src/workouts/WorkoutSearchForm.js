import React, {useState} from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
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
  const [searchParams, setSearchParams] = useSearchParams("");

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || "");
  const [category, setCategory] = useState(searchParams.get('category') || "");

  const movementIds = searchParams.getAll('movementId');
  const initialMovements = movementIds.map(ele => movementOpts.find(opt => opt.id === ele));
  const [movements, setMovements] = useState(initialMovements)

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
    <Box >
      <Box component="form" noValidate onSubmit={handleSubmit} mt={3}>
        <Grid container spacing={1} justifyContent="center">
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
            <TextField
              fullWidth
              id="category"
              select
              label="Category"
              onChange={handleCategoryChange}
              value={category}
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
            </TextField>
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
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              size="large"
              sx={{ mt: 1,
                // backgroundColor: 'secondary.main',  
                // '&:hover': { backgroundColor: 'secondary.dark'} 
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>

      </Box>
    </Box>
  )
}

export default WorkoutSearchForm;