import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { InfoCard } from "./";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles";
import { IoIosHelpCircleOutline } from "react-icons/io";

describe("<InfoCard/>", () => {
  it("renders without errors with children", () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <InfoCard iconComponent={<IoIosHelpCircleOutline size="32" />}>
          Card children
        </InfoCard>
      </ThemeProvider>
    );
  });
});
