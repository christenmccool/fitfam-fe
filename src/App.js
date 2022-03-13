import React, {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import './App.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from "@mui/material";

import FitFamApi from './api/api';

import UserContext from './auth/UserContext';
import NavBar from './app/NavBar';
import AppRoutes from './app/AppRoutes';

let theme = createTheme({
  palette: {
    background: {
      default: 'rgb(231,235,240)'
      // default: '#FFFFFF'
    },
    primary: {
      main: '#3f50b5',
    },
    secondary: {
      main: '#4CAF50',
    },
  },
  typography: { fontFamily: [
    "Rubik",
    "cursive"
  ].join(",") }
});


/** Fiftam application
 * 
 *  App -> AppRoutes
 */
function App() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [families, setFamilies] = useState([]);
  const [primaryFamilyId, setPrimaryFamilyId] = useState(null);
  const [token, setToken] = useState(FitFamApi.token);

  // Load user info from API when user logs in and generates a token
  useEffect(() => {
    async function getCurrUser() {
      if (token) {
        try {
          let { userId } = jwt.decode(token);
          // FitFamApi.token = token;
          const user = await FitFamApi.getUser(userId);
          setUser(user);
          setFamilies(user.families);
          const primaryFamId = user.families.filter(ele => ele.primaryFamily === true)[0].familyId;
          setPrimaryFamilyId(primaryFamId);
        } catch (err) {
          console.error(err);
          setUser(null);
          setFamilies([]);
          setPrimaryFamilyId(null);
        }
      }
      setHasLoaded(true);
    }
    getCurrUser();
  // }, [token]);
  }, []);

  if (!hasLoaded) return <div>Loading</div>;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserContext.Provider value={{ user, setUser, families, setFamilies, primaryFamilyId }}>
          <NavBar />
          <AppRoutes />
        </UserContext.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
