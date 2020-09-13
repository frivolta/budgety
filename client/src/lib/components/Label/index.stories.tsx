import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ThemeProvider } from "styled-components";
import { defaultTheme, GlobalStyle } from "../../../styles";
import { Label } from ".";
import { H1, H2 } from "../../../styles/typography";

const stories = storiesOf("Label", module);
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
    <H1>Label</H1>
    <H2>Default Label</H2>
    <Label>
      Label content <a href="#">with link</a>
    </Label>
    <H2>Styled label</H2>
    <Label color="green">
      Label content <a href="#">with link</a>
    </Label>
  </>
));
