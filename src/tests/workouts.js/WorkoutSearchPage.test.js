import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import WorkoutSearchPage from "../../workouts/WorkoutSearchPage";

import FitFamApi from '../../api/api';
jest.mock('../../api/api');

beforeEach(() => {
  FitFamApi.searchWorkouts.mockResolvedValue([
      {
        id: 1, 
        name:"Test Workout Name 1", 
        description:"Do this hard thing", 
        category: "featured", 
        scoreType: "Reps", 
        createDate: "20220322",
        featuredDate: "20220322",
        createBy: null
      },
      {
        id: 2, 
        name:"Test Workout Name 2", 
        description:"Do this other hard thing", 
        category: "featured", 
        scoreType: "Reps", 
        createDate: "20220322",
        featuredDate: "20220322",
        createBy: null
      }
  ])
})


it('renders without crashing', function () {
  render(
    <MemoryRouter>
      <WorkoutSearchPage />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <WorkoutSearchPage />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders workout search page", function () {
  render(
    <MemoryRouter>
      <WorkoutSearchPage />
    </MemoryRouter>
  );
  expect(screen.queryByText("Workout search")).toBeInTheDocument();
  expect(screen.queryByText("Select optional filters")).toBeInTheDocument();
  expect(screen.queryAllByText("Keyword")[0]).toBeInTheDocument();
  expect(screen.queryAllByText("Category")[0]).toBeInTheDocument();
  expect(screen.queryAllByText("Movements")[0]).toBeInTheDocument();
  expect(screen.queryByText("Search")).toBeInTheDocument();
});


it("renders workout search results", async function () {
  render(
    <MemoryRouter>
      <WorkoutSearchPage />
    </MemoryRouter>
  );

  const searchButton = screen.queryByText("Search");
  fireEvent.click(searchButton);
  expect(await screen.findByText("Test Workout Name 1")).toBeInTheDocument();
  expect(await screen.findByText("Test Workout Name 2")).toBeInTheDocument();

});





