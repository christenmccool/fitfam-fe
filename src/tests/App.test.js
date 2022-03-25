import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";

it('renders without crashing', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders NavBar and Search Workout Page", function () {
  const { queryByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(queryByText("FitFam")).toBeInTheDocument();
  expect(queryByText("Login")).toBeInTheDocument();
  expect(queryByText("Signup")).toBeInTheDocument();
  expect(queryByText("Search for more workouts")).toBeInTheDocument();
});


it("renders Login page when click on Login button", function () {
  const { getByText, queryByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(queryByText("Email Address")).not.toBeInTheDocument();

  const loginLink = getByText("Login");
  fireEvent.click(loginLink);
  expect(queryByText("Email Address")).toBeInTheDocument();
  expect(queryByText("Password")).toBeInTheDocument();
});


it("renders Signup page when click on Signup button", function () {
  const { getByText, queryByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(queryByText("Email Address")).not.toBeInTheDocument();

  const loginLink = getByText("Signup");
  fireEvent.click(loginLink);
  expect(queryByText("Email Address")).toBeInTheDocument();
  expect(queryByText("First Name")).toBeInTheDocument();
  expect(queryByText("Last Name")).toBeInTheDocument();
  expect(queryByText("Password")).toBeInTheDocument();
});




