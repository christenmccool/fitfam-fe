import React from "react";
import { render, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import WorkoutList from "../../workouts/WorkoutList";

import FitFamApi from '../../api/api';
jest.mock('../../api/api');

beforeEach(() => {
  FitFamApi.getFeaturedWorkouts.mockResolvedValue([
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

it('renders without crashing', async function () {
  await act(async () => {
    render(
      <MemoryRouter>
        <WorkoutList />
      </MemoryRouter>
    );
  });
});


it("matches snapshot", async function () {
  await act(async () => {
  const { asFragment } = render(
      <MemoryRouter>
        <WorkoutList />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});


it("renders list of workouts", async function () {
  const { findByText, getByText } = render(
    <MemoryRouter>
      <WorkoutList />
    </MemoryRouter>
  );
  expect(await findByText("Featured Workout", {exact: false})).toBeInTheDocument();
  expect(getByText("Test Workout Name 1")).toBeInTheDocument();
  expect(getByText("Test Workout Name 2")).toBeInTheDocument();
});





