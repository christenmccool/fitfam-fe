import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import PostingEditBar from "../../postings/PostingEditBar";


it('renders without crashing', function () {
  render(
    <MemoryRouter>
      <PostingEditBar 
        postId={1}
        isUserWo={true}
      />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <PostingEditBar 
        postId={1}
        isUserWo={true}
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders edit button if user workout", async function () {
  render(
    <MemoryRouter>
      <PostingEditBar 
        postId={1}
        isUserWo={true}
      />
    </MemoryRouter>
  );

  expect(screen.queryByRole('link', {name: /edit/i})).toBeInTheDocument();
});


it("renders delete button if not user workout", async function () {
  render(
    <MemoryRouter>
      <PostingEditBar 
        postId={1}
        isUserWo={false}
      />
    </MemoryRouter>
  );
  expect(screen.queryByRole('link', {name: /edit/i})).not.toBeInTheDocument();
  expect(screen.queryByRole('button', {name: /delete/i})).toBeInTheDocument();
});







