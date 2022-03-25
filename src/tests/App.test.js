import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
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
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.queryByText("FitFam")).toBeInTheDocument();
  expect(screen.queryByText("Login")).toBeInTheDocument();
  expect(screen.queryByText("Signup")).toBeInTheDocument();
  expect(screen.queryByText("Search for more workouts")).toBeInTheDocument();
});


it("renders Login page when click on Login button", function () {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.queryByText("Email Address")).not.toBeInTheDocument();

  const loginLink = screen.getByText("Login");
  fireEvent.click(loginLink);
  expect(screen.queryByText("Email Address")).toBeInTheDocument();
  expect(screen.queryByText("Password")).toBeInTheDocument();
});


it("renders Signup page when click on Signup button", function () {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.queryByText("Email Address")).not.toBeInTheDocument();

  const loginLink = screen.getByText("Signup");
  fireEvent.click(loginLink);
  expect(screen.queryByText("Email Address")).toBeInTheDocument();
  expect(screen.queryByText("First Name")).toBeInTheDocument();
  expect(screen.queryByText("Last Name")).toBeInTheDocument();
  expect(screen.queryByText("Password")).toBeInTheDocument();
});




