import React from "react";
import { screen, render, act} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import {demoUser } from "../testutils";

import PostingEditPage from "../../postings/PostingEditPage";
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
          createBy: 1
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
            <PostingEditPage />
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
            <PostingEditPage />
          </UserContext.Provider>
        </LocalizationProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});


it("renders edit form", async function () {
  render(
    <MemoryRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserContext.Provider value={{user: demoUser}}>
          <PostingEditPage />
        </UserContext.Provider>
      </LocalizationProvider>
    </MemoryRouter>
  );
  expect(await screen.findByText("Edit workout post")).toBeInTheDocument();
  expect(await screen.findByText("Do this hard thing")).toBeInTheDocument();
});





