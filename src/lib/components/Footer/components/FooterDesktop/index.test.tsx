import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { FooterDesktop } from ".";

describe("<FooterDesktop/>", () => {
  it("renders without errors with children", () => {
    render(<FooterDesktop />);
  });
});
