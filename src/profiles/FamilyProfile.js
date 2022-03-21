import React, {useState, useEffect, useContext} from 'react';
import {useParams, Link as RouterLink} from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import FamilyDetails from './FamilyDetails';


/** Shows profle for a given family
 * FamilyProfile -> FamilyDetails
 * 
 * Routed at /families/:id
 **/
const FamilyProfile = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [family, setFamily] = useState();

  const isFamAdmin = family && user.families.some(ele => (ele.isAdmin === true && ele.familyId === +id));

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
        {isFamAdmin ? 
          <Button
            component={RouterLink}
            to={`/families/${id}/update`}
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

export default FamilyProfile;
