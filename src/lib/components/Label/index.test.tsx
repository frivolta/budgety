import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Label } from "./";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles";

describe("<Label/>", () => {
  it("renders without errors with children", () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <Label>Children</Label>
      </ThemeProvider>
    );
    const element = getByTestId("Label");
    expect(element).toBeInTheDocument();
    expect(getByText("Children")).toBeInTheDocument();
  });

  it("renders with a different color", () => {
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <Label color="#000000">Children</Label>
      </ThemeProvider>
    );
    const element = getByText("Children");
    expect(element).toMatchSnapshot(
      `<span  color="#000000" data-testid="Label">Children</span>`
    );
  });
});
