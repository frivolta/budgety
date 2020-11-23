import React from "react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { HeaderMobile } from "./";
import { renderWithThemeAndRouter } from "../../../../utils/tests/renderWithRouter";

describe("<HeaderMobile/>", () => {
  it("renders section name", () => {
    const { getByText } = renderWithThemeAndRouter(
      <HeaderMobile sectionName="Dashboard" />,
      "/dashboard"
    );
    const element = getByText("Dashboard");
    expect(element).toBeInTheDocument();
  });
  it("goes to settings when click", () => {
    const { getByTestId, history } = renderWithThemeAndRouter(
      <HeaderMobile sectionName="Dashboard" />,
      "/dashboard"
    );
    const element = getByTestId("HeaderMobileSettings");
    fireEvent.click(element);
    expect(history.location.pathname).toBe("/settings");
  });
});
