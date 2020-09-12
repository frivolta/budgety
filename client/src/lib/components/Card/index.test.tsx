import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Card } from "./";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles";

describe("<Card/>", () => {
  it("renders without errors with children", () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Card>Card children</Card>
      </ThemeProvider>
    );
  });
});
