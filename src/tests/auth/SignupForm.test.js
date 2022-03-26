import React from "react";
import { screen, render, act} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import UserContext from "../../auth/UserContext";
import SignupForm from "../../auth/SignupForm";

import {demoUser } from "../testutils";


it('renders without crashing with no user in context', async function () {
  await act(async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{user: null}}>
          <SignupForm />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });
});


it('renders without crashing with no user in context', async function () {
  await act(async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{user: demoUser}}>
          <SignupForm />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });
});


it("matches snapshot with user in context", async function () {
  await act(async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={{user: demoUser}}>
          <SignupForm />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});


it("matches snapshot with no user in context", async function () {
  await act(async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={{user: null}}>
          <SignupForm />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});


it("renders UserSignupForm when no user in context", async function () {
  render(
    <MemoryRouter>
      <UserContext.Provider value={{user: null}}>
        <SignupForm />
      </UserContext.Provider>
    </MemoryRouter>
  );
  expect(screen.getByRole('textbox', {name: /email/i})).toBeInTheDocument();
  expect(screen.getByRole('textbox', {name: /first/i})).toBeInTheDocument();
  expect(screen.getByRole('textbox', {name: /last/i})).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});


it("renders UserSignupForm when user in context", async function () {
  render(
    <MemoryRouter>
      <UserContext.Provider value={{user: demoUser}}>
        <SignupForm />
      </UserContext.Provider>
    </MemoryRouter>
  );
  expect(screen.queryByRole('textbox', {name: /email/i})).not.toBeInTheDocument();
  expect(screen.getByRole('heading', "Select FitFam family option")).toBeInTheDocument();
  expect(screen.getByRole('button', {name: /Select FitFam option/i})).toBeInTheDocument();
});




