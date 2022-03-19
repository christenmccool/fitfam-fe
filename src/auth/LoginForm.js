import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Alert from '../common/Alert';

/** LoginForm
 *
 * Form for user login given email and password 
 * 
 * Routed at /login
 */
const LoginForm = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const {value} = event.target;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const {value} = event.target;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setErrors(result.err);
    } 
  };


  return (
    <Container align="center" maxWidth="sm" sx={{backgroundColor: "#FFF", borderRadius: '10px'}}>
      <Box m={5} py={2}>
        <Typography component="h1" variant="h4" textAlign="center" color="primary">
          Login to FitFam
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
            onChange={handleEmailChange}
            value={email}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            onChange={handlePasswordChange}
            value={password}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
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

export default LoginForm;