import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, GlobalStyle } from "../../../styles";
import { Input } from ".";
import { H1, H2 } from "../../../styles/typography";

const stories = storiesOf("Input", module);
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

stories.add("Input", () => (
  <>
    <H1>Input</H1>
    <H2>Default state</H2>
    <Input
      type="text"
      name="default"
      placeholder="Default state"
      label="Label"
    />
    <H2>Disabled</H2>
    <Input
      type="text"
      name="default"
      placeholder="Default state"
      label="Label"
      disabled
    />
    <H2>With error</H2>
    <Input
      type="text"
      name="default"
      placeholder="Default state"
      label="Label"
      hasErrors={true}
      errorMessage="Error message"
    />
  </>
));
