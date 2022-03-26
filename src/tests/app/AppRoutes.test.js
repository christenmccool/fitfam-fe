import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import UserContext from "../../auth/UserContext";
import AppRoutes from "../../app/AppRoutes";

import {demoUser } from "../testutils";


it('renders without crashing when not signed in', () => {
  render(
    <MemoryRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserContext.Provider value={{user: null}}>
          <AppRoutes />
        </UserContext.Provider>
      </LocalizationProvider>
    </MemoryRouter>
  );
});


it("matches snapshot when not signed in", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserContext.Provider value={{user: null}}>
          <AppRoutes />
        </UserContext.Provider>
      </LocalizationProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it('renders without crashing when signed in', () => {
  render(
    <MemoryRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserContext.Provider value={{user: demoUser}}>
          <AppRoutes />
        </UserContext.Provider>
      </LocalizationProvider>
    </MemoryRouter>
  );
});


it("matches snapshot when signed in", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserContext.Provider value={{user: demoUser}}>
          <AppRoutes />
        </UserContext.Provider>
      </LocalizationProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});



