import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import WorkoutSearchForm from "../../workouts/WorkoutSearchForm";


it('renders without crashing', function () {
  render(
    <MemoryRouter>
      <WorkoutSearchForm />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <WorkoutSearchForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders workout search page", function () {
  const { queryByText, queryAllByText, getByTestId } = render(
    <MemoryRouter>
      <WorkoutSearchForm />
    </MemoryRouter>
  );
  expect(queryAllByText("Keyword")[0]).toBeInTheDocument();
  expect(queryAllByText("Category")[0]).toBeInTheDocument();
  expect(queryAllByText("Movements")[0]).toBeInTheDocument();
  expect(queryByText("Search")).toBeInTheDocument();  
});


