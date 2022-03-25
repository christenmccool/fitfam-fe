import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import WorkoutCard from "../../workouts/WorkoutCard";


it('renders without crashing', function () {
  render(
    <MemoryRouter>
      <WorkoutCard 
        id={1}
        name={"Test Workout Name 1"} 
        description={"Do this hard thing"}
        startExpanded={false}
      />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <WorkoutCard 
        id={1}
        name={"Test Workout Name 1"} 
        description={"Do this hard thing"}
        startExpanded={false}
      />    
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders workout name but not description if not expanded", async function () {
  const { queryByText } = render(
    <MemoryRouter>
      <WorkoutCard 
        id={1}
        name={"Test Workout Name 1"} 
        description={"Do this hard thing"}
        startExpanded={false}
      />
    </MemoryRouter>
  );
  expect(queryByText("Test Workout Name 1")).toBeInTheDocument();
  expect(queryByText("Do this hard thing")).not.toBeInTheDocument();
});


it("renders workout name and description if expanded", async function () {
  const { queryByText } = render(
    <MemoryRouter>
      <WorkoutCard 
        id={1}
        name={"Test Workout Name 1"} 
        description={"Do this hard thing"}
        startExpanded={true}
      />
    </MemoryRouter>
  );
  expect(queryByText("Test Workout Name 1")).toBeInTheDocument();
  expect(queryByText("Do this hard thing")).toBeInTheDocument();
});






