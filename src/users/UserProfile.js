import React, {useState, useEffect, useContext} from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import UserContext from '../auth/UserContext';
import UserDetails from './UserDetails';
import FitFamApi from '../api/api';


/** Shows profle for a given user
 * UserProfile -> UserDetails
 * 
 * Routed at /users/:id
 **/
const UserProfile = () => {
  const {id} = useParams();
  const {user} = useContext(UserContext);

  const [profUser, setProfUser] = useState();

  const isUser = profUser && user.id === profUser.id;

  useEffect(() => {
    async function getProfUser() {
      try {
        const profUser = await FitFamApi.getUser(id);
        setProfUser(profUser);
      } catch(err) {
        console.log(err);
      }
    }
    getProfUser();
  }, [])

  if (!profUser) return <div>Loading</div>

  return (
    <Container align="center" maxWidth="md" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} pb={2}>
        <UserDetails 
          user={profUser} 
        />
        {isUser ? 
          <Button
            component={RouterLink}
            to="/profile/update"
            variant="outlined"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Edit Profile
          </Button>
          : 
          null
        }
      </Box>
    </Container>
  )
}

export default UserProfile;
