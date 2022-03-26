import React from "react";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import CustomPostingForm from "../../postings/CustomPostingForm";

it('renders without crashing', function () {
  render(
    <MemoryRouter>
      <CustomPostingForm />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <CustomPostingForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders posting add form", function () {
  render(
    <MemoryRouter>
      <CustomPostingForm />
    </MemoryRouter>
  );
  expect(screen.queryAllByText("Workout Name")[0]).toBeInTheDocument();  
  expect(screen.queryAllByText("Workout Description")[0]).toBeInTheDocument();  
  expect(screen.getByRole('button', {name: /submit/i})).toBeInTheDocument();
});


it("responds to user input", function () {
  render(
    <MemoryRouter>
      <CustomPostingForm />
    </MemoryRouter>
  );

  const nameField = screen.getByRole('textbox', {name: /workout name/i});
  UserEvent.type(nameField, "Custom Workout Name");
  expect(nameField.value).toEqual("Custom Workout Name");  

  const descriptionField = screen.getByRole('textbox', {name: /workout description/i});
  UserEvent.type(descriptionField, "Custom Description");
  expect(descriptionField.value).toEqual("Custom Description");  
});

