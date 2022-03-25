import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import { theme, demoUser } from "../testutils";

import NavBar from "../../app/NavBar";
import UserContext from "../../auth/UserContext";


it('renders without crashing when not logged in', () => {
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{user: null}}>
          <NavBar />
        </UserContext.Provider>
      </ThemeProvider>
    </MemoryRouter>
  );
});


it("matches snapshot when not logged in", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{user: null}}>
          <NavBar />
        </UserContext.Provider>
      </ThemeProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("matches snapshot when logged in", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{user: demoUser}}>
          <NavBar />
        </UserContext.Provider>
      </ThemeProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders Fitfam, Login, and Signup links when not logged in", function () {                
  const { queryByText } = render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{user: null}}>
          <NavBar />
        </UserContext.Provider>
      </ThemeProvider>
    </MemoryRouter>
  );
  expect(queryByText("FitFam")).toBeInTheDocument();
  expect(queryByText("Login")).toBeInTheDocument();
  expect(queryByText("Signup")).toBeInTheDocument();
});


it("renders Fitfam and Logout links when not logged in", function () {                
  const { queryByText } = render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{user: demoUser}}>
          <NavBar />
        </UserContext.Provider>
      </ThemeProvider>
    </MemoryRouter>
  );
  expect(queryByText("FitFam")).toBeInTheDocument();
  expect(queryByText("Logout")).toBeInTheDocument();
});
