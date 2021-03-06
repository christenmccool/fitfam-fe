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
import Loading from './app/Loading';

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
    },
    grey: {
      main: '#E7EBF0'
    }
  },
  typography: { fontFamily: [
    "Rubik",
    "cursive"
  ].join(",") }
});

// Key name for storing token in localStorage 
const TOKEN_STORAGE_ID = "fitfam-token";

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
  const [user, setUser] = useState(null);
  const [currFamId, setCurrFamId] = useState(null);

  const initialToken = localStorage.getItem(TOKEN_STORAGE_ID);
  const [token, setToken] = useState(initialToken);
  const [loaded, setLoaded] = useState(false);

  // Load user info from API when user logs in and generates a token
  useEffect(() => {
    async function getCurrUser() {
      if (token) {
        try {
          let { userId } = jwt.decode(token);
          FitFamApi.token = token;
          localStorage.setItem(TOKEN_STORAGE_ID, token);

          const user = await FitFamApi.getUser(userId);
          setUser(user);

          const primaryFam = user.families.filter(ele => ele.primaryFamily === true)[0]

          setCurrFamId(primaryFam.familyId);
        } catch (err) {
          console.error(err);
          setUser(null);
        }
      } else {
        localStorage.removeItem(TOKEN_STORAGE_ID);
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
      return {success: true}
    } catch (err) {
      console.log(err);
      return {success: false, err}
    }
  }

  //Sign up to obtain authentication token
  //Automatically log new user in by setting token in state
  async function signup(data) {
    try {
      let token = await FitFamApi.signup(data);
      FitFamApi.token = token;
      
      //automatically join "Team FitFam" with familyId 1
      let { userId } = jwt.decode(token);
      await FitFamApi.joinFamily(userId, 1, true);
      setCurrFamId(1);

      setToken(token);
      return {success: true}
    } catch (err) {
      console.log(err);
      return {success: false, err}
    }
  }

  //Log out of site by setting user and token state to null
  async function logout() {
    setUser(null);
    setToken(null);
  }

  /** Either join or create a new family when user signs up
   * familyOption can be "join" or "create"
   * - "join", familyData contains family joinCode
   * - "create", familyData contains new familyName
   **/
  async function signupFamily(familyOption, familyData) {
    try {
      let family; 
      let isAdmin;
      if (familyOption === "join") {
        family = await FitFamApi.findFamily(familyData);
        isAdmin = false;
      } else if (familyOption === "create") {
        family = await FitFamApi.createFamily(familyData);
        isAdmin = true;
      }

      await FitFamApi.joinFamily(user.id, family.id, false, isAdmin);
      await FitFamApi.changePrimaryFamily(user.id, family.id);

      const updatedUser = await FitFamApi.getUser(user.id);
      setUser(updatedUser);
      setCurrFamId(family.id);

      return {success: true, familyId: family.id}
    } catch (err) {
      console.log(err);
      return {success: false, err}
    }
  }

  if (!loaded) return <Loading />;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserContext.Provider value={{ user, setUser, currFamId, setCurrFamId }}>
          <NavBar 
            logout={logout}
          />
          <AppRoutes 
            login={login}
            signup={signup}
            signupFamily={signupFamily}
            currFamId={currFamId} 
            setCurrFamId={setCurrFamId}
          />
        </UserContext.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
