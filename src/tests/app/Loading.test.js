import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Loading from "../../app/Loading";


it('renders without crashing', () => {
  render(
    <MemoryRouter>
      <Loading />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <Loading />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders text", function () {
  render(
    <MemoryRouter>
      <Loading />
    </MemoryRouter>
  );
  expect(screen.getByText("Loading")).toBeInTheDocument();
});



