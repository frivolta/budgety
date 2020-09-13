import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Button } from "./";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles";

interface WrapperComponentProps {
  children: React.ReactNode;
}

const mockClick = jest.fn();

const WrapperComponent: React.FC<WrapperComponentProps> = ({ children }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

const defaultButton = (
  <WrapperComponent>
    <Button text="Button" handleClick={mockClick} />
  </WrapperComponent>
);
const loadingButton = (
  <WrapperComponent>
    <Button text="Button" handleClick={mockClick} isLoading />
  </WrapperComponent>
);

describe("<Button/>", () => {
  it("renders button field", () => {
    const { getByTestId } = render(defaultButton);
    const element = getByTestId("Button");
    expect(element).toBeInTheDocument();
  });
  it("shows spinner when loading", () => {
    const { getByTestId } = render(loadingButton);
    const element = getByTestId("Spinner");
    expect(element).toBeInTheDocument();
  });
  it("calls function when clicked", () => {
    const { getByTestId } = render(defaultButton);
    const element = getByTestId("Button");
    fireEvent.click(element);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
