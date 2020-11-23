import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { FooterMobile } from ".";
import { fireEvent } from "@testing-library/react";
import { renderWithThemeAndRouter } from "../../../../utils/tests/renderWithRouter";

describe("<FooterMobile/>", () => {
  it("renders without errors with children", () => {
    renderWithThemeAndRouter(<FooterMobile />, "/");
  });
  it("has working button icons", () => {
    const { getByTestId, history } = renderWithThemeAndRouter(
      <FooterMobile />,
      "/"
    );
    const linkToBeClicked = getByTestId("AddExpenseLink");
    fireEvent.click(linkToBeClicked);
    expect(history.location.pathname).toBe("/add-expense");
  });
});
