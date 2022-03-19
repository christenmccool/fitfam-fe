import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';


/** Form for new user to select FitFam option
 * User can join an existing FitFam with their join code, or create a new FitFam
 * Option to join no family other than Team FitFam
 * 
 * Signupform -> {UserSignupForm, FamilySignupForm}
 */
const FamilySignupForm = ({ familySignup }) => {
  const options = [
    {
      value: 'join',
      label: 'Join an existing FitFam'
    },
    {
      value: 'create',
      label: 'Create a new FitFam'
    },
    {
      value: 'none',
      label: 'Team FitFam only for now'
    }
  ]

  const [famOption, setFamOption] = useState("join");
  const [famData, setFamData] = useState("");

  const navigate =  useNavigate();

  const handleFamOptChange =  async (event) => {
    const {value} = event.target;
    setFamOption(value);
    setFamData("");
  }

  const handleFamDataChange =  async (event) => {
    const {value} = event.target;
    setFamData(value);
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();

    const result = await familySignup(famOption, famData);
    if (result.success) {
      navigate("/");
    }
  }

  return (
    <Container align="center" maxWidth="sm" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} py={2}>
        <Typography component="h1" variant="h4" textAlign="center" color="primary">
          Select FitFam family option
        </Typography>

        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <Box>
            <TextField
              margin="normal"
              
              id="famOption"
              select
              label="Select FitFam option"
              value={famOption}
              onChange={handleFamOptChange}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          
          {famOption  !=="none" ?
            <TextField
              margin="normal"
              fullWidth
              required
              id={famOption}
              name={famOption}
              label={options.find(ele => ele.value === famOption).label}
              onChange={handleFamDataChange}
              value={famData}
            />
            : null
          }

          <Button
            type="submit"
            variant="outlined"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Signup
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default FamilySignupForm;