import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserEvent from "@testing-library/user-event";

import LoginForm from "../../auth/LoginForm";


it('renders without crashing', () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("renders form", function () {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  expect(screen.getByRole('textbox', {name: /email/i})).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});


it("responds to user input", function () {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  const emailField = screen.getByRole('textbox', {name: /email/i});
  UserEvent.type(emailField, "test@mail.com");
  expect(emailField.value).toEqual("test@mail.com");  

  const passwordField = screen.getByLabelText(/password/i);
  UserEvent.type(passwordField, "testpassword");
  expect(passwordField.value).toEqual("testpassword");  
});

