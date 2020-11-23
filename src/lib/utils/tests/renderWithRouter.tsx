import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "styled-components";
import { Route, Router, Switch } from "react-router";
import { createMemoryHistory } from "history";
import { defaultTheme } from "../../../styles";

export const renderWithThemeAndRouter = (
  ui: React.ReactElement,
  path: string
) => {
  const history = createMemoryHistory({ initialEntries: [path] });
  return {
    ...render(
      <ThemeProvider theme={defaultTheme}>
        <Router history={history}>
          <Switch>
            <Route exact path={path}>
              {ui}
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    ),
    history,
  };
};
