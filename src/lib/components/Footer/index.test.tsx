import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Footer } from ".";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles";
import { Route, Router, Switch } from "react-router";
import { createMemoryHistory } from "history";

const history = createMemoryHistory({ initialEntries: ["/"] });
const renderWithRouter = () =>
  render(
    <ThemeProvider theme={defaultTheme}>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Footer />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );

describe("<Footer/>", () => {
  it("renders without errors with children", () => {
    renderWithRouter();
  });
});
