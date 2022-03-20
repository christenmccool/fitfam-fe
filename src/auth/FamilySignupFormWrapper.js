import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FamilySignupForm from './FamilySignupForm';


/** Wrapper for new user form to select FitFam option
 * Includes option to join no additional FitFam
 * Send user home on submit
 * 
 * Signupform -> FamilySignupFormWrapper -> FamilySignupForm
 */
const FamilySignupFormWrapper = ({ signupFamily }) => {
  const navigate =  useNavigate();

  function afterFormCompleted() {
    navigate("/");
  }

  return (
    <Box m={2} pt={5} pb={3}>
      <Typography component="h1" variant="h4" textAlign="center" color="primary">
        Select FitFam family option
      </Typography>

      <FamilySignupForm signupFamily={signupFamily} includeNone={true} afterFormCompleted={afterFormCompleted} />
    </Box>
  )
}

export default FamilySignupFormWrapper;