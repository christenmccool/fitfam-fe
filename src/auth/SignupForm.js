import React, {useContext} from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import UserContext from './UserContext';
import UserSignupForm from './UserSignupForm';
import FamilySignupFormWrapper from '../families/FamilySignupFormWrapper';

/** SignupForm
 *
 * New user registers with UserSignupForm, which stores a token in App state nd a user in context
 * New user also selects a FitFam option with FamilySignupForm
 * 
 * Signupform -> {UserSignupForm, FamilySignupFormWrapper -> FamilySignupForm}
 * 
 * Routed at /signup
 **/
const SignupForm = ({ signup, signupFamily }) => {
  const {user} = useContext(UserContext);

  return (
    <Container align="center" maxWidth="sm" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5}>
        {!user ?
          <UserSignupForm signup={signup} />
          :
          <FamilySignupFormWrapper signupFamily={signupFamily} />
        }
      </Box>
    </Container>
  )
}

export default SignupForm;