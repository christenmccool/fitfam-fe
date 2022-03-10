import React, {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken';

import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FitFamApi from './api/api';

import UserContext from './auth/UserContext';
import NavBar from './app/NavBar';
import AppRoutes from './app/AppRoutes';



let theme = createTheme({
  palette: {
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
          // JoblyApi.token = token;
          const user = await FitFamApi.getUser(userId);
          setUser(user);
          const families = user.families;
          setFamilies(user.families);

          // const primaryFamId = families.filter(ele => ele.primaryFamily === true)[0].familyId;
          let primaryFamId = null;
          for (let family of families) {
            if (family.primaryFamily) primaryFamId = family.familyId;
          }
          setPrimaryFamilyId(primaryFamId);
        } catch (err) {
          console.error(err);
          setUser(null);
          setFamilies([]);
          setPrimaryFamilyId(null);
        }
      }
    }
    getCurrUser();
  // }, [token]);
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser, families, setFamilies, primaryFamilyId }}>
        <NavBar />
        <AppRoutes />
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
