import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import PostingHeader from "../../postings/PostingHeader";

// const PostingHeader = ({ postDate, woName, woDescription, famName="" }) => {

it('renders without crashing', function () {
  render(
    <MemoryRouter>
      <PostingHeader 
        postDate="Tuesday, March 22nd, 2022"
        woName="Test Workout Name 1"
        woDescription="Do this hard thing"
        famName="Family 1"
      />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <PostingHeader 
        postDate="Tuesday, March 22nd, 2022"
        woName="Test Workout Name 1"
        woDescription="Do this hard thing"
        famName="Family 1"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders posting details", async function () {
  render(
    <MemoryRouter>
      <PostingHeader 
        postDate="Tuesday, March 22nd, 2022"
        woName="Test Workout Name 1"
        woDescription="Do this hard thing"
        famName="Family 1"
      />
    </MemoryRouter>
  );
  expect(screen.queryByText("Tuesday, March 22nd, 2022")).toBeInTheDocument();
  expect(screen.queryByText("Family 1")).toBeInTheDocument();
  expect(screen.queryByText("Test Workout Name 1")).toBeInTheDocument();
});







