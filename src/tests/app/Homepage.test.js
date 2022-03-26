import React from "react";
import { screen, render, act} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Homepage from "../../app/Homepage";

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
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Homepage />
        </LocalizationProvider>
      </MemoryRouter>
    );
  });
});


it("matches snapshot", async function () {
  await act(async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Homepage />
        </LocalizationProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});


it("renders list of workouts and search button", async function () {
  render(
    <MemoryRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Homepage />
      </LocalizationProvider>
    </MemoryRouter>
  );
  expect(await screen.findByText("Featured Workout", {exact: false})).toBeInTheDocument();
  expect(screen.getByText("Test Workout Name 1")).toBeInTheDocument();
  expect(screen.getByText("Test Workout Name 2")).toBeInTheDocument();
  expect(screen.getByText( "Search for more workouts")).toBeInTheDocument();

  screen.debug();
});





