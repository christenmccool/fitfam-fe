import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import PostingCard from "../../postings/PostingCard";


it('renders without crashing', function () {
  render(
    <MemoryRouter>
      <PostingCard 
        id={1}
        woName={"Test Workout Name 1"} 
        woDescription={"Do this hard thing"}
        startExpanded={false}
        postByUser={false}
        isUserWo={false}
        isUserPosting={false}
      />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <PostingCard 
        id={1}
        woName={"Test Workout Name 1"} 
        woDescription={"Do this hard thing"}
        startExpanded={false}
        postByUser={false}
        isUserWo={false}
        isUserPosting={false}
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders workout name but not description if not expanded", async function () {
  render(
    <MemoryRouter>
      <PostingCard 
        id={1}
        woName={"Test Workout Name 1"} 
        woDescription={"Do this hard thing"}
        startExpanded={false}
        postByUser={false}
        isUserWo={false}
        isUserPosting={false}
    />
    </MemoryRouter>
  );
  expect(screen.queryByText("Test Workout Name 1")).toBeInTheDocument();
  expect(screen.queryByText("Do this hard thing")).not.toBeInTheDocument();
});







