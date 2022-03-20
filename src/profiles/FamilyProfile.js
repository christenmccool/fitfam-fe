import React, {useState, useEffect} from 'react';
import {useParams, Link as RouterLink} from 'react-router-dom';
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import FitFamApi from '../api/api';
import FamilyDetails from './FamilyDetails';


/** User Profile
 * Shows user profile and UserProfileForm for editable user attributes
 * UserProfile -> {UserInfo, UserProfileForm}
 * 
 * Routed at /profile
 **/
const FamilyProfile = () => {
  const { id } = useParams();
  const [family, setFamily] = useState();

  useEffect(() => {
    async function loadFamily() {
      try {
        const family = await FitFamApi.getFamily(id);
        setFamily(family);
      } catch(err) {
        console.log(err)
      }
    }
    loadFamily();
  }, [])

  if (!family) return <div>Loading</div>
  return (
    <Container align="center" maxWidth="md" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} pb={2}>
        <FamilyDetails 
          family={family} 
        />
      </Box>
    </Container>
  )
}

export default FamilyProfile;
