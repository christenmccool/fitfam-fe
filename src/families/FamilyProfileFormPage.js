import React, {useEffect, useState, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import FamilyProfileForm from './FamilyProfileForm';

/** Page showing the form to update family profile
 * Only available to family admin users
 * 
 * Loads family data on mount
 *  
 * FamilyProfileFormPage -> FamilyProfileForm
 * 
 * Routed at /families/:id/update
 */
const FamilyProfileFormPage = () => {
  const {id} = useParams();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [family, setFamily] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getFamily() {
      try {
        const family = await FitFamApi.getFamily(id);

        const isFamAdmin = user.families.some(ele => (ele.isAdmin === true && ele.familyId === +id));
        if (!isFamAdmin) {
          throw "Only family admin can edit family profile"
        }

        setFamily(family);
        setLoaded(true);
      } catch (err) {
        console.log(err);
        navigate(`/families/${id}`);
      }
    }
    setLoaded(false);
    getFamily();
  }, []);


  async function updateFamily(data) {
    try {
      await FitFamApi.editFamilyProfile(id, data);

      //Update user in context to contain updated family information
      const updatedUser = await FitFamApi.getUser(user.id);
      setUser(updatedUser);

      return {success: true}
    } catch (err) {
      console.log(err);
      return {success: false, err}
    }
  }


  if (!loaded) return <div>Loading</div>

  return (
    <Container align="center" maxWidth="md" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} py={4}>
        <Typography component="h1" variant="h4" textAlign="center" color="primary" mb={3}>
          Edit Family Profile
        </Typography>

        <FamilyProfileForm
          family={family}
          updateFamily={updateFamily}
        />
      </Box>
    </Container>
  )
}

export default FamilyProfileFormPage;