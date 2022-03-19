import React, {useState, useContext} from 'react';

import Container from '@mui/material/Container';

import FitFamApi from '../api/api';
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
 */
const SignupForm = ({ signup }) => {
 
  const {user, setUser, setFamilies, setPrimaryFamilyId} = useContext(UserContext);

  //Allow user to join an existing family or create a new one
  const familySignup =  async (famOption, famData) => {
    try {
      if (famOption === "none") {
        return {success: true};
      } else {
        let family;
  
        if (famOption === "join"){
          family = await FitFamApi.findFamily(famData);
        } else if (famOption === "create") {
          family = await FitFamApi.createFamily(famData);
        }
        await FitFamApi.joinFamily(user.id, family.id);
        const membership = await FitFamApi.changePrimaryFamily(user.id, family.id);
  
        if (membership.userId === user.id && membership.familyId === family.id) {
          setPrimaryFamilyId(family.id);
          const updatedUser = await FitFamApi.getUser(user.id);
          setUser(updatedUser);
          setFamilies(updatedUser.families);
          return {success: true};
        }
      }
    } catch (err) {
      console.log(err)
      return {success: false}
    }
  }

  return (
    <Container align="center" maxWidth="sm" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      {!user ?
        <UserSignupForm signup={signup} />
        :
        <FamilySignupForm familySignup={familySignup} />
      }
    </Container>
  )
}

export default SignupForm;