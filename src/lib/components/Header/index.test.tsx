import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Header } from "./";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles";
import { Route, Router, Switch } from "react-router";
import { createMemoryHistory } from "history";
import { UserAuth } from "../../../types";

const mockedUser: UserAuth = {
  email: "mocked@email.com",
  authenticated: true,
};

const history = createMemoryHistory({ initialEntries: ["/dashboard"] });
const renderWithRouter = () =>
  render(
    <ThemeProvider theme={defaultTheme}>
      <Router history={history}>
        <Switch>
          <Route exact path="/dashboard">
            <Header
              isAuthorized={mockedUser.authenticated}
              user={mockedUser}
              sectionName="Dashboard"
            />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );

describe("<Header/>", () => {
  it("renders without errors with children", () => {
    const { getByTestId } = renderWithRouter();
    const element = getByTestId("HeaderLogo");
    expect(element).toBeInTheDocument();
  });
  it("renders without errors with children", () => {
    const { getByText } = renderWithRouter();
    const element = getByText(mockedUser.email);
    expect(element).toBeInTheDocument();
  });
  // Restore history or leave last
  it("redirect to index page if logo is clicked ", () => {
    const { getByTestId } = renderWithRouter();
    const element = getByTestId("HeaderLogo");
    fireEvent.click(element);
    expect(history.location.pathname).toBe("/");
  });
});
