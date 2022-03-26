import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import {demoUser } from "../testutils";

import PostingCardList from "../../postings/PostingCardList";
import UserContext from "../../auth/UserContext";

const postings = [
  {
    id: 1, 
    familyId: 1, 
    postDate: "20220322",
    postBy: null,
    workout: 
      {
        workoutId: 1, 
        woName:"Test Workout Name 1", 
        woDescription:"Do this hard thing", 
        woCategory: "featured", 
        woScoreType: "Reps", 
        createDate: "20220322",
        featuredDate: "20220322",
        createBy: null
      }
  },
  {
    id: 2, 
    familyId: 1, 
    postDate: "20220322",
    postBy: null,
    workout: 
      {
        workoutId: 2, 
        woName:"Test Workout Name 2", 
        woDescription:"Do this other hard thing", 
        woCategory: "featured", 
        woScoreType: "Reps", 
        createDate: "20220322",
        featuredDate: "20220322",
        createBy: null
      }
  }
];

const family =  {
  id: 1, 
  familyName: "Family Name 1",
  users: [
    {
      id: 1, 
      firstName: 'testFirst',
      lastName: 'testLast',
    }
  ]
};

it('renders without crashing', function () {
  render(
    <MemoryRouter>
      <UserContext.Provider value={{user: demoUser}}>
        <PostingCardList postings={postings} family={family} />
      </UserContext.Provider>
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserContext.Provider value={{user: demoUser}}>
        <PostingCardList postings={postings} family={family} />
      </UserContext.Provider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders list of postings", async function () {
  render(
    <MemoryRouter>
      <UserContext.Provider value={{user: demoUser}}>
      <PostingCardList postings={postings} family={family} />
      </UserContext.Provider>
    </MemoryRouter>
  );
  expect(screen.getByText("Test Workout Name 1")).toBeInTheDocument();
  expect(screen.getByText("Test Workout Name 2")).toBeInTheDocument();
});





