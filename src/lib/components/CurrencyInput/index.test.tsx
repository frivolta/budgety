import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CurrencyInput } from "./";
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
    <CurrencyInput
      name="currency"
      label="Default Currency"
      prefix="€ "
      allowDecimals
      decimalsLimit={2}
    />
  </WrapperComponent>
);
const withErrorInput = (
  <WrapperComponent>
    <CurrencyInput
      name="currency"
      label="Default Currency"
      prefix="€ "
      allowDecimals
      decimalsLimit={2}
      hasErrors={true}
      errorMessage="Stale error message"
    />
  </WrapperComponent>
);

describe("<Input/>", () => {
  it("renders input field", () => {
    const { getByTestId } = render(defaultInput);
    const element = getByTestId("CurrencyInput");
    expect(element).toBeInTheDocument();
  });

  it("doesn't change value if user type text instead of numbers", () => {
    const { getByTestId } = render(defaultInput);
    const element = getByTestId("CurrencyInput");
    fireEvent.change(element, { target: { value: "New value" } });
    expect(element.value).toBe("€ 0");
  });

  it("correctly change values with a max of 2 decimals", () => {
    const { getByTestId } = render(defaultInput);
    const element = getByTestId("CurrencyInput");
    fireEvent.change(element, { target: { value: "15.0034423423" } });
    expect(element.value).toBe("€ 15.00");
  });

  it("shows error message if error", () => {
    const { getByText } = render(withErrorInput);
    const element = getByText("Stale error message");
    expect(element).toBeInTheDocument();
  });
});
