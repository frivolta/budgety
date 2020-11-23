import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Input } from "./";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles";

interface WrapperComponentProps {
  children: React.ReactNode;
}
const WrapperComponent: React.FC<WrapperComponentProps> = ({ children }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

const defaultInput = (
  <WrapperComponent>
    <Input
      type="text"
      name="default"
      placeholder="Default state"
      label="Label"
    />
  </WrapperComponent>
);
const withErrorInput = (
  <WrapperComponent>
    <Input
      type="text"
      name="default"
      placeholder="Default state"
      label="Label"
      errorMessage="Error message"
      hasErrors={true}
    />
  </WrapperComponent>
);

describe("<Input/>", () => {
  it("renders input field", () => {
    const { getByTestId } = render(defaultInput);
    const element = getByTestId("Input");
    expect(element).toBeInTheDocument();
  });

  it("correctly change values when user types", () => {
    const { getByTestId } = render(defaultInput);
    const element = getByTestId("Input");
    fireEvent.change(element, { target: { value: "New value" } });
    expect(element.value).toBe("New value");
  });

  it("shows error message if error", () => {
    const { getByText } = render(withErrorInput);
    const element = getByText("Error message");
    expect(element).toBeInTheDocument();
  });
});
