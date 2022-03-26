import React from "react";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import AddWoPostingForm from "../../postings/AddWoPostingForm";

it('renders without crashing', function () {
  render(
    <MemoryRouter>
      <AddWoPostingForm />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <AddWoPostingForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders posting add form", function () {
  render(
    <MemoryRouter>
      <AddWoPostingForm />
    </MemoryRouter>
  );
  expect(screen.queryAllByText("Keyword")[0]).toBeInTheDocument();
  expect(screen.queryAllByText("Category")[0]).toBeInTheDocument();
  expect(screen.queryAllByText("Movements")[0]).toBeInTheDocument();
  expect(screen.queryByText("Search")).toBeInTheDocument();  
});


it("responds to user input", function () {
  render(
    <MemoryRouter>
      <AddWoPostingForm />
    </MemoryRouter>
  );

  const keywordField = screen.getByRole('textbox', {name: /keyword/i});
  UserEvent.type(keywordField, "Nicole");
  expect(keywordField.value).toEqual("Nicole");  

  const categorySelect = screen.getByRole('button', {name: /category/i});
  UserEvent.click(categorySelect);
  UserEvent.click(screen.getByText(/girls/i));
  expect(categorySelect).toHaveTextContent(/girls/i);

  const movementsField = screen.getByRole('textbox', {name: /movements/i});
  UserEvent.type(movementsField, "Ring dip");
  UserEvent.type(movementsField, "Toes-to-Bar");
  expect(movementsField.value).toContain("Ring dip");  
  expect(movementsField.value).toContain("Toes-to-Bar");  
});

