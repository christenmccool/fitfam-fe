import React, {useContext} from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import UserProfileForm from './UserProfileForm';

/** Page showing the form to update a user's profile
 *  
 * UserProfileFormPage -> UserProfileForm
 * 
 * Routed at /profile/update
 */
const UserProfileFormPage = () => {
  const {user, setUser, setCurrFamId} = useContext(UserContext);

  //Update user profile with new data
  async function updateProfile(data) {
    try {
      await FitFamApi.login(user.email, data.password);

      const dataToUpdate = {...data};
      if (data.primFamId) {
        await FitFamApi.changePrimaryFamily(user.id, data.primFamId);
        delete dataToUpdate['primFamId'];
        setCurrFamId(data.primFamId);
      }

      delete dataToUpdate['password'];
      const updatedUser = await FitFamApi.editProfile(user.id, dataToUpdate);

      setUser(updatedUser);
      return {success: true}
    } catch (err) {
      return {success: false, err}
    }
  }

  return (
    <Container align="center" maxWidth="md" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} py={4}>
        <Typography component="h1" variant="h4" textAlign="center" color="primary" mb={3}>
          Edit Profile
        </Typography>
        
        <UserProfileForm
          user={user}
          updateProfile={updateProfile}
        />
      </Box>
    </Container>
  )
}

export default UserProfileFormPage;