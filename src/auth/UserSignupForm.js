import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Alert from '../common/Alert';

/** Form to register new user with email, first and last name, and password
 * Stores returned token in App state and new user in context
 * New user automatically joins Team FitFam
 * 
 * Signupform -> {UserSignupForm, FamilySignupForm}
 */
const UserSignupForm = ({ signup }) => {
  const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  }

  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState([]);

  const handleChange =  async (event) => {
    const {name, value} = event.target;
    setFields({...fields, [name]:value})
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();

    const result = await signup(fields);
    if (result.err) {
      setErrors(result.err);
    } 
  }

  return (
    <Box m={2} pt={5} pb={3}>
      <Typography component="h1" variant="h4" textAlign="center" color="primary">
        Signup for FitFam
      </Typography>

      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <TextField
          margin="normal"
          fullWidth
          required
          id="email"
          name="email"
          label="Email Address"
          autoFocus
          onChange={handleChange}
          value={fields.email}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="firstName"
              name="firstName"
              label="First Name"
              onChange={handleChange}
              value={fields.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              onChange={handleChange}
              value={fields.lastName}
            />
          </Grid>
        </Grid>
        <TextField
          margin="normal"
          fullWidth
          required
          id="password"
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
          value={fields.password}
        />

        <Button
          type="submit"
          variant="outlined"
          size="large"
          sx={{ mt: 3, mb: 2 }}
        >
          Signup
        </Button>
      </Box>

      {errors.length ?
        <Alert messages={errors} />
        : null
      }
    </Box>
  )
}

export default UserSignupForm;