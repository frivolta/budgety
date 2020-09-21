import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { FooterMobile } from ".";

describe("<FooterMobile/>", () => {
  it("renders without errors with children", () => {
    render(<FooterMobile />);
  });
});
