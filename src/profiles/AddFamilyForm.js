import React from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import FamilySignupForm from '../auth/FamilySignupForm';


/** Wrapper for new user form to select FitFam option
 * Includes option to join no additional FitFam
 * Send user home on submit
 * 
 * Signupform -> FamilySignupFormWrapper -> FamilySignupForm
 */
const AddFamilyForm = ({ signupFamily }) => {
  const navigate =  useNavigate();

  function afterFormCompleted() {
    navigate("/profile")
  }

  return (
    <Container align="center" maxWidth="sm" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} pb={2}>
        <Box m={2} pt={5} pb={3}>
          <Typography component="h1" variant="h4" textAlign="center" color="primary">
          Join or create a new FitFam
          </Typography>

          <FamilySignupForm signupFamily={signupFamily} includeNone={false} afterFormCompleted={afterFormCompleted} />
        </Box>

      <Button
        type="button"
        variant="outlined"
        size="large"
        sx={{ mt: 3, mb: 2 }}
        onClick={()=>navigate(-1)}
      >
        Cancel
      </Button>
      </Box>
    </Container>
  )
}

export default AddFamilyForm;