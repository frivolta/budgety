import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles";
import { LoadingScreen } from "./index";
describe("<Label/>", () => {
  it("renders without errors with text", () => {
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <LoadingScreen loadingText="Loading..." />
      </ThemeProvider>
    );
    const element = getByText("Loading...");
    expect(element).toBeInTheDocument();
  });
});
