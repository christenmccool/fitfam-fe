import React, {useState} from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Alert from '../common/Alert';


/** Form to update family profile
 *  
 * FamilyProfileFormPage -> FamilyProfileForm
 */
const FamilyProfileForm = ({ family, updateFamily }) => {
  const initialState = {
    familyName: family.familyName || "",
    bio: family.bio || "",
    imageUrl: family.imageUrl || ""
  }

  const navigate = useNavigate();

  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState([]);

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

    const result = await updateFamily(fieldsToSubmit);

    if (result.success) {
      navigate(`/families/${family.id}`);
    } else {
      console.log(result.err);
      setErrors(result.err);
    }
  }

  return (
    <Box m={5} pt={4}>
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
          to={`/families/${family.id}`}
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
  )
}

export default FamilyProfileForm;