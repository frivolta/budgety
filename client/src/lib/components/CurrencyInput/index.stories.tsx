import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, GlobalStyle } from "../../../styles";
import { CurrencyInput } from ".";
import { H1, H2 } from "../../../styles/typography";

const stories = storiesOf("Currency Input", module);
// eslint-disable-next-line react/prop-types
const Container = ({ children }: { children: React.ReactNode }) => (
  <div style={{ margin: `36px 0` }}>{children}</div>
);

stories.addDecorator((story) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Container>{story()}</Container>
    </ThemeProvider>
  );
});

stories.add("All states", () => (
  <>
    <H1>Currency Input</H1>
    <H2>Default state</H2>
    <CurrencyInput
      name="currency"
      label="Default Currency"
      prefix="€ "
      allowDecimals
      decimalsLimit={2}
    />
    <H2>Disabled</H2>
    <CurrencyInput
      name="currency"
      label="Default Currency"
      prefix="€ "
      allowDecimals
      decimalsLimit={2}
      disabled
    />
    <H2>With error</H2>
    <CurrencyInput
      name="currency"
      label="Default Currency"
      prefix="€ "
      allowDecimals
      decimalsLimit={2}
      hasErrors={true}
      errorMessage="Stale error message"
    />
  </>
));
