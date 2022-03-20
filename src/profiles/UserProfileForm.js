import React, {useState, useContext} from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import UserContext from '../auth/UserContext';
import Alert from '../common/Alert';

/** Form to update user profile
 *  
 * Routed at /profile/update
 */
const UserProfileForm = ({ updateProfile }) => {
  const {user, primaryFamilyId} = useContext(UserContext);
  const navigate = useNavigate();

  const initialState = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    imageUrl: user.imageUrl || "",
    bio: user.bio || "",
    password: ""
  }

  const familyOptions = user.families.map(ele => (
     {
       value: ele.familyId,
       label: ele.familyName
      }
    )
  )

  const [fields, setFields] = useState(initialState);
  const [primFamId, setPrimFamId] = useState(primaryFamilyId);
  const [errors, setErrors] = useState([]);

  const handleChange =  async (event) => {
    const {name, value} = event.target;
    setFields({...fields, [name]:value})
  }

  const handlePrimFamChange =  async (event) => {
    const {value} = event.target;
    setPrimFamId(value);
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();

    const fieldsToSubmit = {};
    for (let key of Object.keys(fields)) {
      if (fields[key]) {
        fieldsToSubmit[key] = fields[key];
      }
    }
    
    if (primFamId !== primaryFamilyId) {
      fieldsToSubmit['primFamId'] = primFamId;
    }

    const result = await updateProfile(fieldsToSubmit);
    if (result.success) {
      navigate(`/users/${user.id}`);
    } else {
      setErrors(result.err);
    } 
  }

  return (
    <Container align="center" maxWidth="md" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} py={4}>
        <Typography component="h1" variant="h4" textAlign="center" color="primary" mb={3}>
          Edit Profile
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} mt={2}>
          <Grid container spacing={2} justifyContent="center" mt={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                autoFocus
                id="firstName"
                name="firstName"
                label="First Name"
                onChange={handleChange}
                value={fields.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                onChange={handleChange}
                value={fields.lastName}
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

            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                id="primFamId"
                select
                label="Select primary FitFam"
                value={primFamId}
                onChange={handlePrimFamChange}
              >
                {familyOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                component={RouterLink}
                to="/families/join"
                size="large"
                variant="outlined"
              >
                <Typography color="secondary">
                  Join or create a new FitFam
                </Typography>
              </Button>
            </Grid>
            
            {/* This field is not set to disabled to prevent autofill of url field with email */}
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                name="email"
                label="Email Address cannot be changed"
                value={user.email}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                id="password"
                name="password"
                label="Enter password to confirm changes"
                type="password"
                onChange={handleChange}
                value={fields.password}
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
            to={`/users/${user.id}`}
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

export default UserProfileForm;