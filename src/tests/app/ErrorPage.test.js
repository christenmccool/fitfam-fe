import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ErrorPage from "../../app/ErrorPage";


it('renders without crashing', () => {
  render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders text if errors passed in", function () {
  const errors = ["User must be logged in to access this page", "Only admin can change family name"]
  render(
    <MemoryRouter>
      <ErrorPage errors={errors} />
    </MemoryRouter>
  );
  expect(screen.getByText("User must be logged in to access this page")).toBeInTheDocument();
  expect(screen.getByText("Only admin can change family name")).toBeInTheDocument();
});


it("renders text if no errors passed in", function () {
  render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>
  );
  expect(screen.getByText("Server error. Try again later.")).toBeInTheDocument();
});



