import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
  const { queryByText, queryAllByText } = render(
    <MemoryRouter>
      <WorkoutSearchPage />
    </MemoryRouter>
  );
  expect(queryByText("Workout search")).toBeInTheDocument();
  expect(queryByText("Select optional filters")).toBeInTheDocument();
  expect(queryAllByText("Keyword")[0]).toBeInTheDocument();
  expect(queryAllByText("Category")[0]).toBeInTheDocument();
  expect(queryAllByText("Movements")[0]).toBeInTheDocument();
  expect(queryByText("Search")).toBeInTheDocument();
});


it("renders workout search results", async function () {
  const { queryByText, findByText, debug } = render(
    <MemoryRouter>
      <WorkoutSearchPage />
    </MemoryRouter>
  );

  const searchButton = queryByText("Search");
  fireEvent.click(searchButton);
  expect(await findByText("Test Workout Name 1")).toBeInTheDocument();
  expect(await findByText("Test Workout Name 2")).toBeInTheDocument();
});





