import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import { GridPageLayout } from "./";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles";
import { UserAuth } from "../../../types";
import { Route, Router, Switch } from "react-router";

const history = createMemoryHistory({ initialEntries: ["/dashboard"] });

const renderWithRouter = () =>
  render(
    <ThemeProvider theme={defaultTheme}>
      <Router history={history}>
        <Switch>
          <Route exact path="/dashboard">
            <GridPageLayout user={defaultUser}>
              GridPageLayout children
            </GridPageLayout>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );

const defaultUser: UserAuth = {
  email: "email@email.com",
  authenticated: true,
};

describe("<GridPageLayout />", () => {
  it("renders without errors with children", () => {
    const { getByText } = renderWithRouter();
    expect(getByText("Dashboard")).toBeInTheDocument();
  });
});
