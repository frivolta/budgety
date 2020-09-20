import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { HeaderMobile } from "./";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../../../styles";
import { Route, Router, Switch } from "react-router";
import { createMemoryHistory } from "history";
import { UserAuth } from "../../../../../types";

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
            <HeaderMobile sectionName="Dashboard" />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );

describe("<HeaderMobile/>", () => {
  it("renders section name", () => {
    const { getByText } = renderWithRouter();
    const element = getByText("Dashboard");
    expect(element).toBeInTheDocument();
  });
  it("goes to settings when click", () => {
    const { getByTestId } = renderWithRouter();
    const element = getByTestId("HeaderMobileSettings");
    fireEvent.click(element);
    expect(history.location.pathname).toBe("/settings");
  });
});
