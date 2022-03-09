import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Link from '@mui/material/Link';

//NavBar Component for FitFam app
const NavBar = () => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <IconButton aria-label="go to FitFam homepage" component={RouterLink} to="/" color="inherit" >
            <FitnessCenterIcon fontSize="large" />
          </IconButton>
        </Box>
        {/* <Box>
          <Link component={RouterLink} to="/results" variant="h5" color="inherit">
              Result for Today
          </Link>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;