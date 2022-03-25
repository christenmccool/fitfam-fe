import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";


import WorkoutSearchForm from "../../workouts/WorkoutSearchForm";


it('renders without crashing', function () {
  render(
    <MemoryRouter>
      <WorkoutSearchForm />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <WorkoutSearchForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders workout search page", function () {
  render(
    <MemoryRouter>
      <WorkoutSearchForm />
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
      <WorkoutSearchForm />
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

  screen.debug();
});

