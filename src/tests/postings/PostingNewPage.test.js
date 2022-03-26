import React from "react";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import {demoUser } from "../testutils";

import PostingNewPage from "../../postings/PostingNewPage";
import UserContext from "../../auth/UserContext";


it('renders without crashing', function () {
  render(
    <MemoryRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserContext.Provider value={{user: demoUser, currFamId: 1}}>
          <PostingNewPage />
        </UserContext.Provider>
      </LocalizationProvider>
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserContext.Provider value={{user: demoUser, currFamId: 1}}>
          <PostingNewPage />
        </UserContext.Provider>
      </LocalizationProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders posting add form", function () {
  render(
    <MemoryRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserContext.Provider value={{user: demoUser, currFamId: 1}}>
          <PostingNewPage />
        </UserContext.Provider>
      </LocalizationProvider>
    </MemoryRouter>
  );
  expect(screen.getByLabelText("Create new workout")).toBeInTheDocument();  
  expect(screen.queryAllByText("Workout Name")[0]).toBeInTheDocument();  
  expect(screen.queryAllByText("Workout Description")[0]).toBeInTheDocument();  
  expect(screen.getByRole('button', {name: /submit/i})).toBeInTheDocument();
});


it("responds to user input", function () {
  render(
    <MemoryRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserContext.Provider value={{user: demoUser, currFamId: 1}}>
          <PostingNewPage />
        </UserContext.Provider>
      </LocalizationProvider>
    </MemoryRouter>
  );

  const optionSelect = screen.getByRole('button', {name: /Select option/i});
  UserEvent.click(optionSelect);
  UserEvent.click(screen.getByRole('option', {name: /Create new workout/i}));
  expect(optionSelect).toHaveTextContent(/Create new workout/i);
  screen.debug();
});
