import React, {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken';

import './App.css';

import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

import FitFamApi from './api/api';

import UserContext from './auth/UserContext';
import NavBar from './app/NavBar';
import AppRoutes from './app/AppRoutes';

let theme = createTheme({
  palette: {
    background: {
      default: '#E7EBF0'
    },
    primary: {
      main: '#3f50b5',
    },
    secondary: {
      main: '#4CAF50',
    },
    white: {
      main: '#FFF'
    }
  },
  typography: { fontFamily: [
    "Rubik",
    "cursive"
  ].join(",") }
});


/** Fiftam app
 * 
 * user is user object obtained from backend API
 * user stored in state means a user is logged in
 * user is passed to componennts through context provider UserContext
 * 
 * user state is updated whenever the token changes
 * token is required for most API calls
 * 
 * signup, login, and editProfile functions provided to AppRoutes
 * logout function provided to NavBar
 * 
 *  App -> {NavBar, AppRoutes}
 */

function App() {
  const [loaded, setLoaded] = useState(false);
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
          FitFamApi.token = token;
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
      setLoaded(true);
    }
    setLoaded(false);
    getCurrUser();
  }, [token]);

  //Login in with email and password to obtain authentication token
  async function login(email, password) {
    try {
      let token = await FitFamApi.login(email, password);
      setToken(token);
    } catch (err) {
      console.log(err);
    }
  }

  //Sign up to obtain authentication token
  async function signup(data) {
    try {
      let token = await FitFamApi.signup(data);
      setToken(token);
    } catch (err) {
      console.log(err);
    }
  }

  async function logout() {
    try {
      setUser(null);
      setToken(null);
    } catch (err) {
      console.log(err);
    }
  }

  if (!loaded) return <div>Loading</div>;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserContext.Provider value={{ user, setUser, families, setFamilies, primaryFamilyId }}>
          <NavBar 
            logout={logout}
          />
          <AppRoutes 
            login={login}
            signup={signup}
          />
        </UserContext.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
