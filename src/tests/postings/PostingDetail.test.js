import React from "react";
import { screen, render, act} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import {demoUser } from "../testutils";

import PostingDetail from "../../postings/PostingDetail";
import UserContext from "../../auth/UserContext";

import FitFamApi from '../../api/api';
jest.mock('../../api/api');

beforeEach(() => {
  FitFamApi.getPosting.mockResolvedValue(
    {
      id: 1, 
      familyId: 1, 
      postDate: "20220322",
      postBy: null,
      workout: 
        {
          workoutId: 1, 
          woName:"Test Workout Name", 
          woDescription:"Do this hard thing", 
          woCategory: "featured", 
          woScoreType: "Reps", 
          createDate: "20220322",
          featuredDate: "20220322",
          createBy: null
        }
    }
  )
})

it('renders without crashing', async function () {
  await act(async () => {
    render(
      <MemoryRouter>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <UserContext.Provider value={{user: demoUser}}>
            <PostingDetail />
          </UserContext.Provider>
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
          <UserContext.Provider value={{user: demoUser}}>
            <PostingDetail />
          </UserContext.Provider>
        </LocalizationProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});


it("renders posting details", async function () {
  render(
    <MemoryRouter initialEntries={["/posting/1"]}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserContext.Provider value={{user: demoUser}}>
          <PostingDetail />
        </UserContext.Provider>
      </LocalizationProvider>
    </MemoryRouter>
  );
  expect(await screen.findByText("Tuesday, March 22nd, 2022")).toBeInTheDocument();
  expect(await screen.findByText("Family 1")).toBeInTheDocument();
  expect(await screen.findByText("Test Workout Name")).toBeInTheDocument();
});





