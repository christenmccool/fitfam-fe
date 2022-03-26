import { createTheme } from '@mui/material/styles';

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

const demoUser = 
  {
    id: 1,
    email: "test@mail.com",
    firstName: "testfirst",
    lastName: "testlast",
    families: [
      {
        familyId: 1,
        familyName: "Family 1",
        primaryFamily: true
      },
      {
        familyId: 2,
        familyName: "Family 2",
        primaryFamily: false
      }
    ]
  };

export {theme, demoUser};