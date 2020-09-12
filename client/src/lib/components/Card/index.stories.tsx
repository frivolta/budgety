import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, GlobalStyle } from "../../../styles";
import { Card } from ".";
import { H1 } from "../../../styles/typography";

const stories = storiesOf("Card", module);
// eslint-disable-next-line react/prop-types
const Container = ({ children }: { children: React.ReactNode }) => (
  <div style={{ margin: `36px 0` }}>{children}</div>
);

const placeHolderText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat.`;

stories.addDecorator((story) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Container>{story()}</Container>
    </ThemeProvider>
  );
});

stories.add("default", () => (
  <>
    <H1>Card</H1>
    <Card>{placeHolderText}</Card>
  </>
));
