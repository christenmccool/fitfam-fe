import React, {useContext} from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Button from '@mui/material/Button';

import UserContext from '../auth/UserContext';

//NavBar Component for FitFam app
const NavBar = ({logout}) => {
  const {user} = useContext(UserContext);

  const homepageLink = user ? "/postings" : "/"; 

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <IconButton 
            aria-label="go to FitFam homepage" 
            component={RouterLink} 
            to={homepageLink} 
            color="inherit" 
          >
            <FitnessCenterIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box>
          {user ?
            <Button 
              component={RouterLink} 
              to="/"
              color="inherit"
              onClick={logout}
              variant="outlined"
              sx={{py: '2px'}}
            >
              Logout
            </Button>
            :
            <Box>
              <Button 
                color="primary"
                component={RouterLink}
                to={`/login`}
                variant="contained"
                color="white"
                sx={{
                  p: '2px', 
                  m:1, 
                  color: 'primary.main'
                }}
              >
                Login
              </Button>
              <Button 
                color="inherit"
                component={RouterLink}
                to={`/signup`}
                variant="outlined"
                sx={{p: '2px'}}
              >
                Signup
              </Button>
            </Box>
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;