import React from "react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../styles";
import { createMemoryHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import { render, fireEvent, wait } from "@testing-library/react";
import { SignUp } from "../../sections";
import { auth, firestore } from "../../lib/api/firebase";
jest.mock("../../lib/api/firebase", () => ({
  auth: {
    createUserWithEmailAndPassword: jest.fn(() => {
      return {
        user: {
          uid: "fakeuid",
        },
      };
    }),
    signOut: jest.fn(),
  },
}));

const history = createMemoryHistory({ initialEntries: ["/signup"] });
const renderWithRouter = () =>
  render(
    <ThemeProvider theme={defaultTheme}>
      <Router history={history}>
        <Switch>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/">
            <div data-testid="GenericComponent"></div>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );

describe("<SignUp/>", () => {
  it("correctly renders the signup form", () => {
    const { getByTestId } = renderWithRouter();
    const form = getByTestId("SignupForm");
    expect(form).toBeInTheDocument();
  });
  it("correctly renders the signup form", () => {
    const { getByTestId } = renderWithRouter();
    const form = getByTestId("SignupForm");
    expect(form).toBeInTheDocument();
  });

  it("let user signup with valid credentials", () => {
    const { getByPlaceholderText, getByTestId } = renderWithRouter();
    const emailField = getByPlaceholderText("yourname@company.com");
    const passwordField = getByPlaceholderText("Password");
    const confirmPasswordField = getByPlaceholderText("Confirm Password");
    const submitButton = getByTestId("Button");

    fireEvent.change(emailField, {
      target: { value: "test@test.com" },
    });

    fireEvent.change(passwordField, { target: { value: "Lampone01!" } });
    fireEvent.change(confirmPasswordField, {
      target: { value: "Lampone01!" },
    });
    fireEvent.click(submitButton);

    expect(submitButton).not.toBeDisabled();

    wait(() => {
      expect(auth.createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(history.location.pathname).toBe("/dashboard");
    });
  });
});
