import React, { Component } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { FullPageLayout } from "./";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles";

describe("<FullPageLayout/>", () => {
  it("renders without errors with children", () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <FullPageLayout>children</FullPageLayout>
      </ThemeProvider>
    );
  });
});
