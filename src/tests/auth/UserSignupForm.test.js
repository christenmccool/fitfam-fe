import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserEvent from "@testing-library/user-event";

import UserSignupForm from "../../auth/UserSignupForm";


it('renders without crashing', () => {
  render(
    <MemoryRouter>
      <UserSignupForm />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserSignupForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders form", function () {
  render(
    <MemoryRouter>
      <UserSignupForm />
    </MemoryRouter>
  );
  expect(screen.getByRole('textbox', {name: /email/i})).toBeInTheDocument();
  expect(screen.getByRole('textbox', {name: /first/i})).toBeInTheDocument();
  expect(screen.getByRole('textbox', {name: /last/i})).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});


it("responds to user input", function () {
  render(
    <MemoryRouter>
      <UserSignupForm />
    </MemoryRouter>
  );

  const emailField = screen.getByRole('textbox', {name: /email/i});
  UserEvent.type(emailField, "test@mail.com");
  expect(emailField.value).toEqual("test@mail.com");  

  const firstNameField = screen.getByRole('textbox', {name: /first/i});
  UserEvent.type(firstNameField, "testFirst");
  expect(firstNameField.value).toEqual("testFirst");  

  const lastNameField = screen.getByRole('textbox', {name: /last/i});
  UserEvent.type(lastNameField, "testLast");
  expect(lastNameField.value).toEqual("testLast");  

  const passwordField = screen.getByLabelText(/password/i);
  UserEvent.type(passwordField, "testpassword");
  expect(passwordField.value).toEqual("testpassword");  
});

