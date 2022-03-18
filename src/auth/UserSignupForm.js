import React, {useState, useContext} from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import UserContext from './UserContext';

const UserSignupForm = ({ signup }) => {
  const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  }

  const [fields, setFields] = useState(initialState);
  const {user} = useContext(UserContext);

  const handleChange =  async (event) => {
    const {name, value} = event.target;
    setFields({...fields, [name]:value})
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();

    await signup(fields);
  }

  return (
    <Container align="center" maxWidth="sm" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} py={2}>
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
                label="Lasts Name"
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
      </Box>
    </Container>
  )
}

export default UserSignupForm;