import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import WorkoutCardList from "../../workouts/WorkoutCardList";

const workouts = [
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
]

it('renders without crashing', function () {
  render(
    <MemoryRouter>
      <WorkoutCardList workouts={workouts} />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <WorkoutCardList workouts={workouts} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders list of workouts", async function () {
  render(
    <MemoryRouter>
      <WorkoutCardList workouts={workouts} />
    </MemoryRouter>
  );
  expect(screen.getByText("Test Workout Name 1")).toBeInTheDocument();
  expect(screen.getByText("Test Workout Name 2")).toBeInTheDocument();
});





