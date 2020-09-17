import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Header } from "./";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles";
import { Route, Router, Switch } from "react-router";
import { createMemoryHistory } from "history";

const history = createMemoryHistory({ initialEntries: ["/login"] });
const renderWithRouter = () =>
  render(
    <ThemeProvider theme={defaultTheme}>
      <Router history={history}>
        <Switch>
          <Route exact path="/login">
            <Header isAuthorized={true} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );

describe("<Header/>", () => {
  it("renders without errors with children", () => {
    renderWithRouter();
  });
  it("redirect to index page if logo is clicked ", () => {
    const { getByTestId } = renderWithRouter();
    const element = getByTestId("HeaderLogo");
    fireEvent.click(element);
    expect(history.location.pathname).toBe("/");
  });
});
