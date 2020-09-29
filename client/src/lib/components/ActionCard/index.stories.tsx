import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, GlobalStyle } from "../../../styles";
import { ActionCard } from ".";
import { H1 } from "../../../styles/typography";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("ActionCard", module);
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

stories.add("default", () => (
  <>
    <H1>Action Card</H1>
    <ActionCard
      color="#FF2773"
      title="Category"
      iconComponent="I"
      onClick={action("clicked")}
    />
  </>
));
