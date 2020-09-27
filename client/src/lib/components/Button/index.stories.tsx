import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ThemeProvider } from "styled-components";
import { defaultTheme, GlobalStyle } from "../../../styles";
import { Button } from ".";
import { H1, H2 } from "../../../styles/typography";

const stories = storiesOf("Button", module);
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
    <H1>Button</H1>
    <H2>Default Button</H2>
    <p>Default State</p>
    <Button text="Button" handleClick={action("button-click")} width="200px" />
    <p>Loading button</p>
    <Button
      text="Button"
      handleClick={action("button-click")}
      width="200px"
      isLoading={true}
    />
    <p>Disabled button</p>
    <Button
      text="Button"
      handleClick={action("button-click")}
      width="200px"
      disabled
    />
    <H2>Secondary button</H2>
    <p>Default State</p>
    <Button
      secondary
      text="Button"
      handleClick={action("button-click")}
      width="200px"
    />
  </>
));
