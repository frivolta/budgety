import React, { FC } from "react";
import ReactLoading from "react-loading";
import { StyledLoadingContainer } from "./styled";
import { H4 } from "../../../styles/typography";
import { useTheme } from "styled-components";
import { Theme } from "react-select/src/types";

interface Props {
  loadingText: string;
  inPageLoader?: boolean;
}

export const LoadingScreen: FC<Props> = ({ loadingText, inPageLoader }) => {
  const theme = useTheme() as Theme;

  return (
    <StyledLoadingContainer inPageLoader={inPageLoader}>
      <ReactLoading type={"bubbles"} color={theme.colors.primary} />
      <H4>{loadingText}</H4>
    </StyledLoadingContainer>
  );
};
