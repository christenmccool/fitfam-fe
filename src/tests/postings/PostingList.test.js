import React from "react";
import { screen, render, act} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import {demoUser } from "../testutils";

import PostingList from "../../postings/PostingList";
import UserContext from "../../auth/UserContext";

import FitFamApi from '../../api/api';
jest.mock('../../api/api');

beforeEach(() => {
  FitFamApi.getPostings.mockResolvedValue([
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
  ])
  FitFamApi.getFamily.mockResolvedValue(
    {
      id: 1, 
      familyName: "Family Name 1",
      users: [
        {
          id: 1, 
          firstName: 'testFirst',
          lastName: 'testLast',
        }
      ]
    }
  )
})

it('renders without crashing', async function () {
  await act(async () => {
    render(
      <MemoryRouter>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <UserContext.Provider value={{user: demoUser}}>
            <PostingList currFamId={1} />
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
            <PostingList currFamId={1} />
          </UserContext.Provider>
        </LocalizationProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});


it("renders list of postings", async function () {
  render(
    <MemoryRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserContext.Provider value={{user: demoUser}}>
          <PostingList currFamId={1}/>
        </UserContext.Provider>
      </LocalizationProvider>
    </MemoryRouter>
  );
  expect(await screen.findByText("Test Workout Name")).toBeInTheDocument();
  expect(screen.getAllByText("Select FitFam")[0]).toBeInTheDocument();
  expect(screen.getByText("Family 1")).toBeInTheDocument();
});





