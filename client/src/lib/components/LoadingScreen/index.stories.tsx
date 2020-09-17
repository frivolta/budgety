import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, GlobalStyle } from "../../../styles";
import { LoadingScreen } from ".";
import { H1, H2 } from "../../../styles/typography";

const stories = storiesOf("LoadingScreen", module);
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
    <H1>LoadingScreen</H1>
    <LoadingScreen loadingText="Loading..." />
  </>
));
