import React from 'react';
import NavBar from './app/NavBar';
import AppRoutes from './app/AppRoutes';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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



function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
