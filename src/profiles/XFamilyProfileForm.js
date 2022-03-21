import React, {useEffect, useState, useContext} from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Alert from '../common/Alert';
import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';

/** Form to update family profile
 *  
 * Routed at /families/:id/update
 */
const FamilyProfileForm = () => {
  const initialState = {
    familyName:  "",
    bio: "",
    imageUrl: ""
  }

  const {id} = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [fields, setFields] = useState(initialState);
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function getFamily() {
      try {
        const family = await FitFamApi.getFamily(id);

        const isFamAdmin = user.families.some(ele => (ele.isAdmin === true && ele.familyId === +id));
        if (!isFamAdmin) {
          throw "Only family admin can edit family profile"
        }

        setFields({
          familyName: family.familyName, 
          bio: family.bio || "", 
          imageUrl: family.imageUrl || ""
        });
        setLoaded(true);
      } catch (err) {
        console.log(err);
        navigate(`/families/${id}`);
      }
    }
    setLoaded(false);
    getFamily();
  }, []);

  const handleChange =  async (event) => {
    const {name, value} = event.target;
    setFields({...fields, [name]:value})
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();

    const fieldsToSubmit = {};
    for (let key of Object.keys(fields)) {
      if (fields[key]) {
        fieldsToSubmit[key] = fields[key];
      }
    }
    try {
      const updatedFamily = await FitFamApi.editFamilyProfile(id, fieldsToSubmit);
      navigate(`/families/${updatedFamily.id}`);
    } catch (err) {
      console.log(err);
      setErrors(err);
    }
  }


  if (!loaded) return <div>Loading</div>

  return (
    <Container align="center" maxWidth="md" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} py={4}>
        <Typography component="h1" variant="h4" textAlign="center" color="primary" mb={3}>
          Edit Family Profile
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} mt={2}>
          <Grid container spacing={2} justifyContent="center" mt={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="familyName"
                name="familyName"
                label="Family Name"
                onChange={handleChange}
                value={fields.familyName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={4}
                id="bio"
                name="bio"
                label="Biography"
                onChange={handleChange}
                value={fields.bio}
                InputProps={{
                  inputProps: {
                    style: {fontSize: 20, textAlign: 'center', spellcheck:"false", lineHeight: "normal"}
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="imageUrl"
                name="imageUrl"
                label="Image URL"
                onChange={handleChange}
                value={fields.imageUrl}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ my: 3, mr: 1}}
          >
            Submit
          </Button>
          <Button
            component={RouterLink}
            to={`/families/${id}`}
            type="button"
            variant="outlined"
            size="large"
            sx={{ my: 3}}
          >
            Cancel
          </Button>
        </Box>

        {errors.length ?
          <Alert messages={errors} />
          : null
        }
      </Box>
    </Container>
  )
}

export default FamilyProfileForm;