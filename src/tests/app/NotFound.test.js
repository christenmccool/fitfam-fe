import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NotFound from "../../app/NotFound";


it('renders without crashing', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders text", function () {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
  expect(screen.getByText("The page you are looking for cannot be found")).toBeInTheDocument();
});



