import React, {useContext} from 'react';

import Container from '@mui/material/Container';

import UserContext from './UserContext';
import UserSignupForm from './UserSignupForm';
import FamilySignupForm from './FamilySignUpForm';

/** SignupForm
 *
 * New user registers with UserSignupForm, which stores a token in App state nd a user in context
 * New user also selects a FitFam option with FamilySignupForm
 * Signupform -> {UserSignupForm, FamilySignupForm}
 * 
 * Routed at /signup
 **/
const FamilyProfileForm = ({ family }) => {
  const {user} = useContext(UserContext);

  return (
    <Container align="center" maxWidth="sm" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>

    </Container>
  )
}

export default FamilyProfileForm;