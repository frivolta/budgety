import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, GlobalStyle } from "../../../styles";
import { Footer } from ".";

const stories = storiesOf("Footer", module);
// eslint-disable-next-line react/prop-types
const Container = ({ children }: { children: React.ReactNode }) => (
  <div style={{ margin: `36px 0`, width: `100%` }}>{children}</div>
);

stories.addDecorator((story) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Container>{story()}</Container>
    </ThemeProvider>
  );
});

stories.add("Default footer", () => (
  <>
    <Footer />
  </>
));
