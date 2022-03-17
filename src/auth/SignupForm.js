import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import FitFamApi from '../api/api';

const SignupForm = ({signup}) => {
  const initiaUserFields = {
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  }

  const options = [
    {
      value: 'join',
      label: 'Join an existing FitFam'
    },
    {
      value: 'create',
      label: 'Create a new FitFam'
    },
    {
      value: 'none',
      label: 'Team FitFam only for now'
    }
  ]

  const [userFields, setUserFields] = useState(initiaUserFields);
  const [famOption, setFamOption] = useState("join");
  const [famData, setFamData] = useState("");

  const navigate =  useNavigate();

  const handleUserFieldsChange =  async (event) => {
    const {name, value} = event.target;
    setUserFields({...userFields, [name]:value})
  }

  const handleFamOptChange =  async (event) => {
    const {value} = event.target;
    setFamOption(value);
    setFamData("");
  }

  const handleFamDataChange =  async (event) => {
    const {value} = event.target;
    setFamData(value);
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();

    const token = await FitFamApi.createUser(userFields);
    let { userId } = jwt.decode(token);

    if (famOption === "join"){
      const family = await FitFamApi.findFamily(famData);
      await FitFamApi.joinFamily(userId, family.id);
    } else if (famOption === "create"){
      const family = await FitFamApi.createFamily(famData);
      await FitFamApi.joinFamily(userId, family.id);
    } else {
      await FitFamApi.joinFamily(userId, 'abcd1234');
    }

    // await signup(fields);
    // navigate("/");
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
            onChange={handleUserFieldsChange}
            value={userFields.email}
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
                autoFocus
                onChange={handleUserFieldsChange}
                value={userFields.firstName}
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
                autoFocus
                onChange={handleUserFieldsChange}
                value={userFields.lastName}
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
            onChange={handleUserFieldsChange}
            value={userFields.password}
          />
          <Box>
            <TextField
              margin="normal"
              
              id="famOption"
              select
              label="Select FitFam option"
              value={famOption}
              onChange={handleFamOptChange}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          
          {famOption  !=="none" ?
            <TextField
              margin="normal"
              fullWidth
              required
              id={famOption}
              name={famOption}
              label={options.find(ele => ele.value === famOption).label}
              onChange={handleFamDataChange}
              value={famData}
            />
            : null
          }

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

export default SignupForm;