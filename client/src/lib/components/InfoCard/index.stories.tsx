import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, GlobalStyle } from "../../../styles";
import { InfoCard } from ".";
import { H1 } from "../../../styles/typography";
import { IoIosHelpCircleOutline } from "react-icons/io";

const stories = storiesOf("InfoCard", module);
// eslint-disable-next-line react/prop-types
const Container = ({ children }: { children: React.ReactNode }) => (
  <div style={{ margin: `36px 0` }}>{children}</div>
);

const placeHolderText = `This is a warning message...`;

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
    <H1>InfoCard</H1>
    <InfoCard iconComponent={<IoIosHelpCircleOutline size="32" />}>
      {placeHolderText}
    </InfoCard>
  </>
));
