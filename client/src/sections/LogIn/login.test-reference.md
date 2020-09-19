import React from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../styles";
import { createMemoryHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import { render, fireEvent, wait } from "@testing-library/react";
import { LogIn } from "..";
import { Auth } from "aws-amplify";

Auth.signIn = jest.fn();
const history = createMemoryHistory({ initialEntries: ["/login"] });
const renderWithRouter = () =>
  render(
    <ThemeProvider theme={defaultTheme}>
      <Router history={history}>
        <Switch>
          <Route exact path="/login">
            <LogIn />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );

describe("<LogIn/>", () => {
  it("correctly renders the login form", () => {
    const { getByTestId } = renderWithRouter();
    const form = getByTestId("LogInForm");
    expect(form).toBeInTheDocument();
  });

  it("calls signing function", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = renderWithRouter();
    const emailField = getByPlaceholderText("yourname@company.com");
    const passwordField = getByPlaceholderText("Password");
    const submitButton = getByTestId("Button");

    fireEvent.change(emailField, {
      target: { value: "test@test.com" },
    });
    fireEvent.change(passwordField, { target: { value: "Lampone01!" } });
    fireEvent.click(submitButton);

    await wait(() => {
      expect(Auth.signIn).toHaveBeenCalled();
    });
  });
});
