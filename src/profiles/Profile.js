import React, {useContext} from 'react';
import {useParams, Link as RouterLink} from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import UserContext from '../auth/UserContext';
import UserDetails from './UserDetails';


/** Shows user's own profile 
 * links to UserProfileForm for editable user attributes
 * 
 * Profile -> UserDetails
 * 
 * Routed at /profile
 **/
const Profile = () => {
  const {user} = useContext(UserContext);

  return (
    <Container align="center" maxWidth="md" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} pb={2}>
        <UserDetails 
          user={user} 
        />
        <Button
          component={RouterLink}
          to="/profile/update"
          variant="outlined"
          size="large"
          sx={{ mt: 3, mb: 2 }}
        >
          Edit Profile
        </Button>
      </Box>
    </Container>
  )
}

export default Profile;
