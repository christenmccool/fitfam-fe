import React from "react";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import FamilySelect from "../../postings/FamilySelect";

const families = [
  {
    familyId: 1,
    familyName: "Family 1"
  },
  {
    familyId: 2,
    familyName: "Family 2"
  }
];

it('renders without crashing', function () {
  render(
    <MemoryRouter>
      <FamilySelect families={families} familyId={1} />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <FamilySelect families={families} familyId={1} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders family select", function () {
  render(
    <MemoryRouter>
      <FamilySelect families={families} familyId={1} />
    </MemoryRouter>
  );
  expect(screen.queryByLabelText("Select FitFam")).toBeInTheDocument();  
});


it("responds to user input", function () {
  render(
    <MemoryRouter>
      <FamilySelect families={families} familyId={1} />
    </MemoryRouter>
  );

  const categorySelect = screen.getByRole('button', {name: /select fitfam/i});
  UserEvent.click(categorySelect);
  UserEvent.click(screen.getByText(/family 2/i));
  expect(categorySelect).toHaveTextContent(/family 2/i);
});

