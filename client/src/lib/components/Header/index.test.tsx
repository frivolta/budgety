import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Header } from "./";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles";

describe("<Header/>", () => {
  it("renders without errors with children", () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Header isAuthorized={true} />
      </ThemeProvider>
    );
  });
});
